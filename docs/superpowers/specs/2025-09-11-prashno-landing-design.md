# PrashnoKotha — Landing Page & Application UI/UX Spec

> **Status:** Approved
> **Date:** 2025-09-11
> **Stack:** vinext (Cloudflare Workers + Vite RSC), React, Tailwind CSS v4
> **Domain:** EdTech SaaS — Bangladeshi K-12 teacher tools

---

## 1. Overview

PrashnoKotha is a SaaS platform for teachers in Bangladesh to generate question papers, evaluate OMR answer sheets, and conduct online exams. This spec covers the **landing page** and **teacher dashboard application** — the two primary surfaces.

The design goal is **modern SaaS aesthetics** (clean, whitespace, subtle motion) combined with **Bengali-first content** and **balanced information density** — neither ultra-minimal nor information-dense like competitors.

### User Personas

| Persona | Description | Primary Need |
|---------|-------------|-------------|
| **Classroom Teacher** | 25-45, teaches 1-3 subjects, wants to save time on paper generation | 1-click question paper, OMR evaluation |
| **School Administrator** | Manages teachers, needs visibility into exam activity | Reports, institution-wide exam management |
| **Power Teacher** | Tech-savvy, creates 50+ question sets/month | Unlimited generation, cloud backup, advanced customization |

---

## 2. Design System

### 2.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#2563eb` | Primary CTAs, links, focus rings |
| `--accent-hover` | `#1d4ed8` | Hover state for primary actions |
| `--accent-light` | `#dbeafe` | Light backgrounds, selected states |
| `--success` | `#16a34a` | Success states, positive indicators |
| `--warning` | `#d97706` | Warnings, pending states |
| `--danger` | `#dc2626` | Errors, destructive actions |
| `--neutral-950` | `#0a0a0a` | Headlines (95% black, not pure black) |
| `--neutral-900` | `#171717` | Body text |
| `--neutral-600` | `#525252` | Secondary text |
| `--neutral-400` | `#a3a3a3` | Placeholder text |
| `--neutral-200` | `#e5e5e5` | Borders, dividers |
| `--neutral-100` | `#f5f5f5` | Card backgrounds |
| `--neutral-50` | `#fafafa` | Page background |
| `--surface` | `#ffffff` | Cards, modals, inputs |

### 2.2 Typography

| Element | Family | Weight | Size | Line Height |
|---------|--------|--------|------|-------------|
| Headlines (h1-h3) | Noto Sans Bengali | 700 | 48/36/28px | 1.15 |
| Body (p) | Noto Sans Bengali | 400 | 16px | 1.7 |
| Caption/Small | Noto Sans Bengali | 400 | 13px | 1.5 |
| Button | Noto Sans Bengali | 600 | 15px | 1.0 |
| Overline/Label | Inter | 600 | 11px | 1.4 (uppercase, tracking-wide) |
| Data/Numbers | Inter | 700 | 32px | 1.1 |

**Loading:** `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');`

### 2.3 Spacing & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, small elements |
| `--radius-md` | 8px | Buttons, inputs, cards |
| `--radius-lg` | 12px | Cards, modals |
| `--radius-xl` | 16px | Large cards, sections |
| `--radius-full` | 9999px | Avatars, pills |

Section spacing: `py-20` (80px) between major sections, `gap-6-8` between cards.

### 2.4 Motion

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Page transitions | 150ms | ease-in-out |
| Hover (buttons, links) | 100ms | ease |
| Accordion expand | 200ms | ease-out |
| Tab switch | 150ms | ease-in-out |
| Scroll-reveal animations | 300ms | cubic-bezier(0.16, 1, 0.3, 1) |

Subtle scroll-triggered fade-up for sections (via CSS `animation-timeline: view()` or Intersection Observer).

---

## 3. Landing Page — Section-by-Section

### 3.1 Navigation

**Layout:** Fixed top, `bg-white/80 backdrop-blur`, `border-b border-neutral-200`, height 64px

**Left:** Logo (PrashnoKotha wordmark + icon) → links to `/`
**Center:** `Features`, `Pricing`, `Resources` (dropdown: Blog, NCTB Books, Help)
**Right:** Language toggle (বাংলা | EN), `Login` (ghost button), `Get Started` (solid accent button)

