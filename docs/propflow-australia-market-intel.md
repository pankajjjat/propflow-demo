# PropFlow — Australian Real Estate Market Intelligence

## 1. THE AUSTRALIAN MARKET STRUCTURE

### Key Facts
- **2 major property portals:** realestate.com.au (REA Group, ASX:REA — monopoly #1, ~70% traffic) and Domain.com.au (Domain Holdings, ASX:DHG)
- **~70,000+ registered real estate agents** across Australia (varies by state license)
- **~15,000 real estate agencies** (offices)
- Market split: **Sales Agents** (sell homes) vs **Property Managers** (manage rentals) — most agencies do both
- Commission model: Agency charges seller **2-3%** of sale price + marketing costs (typically $3K-$10K upfront)
- Auctions are dominant in Sydney & Melbourne (30-40% of sales)

### State-Based Regulation (Critical)
Each state has its own real estate licensing and forms:
| State | Regulator | Key quirk |
|---|---|---|
| NSW | NSW Fair Trading | Cooling-off period, unique contract system |
| VIC | Consumer Affairs VIC | Section 32 vendor statement |
| QLD | QLD Office of Fair Trading | Unique PAMD forms |
| WA | DMIRS | REIWA forms standard |
| SA | CBS SA | Form 1 land information |
| ACT | Access Canberra | Unique leasehold system |

---

## 2. CRMs & APPS AUSTRALIAN AGENTS ACTUALLY USE

### Tier 1: Enterprise Agency Management Suites (The Incumbents)

| Product | Owned By | Market Share | Price | Used By |
|---|---|---|---|---|
| **Reapit** (formerly Agentbox + Console) | Reapit (UK private) | ~40% of top 500 agencies | $100-200/seat/month | Ray White, LJ Hooker, McGrath — the franchises |
| **Rockend / Rest Professional** | Rockend (Aus) | ~25% | $80-150/seat | Harcourts, Raine & Horne, independent |
| **PropertyTree** | Rockend (Aus) | ~15% | $50-100/seat | Mid-size agencies |
| **PropertyMe** | PropertyMe (Aus) | ~10% (35K+ property managers) | $50-100/seat | PM-focused agencies |
| **Console Cloud** (now Reapit PM) | Reapit | ~5% | Custom | Large chains |

**What these do:** Everything — CRM, listings, trust accounting, campaign management, reporting, portal integration. They're heavy. Desktop-first (though have mobile apps). 

**Why agents hate them:**
- Too complex & bloated ("I use 10% of the features")
- Expensive per-seat pricing
- Training burden (high agent turnover)
- Ugly UI — looks like 2010 software
- Locked into contracts (12-24 months)

### Tier 2: Specialized Add-On Tools (that agents ALSO pay for)

| Tool | Category | Function | Price |
|---|---|---|---|
| **ActivePipe** | Email marketing | Automated nurture campaigns, follow-ups | $100-300/month |
| **Little Hinges** | Virtual tours | 3D tours, behavioral analytics | Per-tour pricing |
| **RateMyAgent** | Reputation | Reviews & performance data | Free / premium |
| **Inspect Real Estate** | Inspections | Property inspection management | Per-inspection |
| **SettleIt / PEXA** | Settlement | Electronic conveyancing & settlements | Per-transaction |
| **CoreLogic RP Data** | Data/CMA | Property data, valuations, suburb stats | $2K-5K/year |
| **PriceFinder** | Data | Comparable sales, market analysis | $2K-4K/year |
| **InfoTrack** | Docs/eSign | Electronic signatures, document prep | Per-document |
| **Box & Pitch** | Small agency tools | Basic CRM for individuals | ~$30/month |

### Tier 3: General CRMs That Small Agents Use as Hacks
- **HubSpot (free)** — basic contact management
- **Zoho CRM** — cheap and customizable
- **Google Sheets** — embarrassingly common
- **WhatsApp + iPhone Notes** — for really small operators
- **Trello / Asana** — as pipeline trackers
- **Excel** — still the #1 workflow tool for many

### Tier 4: Tech Stack of a Typical Australian Agency
An average 10-person agency pays for **5-7 different tools**:
```
Reapit (CRM + accounting)    $1,500/month
ActivePipe (email)           $  200/month
CoreLogic (data)             $  300/month
realestate.com.au listing    $  800/month (per listing)
Domain listing               $  500/month (per listing)
PEXA (settlements)           $   50/transaction
Little Hinges (tours)        $  100/month
-------------------------------------------
TOTAL                        ~$3,500/month+ 
```

This is your opening — **agencies are drowning in software costs and complexity.**

---

## 3. HOW PROFFLOW CAN STAND OUT (Differentiation Strategy)

### The Gap in the Australian Market

| What exists | What's missing |
|---|---|
| Expensive all-in-one suites ($100-200/seat) | Affordable workflow tool ($20-40/seat) |
| Desktop-first, heavy interfaces | Mobile-first, intuitive UX |
| Annual contracts with lock-in | Month-to-month, no lock-in |
| Feature-bloated (100+ features, uses 10) | Focused workflow-only tool |
| Database-centered (contact storage) | Process-centered (pipeline steps) |
| Generic CRM | Property-specific workflow |
| Sales OR property management | Small agency does BOTH |

### 7 Concrete Differentiation Angles for Australia

**A) "The Anti-Reapit" — Simple & Affordable**
- Position as "Reapit alternatives for human beings"  
- $29-49/month per agent vs $100-200/month
- Clean, modern interface (like Stripe/Linear vs SAP)
- 5-minute onboarding vs 2-day training
- Target: agents who hate their current software

