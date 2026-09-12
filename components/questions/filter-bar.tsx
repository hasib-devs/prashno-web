"use client";

import { Input } from "@/components/ui/input";

type FilterBarProps = {
  search: string;
  subject: string;
  chapter: string;
  subjects: string[];
  chapters: string[];
  onSearch: (v: string) => void;
  onSubject: (v: string) => void;
  onChapter: (v: string) => void;
};

const selectClass =
  "rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 text-[15px] text-[var(--neutral-900)] focus:border-[var(--accent)] focus:outline-none";

export function FilterBar({
  search,
  subject,
  chapter,
  subjects,
  chapters,
  onSearch,
  onSubject,
  onChapter,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="প্রশ্ন খুঁজুন..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="flex gap-3">
        <select
          className={selectClass}
          value={subject}
          onChange={(e) => onSubject(e.target.value)}
          aria-label="বিষয়"
        >
          <option value="">সব বিষয়</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={chapter}
          onChange={(e) => onChapter(e.target.value)}
          aria-label="অধ্যায়"
        >
          <option value="">সব অধ্যায়</option>
          {chapters.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