**Mobile:** Hamburger menu, full-screen overlay with stacked links

### 3.2 Hero Section

**Layout:** Two-column grid, `py-24 lg:py-32`, `gap-12 lg:gap-16`

**Left (text):**
- Overline: `TEACHER-FOCUSED EXAM TOOLS` (Inter, tracking-wide, accent color)
- H1: প্রশ্নপত্র তৈরী করুন ১ ক্লিকে — দ্রুত, সহজ, নির্ভুল
- Subtitle: বাংলাদেশের শিক্ষকদের জন্য সম্পূর্ণ বাংলায় তৈরি প্রশ্নব্যাংক, OMR মূল্যায়ন ও অনলাইন পরীক্ষা প্ল্যাটফর্ম
- CTA group: Primary `বিনামূল্যে শুরু করুন` (solid) + Secondary `ডেমো দেখুন` (outline, scrolls to demo)
- Trust line: `ইতিমধ্যে ৩০,০০০+ শিক্ষা প্রতিষ্ঠান ব্যবহার করছে` with 5-star icon

**Right (visual):**
- Product screenshot in subtle shadow container
- Browser chrome mockup (dots + URL bar)
- Dashboard showing question list with Bengali content
- Floating badge: `নতুন: OMR Evaluator` (pill, accent-light background)

### 3.3 Social Proof Bar

**Layout:** Full-width, `py-8 bg-neutral-50 border-y border-neutral-200`
**Content:** Horizontal flex, centered, `gap-12 lg:gap-20`
- ৩০,০০০+ শিক্ষকবৃন্দ
- ৫ লক্ষ+ প্রশ্ন তৈরি হয়েছে
- ৯৮% সন্তুষ্টি হার
- ২৪/৭ সাপোর্ট

Each stat: Large number (Inter, 700, accent) + Bengali label below

### 3.4 Feature Grid

**Layout:** `py-20`, section header centered, 3-column grid `gap-8`

**Header:**
- Overline: `FEATURES`
- H2: সবকিছু এক জায়গায়
- Subtitle: প্রশ্ন তৈরী থেকে পরীক্ষা পর্যন্ত — সম্পূর্ণ ওয়ার্কফ্লো

**Cards (3):**

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| Question Generator | 📝 | ১ ক্লিকে প্রশ্ন তৈরী | বোর্ড প্রশ্ন, অধ্যায়ভিত্তিক, বিষয়ভিত্তিক প্রশ্ন সন্ধান করে তাৎক্ষণিকভাবে প্রশ্নপত্র তৈরী করুন |
| OMR Evaluator | 📊 | চোখের পলকে OMR মূল্যায়ন | স্ক্যান করুন OMR শীট, অটো চেক করুন সঠিক/ভুল, নেগেটিভ মার্কিং সহ রেজাল্ট জেনারেট করুন |
| Online Exam | 💻 | অনলাইন পরীক্ষা তৈরী | এক্সাম ব্যাচ তৈরী করুন, সিকিউর লিংক শেয়ার করুন, ডিটেইল্ড রিপোর্ট পান |

**Card style:** `bg-white border border-neutral-200 rounded-xl p-6`, hover: `border-accent shadow-lg`, transition 200ms

### 3.5 Interactive Demo Showcase

**Layout:** `py-20 bg-neutral-50`, two-column `gap-12`

**Left (tabs):**
- Tab 1: প্রশ্ন তৈরী
- Tab 2: OMR মূল্যায়ন
- Tab 3: অনলাইন পরীক্ষা

Each tab: icon + label, active state = accent background, inactive = neutral-200

**Right (content):**
- Tab 1: Screenshot of question generator with chapter selection + question list
- Tab 2: Screenshot of OMR sheet being scanned with result overlay
- Tab 3: Screenshot of exam creation form + share link

Below tabs: 3 bullet points describing key features of the active tab

### 3.6 Pricing Section

**Layout:** `py-20`, centered header, 3-column grid `gap-6 max-w-5xl mx-auto`

**Header:**
- Overline: `PRICING`
- H2: আপনার প্রয়োজন অনুযায়ী প্ল্যান বেছে নিন
- Subtitle: বিনামূল্যে শুরু করুন, প্রয়োজনে আপগ্রেড করুন