**B) Sales Workflow Focused (Not Database)**
- Every existing tool is a contact database with a pipeline view grafted on
- PropFlow = process-first: Lead Capture → Appraisal → Listing → Marketing Campaign → Inspections → Offers → Auction → Settlement → Referral
- Pre-built workflows for each stage with state-specific compliance checklists
- This doesn't exist in Australia right now

**C) Auction & Campaign Tracking (Australia-Specific)**
- Unique to Australia: auctions are the dominant sales method in Sydney/Melbourne
- **Auction module:** Bidder registration, pre-auction offers, auction day check-in, underbidder follow-up, passed-in management
- No existing CRM has this done well
- **Marketing campaign tracker:** What goes to print, when does it go live, budget tracking, open home stats
- This alone is a wedge into any agency

**D) Mobile-First (Australian Agent Pain Point)**
- Agents spend 70% of time out of office: open homes, appraisals, meetings
- Existing apps (Reapit, PropertyMe) have mobile companions but they're clunky
- PropFlow as a truly mobile-first workflow tool (PWA / React Native)
- Offline mode for regional areas with poor coverage
- Voice notes → auto-populate CRM fields (AI dictation)

**E) Compliance Automation**
- Each state has different forms, cooling-off periods, and disclosure requirements
- PropFlow that auto-detects the state from the property address and shows the correct workflow (NSW vs VIC vs QLD) = huge value
- E-sign built in (instead of needing InfoTrack or DocuSign separately)
- Audit trail for every action (required for license compliance)

**F) Single-Agent / Boutique Agency Focus**
- 40% of Australian agents are solo operators or 2-3 person teams
- They can't afford Reapit ($1,200+/year) and don't need it
- They're using Excel + WhatsApp + Google Calendar
- PropFlow as "your entire real estate business in one app" for $30/month
- No contract, cancel anytime

**G) Integrated Communications + Pipeline Together**
- Currently agents use: CRM + multiple portals + WhatsApp + phone + email + SMS
- PropFlow that unifies: Enquiry → SMS/email auto-reply → inspection booking → offer negotiation → settlement tracking
- WhatsApp integration is MASSIVE — Australian agents live on WhatsApp groups (vendor chats, buyer chats, colleague groups)

