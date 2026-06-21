# PropFlow — Complete Vibe Coding Playbook

> **For Hermes Agent:** This is the master execution plan for building PropFlow end-to-end.
> Every phase contains executable prompts, security guidelines, and verification steps.
> No developers needed — just this playbook + Hermes Agent + vibe coding.

**Goal:** Build PropFlow from a pure frontend demo into a full-stack AI-powered SaaS monopoly for Indian property brokers, using only AI coding agents (no hired developers).

**Core Principle:** Each task is designed as a self-contained prompt you can give Hermes Agent. Copy-paste the prompt, let the agent build it, verify, commit, repeat.

**Architecture:**
- **Frontend:** Next.js 16 (App Router) + Tailwind v4 + Framer Motion (already done)
- **Backend:** Next.js API routes (keep monolith for initial phases)
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **ORM:** Prisma (type-safe, great DX)
- **AI/OCR:** Google Document AI + custom fine-tuning
- **WhatsApp:** Meta WABA + Business API
- **Payments:** Razorpay
- **File Storage:** Cloudflare R2 (cheap, S3-compatible)
- **Background Jobs:** Inngest (free tier)
- **Monitoring:** Sentry (free tier)

**Workflow for Every Task:**
1. Copy the prompt → paste to Hermes
2. Let it build and test
3. Verify the result
4. `git add . && git commit -m "descriptive message"`
5. Push to GitHub
6. Vercel auto-deploys

**Security Golden Rules (apply to ALL tasks):**
- NEVER commit API keys, secrets, or credentials to git
- Use Vercel environment variables + `.env.local` (gitignored)
- All API routes must validate input (Zod schemas)
- Row Level Security (RLS) on ALL Supabase tables
- Rate limit exposed endpoints
- HTTPS only (Vercel default)
- Sanitize file uploads (type/size checks)
- Use prepared statements / Prisma (never raw SQL with string interpolation)

---

## TABLE OF CONTENTS