**Tiers:**

| | Free | Starter | Pro |
|---|------|---------|-----|
| **Price** | ৳০/মাস | ৳২৯৯/মাস | ৳৭৯৯/মাস |
| **Highlight** | — | `জনপ্রিয়` badge | — |
| **Questions** | ৫০/মাস | আনলিমিটেড | আনলিমিটেড |
| **Exams** | ৫/মাস | ৫০/মাস | আনলিমিটেড |
| **OMR Scans** | ১০/মাস | ১০০/মাস | আনলিমিটেড |
| **Cloud Backup** | ❌ | ✅ | ✅ |
| **Custom Branding** | ❌ | ❌ | ✅ |
| **Priority Support** | ❌ | ❌ | ✅ |
| **CTA** | `বিনামূল্যে শুরু` | `স্টার্টার শুরু` | `প্রো শুরু` |

**Card style:** Free/Pro = `bg-white border-neutral-200`, Starter = `border-2 border-accent shadow-lg scale-105`

**Billing toggle:** Monthly | Annual (2 months free) — pill toggle above cards

### 3.7 Testimonials

**Layout:** `py-20`, centered header, 3-column grid `gap-6`

**Header:**
- Overline: `TESTIMONIALS`
- H2: শিক্ষকরা যা বলছেন

**Cards:** Each = `bg-white border border-neutral-200 rounded-xl p-6`
- Quote text (Bengali, 16px, neutral-700)
- Avatar (circle, 48px, initials fallback)
- Name + role (e.g., `রহিমা খাতুন — সপ্তম শ্রেণির শিক্ষিকা, ঢাকা`)
- 5-star rating

### 3.8 FAQ Section

**Layout:** `py-20 bg-neutral-50`, centered header, max-width-2xl mx-auto

**Header:**
- Overline: `FAQ`
- H2: সাধারণ প্রশ্নোত্তর

**Accordion:** Single-open, `border-b border-neutral-200`
- Question: `py-4 font-semibold text-neutral-900 cursor-pointer flex justify-between`
- Answer: `pb-4 text-neutral-600`
- Icon: Chevron down, rotates 180° on open

**Questions (initial set):**
1. প্রশ্নব্যাংকে কোন বিষয়গুলো আছে?
2. OMR মূল্যায়ন কি ফ্রি?
3. প্ল্যান কিভাবে আপগ্রেড করব?
4. অনলাইন পরীক্ষায় কতটি প্রশ্ন অ্যাড করা যায়?
5. পেমেন্ট কিভাবে করব?
6. ডেটা কি নিরাপদ?

### 3.9 CTA Banner

**Layout:** `py-20`, centered content, `bg-accent` (blue) with subtle pattern

**Content:**
- H2: আজই শুরু করুন — বিনামূল্যে
- Subtitle: ৫০ টি প্রশ্ন তৈরী করুন কোনো কার্ড ছাড়াই
- CTA: `এখনই শুরু করুন` (white button, large)
- Secondary: `ডেমো দেখুন` (ghost white)

### 3.10 Footer

**Layout:** `py-16 bg-neutral-950 text-white`, 4-column grid

**Columns:**
1. **Brand:** Logo + 2-line description + social icons (Facebook, YouTube)
2. **Product:** Features, Pricing, OMR Evaluator, Online Exam
3. **Resources:** NCTB Books, Blog, Help Center, API Docs
4. **Company:** About, Contact, Privacy Policy, Terms

**Bottom bar:** `border-t border-neutral-800`, copyright + language toggle

---

## 4. Dashboard Application

