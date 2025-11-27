# TISA Brain 🧠

An intelligent command center for TISA International School. Built with React, TypeScript, Three.js, and Claude AI.

## Features

### 🎯 Knowledge Base
The complete TISA Bible containing:
- **9 Marketing Pillars** - Category Creation, Kinder MBA, Selective Admissions, and more
- **Psychology Framework** - Status, Belonging, and Transformation drivers
- **Parent Profiles** - 6 detailed personas with fears, aspirations, and messaging
- **Channel Playbooks** - Instagram, TikTok, YouTube, LinkedIn, Website, In-School
- **Red Button Messages** - Core positioning statements

### ✨ Content Generator
Generate perfectly aligned TISA content:
- **Instagram Posts** - With pillar, profile, and psychology targeting
- **Tour Scripts** - Tailored to specific parent profiles
- **Objection Handlers** - Psychology-backed responses to concerns
- **Document Upgrader** - Rewrite any text in TISA voice
- **Email Composer** - Professional emails with TISA tone

### 💬 Scenario Simulator
Practice difficult conversations with AI roleplay:
- Price objection scenarios
- Dutch language concerns
- Academic rigor questions
- Competitor comparisons
- Demanding parent situations
- Real-time coaching feedback

### 🎨 Visual Design
- Dark theme with gold accents
- Three.js particle background (neural network effect)
- Glass morphism UI elements
- Smooth Framer Motion animations

## Tech Stack

- **React 19** + TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Three.js** + React Three Fiber for 3D effects
- **Framer Motion** for animations
- **Claude API** for AI generation
- **Supabase** for data storage (optional)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project
cd tisa-brain

# Install dependencies
npm install

# Set up environment variables (already configured)
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment to Vercel

1. Push the code to a GitHub repository
2. Connect the repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout, Sidebar
│   ├── three/           # ParticleBackground
│   └── ui/              # Reusable UI components
├── data/
│   └── knowledge.ts     # TISA knowledge base data
├── lib/
│   ├── claude.ts        # Claude AI integration
│   └── supabase.ts      # Supabase client
├── pages/
│   ├── Dashboard.tsx
│   ├── KnowledgeBase.tsx
│   ├── ParentProfiles.tsx
│   ├── ContentGenerator.tsx
│   ├── ScenarioSimulator.tsx
│   └── ...
└── App.tsx
```

## Coming Soon

- Content Calendar with 12-month arc
- Document storage and management
- Generated content history
- Team collaboration features
- Analytics dashboard

---

*Built with ❤️ for TISA International School*

*"The Local International School - Bilingual. Entrepreneurial. Ambitious."*
