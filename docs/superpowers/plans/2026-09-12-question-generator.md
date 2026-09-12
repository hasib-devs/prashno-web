# Question Generator (MCQ MVP) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the MCQ question-generator MVP: seed bank + localStorage, two-pane select → live preview → browser print.

**Architecture:** Single `'use client'` page, no API routes. `lib/` owns types + seed + store; `components/questions/` owns filter, cards, preview, add-form.

**Tech Stack:** vinext, React 18, Tailwind v4, TypeScript, existing `cn()`, CSS vars, `Button`/`Input`/`Card` primitives.

## Global Constraints

- Accent `#2563eb`; radius `rounded-[var(--radius-lg)]`; Bengali UI text, Inter for numbers.
- `'use client'` on every interactive file.
- Mobile-first; panes stack below `lg`.
- Commit after each task; `npm run build` must pass before committing Task 4.

---

### Task 1: Types + Seed + Store

**Files:**
- Create: `lib/question-types.ts`
- Create: `lib/seed-questions.ts`
- Create: `lib/question-store.ts`

**Interfaces:**
- Produces: `Question` type, `OPTION_LABELS`, `SEED_QUESTIONS: Question[]`, `loadQuestions(): Question[]`, `saveQuestions(qs: Question[]): void`.
- Consumed by Tasks 2–4.

- [ ] **Step 1: Write `lib/question-types.ts`**

```ts
export type Question = {
  id: string;
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  subject: string;
  chapter: string;
  classLevel: string;
  marks: number;
};

export const OPTION_LABELS = ["ক", "খ", "গ", "ঘ"] as const;

export const STORAGE_KEY = "pk-questions-v1";
```

- [ ] **Step 2: Write `lib/seed-questions.ts`**