### 4.1 Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Top Bar (64px): Logo | Search | Notifications | Profile │
├──────────┬──────────────────────────────────────┤
│ Sidebar  │ Main Content Area                     │
│ (240px) │                                       │
│          │                                       │
│ Dashboard│  [Page Content]                       │
│ Questions│                                       │
│ OMR      │                                       │
│ Exams    │                                       │
│ Students │                                       │
│ Reports  │                                       │
│ Settings │                                       │
│          │                                       │
│ [Collapse]│                                      │
└──────────┴──────────────────────────────────────┘
```

### 4.2 Sidebar

**Width:** 240px expanded, 64px collapsed (icons only)
**Background:** `bg-neutral-50`, `border-r border-neutral-200`

**Nav Items:**
- Dashboard (icon: home)
- Questions (icon: document)
- OMR (icon: scanner)
- Exams (icon: monitor)
- Students (icon: users)
- Reports (icon: chart)
- Settings (icon: gear)

**Active state:** `bg-accent-light text-accent`, left 3px accent border
**Hover:** `bg-neutral-100`

**Bottom section:** Collapse toggle + Help/Support link

### 4.3 Dashboard Home

**Layout:** `p-8 max-w-7xl mx-auto`

**Top row (stats cards, 4 columns):**
- মোট প্রশ্ন তৈরী (this month)
- মোট পরীক্ষা দেওয়া
- OMR স্ক্যান সম্পন্ন
- সামগ্রিক স্কোর গড়

Each card: `bg-white border border-neutral-200 rounded-xl p-5`, large number + label + trend indicator (↑ 12%)

**Middle row (2 columns):**
- Left: Recent activity feed (last 5 actions)
- Right: Quick actions (big buttons: নতুন প্রশ্ন তৈরী, OMR স্ক্যান, পরীক্ষা তৈরী)

**Bottom row (full width):**
- Upcoming exams table (if any) or empty state with CTA

### 4.4 Questions Page

**Layout:** `p-8 max-w-7xl mx-auto`

**Top bar:** Page title + `নতুন প্রশ্ন তৈরী` button (accent)

**Filter bar:** Search input + Subject dropdown + Chapter dropdown + Type dropdown

**Content:** Question list (table or card view toggle)
- Columns: Question preview | Subject | Chapter | Type | Actions (edit, delete, add to set)
- Pagination: Load more or numbered

**Empty state:** Illustration + `এখনো কোনো প্রশ্ন তৈরী হয়নি` + CTA

### 4.5 OMR Evaluator Page

**Layout:** `p-8 max-w-7xl mx-auto`

**Two modes:**
1. **Upload & Evaluate:** Drag-and-drop OMR sheet image → auto-detect → show results
2. **Manual Entry:** Grid-based answer entry for quick evaluation

**Results view:** Score card + per-question breakdown + export options (PDF, Excel)

### 4.6 Exams Page

**Layout:** `p-8 max-w-7xl mx-auto`

**Tabs:** Upcoming | Completed | Drafts

**Exam cards:** Title | Date | Duration | Questions count | Status badge | Actions (edit, share, results)

**Create exam flow (modal or dedicated page):**
1. Basic info (title, subject, date, duration)
2. Question selection (from bank + custom)
3. Settings (negative marking, shuffle, security)
4. Review & publish

---

## 5. Component Library

### 5.1 Core Components

| Component | File | Purpose |
|-----------|------|---------|
| `Button` | `components/ui/button.tsx` | Primary, secondary, ghost, danger variants |
| `Card` | `components/ui/card.tsx` | Container with border, padding, hover states |
| `Input` | `components/ui/input.tsx` | Text input with label, error, icon support |
| `Select` | `components/ui/select.tsx` | Dropdown with search |
| `Tabs` | `components/ui/tabs.tsx` | Tabbed content panels |
| `Accordion` | `components/ui/accordion.tsx` | Single-open FAQ accordion |
| `Badge` | `components/ui/badge.tsx` | Status pills, category tags |
| `Avatar` | `components/ui/avatar.tsx` | User image with fallback initials |
| `Dialog` | `components/ui/dialog.tsx` | Modal overlay |
| `Dropdown` | `components/ui/dropdown.tsx` | Menu with items |
| `Table` | `components/ui/table.tsx` | Data table with sorting |
| `EmptyState` | `components/ui/empty-state.tsx` | Placeholder for zero-data states |
| `StatCard` | `components/ui/stat-card.tsx` | Dashboard metric display |
| `FeatureCard` | `components/ui/feature-card.tsx` | Landing page feature card |
| `TestimonialCard` | `components/ui/testimonial-card.tsx` | Quote card |
| `PricingCard` | `components/ui/pricing-card.tsx` | Pricing tier display |

### 5.2 Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| `LandingNav` | `components/layout/landing-nav.tsx` | Fixed top nav for marketing pages |
| `LandingFooter` | `components/layout/landing-footer.tsx` | Footer for marketing pages |
| `DashboardLayout` | `components/layout/dashboard-layout.tsx` | Sidebar + top bar wrapper |
| `DashboardSidebar` | `components/layout/dashboard-sidebar.tsx` | Collapsible sidebar nav |
| `DashboardTopBar` | `components/layout/dashboard-top-bar.tsx` | Search, notifications, profile |
| `Section` | `components/layout/section.tsx` | Consistent section spacing wrapper |

### 5.3 Section Components (Landing)

| Component | File | Purpose |
|-----------|------|---------|
| `HeroSection` | `components/sections/hero.tsx` | Hero with text + screenshot |
| `SocialProofBar` | `components/sections/social-proof.tsx` | Stats bar |
| `FeatureGrid` | `components/sections/feature-grid.tsx` | 3-column feature cards |
| `DemoShowcase` | `components/sections/demo-showcase.tsx` | Tabbed product demo |
| `PricingSection` | `components/sections/pricing.tsx` | Pricing cards + toggle |
| `TestimonialsSection` | `components/sections/testimonials.tsx` | Quote cards grid |
| `FAQSection` | `components/sections/faq.tsx` | Accordion FAQ |
| `CTABanner` | `components/sections/cta-banner.tsx` | Final conversion banner |

---

## 6. Technical Architecture

### 6.1 Route Structure

```
app/
├── layout.tsx                    # Root layout (fonts, metadata)
├── page.tsx                      # Landing page (marketing)
├── globals.css                   # Tailwind v4 + CSS variables
├── (marketing)/                  # Marketing pages group
│   ├── layout.tsx                # Landing nav + footer
│   ├── pricing/
│   │   └── page.tsx              # Detailed pricing page
│   └── resources/
│       └── page.tsx              # NCTB books, blog, help
├── (auth)/                       # Auth pages group
│   ├── layout.tsx                # Centered auth layout
│   ├── login/
│   │   └── page.tsx              # Login form
│   └── register/
│       └── page.tsx              # Registration form
├── (dashboard)/                  # App pages group
│   ├── layout.tsx                # DashboardLayout wrapper
│   ├── page.tsx                  # Dashboard home
│   ├── questions/
│   │   └── page.tsx              # Question list
│   ├── omr/
│   │   └── page.tsx              # OMR evaluator
│   ├── exams/
│   │   └── page.tsx              # Exam management
│   ├── students/
│   │   └── page.tsx              # Student list
│   ├── reports/
│   │   └── page.tsx              # Analytics/reports
│   └── settings/
│       └── page.tsx              # User settings
└── api/                          # API routes (if needed)
    └── [...slug]/
        └── route.ts              # Catch-all for API
