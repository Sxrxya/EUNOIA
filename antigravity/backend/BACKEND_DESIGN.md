# Backend Architecture Design

## Overview

The Antigravity backend provides authentication, data persistence, and API services for the cognitive load reducer application.

---

## Technology Stack

### Core Services
- **Runtime**: Node.js 18+ / Bun
- **Framework**: Next.js API Routes (serverless)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (encrypted)
- **Hosting**: Vercel (serverless functions)

### Alternative Stack (Firebase)
- **Auth**: Firebase Authentication
- **Database**: Firestore
- **Storage**: Cloud Storage
- **Functions**: Cloud Functions
- **Hosting**: Firebase Hosting

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  settings JSONB DEFAULT '{}'::jsonb
);
```

### Analysis History Table
```sql
CREATE TABLE analysis_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  simplified_text TEXT NOT NULL,
  gravity_score INTEGER NOT NULL,
  gravity_breakdown JSONB NOT NULL,
  next_action JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[]
);

CREATE INDEX idx_analysis_user_id ON analysis_history(user_id);
CREATE INDEX idx_analysis_created_at ON analysis_history(created_at DESC);
```

### User Preferences Table
```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(50) DEFAULT 'light',
  simplification_level VARCHAR(50) DEFAULT 'medium',
  auto_analyze BOOLEAN DEFAULT false,
  email_notifications BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Workspaces Table (Future - Team Feature)
```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  settings JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE workspace_members (
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (workspace_id, user_id)
);
```

---

## API Routes

### Authentication

#### POST /api/auth/signup
```typescript
Request:
{
  email: string;
  password: string;
  displayName?: string;
}

Response:
{
  user: {
    id: string;
    email: string;
    displayName: string;
  };
  session: {
    accessToken: string;
    refreshToken: string;
  };
}
```

#### POST /api/auth/login
```typescript
Request:
{
  email: string;
  password: string;
}

Response:
{
  user: User;
  session: Session;
}
```

#### POST /api/auth/logout
```typescript
Response:
{
  success: boolean;
}
```

#### GET /api/auth/session
```typescript
Response:
{
  user: User | null;
  session: Session | null;
}
```

---

### Analysis

#### POST /api/analyze
```typescript
Request:
{
  text: string;
  saveToHistory?: boolean;
}

Response:
{
  gravityScore: GravityScore;
  simplified: SimplifiedContent;
  nextAction: NextAction;
  timestamp: number;
  analysisId?: string; // if saved
}
```

#### GET /api/analyze/history
```typescript
Query:
{
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

Response:
{
  analyses: AnalysisHistory[];
  total: number;
  hasMore: boolean;
}
```

#### GET /api/analyze/:id
```typescript
Response:
{
  analysis: AnalysisHistory;
}
```

#### DELETE /api/analyze/:id
```typescript
Response:
{
  success: boolean;
}
```

---

### User Preferences

#### GET /api/preferences
```typescript
Response:
{
  preferences: UserPreferences;
}
```

#### PUT /api/preferences
```typescript
Request:
{
  theme?: 'light' | 'dark';
  simplificationLevel?: 'low' | 'medium' | 'high';
  autoAnalyze?: boolean;
  emailNotifications?: boolean;
}

Response:
{
  preferences: UserPreferences;
}
```

---

### Analytics (Future)

#### GET /api/analytics/summary
```typescript
Query:
{
  period: 'week' | 'month' | 'year';
}

Response:
{
  totalAnalyses: number;
  averageGravityScore: number;
  mostCommonLevel: 'light' | 'medium' | 'heavy';
  trends: {
    date: string;
    avgScore: number;
  }[];
}
```

---

## Security Model

### Authentication Flow
```
1. User signs up/logs in
   ↓
2. Supabase Auth creates session
   ↓
3. JWT token stored in httpOnly cookie
   ↓
4. Middleware validates token on each request
   ↓
5. User data attached to request context
```

### Data Encryption
- **At Rest**: PostgreSQL encryption (Supabase default)
- **In Transit**: TLS 1.3
- **Client-side**: Optional AES-256 for sensitive text

### Row Level Security (RLS)
```sql
-- Users can only read their own data
CREATE POLICY "Users can view own data"
  ON analysis_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "Users can insert own data"
  ON analysis_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "Users can delete own data"
  ON analysis_history
  FOR DELETE
  USING (auth.uid() = user_id);
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI (Optional)
OPENAI_API_KEY=sk-...

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

---

## Middleware

### Authentication Middleware
```typescript
// middleware/auth.ts
export async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('sb-access-token');
  
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(token.value);
  
  if (error || !user) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  return user;
}
```

### Rate Limiting Middleware
```typescript
// middleware/rateLimit.ts
const rateLimit = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string, max = 100, windowMs = 900000) {
  const now = Date.now();
  const record = rateLimit.get(identifier);
  
  if (!record || now > record.resetAt) {
    rateLimit.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (record.count >= max) {
    return false;
  }
  
  record.count++;
  return true;
}
```

---

## Error Handling

### Standard Error Response
```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: number;
}

// Error codes
const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
};
```

---

## Deployment

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### Supabase Setup
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize project
supabase init

# Link to remote project
supabase link --project-ref your-project-ref

# Push database schema
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > lib/database.types.ts
```

---

## Monitoring & Logging

### Metrics to Track
- API response times
- Error rates by endpoint
- Authentication success/failure rates
- Database query performance
- Rate limit hits

### Tools
- **Logging**: Vercel Logs / Datadog
- **Monitoring**: Vercel Analytics
- **Error Tracking**: Sentry
- **Database**: Supabase Dashboard

---

## Scalability Considerations

### Horizontal Scaling
- Serverless functions auto-scale
- Database connection pooling (Supabase)
- CDN for static assets (Vercel Edge)

### Caching Strategy
- Client-side: React Query / SWR
- Server-side: Redis (future)
- Database: Materialized views for analytics

### Performance Optimization
- Database indexes on frequently queried columns
- Pagination for large result sets
- Lazy loading for analysis history
- Debounced API calls

---

**Status**: Design Complete  
**Next Steps**: Implementation  
**Estimated Time**: 4-6 hours
