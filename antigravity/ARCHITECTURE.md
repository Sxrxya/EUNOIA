# Antigravity Architecture

## System Overview

Antigravity is a full-stack web application that analyzes cognitive load and provides intelligent simplification. The system consists of three main layers:

1. **Frontend**: Next.js application with real-time UI
2. **AI Engine**: Python-based cognitive analysis
3. **Backend**: Firebase/Supabase for data persistence (future)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Input Canvas │  │ Gravity      │  │ Lifted View  │      │
│  │              │  │ Meter        │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Next Light   │  │ Focus Mode   │                        │
│  │ Action       │  │              │                        │
│  └──────────────┘  └──────────────┘                        │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              AI ENGINE (Python/TypeScript)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Cognitive Gravity Scorer                            │  │
│  │  - Complexity Analysis                               │  │
│  │  - Emotion Detection                                 │  │
│  │  - Task Counting                                     │  │
│  │  - Ambiguity Detection                               │  │
│  │  - Repetition Analysis                               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Text Simplifier                                     │  │
│  │  - Filler Removal                                    │  │
│  │  - Phrase Simplification                             │  │
│  │  - Redundancy Elimination                            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Next Action Extractor                               │  │
│  │  - Action Verb Detection                             │  │
│  │  - Priority Assignment                               │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Firebase - Future)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth         │  │ Firestore    │  │ Cloud        │      │
│  │ (Email/      │  │ (Encrypted   │  │ Functions    │      │
│  │  Google)     │  │  Storage)    │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Components

#### 1. **InputCanvas**
- **Purpose**: Distraction-free input area
- **State**: Text value, focus state
- **Features**:
  - Auto-expanding textarea
  - Word/character count
  - Focus animations
  - Analyze trigger

#### 2. **GravityMeter**
- **Purpose**: Visual cognitive load indicator
- **State**: Gravity score, breakdown
- **Features**:
  - Animated circular progress (0-100)
  - Color-coded levels (green/yellow/red)
  - Detailed breakdown bars
  - Smooth transitions

#### 3. **LiftedView**
- **Purpose**: Display simplified content
- **State**: Original vs simplified text
- **Features**:
  - Before/after comparison
  - Reduction percentage
  - Change log (removed/simplified/reordered)
  - Copy to clipboard

#### 4. **NextLightAction**
- **Purpose**: Single recommended action
- **State**: Action object
- **Features**:
  - Priority indicator
  - Estimated time
  - Accept/defer buttons
  - Reasoning display

#### 5. **FocusMode** (Future)
- **Purpose**: Distraction-free overlay
- **Features**:
  - Fullscreen mode
  - Keyboard shortcuts
  - Minimal UI
  - Zen experience

---

## Data Flow

### Analysis Pipeline

```
User Input
    ↓
[InputCanvas] → Text State
    ↓
[Analyze Button Click]
    ↓
[analyzeText() function]
    ↓
┌─────────────────────────────────┐
│ 1. Calculate Gravity Score      │
│    - Parse sentences/words      │
│    - Score 5 dimensions         │
│    - Weight & combine           │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ 2. Simplify Text                │
│    - Remove fillers             │
│    - Replace verbose phrases    │
│    - Calculate reduction        │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ 3. Extract Next Action          │
│    - Find action verbs          │
│    - Determine priority         │
│    - Generate reasoning         │
└─────────────────────────────────┘
    ↓
[AnalysisResult Object]
    ↓
[Update UI Components]
    ↓
┌──────────┬──────────┬──────────┐
│ Gravity  │ Lifted   │ Next     │
│ Meter    │ View     │ Action   │
└──────────┴──────────┴──────────┘
```

---

## Cognitive Gravity Algorithm

### Scoring Dimensions

#### 1. **Complexity Score** (25% weight)
```typescript
avgWordsPerSentence = totalWords / totalSentences
complexityScore = min(100, (avgWordsPerSentence / 20) * 100)
```

**Rationale**: Longer sentences = higher cognitive load

#### 2. **Emotion Score** (20% weight)
```typescript
stressKeywords = ['urgent', 'asap', 'stressed', 'overwhelmed', ...]
emotionScore = min(100, (matchCount / 3) * 100)
```

**Rationale**: Emotional language indicates mental strain