---

## 4. TARGET SEGMENTS IN AUSTRALIA (Ranked by PropFlow Fit)

### Best First: Small Independent Agencies (1-5 agents)
- **Count:** ~6,000 agencies
- **Current setup:** Excel, WhatsApp, maybe HubSpot free
- **Pain:** Too expensive for Reapit, too complex for what they need
- **PropFlow pitch:** "Run your entire agency for the price of a coffee a day"
- **Price:** $29-39/month per agent
- **Go-to-market:** Direct outreach, Facebook groups (Australian RE agent groups), REI association newsletters

### Second: Boutique Premium Agencies (2-10 agents)
- **Count:** ~2,000 agencies
- **Current setup:** PropertyTree or PropertyMe, often unhappy
- **Pain:** Paying for features they don't use, stuck in contracts
- **PropFlow pitch:** "Premium feel, nimble tool, your clients will love the experience"
- **Price:** $49-79/month per agent
- **Go-to-market:** Targeted demos, comparisons to Reapit, free migration

### Third: Franchise Network Branches (Satellite offices)
- **Count:** ~5,000 branch offices
- **Current setup:** Forced to use franchise standard (Reapit/Rockend) but branch principal wants more
- **Pain:** Corporate software is slow, branch wants flexibility
- **PropFlow pitch:** "Side workflow tool for deal management — plug into your existing systems"
- **Price:** $99/month per branch
- **Go-to-market:** Branch principal outreach, REB (Real Estate Business) magazine ads

### Fourth: Buyer's Agents (Growing segment)
- **Count:** ~1,000+ across Australia
- **Current setup:** Often no CRM at all or generic CRMs
- **Pain:** Need pipeline for buyer leads, property search tracking, inspection management
- **PropFlow pitch:** "Designed for buyer advocacy workflows"
- **Price:** $39/month
- **Go-to-market:** Buyers Agents Association (BAA), social media

---

## 5. TOP 20 AUSTRALIAN AGENCIES TO TARGET (Small/Mid Sweet Spot)

These are real agencies where a $30-50/month PropFlow would be a no-brainer:

| Agency | State | Agents | Current Software (Likely) |
|---|---|---|---|
| **Ray White (banner group - target branches)** | National | 5-20/branch | Reapit (but branch-level decisions for add-ons) |
| **McGrath Estate Agents (boutique branches)** | NSW/QLD | 3-15/branch | Reapit + ActivePipe |
| **Belle Property (premium boutique)** | National | 5-20/branch | Reapit |
| **First National Real Estate (local offices)** | National | 2-10/branch | Rockend/PropertyTree |
| **Professionals Real Estate (local offices)** | QLD/NSW | 2-8/branch | PropertyTree |
| **Raine & Horne (local branches)** | National | 3-15/branch | Rockend |
| **Place Estate Agents** | QLD | 5-20 | Custom/Reapit |
| **One Agency** | National | 1-5 each | None/Excel |
| **LJ Hooker (banner - target independents)** | National | 2-10/branch | Reapit |
| **Harcourts (target smaller offices)** | VIC/SA/WA | 3-12/branch | Rockend |
| **Upside Realty** | National (online) | Agents work remotely | Their own platform |
| **Independent agencies in suburbs** | All states | 1-5 agents | Excel/WhatsApp |
| **Eview Group** | VIC | 5-15/branch | Mixed |
| **Barry Plant** | VIC | 5-20/branch | Reapit |
| **Stockdale & Leggo** | VIC | 3-10/branch | PropertyTree |
| **PRD Nationwide** | National | 3-15/branch | Mixed |
| **Century 21 (target smaller franchises)** | National | 2-8/branch | Mixed |
| **Elders Real Estate** | SA/Regional | 3-10/branch | Rockend |
| **Laing+Simmons** | NSW | 3-10/branch | Reapit |
| **Richardson & Wrench** | NSW | 2-8/branch | Mixed |

---

