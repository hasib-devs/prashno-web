# Question Generator (MCQ MVP) — Design Spec

> **Status:** Approved
> **Date:** 2026-09-12
> **Scope:** First of three features (generator → OMR → online exam)

## Decisions

| # | Decision | Choice |
|---|----------|--------|
| 1 | Question types | MCQ only (`stem + options[4] + correctIndex`) |
| 2 | Storage | Seed file + localStorage, zero backend |
| 3 | Session model | Single-session select → live preview → print, no saved sets |
| 4 | Print | Browser print with print CSS (`window.print()` + `@media print`) |
| 5 | Layout | Two-pane builder (bank left, A4 preview right) |

## Data model

```ts
type Question = {
  id: string;
  stem: string;            // Bengali question text
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  subject: string;         // e.g. "গণিত"
  chapter: string;         // e.g. "অধ্যায় ৩"
  classLevel: string;      // e.g. "অষ্টম"
  marks: number;           // default 1
};
```

- Seed: `lib/seed-questions.ts`, ~30 NCTB-flavored MCQs across গণিত / বিজ্ঞান / ইংরেজি, 2–3 chapters each.
- Teacher-added: same shape, key `pk-questions-v1` in localStorage. Seed merges on first visit only (if key absent, write seed; else load stored).
- No server, no API routes, no D1 in this MVP.

## Page behavior

Single `'use client'` page at `app/dashboard/questions/page.tsx`:

- Left pane: `FilterBar` (search text, subject dropdown, chapter dropdown) + scrollable `QuestionCard` list with checkbox per question, "select all visible" toggle.
- Right pane: `PaperPreview` — formatted A4 paper: title placeholder (school name static text for MVP), date auto, numbered questions with ক/খ/গ/ঘ options, total marks auto-sum, question count.
- Header row: selected count, clear button, print button (`window.print()`).
- State: `selectedIds: string[]` in useState; filtered list via useMemo. No URL params, no persistence of selection (selection resets on reload; question bank persists).
- Add-question: minimal inline form (stem + 4 options + correct radio + subject/chapter selects) appending to store. Edit/delete out of scope.
- Print CSS: `@media print` hides sidebar, topbar, left pane, buttons; shows only paper pane at full width.

## Components

| Component | File | Responsibility |
|-----------|------|----------------|
| `FilterBar` | `components/questions/filter-bar.tsx` | Search input + subject/chapter selects, controlled props |
| `QuestionCard` | `components/questions/question-card.tsx` | Checkbox + stem + options preview + subject/chapter badge |
| `PaperPreview` | `components/questions/paper-preview.tsx` | Formatted printable paper from selected questions |
| `AddQuestionForm` | `components/questions/add-question-form.tsx` | Minimal create form, validates 4 options + 1 correct |
| Store | `lib/question-store.ts` | `loadQuestions()`, `saveQuestions()`, seed-merge logic |
| Types | `lib/question-types.ts` | `Question` type + `OPTION_LABELS = ["ক","খ","গ","ঘ"]` |
| Seed | `lib/seed-questions.ts` | ~30 MCQs |

Follows existing patterns: `cn()` for classes, CSS vars (`--accent`, `--neutral-*`, `--radius-lg`), `Card`/`Button`/`Input` primitives.

## Acceptance

- [ ] Bank lists ~30 seed questions on first visit; reload persists teacher-added ones
- [ ] Filter by subject/chapter/search narrows list correctly
- [ ] Checking questions updates preview live (count + total marks)
- [ ] Print shows only the paper (no sidebar/chrome) via print preview
- [ ] `npm run build` passes
- [ ] Responsive: panes stack vertically below `lg`

## Out of scope

Saved sets, auto-select by criteria, paper header config (school/logo), edit/delete questions, OMR answer key export, PDF lib, D1 migration. OMR evaluator and online exam are separate specs.