1. [Phase 0: Foundation Setup](#phase-0-foundation-setup)
2. [Phase A: Production Core (Weeks 1-4)](#phase-a-production-core)
   - A1: Supabase + Prisma + Auth
   - A2: Real Deal CRUD (replace demo data)
   - A3: Real File Upload
   - A4: Real Client Portal
   - A5: WhatsApp Business API
   - A6: Document AI OCR
   - A7: Commission Calculator + Lead Management
3. [Phase B: Scale (Months 2-3)](#phase-b-scale)
   - B1: Multi-user / Team Roles
   - B2: Subscription Payments (Razorpay)
   - B3: In-app Fee Collection
   - B4: Regional Language Support
   - B5: Real-time Notifications
   - B6: Property Listing View
4. [Phase C: Moats (Months 3-6)](#phase-c-moats)
   - C1: WhatsApp-Native Deal Workflow
   - C2: E-Sign Integration
   - C3: Registration Folder Export
   - C4: Client PWA
   - C5: Advanced AI
   - C6: Real Analytics
5. [Phase D: Dominance (Months 6-12)](#phase-d-dominance)
   - D1: Deal Directory / Market Data
   - D2: Verified Document Templates
   - D3: Broker Community
   - D4: Client App
   - D5: Referral Program
   - D6: All-State Registration Templates
   - D7: Strategic Partnerships
6. [Security Architecture (Cross-Cutting)](#security-architecture)
7. [Vibe Coding Tips & Troubleshooting](#vibe-coding-tips)

---

## PHASE 0: FOUNDATION SETUP

### Task 0.1: Environment Setup

**Files:** `.env.local`, `.gitignore`, `package.json` updates

**Prompt for Hermes:**

```
Set up the production environment foundation for propflow-demo at C:\Users\panka\propflow-demo:

1. Create .env.local with these template vars (empty — I'll fill secrets):
   DATABASE_URL=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   S3_ACCESS_KEY_ID=
   S3_SECRET_ACCESS_KEY=
   S3_BUCKET_NAME=propflow-docs
   S3_ENDPOINT=https://<account>.r2.cloudflarestorage.com
   WABA_PHONE_NUMBER_ID=
   WABA_ACCESS_TOKEN=
   WABA_WEBHOOK_VERIFY_TOKEN=
   GOOGLE_CLOUD_VISION_API_KEY=
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=
   INNGEST_EVENT_KEY=
   INNGEST_SIGNING_KEY=
   SENTRY_DSN=
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_RAZORPAY_KEY_ID=

2. Update .gitignore to add: .env.local, .vercel, .next, *.log

3. Install additional dependencies:
   npm install @prisma/client @supabase/supabase-js zod nanoid sharp
   npm install -D prisma @types/nodemailer

4. Create directory structure:
   src/lib/          (shared utilities)
   src/lib/db/       (database client)
   src/lib/validators/ (Zod schemas)
   src/lib/api/      (API route helpers)
   src/app/api/      (API routes)
   src/app/api/deals/
   src/app/api/documents/
   src/app/api/upload/
   src/app/api/webhooks/
   prisma/           (Prisma schema + migrations)

5. Initialize Prisma:
   npx prisma init

6. Verify: `npm run dev` still works, no errors.

Do NOT start building any features — just the foundation scaffold.
```

**Verify:** `npm run dev` starts without errors, `.env.local` exists and is gitignored, `prisma/` directory exists.

---

### Task 0.2: Supabase Project Setup

**Prompt for Hermes:**

```
I need to set up a Supabase project for PropFlow. Guide me through:

1. Go to https://supabase.com and create a new project called "propflow"
   - Choose the free tier
   - Region: Mumbai (ap-south-1) — closest to Indian users
   - Database password: [create strong password, save in .env.local]

2. After creation, go to Project Settings → API and copy:
   - Project URL → NEXT_PUBLIC_SUPABASE_URL
   - anon public key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - service_role key → SUPABASE_SERVICE_ROLE_KEY
   Save all to .env.local

3. Enable Row Level Security (RLS) from Authentication → Settings

4. Go to Storage → Create bucket "propflow-docs" (public for uploads, RLS-protected)

5. Create a test query in SQL Editor to verify connection:
   SELECT current_database(), current_schema(), version();

Take screenshots of each step. Do NOT run any schema yet — that comes after Prisma.
```

**Verify:** Supabase project is created, keys are in `.env.local`, Storage bucket exists.

---

### Task 0.3: Prisma Schema — Full Database Design

**Files:** `prisma/schema.prisma`

**Prompt for Hermes:**

```
Design and write the COMPLETE Prisma schema for PropFlow at C:\Users\panka\propflow-demo\prisma\schema.prisma.

Requirements:
- PostgreSQL database
- All entities needed for a production property broker workflow platform
- Proper relations, indexes, and constraints
- Use UUIDs for all IDs
- Include timestamp fields (createdAt, updatedAt) on all models
- Include soft-delete where appropriate

Models needed:

1. Organization (brokerage firm)
   - id, name, slug, email, phone, address, gstin, logo, trialEndsAt, subscriptionStatus (FREE|PRO|TEAM), subscriptionId, createdAt, updatedAt

2. User
   - id, organizationId (relation), email, phone, name, role (ADMIN|AGENT|OWNER), avatar, passwordHash, isActive, lastLoginAt, createdAt, updatedAt
   - Unique on email per organization

3. Deal
   - id, organizationId, title, dealType (SALE|RENTAL|LEASE), propertyType, location, dealValue, registrationDate, status (DRAFT|ACTIVE|URGENT|COMPLETED|CANCELLED), completion, notes, createdAt, updatedAt, createdById (user)

4. DealParty (buyer/seller)
   - id, dealId, type (BUYER|SELLER), name, phone, email, address, notes

5. Document
   - id, dealId, partyId (nullable — which party this doc belongs to), category (BUYER|SELLER|PROPERTY), name, fileKey (S3/R2 path), fileSize, mimeType, status (PENDING|UPLOADED|VERIFIED|FLAGGED), aiVerified (boolean), aiData (JSON — extracted fields from OCR), uploadedById (user — who uploaded on broker side), uploadedByClient (boolean), uploadedAt, notes, createdAt, updatedAt

6. DocumentChecklist (template items)
   - id, organizationId (nullable — custom templates), category, name, isRequired, sortOrder, createdAt

7. DocumentChecklistItem (per-deal checklist instance)
   - id, dealId, checklistId (reference to DocumentChecklist), documentId (nullable — linked after upload), status (PENDING|COMPLETE|MISSING|AI_DETECTED), notes

8. Reminder
   - id, dealId, partyId (to whom), message, status (SENT|SCHEDULED|FAILED|DELIVERED), channel (WHATSAPP|EMAIL|SMS), providerMessageId, sentAt, scheduledAt, createdAt

9. ActivityLog
   - id, dealId, userId, action, detail, type (UPLOAD|REMINDER|CHECK|UPDATE|AI|EXPORT), metadata (JSON), createdAt

10. AIInsight
    - id, dealId, type (ALERT|DETECTION|ACTION|SUGGESTION|MILESTONE), title, message, severity (HIGH|MEDIUM|LOW|INFO), isRead, createdAt

11. Notification
    - id, userId, title, message, type, isRead, link (nullable — deep link to relevant page), createdAt

12. Lead
    - id, organizationId, name, phone, email, propertyRequirement, budget, source, status (NEW|CONTACTED|SITE_VISIT|OFFER|CONVERTED|LOST), assignedToId (user), notes, createdAt, updatedAt

13. Subscription
    - id, organizationId, plan (FREE|PRO|TEAM), razorpaySubscriptionId, status (ACTIVE|PAUSED|CANCELLED|EXPIRED), currentPeriodStart, currentPeriodEnd, trialEndsAt, cancelledAt, createdAt

14. Commission
    - id, dealId, party (BUYER|SELLER|BOTH), percentage, amount, status (PENDING|PAID|DISPUTED), paidAt, notes

15. RegistrationPackage
    - id, dealId, status (GENERATING|READY|DOWNLOADED|EXPIRED), fileKey, fileSize, generatedAt, expiresAt

Use proper:
- enums using enum blocks (for statuses, types, roles)
- @relations with onDelete CASCADE where appropriate
- @index for frequently queried fields (organizationId on all tables, dealId on documents/reminders, userId on notifications)
- @default(uuid()) for IDs
- @default(now()) for createdAt

After writing the schema, run:
npx prisma migrate dev --name init

Then generate the client:
npx prisma generate

Verify: check that prisma/migrations/ directory has the migration file.
```

**Key Security Check:**
- ✅ RLS policies must be created for every table (added after migration)
- ✅ `passwordHash` uses bcrypt, never stored in plaintext
- ✅ `fileKey` is NOT the original filename (prevents path traversal)

**Verify:**
```bash
npx prisma studio  # opens browser — check all models look correct
```

---

## PHASE A: PRODUCTION CORE (WEEKS 1-4)

---

### A1: Authentication System

**Files:** `src/lib/auth/[...nextauth].ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/components/auth/`

**Prompt for Hermes:**

```
Build a complete authentication system for PropFlow at C:\Users\panka\propflow-demo using NextAuth.js (Auth.js v5).

Requirements:
1. Providers: Google OAuth + Email (magic link) + Phone OTP
2. On first login, create Organization + User (Admin role)
3. Session stored in Supabase (not JWT — for RLS compatibility)
4. Protected routes redirect to /login
5. Beautiful login page at /login (propflow dark theme)

Files to create:
- src/app/api/auth/[...nextauth]/route.ts — NextAuth handler
- src/lib/auth/auth-options.ts — auth configuration
- src/lib/auth/index.ts — helper: getServerSession, requireAuth, etc.
- src/app/login/page.tsx — login page with Google + email + phone tabs
- src/components/auth/LoginForm.tsx
- src/components/auth/PhoneLogin.tsx
- src/middleware.ts — route protection (protect /app/*, allow /login, /, /api/auth/*)
- src/app/api/auth/send-otp/route.ts — send phone OTP via Twilio/MSG91
- src/app/api/auth/verify-otp/route.ts — verify OTP and create session

The login page should have:
- PropFlow branding (logo, color scheme, "The OS for Property Brokers" tagline)
- 3 tabs: Google Login / Email Magic Link / Phone OTP
- Dark theme to match the landing page
- Beautiful animated form transitions
- Error states for invalid login, expired link, wrong OTP
- Loading states for all auth operations

For phone OTP, use a simple API approach:
- POST /api/auth/send-otp with {phone} → sends 6-digit code
- POST /api/auth/verify-otp with {phone, code} → verifies and creates session
- Store OTPs in-memory with TTL (for now — no Redis needed at this stage)
- Rate limit: max 3 OTP sends per phone per hour

Middleware should:
- Allow /, /login, /api/auth/*, /api/webhooks/*, /_next/*, /favicon.ico
- Protect everything under /app/*
- Redirect to /login?callbackUrl=... on unauthorized access
- Use edge-compatible session check (NextAuth edge middleware)

After building, verify:
1. Visit /login → see the 3-tab login UI
2. Google login flow works end-to-end
3. First-time login creates Org + User in DB
4. Protected /app/* redirects to /login when unauthenticated
5. Check: middleware.ts logs are clean, no infinite redirects
```

**Security:**
- ✅ Rate limit OTP sends (3/hour/phone)
- ✅ OTP expires in 5 minutes
- ✅ Magic links expire in 30 minutes
- ✅ Google OAuth uses state parameter (CSRF protection)
- ✅ Session cookie is HttpOnly, Secure, SameSite=Lax
- ✅ No password-based login (reduced attack surface)

**Verify:**
```bash
# Visit the app unauthenticated — should redirect to /login
curl -sI http://localhost:3000/app | head -5
# Expected: 302 redirect to /login
```

---

### A2: Real Deal CRUD

**Files:** `src/app/api/deals/`, `src/lib/api/deals.ts`

**Prompt for Hermes:**

```
Replace all simulated deal data in PropFlow with real API endpoints and database operations.

1. Create API routes:

POST /api/deals — Create a new deal
- Body: { title, propertyType, location, dealValue, registrationDate, notes }
- Auto-generate document checklist based on property type:
  * SALE: Aadhaar (B), PAN (B), Bank Statement (B), Registry (S), Tax Receipt (S), NOC (S), Sale Deed (P), Encumbrance (P), Khata (P), Property Tax (P)
  * RENTAL: Aadhaar (B), PAN (B), Salary Slips (B), Rent Agreement (B), Title Deed (S), NOC (S), Maintenance Receipts (P)
  * COMMERCIAL: Company PAN (B), GST Certificate (B), Board Resolution (B), everything from SALE
- Create Deal, DealParty (buyer+seller with placeholder data), DocumentChecklistItems
- Return the created deal with all relations

GET /api/deals — List deals for current user's organization
- Support query params: status, search, sort
- Return with completion percentage (calculated from checklist items)
- Paginate: ?page=1&limit=20

GET /api/deals/[id] — Get single deal with all relations
- Include: parties, documents, checklist items, reminders, activity log, AI insights

PATCH /api/deals/[id] — Update deal fields
- Validate with Zod: only allow specific fields to change (not completion, not deals with COMPLETED status)

DELETE /api/deals/[id] — Soft delete (set status=CANCELLED)

2. Create client-side hooks in src/lib/hooks/useDeals.ts:
- useDeals(filters) — fetch deals list with SWR pattern
- useDeal(id) — fetch single deal
- useCreateDeal() — mutation to create
- useUpdateDeal() — mutation to update
- Include loading, error, and empty states

3. Update these existing pages to use real data (replacing demo-data.ts imports):
- src/app/app/page.tsx (Dashboard) — fetch from API instead of demo-data
- src/app/app/deals/page.tsx (Deals List)
- src/app/app/deals/[id]/page.tsx (Deal Detail)

4. Create a loading skeleton component at src/components/ui/Skeleton.tsx:
- DealCardSkeleton
- DashboardSkeleton
- DealDetailSkeleton

5. Add error boundaries around each page

Important: Do NOT delete demo-data.ts yet — keep as fallback/seed reference.
Handle edge cases: empty state (no deals), error state (API down), loading state (skeleton).

After building, verify:
1. Create a deal via UI → check it appears in Supabase
2. Refresh → deal persists (no longer demo data)
3. Edit deal → changes save correctly
4. Set deal as completed → can't edit it
5. Empty org → see "Create your first deal" empty state
```

**Verification:**
```bash
# Create a deal via API
curl -X POST http://localhost:3000/api/deals \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"title":"Test Deal","propertyType":"SALE","location":"Jaipur","dealValue":"8500000","registrationDate":"2026-07-15"}'
# Expected: 201 with deal object

# List deals
curl http://localhost:3000/api/deals \
  -H "Cookie: next-auth.session-token=..."
# Expected: 200 with deals array
```

---

### A3: Real File Upload (Cloudflare R2)

**Files:** `src/app/api/upload/`, `src/lib/storage.ts`

**Prompt for Hermes:**

```
Build a real file upload system for PropFlow using Cloudflare R2 (S3-compatible).

1. Install: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

2. Create src/lib/storage.ts:
- S3 client configured from env vars (endpoint, region: auto, credentials)
- Functions:
  * generateUploadUrl(key, contentType) → presigned PUT URL (expires 15min)
  * generateDownloadUrl(key) → presigned GET URL (expires 1hr)
  * deleteFile(key) → remove from storage
  * generateKey(organizationId, dealId, filename) → unique file key
    Pattern: org/{orgId}/deal/{dealId}/{uuid}-{sanitized-filename}
- File type validation (only allow: pdf, jpg, jpeg, png, doc, docx)
- File size limit check (max 20MB per file)

3. Create src/app/api/upload/request/route.ts:
- POST: validate auth, validate file info (name, type, size from client)
- Generate presigned upload URL
- Return: { uploadUrl, fileKey, downloadUrl }

4. Create src/app/api/upload/confirm/route.ts:
- POST: called after client uploads to R2
- Create Document record in DB with fileKey, fileSize, mimeType
- Trigger AI OCR processing (hook to A6)
- Update DocumentChecklistItem status
- Create ActivityLog entry
- Return updated deal data

5. Update client upload UI (src/app/app/client/page.tsx):
- Replace placeholder with real file upload flow
- Drag & drop zone → triggers presigned URL request → uploads to R2 directly (not through our server)
- Show upload progress bar
- On complete, call /api/upload/confirm
- Show success state with document preview (PDF embed or image)

6. For PDF previews, use native embed:
<embed src={downloadUrl} type="application/pdf" className="w-full h-full" />

7. Image previews: <img src={downloadUrl} />

8. Add loading states for: upload in progress, processing, success, error

Key security:
- File type validation on BOTH client AND server (never trust client)
- Max file size: 20MB
- Rate limit: max 10 uploads per minute per user
- Presigned URLs expire in 15 minutes
- Delete file from R2 if Document creation fails

After building, verify:
1. Upload a PDF through the client portal
2. Check R2 bucket → file exists with correct key naming
3. Check DB → Document record created correctly
4. Try uploading a .exe file → should be rejected
5. Try uploading a 50MB file → should be rejected
6. Download the uploaded file → preview works
```

**Security:**
- ✅ File type whitelist (NOT blacklist — always safer)
- ✅ File size validation server-side
- ✅ Presigned URLs limit exposure (no open bucket)
- ✅ Filename sanitization (remove path traversal: `../`, `..\\`, null bytes)
- ✅ Rate limiting on upload endpoint

**Verify:**
```bash
# Request upload URL
curl -X POST http://localhost:3000/api/upload/request \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"fileName":"test.pdf","fileType":"application/pdf","fileSize":102400,"dealId":"..."}'
# Expected: 200 with { uploadUrl, fileKey, downloadUrl }
```

---

### A4: Real Client Portal

**Files:** `src/app/app/client/`, `src/app/client/[token]/`, `src/lib/client-portal.ts`

**Prompt for Hermes:**

```
Build the REAL client portal for PropFlow — shareable links that clients use to upload documents without logging in.

Architecture:
- Broker clicks "Generate Link" on a deal → creates a signed JWT token
- Token encodes: dealId, partyId, organizationId, expiry (48 hours)
- Client receives WhatsApp message with link: https://propflow.com/upload/{token}
- Client opens link → sees only THEIR documents to upload (not other parties')
- Client drag & drops → uploads directly to R2 via presigned URLs
- Broker gets notified when documents arrive

Files to create:

1. src/app/api/portal/generate-link/route.ts
- POST: creates a signed JWT for { dealId, partyId }
- Token expires in 48 hours
- Returns: { link: "https://.../upload/{token}", expiresAt }
- Create Reminder record (WHATSAPP, SCHEDULED)

2. src/app/upload/[token]/page.tsx
- Public page (no auth required)
- Decode JWT token → fetch deal + party info from DB
- Show: deal title, party name, documents pending for THIS party
- Beautiful WhatsApp-inspired mobile-first UI (green theme)
- Drag & drop upload zone for each pending document
- After upload: show success animation, "Your documents have been submitted ✓"
- Loading: skeleton while token is decoded
- Error: invalid/expired token → "This link has expired. Please ask your broker for a new one."

3. src/app/upload/[token]/layout.tsx
- Simple layout (no sidebar, no nav)
- Minimal branding: "PropFlow — Secure Document Upload"

4. src/components/portal/UploadZone.tsx
- Drag & drop with file type validation
- Progress bar per file
- Multiple file support
- Error states (wrong type, too large, upload failed)

5. src/components/portal/UploadSuccess.tsx
- Animated checkmark (Framer Motion)
- "Submitted" message
- Option to upload more documents

6. After client uploads:
- Update Document + DocumentChecklistItem in DB
- Create ActivityLog (type: UPLOAD, detail: "Client uploaded {docName}")
- Create Notification for broker: "{partyName} uploaded {docName}"
- AI auto-verifies document (hook to A6)

Key UX decisions:
- NO login required for client — frictionless upload
- Token-based auth (temporary, scoped to one deal)
- Mobile-first: 70%+ of clients will access on phone
- WhatsApp link preview: show OG image with deal info
- After upload: client sees "Thank you" screen, broker sees real-time update

Security:
- JWT tokens signed with server secret (not user-dependent)
- Token expires in 48 hours (configurable)
- Rate limit: 5 uploads per token per hour
- Token is one-time-use for link generation (each generate creates new token)
- Cannot access other deals or other parties' documents
- No PII in token payload (only IDs — data fetched server-side)

After building, verify:
1. Generate a client link from broker dashboard
2. Open link in incognito → see client upload UI
3. Upload a document → check DB for Document record
4. Expire token manually → see "link expired" error
5. Try to access another deal's documents via modified token → should fail
```

**Verify:**
```bash
# Generate a portal link
curl -X POST http://localhost:3000/api/portal/generate-link \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"dealId":"...","partyId":"..."}'
# Expected: 200 with { link, expiresAt }

# Open the link in browser — should see upload UI without login
```

---

### A5: WhatsApp Business API

**Files:** `src/lib/whatsapp.ts`, `src/app/api/webhooks/whatsapp/route.ts`

**Prompt for Hermes:**

```
Integrate WhatsApp Business API for sending real document reminders and notifications.

Setup steps first (UI will guide the user):
1. Go to https://business.facebook.com → create WhatsApp Business Account
2. Verify business (documents required)
3. Create message templates in Meta Business Manager
4. Get: Phone Number ID, Access Token, Webhook Verify Token
5. Add all to .env.local

Files to create:

1. src/lib/whatsapp.ts — WhatsApp API client:
- sendTemplateMessage(to, templateName, parameters) → send template message
  * Template: "document_reminder" with params: {1: partyName, 2: documentList, 3: portalLink}
- sendTextMessage(to, text) → fallback for non-template messages
- markMessageAsRead(messageId) → read receipts
- getMessageStatus(messageId) → check delivery
- createTemplate(name, body, header?, footer?, buttons?) → create new template via API
- All functions use Meta Graph API v18.0
- Error handling: rate limit (8000/day per phone), template rejection, invalid phone numbers

2. src/app/api/webhooks/whatsapp/route.ts:
- GET: handle webhook verification (Meta sends challenge token)
- POST: receive message status updates (sent, delivered, read, failed)
- Update Reminder status in DB based on webhook payload
- Log delivery failures for retry

3. src/app/api/reminders/send/route.ts:
- POST: send WhatsApp reminder for a deal
- Body: { dealId, partyId, templateName, customMessage? }
- Generate client portal link (unless already exists and not expired)
- Build message with document list
- Send via WhatsApp API
- Create Reminder record with status=SENT
- Create ActivityLog entry
- Handle errors: if template not approved, fallback to text message
- Rate limit: max 1 reminder per party per 6 hours (configurable)

4. Update WhatsApp page (src/app/app/whatsapp/page.tsx):
- Show real reminder history from DB (not demo-data)
- "Send Reminder" button with party selection
- Reminder status tracking (sent → delivered → read)
- Failed reminders with retry option
- Schedule future reminders
- Template preview before sending

5. src/app/api/reminders/schedule/route.ts:
- POST: schedule a reminder for future delivery
- CRON job (via Inngest): check scheduled reminders every 5 minutes, send due ones

WhatsApp template naming convention:
- document_reminder — "Hello {1}, these documents are needed: {2}. Upload here: {3}"
- urgent_reminder — "URGENT: {1}, registration in {2} days. Missing: {3}"
- document_received — "Thank you {1}, {2} has been received ✓"
- weekly_summary — "{1}, you have {2} active deals. {3} documents pending."

IMPORTANT: WhatsApp template approval takes 2-4 weeks. Start this process IMMEDIATELY.
Until approved, implement a fallback: send via email OR show a "Send via WhatsApp" button
that copies a pre-formatted message to clipboard (user pastes manually).

Security:
- Validate WhatsApp webhook signature (verify token)
- Rate limit API calls (don't flood Meta's API)
- Store webhook events for audit trail
- Phone number validation (Indian format: +91XXXXXXXXXX)
- Never store WhatsApp access token in client-side code

After building, verify:
1. WhatsApp webhook verification works (GET returns challenge)
2. Send a test reminder (or copy-to-clipboard fallback)
3. Check Reminder status in DB
4. Verify rate limiting (try sending too many reminders)
```

---

### A6: Document AI / OCR

**Files:** `src/lib/ai/`, `src/app/api/ai/`

**Prompt for Hermes:**

```
Build the document AI system for PropFlow that automatically analyzes uploaded documents.

Architecture (phased — start simple, get smarter):

Phase 1: Basic OCR (Week 1)
- Use Google Cloud Vision API for text extraction from uploaded images/PDFs
- Auto-detect document type based on text patterns:
  * Aadhaar: 12-digit number pattern + "Aadhaar" text + "UIDAI"
  * PAN: 10-character alphanumeric (AAAAA9999A) pattern + "Income Tax" + "Permanent Account Number"
  * PAN card format: First 5 chars alphabets, next 4 numbers, last char alphabet
  * Sale Deed: "Sale Deed" + "Registration" + property description patterns
  * Bank Statement: "Bank Statement" + IFSC codes + date ranges

Files:

1. src/lib/ai/document-analyzer.ts:
- analyzeDocument(fileKey) → { documentType, extractedFields, confidence }
- extractTextFromImage(fileBuffer) → text string (Google Vision)
- detectDocumentType(text) → enum: AADHAAR | PAN | SALE_DEED | BANK_STMT | REGISTRY | ENCUMBRANCE | KHATA | PROPERTY_TAX | OTHER
- extractFields(text, documentType) → structured data
  * Aadhaar: { name, aadhaarNumber, dob, gender, address }
  * PAN: { name, panNumber, fatherName, dob }
  * Sale Deed: { parties, propertyDescription, consideration, date }
  * Bank Statement: { accountNumber, ifscCode, period, balance }

2. src/app/api/ai/analyze/route.ts:
- POST: accepts { documentId }
- Fetches document from R2
- Runs analysis pipeline
- Updates Document: aiVerified=true, aiData={result}
- Updates DocumentChecklistItem: status=COMPLETE (if AI verified)
- Creates AIInsight if issues found: "PAN number doesn't match party name"
- Creates ActivityLog

3. src/lib/ai/validators.ts:
- validateAadhaar(text) → { valid, errors[] } — Verhoeff algorithm check
- validatePAN(text) → { valid, errors[] } — format + checksum
- validateDocumentForParty(document, party) → check if name matches
- flagDiscrepancy(document, field) → create AIInsight with HIGH severity

4. DocumentPreview component update:
- Show AI extracted data overlay when available
- Display: "✅ Aadhaar verified" or "⚠️ Name mismatch"
- Show extracted fields in a side panel
- Confidence score badge

Phase 2: Auto-fill Checklist (Week 2-3)
- When a document is uploaded and AI-classified:
  * Auto-match to the correct DocumentChecklistItem
  * If checklist item for this document doesn't exist → create one (AI detected)
  * Update checklist progress percentage in real-time

Phase 3: Proactive AI (Week 3-4)
- After document analysis, AI checks:
  * "This is a loan case — ITR documents suggested" (based on bank statement analysis)
  * "Registration in 5 days — NOC still missing" (based on registration date)
  * "Buyer name mismatch between Aadhaar and PAN" (cross-document verification)
  * "Commercial property — GST Certificate required but not uploaded" (property type based)

Key design decisions:
- All AI processing is asynchronous (don't block document upload)
- Queue processing via Inngest or simple in-process queue
- Store raw OCR output + AI analysis result separately (for debugging/improvement)
- Confidence threshold: <70% → flag for manual review
- Never auto-reject a document — AI findings are suggestions, broker has final say
- Support batch processing (for bulk document uploads)

For Google Vision API:
- Need to set up Google Cloud project, enable Vision API
- Create service account, download JSON key
- Set GOOGLE_CLOUD_VISION_API_KEY in .env.local
- Cost: $1.50 per 1000 pages (very affordable at scale)

Security:
- Processed images stored in R2, never cached in AI service
- OCR text doesn't leave the processing pipeline (no logging of PII)
- Document images deleted from temp storage after processing
- Rate limit AI analysis requests (queue-based)

After building, verify:
1. Upload an Aadhaar image → AI detects it as AADHAAR
2. Upload a PAN card → AI extracts PAN number with >90% confidence
3. Upload a random PDF → AI classifies as OTHER
4. Check DB: aiData populated with extracted fields
5. Upload document with wrong name → AI flags name mismatch
```

---

### A7: Commission Calculator + Lead Pipeline

**Prompt for Hermes:**

```
Build commission management and basic lead pipeline for PropFlow.

Commission Calculator (src/app/api/commissions/):
- POST /api/commissions — create commission entry for a deal
  Body: { dealId, party (BUYER|SELLER|BOTH), percentage, amount }
- GET /api/commissions?dealId=X — get commissions for a deal
- PATCH /api/commissions/[id] — update status (PENDING→PAID)
- Commission is calculated: dealValue × percentage / 100
- Auto-calculate suggested commission: standard market rate = 2% (customizable)
- Show commission in deal detail page
- Track: expected commission vs collected commission

Lead Pipeline (src/app/api/leads/ + src/app/app/leads/):
- Create lead management with pipeline stages:
  NEW → CONTACTED → SITE_VISIT → OFFER → CONVERTED → DEAL
  Also: LOST (terminal state)
- Form fields: name, phone, email, property requirement, budget (₹ slider), source (walk-in, referral, magicbricks, 99acres, whatsapp, call)
- Lead card shows: name, status badge, budget, days since created, follow-up count
- Drag-and-drop Kanban pipeline view (use @dnd-kit/core library)
- Click lead → slide-in panel with details + action buttons (Mark as Contacted, Schedule Visit, etc.)
- Convert lead to deal → pre-fills deal creation with lead info
- Lead scoring: auto-calculate score based on budget, source quality, engagement
- Show lead source analytics in dashboard

Files:
- src/app/api/leads/* — CRUD for leads
- src/app/app/leads/page.tsx — Kanban board
- src/app/app/leads/[id]/page.tsx — Lead detail panel
- src/components/leads/LeadCard.tsx
- src/components/leads/LeadKanban.tsx
- src/components/leads/ConvertToDealModal.tsx

UI: Keep propflow design system — dark theme cards, status badges, progress indicators.
```

---

## PHASE B: SCALE (MONTHS 2-3)

---

### B1: Multi-User / Team Roles

**Prompt for Hermes:**

```
Build multi-user support for PropFlow — brokerages with multiple agents.

Requirements:
1. Organization admin can invite team members via email
2. Roles: OWNER (full access), ADMIN (manage deals, users, billing), AGENT (manage own deals only)
3. Invite flow:
   - Admin clicks "Invite Member" → enters email + role
   - System sends email invitation (magic link with org claim)
   - New user clicks link → creates account → auto-joined to org
   - Existing user clicks link → joins org (switch orgs)
4. Role-based access control:
   - API middleware: requireRole(ADMIN) for user management endpoints
   - Agent can only see/edit their OWN deals (createdBy === userId)
   - Admin can see/edit ALL deals in org
   - Owner can do everything + delete org
5. Team dashboard for admin: show agent performance, deal distribution, workload

Files:
- src/app/api/org/invite/route.ts — send invitation
- src/app/api/org/members/route.ts — list/manage members
- src/middleware/roles.ts — role check wrapper
- src/app/app/settings/team/page.tsx — team management UI
- src/app/app/settings/page.tsx — org settings

Security:
- Invitation links expire in 7 days
- User can belong to multiple orgs (switch via dropdown in sidebar)
- Deleting a user from org: reassign their active deals first
- Audit log for all role changes
```

---

### B2: Subscription Payments (Razorpay)

**Prompt for Hermes:**

```
Integrate Razorpay subscription billing for PropFlow's 3-tier pricing.

Requirements:
1. Razorpay subscription plans:
   - Free: ₹0 (no Razorpay plan needed)
   - Pro: ₹1,500/mo (Razorpay plan ID: plan_pro_monthly)
   - Team: ₹5,000/mo (Razorpay plan ID: plan_team_monthly)
   - Annual discounts: Pro ₹15,000/yr (₹1,250/mo), Team ₹50,000/yr (₹4,167/mo)

2. Checkout flow:
   - User clicks "Subscribe" on pricing page
   - Backend creates Razorpay subscription via API
   - Redirect to Razorpay Checkout (hosted page)
   - On success, Razorpay sends webhook to /api/webhooks/razorpay
   - Webhook handler: update Subscription + Organization in DB
   - Redirect user to dashboard with success toast

3. /api/webhooks/razorpay/route.ts:
   - Verify webhook signature (Razorpay secret)
   - Handle events: subscription.activated, subscription.completed, subscription.cancelled, payment.failed
   - Update Organization.subscriptionStatus accordingly
   - On payment failure: send email/notification to org admin
   - On subscription expiry: downgrade to FREE, restrict PRO features

4. Feature gating:
   - FREE: 1 active deal, 5 docs, basic checklist
   - PRO: unlimited deals, AI OCR, client portal, WhatsApp, analytics
   - TEAM: everything + multi-user, commission, lead management, API
   - Middleware checks subscription status on /app routes
   - Upgrade prompt when hitting limits

5. Billing portal (src/app/app/settings/billing/page.tsx):
   - Current plan + usage
   - Upgrade/downgrade button
   - Payment history (from Razorpay)
   - Cancel subscription (with confirmation flow)
   - Download invoices

Files:
- src/app/api/subscriptions/create/route.ts
- src/app/api/subscriptions/manage/route.ts
- src/app/api/webhooks/razorpay/route.ts
- src/app/app/settings/billing/page.tsx
- src/lib/payments/razorpay.ts
- src/middleware/subscription.ts

Security:
- NEVER expose Razorpay API secret client-side
- Webhook verification using HMAC-SHA256
- Subscription status stored server-side, not trusted from client
- One subscription per organization (no double billing)
- Grace period: 7 days after failed payment before downgrade
```

---

### B3: In-App Fee Collection

**Prompt for Hermes:**

```
Add in-app payment collection for PropFlow — brokers can collect fees/advances from clients.

Features:
1. Broker creates a fee request: { dealId, partyId, amount (₹), purpose (ADVANCE|COMMISSION|REGISTRATION_FEE|STAMP_DUTY|OTHER), notes }
2. System generates a Razorpay payment link
3. Client receives WhatsApp message with payment link
4. Client pays via UPI/Credit Card/Netbanking
5. Payment status tracked: PENDING → PAID → REFUNDED
6. Fee history shown in deal detail page

API endpoints:
- POST /api/fees — create fee request
- GET /api/fees?dealId=X — list fees for a deal
- PATCH /api/fees/[id]/status — update (PAID, REFUNDED)

The payment link uses Razorpay Payment Links API (not checkout page — simpler for client).
Client doesn't need an account — just the link.

Security:
- Razorpay webhook verifies payment completion
- Refunds processed by broker (not automated — prevent abuse)
- Commission fees and deal fees tracked separately
```

---

### B4: Regional Language Support

**Prompt for Hermes:**

```
Add Hindi language support to PropFlow (first regional language — more to follow).

Implementation approach (no i18n library — keep it simple for MVP):
1. Create src/lib/i18n/hi.json with all translated strings
2. Create src/lib/i18n/index.ts with language context
3. Language switcher in settings (Hindi | English)
4. Key pages translated: dashboard, deal management, checklist, client portal, reminders
5. Store preference in localStorage + user profile
6. Client portal auto-detects browser language → shows Hindi if available

Translation scope (start with high-impact):
- All navigation items
- Deal status labels
- Document category names
- Dashboard stats
- Action buttons (Upload, Send, Create, etc.)
- AI insights text
- WhatsApp reminder templates
- Error messages
- Empty states

Hindi translations should use Devanagari script, conversational tone:
- Dashboard → डैशबोर्ड
- Active Deals → सक्रिय डील
- Pending Documents → लंबित दस्तावेज़
- Upload → अपलोड करें
- Send Reminder → रिमाइंडर भेजें

For the client portal, show language toggle prominently (many clients prefer Hindi).
Broker profile stores preferred language — all WhatsApp messages use that language.

Future: Marathi (मराठी), Gujarati (ગુજરાતી), Tamil (தமிழ்), Bengali (বাংলা) — same pattern.
```

---

### B5: Real-Time Notifications

**Prompt for Hermes:**

```
Build real-time notification system for PropFlow using Server-Sent Events (SSE).

Implementation:
1. SSE endpoint: GET /api/realtime — long-lived connection for authenticated users
   - On connection: start sending notifications
   - Format: data: { "type": "document_uploaded", "title": "...", "message": "..." }\n\n
   - Keep-alive ping every 30 seconds
   - Auto-reconnect on disconnect (browser EventSource handles this)

2. Notification sources (create Notification DB record + push SSE):
   - Document uploaded by client → broker notified
   - Registration approaching (3 days) → alert
   - AI insight generated → broker notified
   - Reminder delivered/failed → broker notified
   - Team member invited → admin notified
   - Payment received → broker notified
   - Weekly summary → push every Monday

3. src/app/api/notifications/route.ts:
   - GET: list notifications for current user (paginated, newest first)
   - PATCH /api/notifications/[id]/read — mark as read
   - POST /api/notifications/read-all — mark all as read

4. Notification center UI (src/app/app/notifications/page.tsx — already exists as placeholder):
   - Real notification list (from API, not demo data)
   - Unread count badge in sidebar
   - Click notification → mark as read, navigate to relevant page
   - Mark all as read button
   - Notification types with icons:
     * upload → green
     * ai → blue/purple
     * reminder → amber
     * alert → rose
     * payment → emerald
     * team → violet

5. src/components/notifications/NotificationBell.tsx:
   - Bell icon in top bar
   - Unread count badge
   - Dropdown showing last 5 notifications
   - "View all" link to notifications page

Security:
- SSE endpoint validates session on connection
- Notifications scoped to user's organization
- Rate limit: max 10 SSE connections per user (prevent abuse)
- Connection timeout: 30 minutes (reconnect required)
```

---

### B6: Property Listing View

**Prompt for Hermes:**

```
Add a simple property portfolio/listing view for each broker — a public page showing their listed properties.

Features:
1. TRULY simple — no listing syndication, no MLS, no portals
2. Broker can mark deals as "Showcase" → makes a public page at /showcase/{broker-slug}
3. Public page shows: property photos (if uploaded), title, location, price, status
4. Contact button → shows broker phone + WhatsApp link
5. Each property is a card with image gallery
6. SEO: meta tags per property, Open Graph for WhatsApp link preview

This is NOT a listing platform — it's a portfolio showcase for brokers to share with clients.
No search, no filtering, no comparison. Just "here are my current listings."

Files:
- src/app/showcase/[slug]/page.tsx — public portfolio page (no auth)
- src/app/app/settings/showcase/page.tsx — toggle properties to showcase
- Simple, clean, mobile-first design

Security:
- Only show properties marked as showcase (not all deals)
- No PII of clients (buyer/seller names hidden)
- Contact goes to broker phone (not stored in page source — use JS redirect)
- Rate limit page views (prevent scraping)
```

---

## PHASE C: MOATS (MONTHS 3-6)

---

### C1: WhatsApp-Native Deal Workflow

**Prompt for Hermes:**

```
Build FULL deal management via WhatsApp — brokers should be able to manage their entire workflow without opening the web app.

Architecture:
- Brokers opt-in by sending "Start" to PropFlow WhatsApp number
- WebSocket/SSE connects WhatsApp Business API to PropFlow backend
- Interactive WhatsApp flows use Meta's Interactive Messages (buttons + lists)

WhatsApp flows:

1. "New Deal" — Create a deal via WhatsApp:
   - Broker sends "New Deal"
   - Bot asks: property type (list selection: Apartment, Villa, Plot, Commercial, Rental)
   - Bot asks: property location (quick reply with common areas)
   - Bot asks: deal value (number input)
   - Bot asks: registration date
   - Bot: "✅ Deal created! I'll set up the document checklist. Share this link with your client:"
   - Sends client portal link

2. "Checklist — Deal D-1024" — Check document status:
   - Bot sends: "Documents for Rajesh Sharma - Jaipur Apartment:
     ✅ Aadhaar (Complete)
     ✅ PAN (Complete)
     ⏳ Bank Statement (Pending)
     ❌ Passport Photo (Missing)
     ⏳ Tax Receipt (Pending)
     ❌ NOC from Society (Missing)"

3. "Remind — Deal D-1024" — Send reminders:
   - Bot asks: remind buyer, seller, or both?
   - Bot sends reminder, confirms: "✅ Reminder sent to Rajesh Sharma"

4. "Urgent" — Show urgent deals:
   - Bot responds: "⚠️ You have 2 urgent deals:
     1. D-1024 Jaipur Apt - Registration in 3 days (82% complete)
     2. D-1022 Mumbai Rental - Registration in 5 days (45% complete)
     Reply with deal ID for details"

5. "Analytics" — Weekly summary:
   - Bot: "📊 This Week: 3 deals active, 1 completed, 5 reminders sent. Pending docs: 12"

Implementation:
- src/lib/whatsapp/interactive.ts — interactive message builders
- src/lib/whatsapp/flows/ — each flow as a module (createDeal.ts, checkChecklist.ts, sendReminder.ts, etc.)
- src/app/api/webhooks/whatsapp/message-handler.ts — route incoming messages to flows
- State machine per user (track where they are in a flow)

Security:
- WhatsApp phone number must match broker's registered number
- Session timeout: 10 minutes inactivity per flow
- Rate limit: 10 interactions per minute per broker
- Sensitive data (client PII) masked in WhatsApp messages
- Opt-out available at any time: "Stop" → unsubscribe
```

---

### C2: E-Sign Integration (Digio)

**Prompt for Hermes:**

```
Integrate Digio e-Sign for digital signatures on sale agreements and registration documents.

Implementation:
1. Sign-up at Digio.in for developer API access
2. API: submit document → get signing link → share with client → receive signed document
3. Flow in PropFlow:
   - Broker prepares agreement document (template-based)
   - Clicks "Send for e-Sign"
   - Client receives WhatsApp link → opens Digio signing page
   - Client signs using Aadhaar OTP (legally valid under Indian IT Act)
   - Signed document returned to PropFlow via webhook
   - Document stored in R2, linked to deal
   - Status updated: "e-Signed ✓"

Files:
- src/lib/esign/digio.ts — Digio API client
- src/app/app/deals/[id]/esign/page.tsx — e-sign management UI
- src/app/api/webhooks/digio/route.ts — receive signed documents

Security:
- Digio uses Aadhaar-based eSign (legally valid)
- Signed documents are tamper-evident
- Broker must have client's consent to send for e-sign
- Audit trail stored in ActivityLog
```

---

### C3: Registration Folder Export

**Prompt for Hermes:**

```
Build the registration-ready folder export system — the emotional payoff of the entire product.

When broker clicks "Generate Registration Package":
1. System validates all documents required for registration are present
2. If documents missing → show error: "Cannot export — 3 documents still missing:
   - NOC from Society (Pending)
   - Tax Receipt (Pending)
   - Encumbrance Certificate (Missing)"
3. If all complete → trigger async folder generation:
   - Copy all documents from R2 to a structured folder
   - Structure: Deal_{id}/
     ├── 01_Buyer/
     │   ├── Aadhaar_Card.pdf
     │   ├── PAN_Card.pdf
     │   ├── Bank_Statement.pdf
     │   └── Passport_Photo.jpg
     ├── 02_Seller/
     │   ├── Registry_Copy.pdf
     │   ├── Tax_Receipt.pdf
     │   └── NOC_from_Society.pdf
     ├── 03_Property/
     │   ├── Sale_Deed.pdf
     │   ├── Encumbrance_Certificate.pdf
     │   ├── Khata_Certificate.pdf
     │   └── Property_Tax_Receipt.pdf
     └── 04_Agreements/
         └── Sale_Agreement_Signed.pdf
   - Generate a ZIP file
   - Store ZIP in R2 with presigned download link (expires in 7 days)
   - Create RegistrationPackage record in DB
   - Update deal status

4. Success UI:
   - Animated processing spinner
   - "Your registration package is ready ✓"
   - Download button
   - Package info: size, number of files, generated date
   - "Package expires in 7 days. Re-generate if needed."

5. For incomplete deals: show "Registration Readiness Score"
   - Progress bar showing completeness
   - Section-by-section status: Buyer Docs (3/4), Seller Docs (2/3), Property Docs (4/4)
   - "Registration Ready in N days" countdown

Files:
- src/app/api/registration/generate/route.ts
- src/app/api/registration/status/[dealId]/route.ts
- src/app/api/registration/download/[packageId]/route.ts
- src/lib/export/package-generator.ts
- lib/archiver (use archiver npm package for ZIP generation)

Performance:
- ZIP generation runs as background job (via Inngest)
- For large packages (>100MB), show progress updates via SSE
- Cache generated packages for 7 days
- Allow re-generation (new ZIP, old one expires)

Registration Readiness Score algorithm:
- Weight: Buyer Docs 30%, Seller Docs 30%, Property Docs 30%, Agreements 10%
- Per section: (complete / total) * weight
- Example: 3/4 buyer docs = 75% * 30% = 22.5% contribution
- Score shown as percentage + emoji: ≥90% 🟢, ≥70% 🟡, <70% 🔴
```

---

### C4: Client PWA

**Prompt for Hermes:**

```
Convert the client upload portal into a Progressive Web App so clients can:
1. Receive push notifications for new document requests
2. Access upload portal offline (queue uploads for later)
3. Install to home screen ("Add to PropFlow")

Implementation:
1. Create manifest.json at src/app/manifest.ts:
   - name: "PropFlow — Document Upload"
   - short_name: "PropFlow"
   - theme_color: "#059669" (emerald)
   - background_color: "#0a0a0b"
   - display: "standalone"
   - icons: 192x192 and 512x512

2. Create service worker at public/sw.js:
   - Cache portal assets for offline use
   - Background sync for queued uploads
   - Push notification handler

3. Add next-pwa or manual service worker registration:
   - Register SW in client portal layout
   - Prompt to install on first visit

4. Push notifications:
   - When broker creates document request → FCM push to client
   - Client receives: "Your broker needs your PAN card. Upload here →"
   - Click notification → opens upload portal

5. Test: Lighthouse PWA audit (target: 90+ PWA score)

Security:
- Service worker scoped to /upload/* only
- No SW on main app (too complex for MVP)
- Push notification permission must be opt-in
```

---

### C5: Advanced AI

**Prompt for Hermes:**

```
Take AI features beyond basic OCR — build proactive intelligence.

1. Cross-document verification:
   - Compare name across Aadhaar, PAN, Sale Deed, Bank Statement
   - Flag mismatches: "Buyer name on Aadhaar (Rajesh Sharma) ≠ PAN (R. Sharma)"
   - Verify PAN format, Aadhaar checksum

2. Fraud detection:
   - Check for document photo manipulation (metadata analysis)
   - Flag repeated documents across deals (same Aadhaar used in 5 different deals?)
   - Detect expired documents (check issue date vs. current date)
   - Flag unusually high deal values compared to area registry rates

3. Smart suggestions:
   - "This property is in a commercial zone — GST Certificate may be required"
   - "Buyer is 28 years old — home loan eligibility is high. Suggest ITR docs."
   - "Registration is near financial year end — stamp duty rates may increase"
   - "Property in flood-prone area — additional NOC from municipality suggested"

4. NLP for deal notes:
   - Parse broker's notes: "Buyer said will bring docs next week" → schedule reminder
   - Extract dates, amounts, names from free-text notes
   - Auto-categorize activity log entries

5. Predictive analytics:
   - "Based on current progress, deal has 80% chance of registering on time"
   - "Similar deals took 23 days to complete. You're on track."
   - "Deals in this area average 15 pending documents — you have 12. Above average."

Implementation:
- Use OpenAI / Claude API for NLP tasks (or self-hosted small model)
- Python microservice for ML (or Next.js API routes for simple tasks)
- Store model predictions in AIInsight table
- Model retraining every 2 weeks as data accumulates

Security:
- No PII sent to external AI APIs (hash names/phones before sending)
- AI suggestions are non-binding — broker always has final say
- Audit trail for all AI decisions
- Opt-out available for brokers who don't want AI analysis
```

---

### C6: Real Analytics

**Prompt for Hermes:**

```
Replace all hardcoded analytics with real database-powered insights.

Real queries:
1. Deals overview:
   - Total deals this month (compare to last month)
   - Completion rate (deals completed vs created)
   - Average deal value
   - Average time from deal creation to registration

2. Broker performance:
   - Deals per broker (if team)
   - Documents processed per broker
   - Average completion time per broker
   - Conversion rate: leads → deals

3. Document analytics:
   - Most commonly missing documents (aim: improve checklist defaults)
   - Average documents per deal
   - Documents pending vs complete trend over time

4. Registration forecast:
   - Upcoming registrations timeline (calendar view)
   - Registration readiness score per deal
   - Predicted registration delays (based on completion rate)

5. Revenue analytics:
   - Commission earned vs commission expected
   - Revenue by month
   - Revenue per broker (team tier)
   - Annualized revenue projection

6. Export to CSV/PDF:
   - Download analytics as CSV
   - Generate PDF report for monthly review (react-pdf)

UI: Use recharts or simple SVG charts (keep it lightweight).
Replace src/app/app/analytics/page.tsx with real data queries.
Add date range picker (Last 7 days, Last 30 days, This Quarter, Custom).
```

---

## PHASE D: DOMINANCE (MONTHS 6-12)

---

### D1: Deal Directory / Market Data

**Prompt for Hermes:**

```
Build an opt-in deal directory — brokers can make deal data anonymous and contribute to market intelligence.

Features:
1. Opt-in only: "Share anonymous deal data to help the community"
2. Broker sees: "Your deals" vs "Market average" comparison
3. Market data shown:
   - Average deal values by area/locality
   - Common document issues by area
   - Average registration times
   - Broker commission benchmarks
4. Data is fully anonymized (no party names, addresses, phone numbers)
5. Value to broker: pricing guidance, document prep insights, competitive benchmark

Implementation:
- src/app/api/market-data/route.ts — aggregated queries (COUNT, AVG, GROUP BY)
- src/app/app/analytics/market/page.tsx — market intelligence dashboard
- Data retention: 6 months of rolling data
- Min threshold: show data only when 10+ deals in an area (prevent deanonymization)
```

---

### D2: Verified Document Templates

**Prompt for Hermes:**

```
Create PropFlow Verified Document Templates — become the industry standard format.

Features:
1. Template library for each document type:
   - Aadhaar: what front/back images should contain
   - PAN: correct format expectations
   - Bank Statement: which pages are required, acceptable formats
   - Sale Deed: key clauses to verify
   - Registry Copy: what to check
   - NOC: standard format for societies/builders
   - Encumbrance Certificate: where to obtain, validity period

2. Verified templates have checklists:
   - "Does this NOC include the society stamp?"
   - "Is the Sale Deed notarized?"
   - "Is the Bank Statement within 3 months?"

3. Template customization per broker:
   - Brokers can add their own verification items
   - Create deal-type-specific templates
   - Share templates within organization

4. Community templates:
   - Brokers can submit template improvements
   - PropFlow reviews and approves
   - Contributor badges for active template authors

Value: Once brokers rely on PropFlow templates for document verification, switching products means rebuilding their entire template library.
```

---

### D3: Broker Community

**Prompt for Hermes:**

```
Build the PropFlow Broker Community — network effects within the platform.

Features:
1. In-app feed: brokers share tips, questions, updates
2. Deal sharing: broker can share anonymous deal for advice
3. Document Q&A: "What documents do I need for a resale flat in Bangalore?"
4. Expert badges: top contributors get verified badges
5. Weekly digest: "Top 5 discussions this week" (via WhatsApp/email)

Implementation:
- src/app/api/community/* — posts, comments, likes
- src/app/app/community/page.tsx — community feed
- Moderation: AI auto-flag inappropriate content, broker reports
- Rate limiting to prevent spam
- Organization verification: only verified brokers can post

This creates the social moat — brokers come to PropFlow not just for documents, but for community.
```

---

### D4: Client App (Basic)

**Prompt for Hermes:**

```
Create a lightweight client-facing app where home buyers/sellers can track their documents across multiple brokers.

Features:
1. Client registers with phone number (OTP login)
2. See all their property deals across any broker using PropFlow
3. Document status: "Your Aadhaar with Rajesh Properties" ✅ or ⏳
4. Push notifications: "New document needed for your Jaipur property"
5. Upload documents once, share across deals
6. Broker switch: "My broker is moving to another platform" → documents can follow (with consent)

This is an optional but powerful feature — it creates client-side stickiness that makes brokers
reluctant to leave PropFlow because their clients expect them to be here.

Implementation:
- Separate app at client.propflow.com or /client subdomain
- Next.js app with shared components
- Supabase cross-org data access (with client consent)
- Very minimal: just status tracking + upload
```

---

### D5: Referral Program

**Prompt for Hermes:**

```
Build a broker referral program — viral growth engine.

Mechanics:
1. Referral code generated per broker: "PROPFLOW-RAJESH"
2. When new broker signs up with referral code → 1 month free Pro
3. Referring broker gets 1 month free (max 3 months per year)
4. Tracking: referrer, referee, status (registered, activated, paid)
5. Dashboard: "You've referred 5 brokers! 🎉"
6. Automated: WhatsApp message with referral link
7. Payout: referral credits applied to subscription
```

---

### D6: All-State Registration Templates

**Prompt for Hermes:**

```
Create state-specific registration process templates for all 28 Indian states.

Each state has different:
- Stamp duty rates (percentage varies)
- Registration fees
- Required documents (varies: some need NOC from different authorities)
- Sub-registrar jurisdiction rules
- Online vs offline filing
- Language of registration documents

Create a configuration system:
- src/data/registration/states.ts — state-specific configs
- Include: stamp duty rates, required documents list, process steps, fees, links to state portals
- Show in deal detail: "This is a Rajasthan registration. Required documents differ."
- Guide broker through state-specific checklist
- Link to state sub-registrar appointment booking (where available)

This is INCREDIBLY valuable — no competitor has this level of localization.
Each state's rules require real research. Build incrementally:
1. Top 5 states first: Maharashtra, Karnataka, UP, Rajasthan, Tamil Nadu
2. Next 10: Gujarat, Delhi, Haryana, Telangana, West Bengal, MP, Punjab, Kerala, Bihar, AP
3. Remaining 13 states
```

---

### D7: Strategic Partnerships

**Prompt for Hermes:**

```
Create a partnerships system for PropFlow — integrate with key players in the Indian real estate ecosystem.

Priority partners:
1. Digio (e-Sign) — already integrated in Phase C
2. Razorpay (payments) — already integrated
3. Google Cloud Document AI — already integrated
4. SHCIL / eStamp — online stamp duty payment
5. RERA state portals — compliance filing (where API available)
6. Magicbricks / 99acres — lead import API
7. Twilio / MSG91 — SMS fallback
8. India Post / Speed Post — for physical document delivery tracking

Partnership page at /partners:
- List of integrations with status
- How brokers benefit
- Setup guides

Revenue: potential revenue share with Digio/eStamp for transactions processed through PropFlow.
```

---

## SECURITY ARCHITECTURE (Cross-Cutting)

### Security Checklist — Every Feature Must Pass

```markdown
## Input Validation (ALL layers)
- [ ] Every API request validated with Zod schemas
- [ ] File uploads: whitelist type + size limit + sanitized filename
- [ ] SQL injection: NEVER raw SQL — use Prisma exclusively
- [ ] XSS: React auto-escapes, but sanitize dangerouslySetInnerHTML
- [ ] Rate limiting on ALL public endpoints

## Authentication
- [ ] All /app/* routes protected by middleware
- [ ] API routes verify session before processing
- [ ] Sensitive operations (DELETE, billing) require re-auth
- [ ] Session timeout: 30 days (configurable)
- [ ] Failed login rate limit: 5 attempts per 15 minutes

## Authorization
- [ ] RLS policies on EVERY Supabase table
- [ ] Organization-scoped: users only see their org's data
- [ ] Role-based access: AGENT can't see other agents' deals
- [ ] API middleware: requireRole(ROLE) for admin endpoints
- [ ] Deleted data: soft-delete only, never hard-delete without backup

## Data Storage
- [ ] Passwords: bcrypt (cost factor 12+)
- [ ] PII: minimize collection, encrypt at rest (Supabase data encryption)
- [ ] File storage: presigned URLs only (never public bucket)
- [ ] API keys: server-side .env only, never in client bundle
- [ ] Database: encrypted connection (SSL enforced)

## File Upload Security
- [ ] File type validation server-side (not just extension — check magic bytes)
- [ ] File size limit: 20MB per file
- [ ] Filename sanitization: remove path traversal characters
- [ ] Virus scanning: ClamAV (optional — for sensitive deployments)
- [ ] Upload rate limit: 10 files/minute/user

## Webhook Security
- [ ] Validate webhook signatures (HMAC for Razorpay, verify token for WhatsApp)
- [ ] Webhook endpoints behind rate limiting
- [ ] Webhook IP whitelisting where supported
- [ ] Webhook payload validation with Zod
- [ ] Webhook retry with exponential backoff

## Deployment
- [ ] .env.local in .gitignore (verified)
- [ ] NEXT_PUBLIC_* vars are truly public-safe
- [ ] No secrets in Vercel environment logs
- [ ] Vercel Deploy Hooks: protect with secret
- [ ] Regular dependency audits: npm audit
- [ ] HTTPS enforced (Vercel default)
- [ ] Security headers: Content-Security-Policy, X-Frame-Options, etc.
```

### Security header template (add to next.config)

```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
];

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  // ... rest of config
};
```

---

## VIBE CODING TIPS & TROUBLESHOOTING

### Core Workflow (Repeat for Every Task)

```
1. COPY the prompt from this playbook
2. PASTE to Hermes Agent
3. LET IT BUILD (may take 5-30 min per task)
4. WATCH THE OUTPUT — look for errors
5. IF ERROR → tell Hermes the error message, let it fix
6. VERIFY — run the verification commands
7. COMMIT — git add . && git commit -m "feat: description"
8. PUSH — git push (Vercel auto-deploys)
9. CHECK LIVE — verify on propflow-demo.vercel.app
```

### When Something Goes Wrong

| Problem | Solution |
|---------|----------|
| Build fails | Copy the error to Hermes, ask "fix this error" |
| Feature doesn't work | Describe exactly what you expected vs what happened |
| API returns 500 | Check Vercel logs / console. Ask Hermes to add error logging |
| Database migration conflict | `npx prisma migrate reset` (careful — deletes data) |
| Auth not working | Check .env.local values, verify Supabase project |
| File upload fails | Check R2 bucket permissions, CORS config |
| WhatsApp not sending | Check template approval status in Meta Business Manager |
| Payment fails | Check Razorpay test mode, webhook secret |
| Slow performance | Ask Hermes to add caching (SWR, React Query) or DB indexes |

### Git Workflow (Keep Safe)

```bash
# Before any major change — commit current state
git add . && git commit -m "backup before [feature name]"

# After each successful task
git add . && git commit -m "feat: add [feature description]"

# If something breaks badly
git checkout -- .  # discard uncommitted changes
# OR
git reset --hard HEAD~1  # undo last commit

# Push to GitHub
git push origin main
```

### MVP Mindset (YAGNI — You Ain't Gonna Need It)

When vibe coding, you'll be tempted to over-engineer. Fight it:

- **No Redis** until you have 100+ concurrent users (in-memory cache is fine)
- **No microservices** — monolith in Next.js API routes is fine up to 10K users
- **No Kubernetes** — Vercel scales automatically
- **No CI/CD pipeline** — Vercel auto-deploys from GitHub
- **No separate mobile app** — PWA + responsive web first
- **No ElasticSearch** — PostgreSQL full-text search is fine for MVP
- **No rate limiting library** — simple in-memory rate limiter in middleware
- **No queue system** — Inngest free tier or simple setTimeout-based queue

### Cost Optimization (Stay Lean)

| Service | Free Tier Limit | When to Upgrade |
|---------|----------------|-----------------|
| Supabase | 500 MB DB, 1 GB storage, 50K users | >10K documents |
| Vercel | 100 GB bandwidth, 6000 build mins | >1M monthly visits |
| Cloudflare R2 | 10 GB free | >10K documents |
| Razorpay | 2% per transaction | Always (no fixed fee) |
| WhatsApp API | Conversation-based pricing | First customer |
| Google Vision | 1000 units/month free | >1000 docs/month |
| Sentry | 5K events/month | >5K errors/month |
| Inngest | 100K runs/month | >100K background jobs |

### When to Actually Hire?

Don't hire until at least ONE of these is true:
- [ ] You have 100+ paying customers and can't handle support
- [ ] The codebase needs a security audit (bank-level compliance)
- [ ] WhatsApp template rejection is blocking growth (need compliance expert)
- [ ] AI accuracy needs domain expert (hire a real estate document specialist)
- [ ] You're raising VC and need a "technical co-founder" story

Until then: vibe coding with Hermes + this playbook is all you need.

---

## SUCCESS CRITERIA — End of Each Phase

**End of Phase A (Week 4):**
- ✅ Users can sign up (Google/Email/Phone)
- ✅ Brokers can create real deals (persisted in DB)
- ✅ Documents upload to cloud storage
- ✅ Clients receive shareable upload links
- ✅ WhatsApp reminders sent (or clipboard fallback)
- ✅ AI detects Aadhaar/PAN on upload
- ✅ Commission calculator works
- ✅ Lead pipeline functional

**End of Phase B (Month 3):**
- ✅ Multi-user with role-based access
- ✅ Paid subscriptions via Razorpay
- ✅ In-app fee collection
- ✅ Hindi language support
- ✅ Real-time notifications
- ✅ Property showcase page

**End of Phase C (Month 6):**
- ✅ Full WhatsApp-native deal workflow
- ✅ e-Sign integrations
- ✅ Registration-ready folder export
- ✅ Client PWA
- ✅ Advanced AI (cross-doc verification, fraud detection)
- ✅ Real analytics dashboard

**End of Phase D (Month 12):**
- ✅ Deal directory / market data
- ✅ Verified document templates
- ✅ Broker community
- ✅ Client app
- ✅ Referral program
- ✅ All-state registration templates
- ✅ Strategic partnerships

---

*This playbook is your complete vibe coding companion. Every prompt is designed to be copy-pasted to Hermes Agent. You don't need to know how to code — you need to know what to ask for, verify it works, and commit the result.*

*Built by Pankaj Jha — June 2026*