## 6. HOW TO ENTER THE AUSTRALIAN MARKET

### Distribution Channels
1. **REI Associations (each state)** — Real Estate Institute of NSW, REIV (VIC), REIQ, REIWA, REISA, REINT. Partner for "Software of the Year" or vendor directory inclusion
2. **RateMyAgent** — Advertise to agents based on review volume
3. **Real Estate Business (REB)** magazine — Industry trade publication
4. **Australian Proptech Association** — Network events
5. **Social: Facebook "Real Estate Agents Australia" groups** — ~50K+ members across groups
6. **Partner with training providers** — REA (Real Estate Australia) training, TAFE RE courses new agents are looking for tools
7. **Property portals** — Partner program with realestate.com.au (REA Group has an integration marketplace for third-party tools)

### Pricing Strategy for Australia
```
Freemium (1 agent, 5 properties)     $0
Solo Plan (1 agent, unlimited)       $29/month
Team Plan (2-5 agents)                $49/agent/month
Agency Plan (6-20 agents)             $39/agent/month
Enterprise (custom)                   Custom quote
```

### Critical Integrations Needed for Australia
| Integration | Priority | Why |
|---|---|---|
| **realestate.com.au** | P0 | #1 portal, agents need listings to sync |
| **Domain.com.au** | P0 | #2 portal, same reason |
| **PEXA** | P0 | Electronic settlements — compliance |
| **CoreLogic RP Data** | P1 | CMA/appraisals need property data |
| **DocuSign / InfoTrack** | P1 | E-signatures for contracts |
| **Xero / MYOB** | P1 | Trust accounting integration |
| **ActivePipe** | P2 | Email marketing export |
| **Google Calendar** | P0 | Open homes & inspections |
| **WhatsApp API** | P0 | Agent communication backbone |

### Compliance Requirements to Operate in Australia
- **Privacy Act 1988** — Consumer data, sensitive info
- **Spam Act 2003** — Email marketing compliance
- **State RE forms** — Must understand each state's required forms
- **Australian Financial Services License?** — Only if handling deposits
- Consider: **Host data in Australia** (AWS Sydney) — agents care about this

---

## 7. COMPETITOR LANDSCAPE SUMMARY

```
                    COMPLEXITY →
                    Low                    Medium              High
                   ┌──────────────────────────────────────────────────┐
  Price ▲          │                                                   │
                   │                                                   │
  $200-400/mo     │                     ┌─ Reapit (Sales CRM)         │
                   │                     │  Rockend (Rest Pro)         │
  $100-200/mo     │                     │  Console / PropertyMe       │
                   │                     │  PropertyTree              │
  $50-100/mo       │  Box & Pitch       │                             │
                   │                    ─┤                             │
  $20-50/mo        │  ★ PROFFLOW ★       │                             │
                   │  (sweet spot gap)  │                             │
  $0-20/mo         │  HubSpot Free      │                             │
                   │  Excel / Sheets     │                             │
                   └──────────────────────────────────────────────────┘
```

**Key insight:** The gap between "too basic" (Excel/Box&Pitch) and "too expensive/complex" (Reapit/Rockend) is where PropFlow can win. ~40% of Australian agencies sit in this middle zone and are underserved.

---

## 8. MARKET SIZING

| Segment | Agencies | Agents | Est. Annual TAM |
|---|---|---|---|
| Solo agents (1 person) | 6,000 | 6,000 | $2.1M (@$29/mo) |
| Small teams (2-5) | 4,000 | 14,000 | $8.2M (@$49/mo) |
| Mid agencies (6-20) | 3,000 | 27,000 | $15.7M (@$49/mo) |
| **Total addressable** | **13,000** | **47,000 agents** | **~$26M/year** |

This is just the small-to-mid segment. Even capturing 5% = $1.3M ARR.

---

*Generated: June 21, 2026 — based on market research from REA Group, Reapit, PropertyMe, Capterra AU, and industry analysis*
