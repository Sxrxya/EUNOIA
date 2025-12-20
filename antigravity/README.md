# 🚀 Antigravity Workspace

> **AI that makes thinking feel lighter**

Antigravity is an AI-powered cognitive load reducer that detects mental heaviness and actively simplifies information instead of adding more. Unlike traditional AI that provides answers, Antigravity removes friction.

![Antigravity Demo](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Python](https://img.shields.io/badge/Python-3.11+-green)

---

## 🧠 The Problem

Modern knowledge workers face **cognitive overload**:
- Too many tasks competing for attention
- Complex information causing decision paralysis
- Emotional stress from urgency and ambiguity
- Mental exhaustion from context switching

Traditional productivity tools add more features, more notifications, more complexity. **They make the problem worse.**

---

## ✨ The Solution

**Antigravity AI** is an intelligence layer that:

1. **Detects** cognitive gravity (mental weight) in your thoughts and tasks
2. **Analyzes** complexity, emotional intensity, task count, ambiguity, and repetition
3. **Simplifies** by removing filler, reducing verbosity, and clarifying intent
4. **Recommends** the single lightest next action to build momentum

### What Makes Antigravity Different

| Traditional AI | Antigravity AI |
|---------------|----------------|
| Adds more information | **Removes cognitive friction** |
| Generates long responses | **Compresses to essentials** |
| Overwhelming options | **One clear next step** |
| Reactive | **Proactive stress detection** |

---

## 🎯 Core Features

### 1. **Cognitive Gravity Score** (0-100)
Real-time analysis of mental weight based on:
- **Sentence Complexity**: Word count, nested clauses
- **Emotional Intensity**: Stress keywords, urgency markers
- **Task Count**: Action items, obligations
- **Ambiguity**: Vague language, questions
- **Repetition**: Redundant information

### 2. **AI Lifted View**
Automatically simplified version of your input:
- Removes filler words
- Shortens verbose phrases
- Eliminates redundancy
- Shows before/after comparison

### 3. **Next Light Action**
Single, actionable recommendation:
- One clear step (not a list)
- Estimated time
- Priority level
- Reasoning

### 4. **Calm Design**
Stress-reducing UI/UX:
- Soft gradients and minimal clutter
- Smooth animations (Framer Motion)
- Glass morphism effects
- Zero cognitive overhead

---

## 🏗️ Architecture

```
antigravity/
├── frontend/          # Next.js 14 + TypeScript + TailwindCSS
│   ├── app/          # App router pages
│   ├── components/   # React components
│   └── lib/          # Utilities & AI logic
├── ai/               # Python AI engine
│   ├── gravity_scoring.py  # Cognitive load calculator
│   ├── simplifier.py       # Text simplification
│   └── api.py             # FastAPI service
└── backend/          # Firebase/Supabase (future)
```

### Technology Stack

**Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

**AI Engine**
- **Language**: Python 3.11+
- **API**: FastAPI
- **NLP**: Custom rule-based + regex
- **Optional**: OpenAI API for advanced simplification

**Backend** (Future)
- **Auth**: Firebase Authentication
- **Database**: Firestore
- **Storage**: Encrypted user data

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (for AI backend)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### AI Backend Setup (Optional)

```bash
cd ai
pip install -r requirements.txt
python api.py
```

API runs on [http://localhost:8000](http://localhost:8000)

### Demo Mode

1. Click **"Load Demo"** button
2. See cognitive gravity analysis in real-time
3. View simplified content and next action
4. Experience the stress-reducing UI

---

## 📊 Use Cases

### 1. **Overwhelmed Professionals**
*"I have 20 emails, 3 meetings, and 5 deadlines. Where do I start?"*

→ Antigravity identifies the highest-priority action and filters out noise.

### 2. **Decision Paralysis**
*"Should I work on A, B, or C? Maybe D? I'm not sure..."*

→ Reduces ambiguity and recommends one clear path forward.

### 3. **Stress Management**
*"Everything feels urgent and I'm anxious about missing deadlines."*

→ Detects emotional intensity and provides calming, actionable guidance.

### 4. **Content Simplification**
*"This report is too complex. How do I make it clearer?"*

→ Automatically removes jargon, filler, and redundancy.

---

## 🎨 Design Philosophy

### Calm > Flashy
Every pixel reduces stress, not increases it.

### Clarity > Features
One perfect action beats ten mediocre options.

### Invisible Intelligence
AI works in the background unless needed.

### Human-Centered
Built for people, not metrics.

---

## 🔬 Cognitive Gravity Algorithm

The scoring system analyzes five dimensions:

```python
overall_score = (
    complexity * 0.25 +      # Sentence length, nested clauses
    emotion * 0.20 +         # Stress keywords, urgency
    task_count * 0.25 +      # Number of action items
    ambiguity * 0.15 +       # Vague language, questions
    repetition * 0.15        # Redundant information
)
```

**Levels:**
- **0-32**: Light (green) - Clear and manageable
- **33-65**: Medium (yellow) - Some complexity
- **66-100**: Heavy (red) - High cognitive load

---

## 📈 Roadmap

### Phase 1: Core MVP ✅
- [x] Cognitive gravity scoring
- [x] Text simplification
- [x] Next action extraction
- [x] Production-ready UI

### Phase 2: Intelligence (Q1 2026)
- [ ] OpenAI integration for advanced simplification
- [ ] Learning from user preferences
- [ ] Multi-language support
- [ ] Voice input

### Phase 3: Collaboration (Q2 2026)
- [ ] Team workspaces
- [ ] Shared cognitive load tracking
- [ ] Real-time collaboration
- [ ] Slack/Teams integration

### Phase 4: Scale (Q3 2026)
- [ ] Mobile apps (iOS/Android)
- [ ] Browser extension
- [ ] API for third-party integrations
- [ ] Enterprise features

---

## 🧪 Testing

```bash
# Frontend type checking
cd frontend
npm run type-check

# Frontend build
npm run build

# Python tests
cd ai
python -m pytest tests/
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🌟 Why Antigravity?

In physics, antigravity is a hypothetical force that counteracts gravity. In productivity, **Antigravity AI counteracts cognitive gravity**—the mental weight that slows us down.

We believe the future of AI isn't about doing more. It's about **thinking lighter**.

---

## 📞 Contact

- **Website**: [antigravity.ai](https://antigravity.ai) (coming soon)
- **Email**: hello@antigravity.ai
- **Twitter**: [@antigravityai](https://twitter.com/antigravityai)

---

**Built with ❤️ by humans who believe AI should reduce stress, not create it.**