```ts
import type { Question } from "./question-types";

export const SEED_QUESTIONS: Question[] = [
  { id: "math-01", stem: "৫ + ৭ = কত?", options: ["১০", "১১", "১২", "১৩"], correctIndex: 2, subject: "গণিত", chapter: "অধ্যায় ১", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "math-02", stem: "১২ × ৮ = কত?", options: ["৮৪", "৯৬", "১০৪", "১০৮"], correctIndex: 1, subject: "গণিত", chapter: "অধ্যায় ১", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "math-03", stem: "একটি ত্রিভুজের কোণগুলোর সমষ্টি কত ডিগ্রি?", options: ["৯০°", "১৮০°", "২৭০°", "৩৬০°"], correctIndex: 1, subject: "গণিত", chapter: "অধ্যায় ২", classLevel: "সপ্তম", marks: 1 },
  { id: "math-04", stem: "৩² এর মান কত?", options: ["৬", "৯", "১২", "২৭"], correctIndex: 1, subject: "গণিত", chapter: "অধ্যায় ২", classLevel: "সপ্তম", marks: 1 },
  { id: "math-05", stem: "x + ৫ = ১২ হলে x = কত?", options: ["৫", "৬", "৭", "৮"], correctIndex: 2, subject: "গণিত", chapter: "অধ্যায় ৩", classLevel: "অষ্টম", marks: 1 },
  { id: "math-06", stem: "২০ এর ২৫% কত?", options: ["৪", "৫", "৬", "৮"], correctIndex: 1, subject: "গণিত", chapter: "অধ্যায় ৩", classLevel: "অষ্টম", marks: 1 },
  { id: "math-07", stem: "বৃত্তের পরিধি নির্ণয়ের সূত্র কোনটি?", options: ["πr²", "2πr", "πd²", "4πr"], correctIndex: 1, subject: "গণিত", chapter: "অধ্যায় ৪", classLevel: "অষ্টম", marks: 1 },
  { id: "math-08", stem: "১ থেকে ১০ পর্যন্ত মৌলিক সংখ্যা কয়টি?", options: ["৩", "৪", "৫", "৬"], correctIndex: 1, subject: "গণিত", chapter: "অধ্যায় ১", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "sci-01", stem: "পানির রাসায়নিক সংকেত কোনটি?", options: ["CO₂", "O₂", "H₂O", "NaCl"], correctIndex: 2, subject: "বিজ্ঞান", chapter: "অধ্যায় ১", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "sci-02", stem: "সালোকসংশ্লেষণ কোথায় ঘটে?", options: ["মূলে", "কাণ্ডে", "পাতায়", "ফুলে"], correctIndex: 2, subject: "বিজ্ঞান", chapter: "অধ্যায় ২", classLevel: "সপ্তম", marks: 1 },
  { id: "sci-03", stem: "মানবদেহে হাড়ের সংখ্যা কত?", options: ["১০৬", "২০৬", "৩০৬", "৪০৬"], correctIndex: 1, subject: "বিজ্ঞান", chapter: "অধ্যায় ২", classLevel: "সপ্তম", marks: 1 },
  { id: "sci-04", stem: "বিদ্যুৎ প্রবাহের একক কী?", options: ["ভোল্ট", "অ্যাম্পিয়ার", "ওয়াট", "ওহম"], correctIndex: 1, subject: "বিজ্ঞান", chapter: "অধ্যায় ৩", classLevel: "অষ্টম", marks: 1 },
  { id: "sci-05", stem: "পৃথিবীর নিকটতম গ্রহ কোনটি?", options: ["মঙ্গল", "বুধ", "শুক্র", "বৃহস্পতি"], correctIndex: 2, subject: "বিজ্ঞান", chapter: "অধ্যায় ৩", classLevel: "অষ্টম", marks: 1 },
  { id: "sci-06", stem: "অক্সিজেনের প্রতীক কোনটি?", options: ["O", "Ox", "Og", "On"], correctIndex: 0, subject: "বিজ্ঞান", chapter: "অধ্যায় ১", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "eng-01", stem: "Choose the correct spelling.", options: ["Recieve", "Receive", "Riceive", "Receeve"], correctIndex: 1, subject: "ইংরেজি", chapter: "Chapter 1", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "eng-02", stem: "He ___ to school daily.", options: ["go", "goes", "going", "gone"], correctIndex: 1, subject: "ইংরেজি", chapter: "Chapter 1", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "eng-03", stem: "Synonym of 'happy'?", options: ["sad", "glad", "angry", "tired"], correctIndex: 1, subject: "ইংরেজি", chapter: "Chapter 2", classLevel: "সপ্তম", marks: 1 },
  { id: "eng-04", stem: "Antonym of 'brave'?", options: ["bold", "coward", "hero", "strong"], correctIndex: 1, subject: "ইংরেজি", chapter: "Chapter 2", classLevel: "সপ্তম", marks: 1 },
  { id: "eng-05", stem: "She has lived here ___ 2020.", options: ["for", "from", "since", "by"], correctIndex: 2, subject: "ইংরেজি", chapter: "Chapter 3", classLevel: "অষ্টম", marks: 1 },
  { id: "eng-06", stem: "Passive of 'He writes a letter'?", options: ["A letter is written by him", "A letter was written by him", "A letter has been written", "He is written"], correctIndex: 0, subject: "ইংরেজি", chapter: "Chapter 3", classLevel: "অষ্টম", marks: 1 },
  { id: "math-09", stem: "গ.সা.গু. এর পূর্ণরূপ কী?", options: ["গরিষ্ঠ সাধারণ গুণনীয়ক", "গরিষ্ঠ সাধারণ গুণিতক", "লঘিষ্ঠ সাধারণ গুণনীয়ক", "কোনোটিই নয়"], correctIndex: 0, subject: "গণিত", chapter: "অধ্যায় ৪", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "math-10", stem: "একটি বর্গের প্রতিটি কোণ কত ডিগ্রি?", options: ["৬০°", "৯০°", "১২০°", "১৮০°"], correctIndex: 1, subject: "গণিত", chapter: "অধ্যায় ২", classLevel: "ষষ্ঠ", marks: 1 },
  { id: "sci-07", stem: "রক্তের লাল রঙের কারণ কী?", options: ["শ্বেতকণিকা", "অণুচক্রিকা", "হিমোগ্লোবিন", "প্লাজমা"], correctIndex: 2, subject: "বিজ্ঞান", chapter: "অধ্যায় ৪", classLevel: "অষ্টম", marks: 1 },
  { id: "sci-08", stem: "শব্দের বেগ সবচেয়ে বেশি কোথায়?", options: ["বায়ুতে", "পানিতে", "শূন্যে", "কঠিন পদার্থে"], correctIndex: 3, subject: "বিজ্ঞান", chapter: "অধ্যায় ৪", classLevel: "অষ্টম", marks: 1 },
];
```

- [ ] **Step 3: Write `lib/question-store.ts`**

