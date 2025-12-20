# Antigravity Backend Setup Guide

## Quick Start (Mock Backend - Current)

The application currently works with a **client-side AI engine** (no backend required).

To run:
```bash
cd frontend
npm install
npm run dev
```

---

## Full Backend Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for database to provision

### 2. Run Database Schema

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `backend/schema.sql`
3. Run the SQL script
4. Verify tables are created in Table Editor

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

   Find these in: Supabase Dashboard → Settings → API

### 4. Install Dependencies

```bash
cd frontend
npm install
```

This will install:
- `@supabase/supabase-js` - Supabase client
- All other dependencies

### 5. Run Development Server

```bash
npm run dev
```

---

## Backend Features (When Enabled)

### Authentication
- Email/password signup
- Google OAuth
- Session management
- Protected routes

### Data Persistence
- Save analysis history
- User preferences
- Analytics tracking

### API Routes
- `POST /api/analyze` - Analyze text
- `GET /api/analyze/history` - Get history
- `GET /api/preferences` - Get preferences
- `PUT /api/preferences` - Update preferences

---

## Database Schema

### Tables
1. **profiles** - User profile data
2. **analysis_history** - Saved analyses
3. **user_preferences** - User settings

### Security
- Row Level Security (RLS) enabled
- Users can only access their own data
- Service role key for admin operations

---

## Testing Backend

### 1. Test Health Check
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "service": "Antigravity AI",
  "status": "operational"
}
```

### 2. Test Analysis API
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I need to finish the report today"}'
```

Expected response:
```json
{
  "gravityScore": { ... },
  "simplified": { ... },
  "nextAction": { ... }
}
```

---

## Deployment

### Vercel + Supabase

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Build Next.js app
- Deploy serverless functions
- Configure edge network

---

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Invalid Supabase URL"
- Check `.env.local` has correct URL
- Restart dev server after changing env vars

### "Row Level Security policy violation"
- Ensure user is authenticated
- Check RLS policies in Supabase dashboard

---

## Alternative: Firebase Backend

If you prefer Firebase over Supabase:

1. Create Firebase project
2. Enable Authentication (Email + Google)
3. Create Firestore database
4. Update `backend/firebase.config.ts`
5. Install Firebase SDK:
   ```bash
   npm install firebase
   ```

---

**Current Status**: Mock backend (client-side only)  
**To Enable Full Backend**: Follow Supabase setup above  
**Estimated Setup Time**: 15-30 minutes