#### 3. **Task Count Score** (25% weight)
```typescript
taskIndicators = count('need to', 'must', 'should', ...)
bulletPoints = count('^[-*•]')
taskScore = min(100, (totalTasks / 10) * 100)
```

**Rationale**: More tasks = more mental juggling

#### 4. **Ambiguity Score** (15% weight)
```typescript
vagueWords = ['maybe', 'perhaps', 'unclear', ...]
questions = count('?')
ambiguityScore = min(100, ((vagueWords + questions) / 5) * 100)
```

**Rationale**: Uncertainty increases cognitive load

#### 5. **Repetition Score** (15% weight)
```typescript
repeatedWords = count(word appears > 2 times)
repetitionScore = min(100, (repeatedWords / 5) * 100)
```

**Rationale**: Redundancy wastes mental energy

### Final Score Calculation

```typescript
overall = round(
  complexity * 0.25 +
  emotion * 0.20 +
  taskCount * 0.25 +
  ambiguity * 0.15 +
  repetition * 0.15
)

level = overall < 33 ? 'light' : 
        overall < 66 ? 'medium' : 'heavy'
```

---

## Text Simplification

### Strategies

1. **Filler Removal**
   - Remove: basically, actually, literally, just, really, very
   - Impact: ~5-10% reduction

2. **Phrase Simplification**
   - "in order to" → "to"
   - "due to the fact that" → "because"
   - "at this point in time" → "now"
   - Impact: ~10-20% reduction

3. **Whitespace Cleanup**
   - Normalize multiple spaces
   - Trim leading/trailing whitespace

### Change Tracking

Each modification is logged:
```typescript
{
  type: 'removed' | 'simplified' | 'reordered',
  description: 'Human-readable explanation'
}
```

---

## API Specification

### Frontend API (TypeScript)

```typescript
// Main analysis function
function analyzeText(text: string): AnalysisResult

// Types
interface AnalysisResult {
  gravityScore: GravityScore;
  simplified: SimplifiedContent;
  nextAction: NextAction;
  timestamp: number;
}
```

### Backend API (Python - Future)

```python
POST /analyze
Request:
{
  "text": "User input text"
}

Response:
{
  "gravity_score": {
    "overall": 75,
    "breakdown": {...},
    "level": "heavy"
  },
  "simplified": {
    "original": "...",
    "simplified": "...",
    "reduction_percentage": 15,
    "changes": [...]
  },
  "next_action": {
    "action": "...",
    "reasoning": "...",
    "estimated_time": "5-15 min",
    "priority": "high"
  },
  "timestamp": 1703001234567
}
```

---

## Security Model

### Current (MVP)
- Client-side processing only
- No data persistence
- No authentication required

### Future (Production)
- **Authentication**: Firebase Auth (Email + Google OAuth)
- **Encryption**: AES-256 for user data at rest
- **Transport**: TLS 1.3 for all API calls
- **Privacy**: User data never used for training
- **GDPR**: Right to deletion, data export

---

## Performance Considerations

### Frontend
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Animation**: 60fps (Framer Motion)

### AI Engine
- **Analysis Time**: < 100ms (client-side)
- **API Response**: < 500ms (with backend)
- **Scalability**: Stateless, horizontally scalable

---

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy --prod
```

### AI Backend (Docker)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Monitoring & Analytics

### Metrics to Track
- Average gravity score per session
- Simplification effectiveness (reduction %)
- User engagement (analyze clicks)
- Component render times
- API latency (when backend is added)

### Tools
- **Frontend**: Vercel Analytics
- **Backend**: Prometheus + Grafana
- **Errors**: Sentry
- **Logs**: CloudWatch / Datadog

---

## Future Enhancements

### 1. **Machine Learning**
- Train on user feedback
- Personalized simplification
- Context-aware recommendations

### 2. **Integrations**
- Slack bot
- Chrome extension
- VS Code plugin
- Email client integration

### 3. **Advanced Features**
- Voice input/output
- Multi-language support
- Team collaboration
- Cognitive load trends over time

---

## Technical Debt & Known Issues

1. **No backend persistence** - All data is ephemeral
2. **Client-side only** - No server-side rendering for analysis
3. **Limited NLP** - Rule-based, not ML-powered
4. **No authentication** - Public access only
5. **No mobile optimization** - Desktop-first design

These will be addressed in future phases.

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Maintainer**: Antigravity Team
