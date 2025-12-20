# Antigravity - Quick Start Guide

## Installation

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Try the Demo

Click the **"Load Demo"** button to see Antigravity in action with sample content.

---

## Optional: Python AI Backend

If you want to run the Python backend (currently the frontend has built-in TypeScript AI):

```bash
cd ai
pip install -r requirements.txt
python api.py
```

The API will run on [http://localhost:8000](http://localhost:8000)

---

## Project Structure

```
antigravity/
├── frontend/              # Next.js application
│   ├── app/              # Pages and layouts
│   ├── components/       # React components
│   ├── lib/              # AI utilities
│   └── package.json
├── ai/                   # Python AI engine
│   ├── gravity_scoring.py
│   ├── simplifier.py
│   ├── api.py
│   └── requirements.txt
├── README.md
└── ARCHITECTURE.md
```

---

## Key Features to Test

1. **Input Canvas**: Paste any text with tasks or problems
2. **Gravity Meter**: Watch the cognitive load score calculate in real-time
3. **Lifted View**: See your text simplified automatically
4. **Next Light Action**: Get one clear recommendation

---

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### TypeScript errors
```bash
npm run type-check
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## Next Steps

- Customize the color scheme in `tailwind.config.ts`
- Add more simplification rules in `lib/antigravity.ts`
- Integrate with OpenAI API for advanced features
- Deploy to Vercel: `vercel deploy`

---

**Need help?** Open an issue or contact hello@antigravity.ai
