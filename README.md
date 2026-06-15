# PropFlow — The Operating System for Property Brokers

> **AI-powered document workflow platform for Indian real estate brokers.**
> Investor demo — frontend concept.

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-000000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-0055FF?logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## The Problem

Property brokers in India lose deals, waste time, and create registration delays because client documents are scattered across:

- WhatsApp chats
- Gallery folders
- PDFs on phones
- Paper files
- Random Google Drives

**There is no structured workflow, document tracking, automated follow-up, or registration readiness process.**

Brokers manually chase clients for documents, miss critical paperwork on registration day, and lose commissions. The market is crying for a solution.

---

## The Product

PropFlow combines **document management, checklist workflow, AI assistance, WhatsApp automation, and registration preparation** into one seamless platform.

> *"Notion + WhatsApp + Google Drive + AI assistant for property brokers"*

### Core Features

| Feature | Description |
|---|---|
| **📊 Dashboard** | Real-time overview of active deals, pending documents, upcoming registrations, and smart alerts |
| **📁 Deal Management** | Create and manage property deals with auto-generated document checklists and folder structures |
| **✅ Smart Checklists** | Buyer, seller, and property document checklists with status tracking, completion rings, and missing alerts |
| **👤 Client Portal** | WhatsApp-inspired upload UI — clients get a simple link to upload documents directly |
| **🤖 AI Assistant** | Proactive intelligence: detects document types, identifies missing paperwork, flags urgent deadlines |
| **💬 WhatsApp Automation** | Automated document reminders sent directly to clients via WhatsApp |
| **📦 Registration Export** | One-click generation of registration-ready folder packages (Buyer/Seller/Property/Agreements) |
| **💰 Stamp Duty Calculator** | Real-time stamp duty + registration fee calculator based on deal value |
| **🌙 Dark Mode** | Full dark theme support with persistent preference |
| **⌨️ Keyboard Shortcuts** | Power-user shortcuts for fast navigation |

---

## Investor Demo Flow

The demo walks through 7 key moments designed to create "aha" experiences:

```
1. Dashboard     →  Operational infrastructure for brokers
2. Create Deal   →  Magical auto-generated checklist + folders
3. Checklist     →  Core value: complete vs missing document tracking
4. Client Portal →  "Oh wow" moment: simple upload, live updates
5. AI Assistant  →  Proactive intelligence (loan detection, urgency)
6. WhatsApp      →  Automated reminders — integrates broker behavior
7. Export        →  Emotional payoff: one-click registration-ready package
```

---

## Screens

| Screen | Route | Highlights |
|---|---|---|
| **Landing Page** | `/` | Hero with ₹12,500 Cr TAM counter, integration logos, waitlist CTA |
| **Dashboard** | `/app` | AI Priority badges, urgent alerts, animated stat cards, quick actions |
| **Deals List** | `/app/deals` | All deals with progress bars, status badges |
| **Deal Detail** | `/app/deals/[id]` | Registration countdown, document categories, AI panel, stamp duty calculator, WhatsApp preview |
| **Checklist** | `/app/checklist` | Filterable document grid with completion rings, missing alerts |
| **Client Portal** | `/app/client` | WhatsApp-inspired single-deal upload interface with shareable link |
| **WhatsApp Automation** | `/app/whatsapp` | Reminder history, chat previews, bulk scheduling |
| **Analytics** | `/app/analytics` | Bar charts, deal performance, efficiency metrics, revenue projection |
| **Pricing** | `/app/pricing` | 3-tier SaaS plans (₹999 → ₹4,999/mo), annual/monthly toggle, feature comparison |
| **Notifications** | `/app/notifications` | Activity feed with AI insights, document alerts |
| **404** | `/_not-found` | Branded error page with back-to-dashboard link |

---

## UI Components

The design system includes premium, animated components:

- `AnimatedCard` — Fade-in cards with staggered delays
- `StatCard` — Metric display with trend indicators and color themes
- `ProgressRing` — Circular completion visualization
- `StatusBadge` — Color-coded status labels (green/amber/rose/blue)
- `QuickAction` — Action buttons with icons
- `PageHeader` — Consistent page title layout
- `DocumentPreview` — Modal overlay for viewing documents
- `CountdownBar` — Animated registration countdown with urgency states
- `OnboardingWizard` — 3-step broker onboarding with confetti
- `StampDutyCalculator` — Live duty + fee calculator
- `KeyboardShortcutsProvider` — Global shortcut handler

---

## Design System

- **Palette:** White backgrounds, dark text, emerald/green accents, subtle gradients
- **Typography:** Inter (300 → 800 weight), clean SaaS hierarchy
- **Spacing:** Premium whitespace, consistent 4px grid
- **Motion:** Framer Motion for all animations — staggered reveals, spring transitions, page fades
- **Aesthetic:** Inspired by Linear, Notion, Stripe Dashboard, Arc browser

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion 11](https://www.framer.com/motion/) | Animations & transitions |
| [Lucide React](https://lucide.dev) | Icon library |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/pankajjjat/propflow-demo.git
cd propflow-demo

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── app/                # Authenticated app section
│   │   ├── analytics/      # Analytics dashboard
│   │   ├── checklist/      # Document checklist
│   │   ├── client/         # Client upload portal
│   │   ├── deals/          # Deal management
│   │   │   └── [id]/       # Deal detail page
│   │   ├── notifications/  # Notification center
│   │   ├── pricing/        # Pricing page
│   │   ├── whatsapp/       # WhatsApp automation
│   │   ├── layout.tsx      # App layout (sidebar + dark mode)
│   │   └── loading.tsx     # Loading skeleton
│   ├── page.tsx            # Landing page
│   ├── not-found.tsx       # 404 page
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   └── globals.css         # Tailwind v4 + design tokens
├── components/
│   └── ui/                 # Design system components
└── data/
    └── demo-data.ts        # Demo data (deals, clients, documents)
```

---

## Market Opportunity

- **12.5M+** property brokers in India
- **₹12,500 Cr/year** addressable market at ₹999/broker/month
- **70%+** of brokers use WhatsApp as their primary business tool
- **Zero** dedicated document workflow tools for the Indian broker market

---

## Roadmap

- [ ] **DigiLocker Integration** — Direct Aadhaar/PAN verification
- [ ] **e-Signature** — Digital signing within the platform
- [ ] **Sub-Registrar Appointment Booking** — Schedule registration slots
- [ ] **Multi-language Support** — Hindi, Marathi, Bengali, Tamil
- [ ] **Team Management** — Multi-user brokerages with role-based access
- [ ] **Mobile App** — React Native companion app
- [ ] **Payment Gateway** — In-platform fee collection

---

## License

MIT

---

## About

Built as an investor demo for PropFlow — an AI-powered property document workflow platform for Indian real estate brokers.

**Pankaj Jha** — [GitHub](https://github.com/pankajjjat)
