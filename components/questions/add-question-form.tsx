"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/question-types";

type AddQuestionFormProps = {
  subjects: string[];
  onAdd: (q: Question) => void;
};

export function AddQuestionForm({ subjects, onAdd }: AddQuestionFormProps) {
  const [stem, setStem] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [subject, setSubject] = useState(subjects[0] ?? "গণিত");
  const [chapter, setChapter] = useState("অধ্যায় ১");
  const [error, setError] = useState("");

  const setOption = (i: number, v: string) => {
    setOptions((prev) => prev.map((o, oi) => (oi === i ? v : o)));
  };

  const submit = () => {
    if (!stem.trim()) {
      setError("প্রশ্ন লিখুন");
      return;
    }
    if (options.some((o) => !o.trim())) {
      setError("৪টি অপশনই পূরণ করুন");
      return;
    }
    onAdd({
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `custom-${Date.now()}`,
      stem: stem.trim(),
      options: [options[0].trim(), options[1].trim(), options[2].trim(), options[3].trim()],
      correctIndex: correctIndex as 0 | 1 | 2 | 3,
      subject,
      chapter: chapter.trim() || "অধ্যায় ১",
      classLevel: "—",
      marks: 1,
    });
    setStem("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    setError("");
  };

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)] p-4">
      <p className="font-semibold text-[var(--neutral-900)]">নতুন প্রশ্ন যোগ করুন</p>
      <Input
        label="প্রশ্ন"
        placeholder="প্রশ্ন লিখুন..."
        value={stem}
        onChange={(e) => setStem(e.target.value)}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name="correct"
              checked={correctIndex === i}
              onChange={() => setCorrectIndex(i)}
              aria-label={`সঠিক উত্তর ${i + 1}`}
              className="h-4 w-4 accent-[#2563eb]"
            />
            <Input
              placeholder={`অপশন ${i + 1}`}
              value={opt}
              onChange={(e) => setOption(i, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <select
          className="rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 text-[15px]"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-label="বিষয়"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <Input
          placeholder="অধ্যায়"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
      </div>
      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
      <Button onClick={submit}>যোগ করুন</Button>
    </div>
  );
}
