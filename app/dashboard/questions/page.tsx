"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/questions/filter-bar";
import { QuestionCard } from "@/components/questions/question-card";
import { PaperPreview } from "@/components/questions/paper-preview";
import { AddQuestionForm } from "@/components/questions/add-question-form";
import { loadQuestions, saveQuestions } from "@/lib/question-store";
import { formatBengaliNumber } from "@/lib/utils";
import type { Question } from "@/lib/question-types";

export default function QuestionsPage() {
  const [bank, setBank] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");

  useEffect(() => {
    setBank(loadQuestions());
  }, []);

  const subjects = useMemo(
    () => Array.from(new Set(bank.map((q) => q.subject))),
    [bank]
  );
  const chapters = useMemo(
    () =>
      Array.from(
        new Set(
          bank.filter((q) => !subject || q.subject === subject).map((q) => q.chapter)
        )
      ),
    [bank, subject]
  );

  const filtered = useMemo(
    () =>
      bank.filter(
        (q) =>
          (!subject || q.subject === subject) &&
          (!chapter || q.chapter === chapter) &&
          (!search.trim() ||
            q.stem.includes(search.trim()) ||
            q.options.some((o) => o.includes(search.trim())))
      ),
    [bank, subject, chapter, search]
  );

  const selected = useMemo(
    () => bank.filter((q) => selectedIds.includes(q.id)),
    [bank, selectedIds]
  );

  const toggle = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const selectAllVisible = () =>
    setSelectedIds((prev) =>
      Array.from(new Set([...prev, ...filtered.map((q) => q.id)]))
    );

  const addQuestion = (q: Question) => {
    const next = [q, ...bank];
    setBank(next);
    saveQuestions(next);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--neutral-950)]">
            প্রশ্নব্যাংক
          </h1>
          <p className="mt-1 text-[var(--neutral-600)]">
            {formatBengaliNumber(selectedIds.length)}টি নির্বাচিত / মোট{" "}
            {formatBengaliNumber(bank.length)}টি প্রশ্ন
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setSelectedIds([])}>
            মুছুন
          </Button>
          <Button onClick={() => window.print()}>🖨️ প্রিন্ট করুন</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="no-print flex flex-col gap-4">
          <FilterBar
            search={search}
            subject={subject}
            chapter={chapter}
            subjects={subjects}
            chapters={chapters}
            onSearch={setSearch}
            onSubject={(v) => {
              setSubject(v);
              setChapter("");
            }}
            onChapter={setChapter}
          />
          <details className="rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3">
            <summary className="cursor-pointer font-semibold text-[var(--neutral-900)]">
              + নতুন প্রশ্ন যোগ করুন
            </summary>
            <div className="mt-3">
              <AddQuestionForm subjects={subjects} onAdd={addQuestion} />
            </div>
          </details>
          <Button variant="ghost" size="sm" onClick={selectAllVisible}>
            দৃশ্যমান সব নির্বাচন করুন ({formatBengaliNumber(filtered.length)}টি)
          </Button>
          <div className="flex flex-col gap-3">
            {filtered.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                checked={selectedIds.includes(q.id)}
                onToggle={() => toggle(q.id)}
              />
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-[var(--neutral-500)]">
                কোনো প্রশ্ন পাওয়া যায়নি
              </p>
            )}
          </div>
        </div>
        <div>
          <PaperPreview questions={selected} />
        </div>
      </div>
    </div>
  );
}