```ts
"use client";
import type { Question } from "./question-types";
import { STORAGE_KEY } from "./question-types";
import { SEED_QUESTIONS } from "./seed-questions";

export function loadQuestions(): Question[] {
  if (typeof window === "undefined") return SEED_QUESTIONS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_QUESTIONS));
      return SEED_QUESTIONS;
    }
    const parsed = JSON.parse(raw) as Question[];
    return Array.isArray(parsed) ? parsed : SEED_QUESTIONS;
  } catch {
    return SEED_QUESTIONS;
  }
}

export function saveQuestions(qs: Question[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(qs));
  } catch {
    // quota/private-mode: bank stays in memory for the session
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/question-types.ts lib/seed-questions.ts lib/question-store.ts
git commit -m "feat(questions): add MCQ types, seed bank, localStorage store"
```

---

### Task 2: Filter Bar + Question Card

**Files:**
- Create: `components/questions/filter-bar.tsx`
- Create: `components/questions/question-card.tsx`

**Interfaces:**
- Consumes: `Question` type, `cn()`, `Input`, `Card`.
- Produces: `FilterBar(props: { search, subject, chapter, subjects, chapters, onChange })`, `QuestionCard(props: { question, checked, onToggle })`.

- [ ] **Step 1: Write `components/questions/filter-bar.tsx`** — `'use client'`; search `Input` + two native `<select>` elements styled with border/radius vars; props controlled from page.

- [ ] **Step 2: Write `components/questions/question-card.tsx`** — `'use client'`; `Card` with checkbox input, stem (font-medium), 4 options with ক/খ/গ/ঘ labels (correct one highlighted green only in bank view? No — bank hides correct answer; show options plain, correct marked with small ✓ badge), subject/chapter badges.

- [ ] **Step 3: Commit**

```bash
git add components/questions/filter-bar.tsx components/questions/question-card.tsx
git commit -m "feat(questions): add filter bar and question card"
```

---

### Task 3: Paper Preview + Add Form + Print CSS

**Files:**
- Create: `components/questions/paper-preview.tsx`
- Create: `components/questions/add-question-form.tsx`
- Modify: `app/globals.css` (append `@media print` rules)

**Interfaces:**
- Consumes: `Question`, `OPTION_LABELS`.
- Produces: `PaperPreview(props: { questions: Question[] })`, `AddQuestionForm(props: { subjects, onAdd(q: Question): void })`.

- [ ] **Step 1: Write `components/questions/paper-preview.tsx`** — `'use client'`; wrapper `<div id="paper-preview">`; header (PrashnoKotha মূল্যায়ন পত্র, date via `new Date().toLocaleDateString("bn-BD")`, total marks sum, count); numbered questions with ক/খ/গ/ঘ options in 2-col grid; empty state when none selected.

- [ ] **Step 2: Write `components/questions/add-question-form.tsx`** — `'use client'`; `useState` for stem + 4 options + correctIndex + subject + chapter; validates non-empty stem and all 4 options; builds `Question` with `id: crypto.randomUUID()` and calls `onAdd`.

- [ ] **Step 3: Append print CSS to `app/globals.css`**

```css
@media print {
  aside, header { display: none !important; }
  main { padding: 0 !important; }
  .no-print { display: none !important; }
  #paper-preview { border: none !important; box-shadow: none !important; }
}
```

- [ ] **Step 4: Commit**

```bash
git add components/questions/paper-preview.tsx components/questions/add-question-form.tsx app/globals.css
git commit -m "feat(questions): add paper preview, add-question form, print CSS"
```

---

### Task 4: Page Assembly + Verify

**Files:**
- Modify: `app/dashboard/questions/page.tsx`

**Interfaces:**
- Consumes: everything from Tasks 1–3.

- [ ] **Step 1: Rewrite `app/dashboard/questions/page.tsx`** — `'use client'`; `useState` for `bank` (init `[]`, hydrate via `useEffect(() => setBank(loadQuestions()), [])` to avoid SSR mismatch), `selectedIds`, filters; `useMemo` filtered list + subjects/chapters derived; left pane (`no-print` class): FilterBar + AddQuestionForm (collapsible via `<details>`) + QuestionCard list with select-all-visible; right pane: PaperPreview + header row (count, clear, print via `window.print()`); `lg:grid-cols-2` grid, stacked on mobile.

- [ ] **Step 2: Run `npm run build`** — expect success, routes include `/dashboard/questions`.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/questions/page.tsx
git commit -m "feat(questions): assemble two-pane generator page"
```