```

### 6.2 State Management

| Concern | Solution |
|---------|----------|
| Server data | React Query (TanStack Query) |
| Auth state | Context + cookie-based session |
| UI state (modals, sidebar) | `useState` / `useReducer` |
| Form state | React Hook Form + Zod |
| Theme/Language | Context + localStorage |

### 6.3 Data Fetching

- **Landing page:** Static generation with `revalidate = 300` (5 min ISR)
- **Dashboard:** Client-side fetching with React Query, stale-while-revalidate
- **API calls:** Hono-style handlers on Cloudflare Workers (separate from vinext RSC)

### 6.4 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop (sidebar visible) |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

Mobile: Single column, hamburger nav, stacked cards, bottom sheet for filters.

---

## 7. Glossary (Bengali Domain Terms)

| Bengali | English | Definition |
|---------|---------|------------|
| প্রশ্ন | Question | A single exam item with options and answer |
| প্রশ্নপত্র | Question Paper | A formatted document containing selected questions |
| প্রশ্নব্যাংক | Question Bank | The database of all available questions |
| পরীক্ষা | Exam | A timed assessment given to students |
| OMR | OMR | Optical Mark Recognition — scanned answer sheet |
| অধ্যায় | Chapter | A unit within a subject's syllabus |
| বিষয় | Subject | Academic discipline (e.g., গণিত, ইংরেজি) |
| শ্রেণি | Class/Grade | School level (তৃতীয় through দ্বাদশ) |
| শিক্ষক | Teacher | Primary user — creates questions and exams |
| শিক্ষার্থী | Student | End recipient of exams |
| সঠিক উত্তর | Correct Answer | The right option for a question |
| ভুল উত্তর | Wrong Answer | An incorrect option |
| নেগেটিভ মার্কিং | Negative Marking | Deducting points for wrong answers |
| পূর্ণমান | Total Marks | Maximum score for an exam |
| প্রতিষ্ঠান | Institution | School/College using the platform |
| সেট কোড | Set Code | Identifier for question paper variants |

---

## 8. Acceptance Criteria

### Landing Page
- [ ] All sections render correctly on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Bengali text renders with Noto Sans Bengali at all sizes
- [ ] Hero screenshot loads with proper fallback
- [ ] Feature cards have hover states
- [ ] Demo tabs switch content smoothly
- [ ] Pricing toggle switches between monthly/annual
- [ ] FAQ accordion opens/closes with animation
- [ ] All CTAs link to correct destinations
- [ ] Language toggle switches Bengali ↔ English
- [ ] Page loads < 3s on 3G connection
- [ ] Lighthouse performance score > 90

### Dashboard
- [ ] Sidebar collapses/expands on toggle
- [ ] Nav items highlight active route
- [ ] Stats cards show real data (or skeleton loading)
- [ ] Question list filters work (search, subject, chapter)
- [ ] OMR upload accepts image files
- [ ] Exam creation flow completes end-to-end
- [ ] All pages responsive down to 768px
- [ ] Empty states show for zero-data scenarios
- [ ] Logout clears session and redirects

---

## 9. Out of Scope (Future)

- Student-facing portal (practice, model tests)
- Mobile app (React Native)
- Payment gateway integration
- Real-time collaboration
- AI question generation
- Advanced analytics/ML insights
- Multi-branch institution hierarchy
- Desktop app (Electron/Tauri)

---

## 10. File Structure (Implementation)

```
prashno-web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── pricing/page.tsx
│   │   └── resources/page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── questions/page.tsx
│   │   ├── omr/page.tsx
│   │   ├── exams/page.tsx
│   │   ├── students/page.tsx
│   │   ├── reports/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       └── [...slug]/route.ts
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown.tsx
│   │   ├── table.tsx
│   │   ├── empty-state.tsx
│   │   ├── stat-card.tsx
│   │   ├── feature-card.tsx
│   │   ├── testimonial-card.tsx
│   │   └── pricing-card.tsx
│   ├── layout/
│   │   ├── landing-nav.tsx
│   │   ├── landing-footer.tsx
│   │   ├── dashboard-layout.tsx
│   │   ├── dashboard-sidebar.tsx
│   │   ├── dashboard-top-bar.tsx
│   │   └── section.tsx
│   └── sections/
│       ├── hero.tsx
│       ├── social-proof.tsx
│       ├── feature-grid.tsx
│       ├── demo-showcase.tsx
│       ├── pricing.tsx
│       ├── testimonials.tsx
│       ├── faq.tsx
│       └── cta-banner.tsx
├── lib/
│   ├── utils.ts
│   ├── cn.ts
│   ├── fonts.ts
│   └── constants.ts
├── hooks/
│   ├── use-media-query.ts
│   ├── use-scroll-reveal.ts
│   └── use-language.ts
├── public/
│   ├── images/
│   │   ├── hero-screenshot.png
│   │   ├── demo-question-gen.png
│   │   ├── demo-omr.png
│   │   ├── demo-exam.png
│   │   └── logo.svg
│   └── fonts/ (if self-hosting)
├── docs/
│   ├── superpowers/specs/
│   │   └── 2025-09-11-prashno-landing-design.md
│   └── adr/
│       ├── 001-vinext-on-workers.md
│       ├── 002-bilingual-content-strategy.md
│       ├── 003-typography-choice.md
│       ├── 004-dashboard-navigation-pattern.md
│       └── 005-pricing-model.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
```

---

## 11. Next Steps

1. **Review this spec** — confirm all decisions
2. **Create ADRs** — document the 5 key architectural decisions
3. **Write implementation plan** — break into tasks (writing-plans skill)
4. **Execute** — build landing page first, then dashboard shell
