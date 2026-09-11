# PrashnoKotha — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Build the PrashnoKotha landing page and dashboard shell based on the approved spec.

**Architecture:** vinext (Cloudflare Workers + Vite RSC) with React Server Components, Tailwind v4, route groups for marketing/auth/dashboard.

**Tech Stack:** vinext, React 18, Tailwind CSS v4, TypeScript, Lucide icons, Noto Sans Bengali + Inter

## Global Constraints

- All Bengali text uses Noto Sans Bengali, English uses Inter
- Accent color: `#2563eb` (blue-600)
- Section spacing: `py-20` (80px)
- Card radius: 12px (`rounded-[var(--radius-lg)]`)
- All components must be responsive (375px → 1280px+)
- Mobile-first CSS approach
- Every interactive component includes `'use client'`
- Commit after each task
- Run `npm run build` to verify no build errors before committing

---

## Task 1: Project Metadata & Design Tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `lib/constants.ts`

**Step 1:** Replace `app/layout.tsx` with metadata update — lang="bn", title "PrashnoKotha — প্রশ্নপত্র তৈরী করুন ১ ক্লিকে", Bengali description.

**Step 2:** Replace `app/globals.css` with Tailwind v4 import + CSS custom properties (all color tokens, radius tokens, font-family stack).

**Step 3:** Create `lib/constants.ts` with SITE_NAME, SITE_TAGLINE, NAV_LINKS (ফিচার, প্রাইসিং, রিসোর্স), SECTION_IDS.

**Step 4:** Commit.

---

## Task 2: Utility Functions

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/cn.ts`
- Install: `clsx`, `tailwind-merge`

**Step 1:** Create `lib/cn.ts` — `cn()` function merging clsx + tailwind-merge.

**Step 2:** Create `lib/utils.ts` — `formatBengaliNumber(num)` and `formatBengaliCurrency(amount)`.

**Step 3:** `npm install clsx tailwind-merge`.

**Step 4:** Commit.

---

## Task 3: Button Component

**Files:**
- Create: `components/ui/button.tsx`

**Step 1:** Create `Button` with variants: `primary`, `secondary`, `ghost`, `danger`; sizes: `sm`, `md`, `lg`. Uses `cn`, forwardRef, focus ring styles.

**Step 2:** Commit.

---

## Task 4: Card Component

**Files:**
- Create: `components/ui/card.tsx`

**Step 1:** Create `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` primitives with forwardRef.

**Step 2:** Commit.

---

## Task 5: Input Component

**Files:**
- Create: `components/ui/input.tsx`

**Step 1:** Create `Input` with forwardRef, label prop, error state prop, icon slot prop, focus ring.

**Step 2:** Commit.

---

## Task 6: Layout Components

**Files:**
- Create: `components/layout/landing-nav.tsx`
- Create: `components/layout/landing-footer.tsx`
- Create: `components/layout/section.tsx`

**Step 1:** `LandingNav` — fixed top, backdrop-blur, logo + NAV_LINKS + language toggle + Login + CTA button.

**Step 2:** `LandingFooter` — 4-column grid (Brand, Product, Resources, Company), bottom bar.

**Step 3:** `Section` — wrapper with consistent `py-20` spacing and max-width container.

**Step 4:** Commit.

---

## Task 7: Landing Section Components

**Files:**
- Create: `components/sections/hero.tsx`
- Create: `components/sections/social-proof.tsx`
- Create: `components/sections/feature-grid.tsx`
- Create: `components/sections/demo-showcase.tsx`
- Create: `components/sections/pricing.tsx`
- Create: `components/sections/testimonials.tsx`
- Create: `components/sections/faq.tsx`
- Create: `components/sections/cta-banner.tsx`

**Step 1:** `HeroSection` — two-column, text-left with overline/H1/subtitle/CTAs, right-side screenshot placeholder.

**Step 2:** `SocialProofBar` — horizontal stats (৩০,০০০+ শিক্ষক, ৫ লক্ষ+ প্রশ্ন, ৯৮% সন্তুষ্টি, ২৪/৭ সাপোর্ট).

**Step 3:** `FeatureGrid` — header + 3 icon cards (Question Gen, OMR, Online Exam).

**Step 4:** `DemoShowcase` — `'use client'` tabbed interface, 3 tabs with screenshot placeholders + bullet points.

**Step 5:** `PricingSection` — header + billing toggle (Monthly/Annual) + 3 pricing cards (Free/Starter/Pro), Starter highlighted.

**Step 6:** `TestimonialsSection` — header + 3 quote cards (avatar, name, role, quote).

**Step 7:** `FAQSection` — `'use client'` single-open accordion, 6 questions.

**Step 8:** `CTABanner` — blue background, centered headline + subtitle + two buttons.

**Step 9:** Commit.

---

## Task 8: Landing Page Assembly

**Files:**
- Modify: `app/page.tsx`

**Step 1:** Replace demo page with landing page importing all section components in order.

**Step 2:** Wrap in `<Layout>` nav + sections + footer.

**Step 3:** Run `npm run build` to verify.

**Step 4:** Commit.

---

## Task 9: Dashboard Layout Shell

**Files:**
- Create: `components/layout/dashboard-layout.tsx`
- Create: `components/layout/dashboard-sidebar.tsx`
- Create: `components/layout/dashboard-top-bar.tsx`
- Create: `app/(dashboard)/layout.tsx`

**Step 1:** `DashboardSidebar` — `'use client'` collapsible sidebar, nav items (Dashboard, Questions, OMR, Exams, Students, Reports, Settings), active state.

**Step 2:** `DashboardTopBar` — search input, notification bell, profile avatar.

**Step 3:** `DashboardLayout` — sidebar + top bar + main content area.

**Step 4:** `app/(dashboard)/layout.tsx` — route group layout wrapping children in DashboardLayout.

**Step 5:** Commit.

---

## Task 10: Dashboard Home Page

**Files:**
- Create: `app/(dashboard)/page.tsx`
- Create: `components/ui/stat-card.tsx`
- Create: `components/ui/empty-state.tsx`

**Step 1:** `StatCard` — number + label + trend indicator.

**Step 2:** `EmptyState` — illustration placeholder + message + CTA button.

**Step 3:** Dashboard home — stats row (4 cards), quick actions (3 buttons), recent activity empty state.

**Step 4:** Run `npm run build` to verify.

**Step 5:** Commit.

---

## Task 11: Route Group Placeholders

**Files:**
- Create: `app/(marketing)/layout.tsx`
- Create: `app/(marketing)/pricing/page.tsx`
- Create: `app/(marketing)/resources/page.tsx`
- Create: `app/(auth)/layout.tsx`
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/register/page.tsx`
- Create: `app/(dashboard)/questions/page.tsx`
- Create: `app/(dashboard)/omr/page.tsx`
- Create: `app/(dashboard)/exams/page.tsx`
- Create: `app/(dashboard)/students/page.tsx`
- Create: `app/(dashboard)/reports/page.tsx`
- Create: `app/(dashboard)/settings/page.tsx`

**Step 1:** Marketing layout — LandingNav + Footer wrapper.

**Step 2:** Auth layout — centered card container.

**Step 3:** All placeholder pages — EmptyState component with "Coming soon" or basic page title.

**Step 4:** Commit.

---

## Task 12: Final Build & Verification

**Files:** none new

**Step 1:** Run `npm run build` — fix any errors.

**Step 2:** Run `npm run dev` — verify landing page renders at localhost.

**Step 3:** Verify dashboard route renders at `/dashboard`.

**Step 4:** Final commit if needed.
