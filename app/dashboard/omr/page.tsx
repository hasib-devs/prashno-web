"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OMRAnswerSheet } from "@/components/omr/omr-answer-sheet";
import { OMRResultRow } from "@/components/omr/omr-result-row";
import { loadQuestions } from "@/lib/question-store";
import { formatBengaliNumber } from "@/lib/utils";
import type { Question } from "@/lib/question-types";

type OMRState = "setup" | "answering" | "result";

export default function OMRPage() {
  const [bank, setBank] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [state, setState] = useState<OMRState>("setup");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setBank(loadQuestions());
  }, []);

  const selectedQuestions = useMemo(
    () => bank.filter((q) => selectedIds.includes(q.id)),
    [bank, selectedIds]
  );

  const toggleQuestion = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedIds(bank.map((q) => q.id));
  const clearAll = () => setSelectedIds([]);

  const startExam = () => {
    if (selectedQuestions.length === 0) return;
    setAnswers({});
    setCurrentIndex(0);
    setState("answering");
  };

  const setAnswer = (questionId: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: idx }));
  };

  const finishExam = () => {
    setState("result");
  };

  const reset = () => {
    setState("setup");
    setAnswers({});
    setCurrentIndex(0);
  };

  // Score
  const score = useMemo(() => {
    if (state !== "result") return { correct: 0, wrong: 0, empty: 0 };
    let correct = 0,
      wrong = 0,
      empty = 0;
    for (const q of selectedQuestions) {
      const a = answers[q.id];
      if (a === undefined || a === null) empty++;
      else if (a === q.correctIndex) correct++;
      else wrong++;
    }
    return { correct, wrong, empty };
  }, [state, selectedQuestions, answers]);

  // ---- SETUP STATE ----
  if (state === "setup") {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--neutral-950)]">
              OMR মূল্যায়ন
            </h1>
            <p className="mt-1 text-[var(--neutral-600)]">
              প্রশ্ন নির্বাচন করুন, তারপর উত্তর দিন — স্বয়ংক্রিয় মূল্যায়ন
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={selectAll}>
              সব নির্বাচন
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              মুছুন
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            {bank.map((q, i) => {
              const checked = selectedIds.includes(q.id);
              return (
                <Card
                  key={q.id}
                  className="flex cursor-pointer items-start gap-3 transition-colors hover:border-[var(--accent)]"
                  onClick={() => toggleQuestion(q.id)}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    className="mt-1 h-4 w-4 accent-[var(--accent)]"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--neutral-900)]">
                      {formatBengaliNumber(i + 1)}. {q.stem}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded-full bg-[var(--neutral-100)] px-2 py-0.5 text-xs text-[var(--neutral-600)]">
                        {q.subject}
                      </span>
                      <span className="rounded-full bg-[var(--neutral-100)] px-2 py-0.5 text-xs text-[var(--neutral-600)]">
                        {q.classLevel}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col gap-4">
            <Card className="sticky top-6">
              <h3 className="text-lg font-semibold text-[var(--neutral-900)]">
                নির্বাচন সারাংশ
              </h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--neutral-600)]">মোট প্রশ্ন</span>
                  <span className="font-semibold">{formatBengaliNumber(selectedIds.length)}টি</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--neutral-600)]">মোট নম্বর</span>
                  <span className="font-semibold">
                    {formatBengaliNumber(
                      bank
                        .filter((q) => selectedIds.includes(q.id))
                        .reduce((sum, q) => sum + q.marks, 0)
                    )}
                  </span>
                </div>
              </div>
              <Button
                className="mt-4 w-full"
                disabled={selectedIds.length === 0}
                onClick={startExam}
              >
                মূল্যায়ন শুরু করুন
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ---- ANSWERING STATE ----
  if (state === "answering") {
    const q = selectedQuestions[currentIndex];
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--neutral-950)]">
              মূল্যায়ন চলছে
            </h1>
            <p className="text-sm text-[var(--neutral-600)]">
              {formatBengaliNumber(answeredCount)}/{formatBengaliNumber(selectedQuestions.length)}টি উত্তর দিয়েছেন
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={reset}>
              বাতিল
            </Button>
            <Button size="sm" onClick={finishExam}>
              জমা দিন
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--neutral-200)]">
          <div
            className="h-full bg-[var(--accent)] transition-all"
            style={{
              width: `${(answeredCount / selectedQuestions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question navigator */}
        <div className="flex flex-wrap gap-2">
          {selectedQuestions.map((sq, i) => {
            const answered = answers[sq.id] !== undefined;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={sq.id}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isCurrent
                    ? "bg-[var(--accent)] text-white"
                    : answered
                    ? "bg-green-100 text-green-700"
                    : "bg-[var(--neutral-100)] text-[var(--neutral-500)]"
                }`}
              >
                {formatBengaliNumber(i + 1)}
              </button>
            );
          })}
        </div>

        {/* Current question */}
        <Card>
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
              {formatBengaliNumber(currentIndex + 1)}
            </span>
            <div className="flex-1">
              <p className="text-lg font-medium text-[var(--neutral-900)]">
                {q.stem}
              </p>
              <p className="mt-1 text-xs text-[var(--neutral-500)]">
                {q.subject} &middot; {q.chapter} &middot; {q.classLevel}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 pl-11">
            <OMRAnswerSheet
              question={q}
              value={answers[q.id] ?? null}
              onChange={(idx) => setAnswer(q.id, idx)}
            />
          </div>
        </Card>

        {/* Nav buttons */}
        <div className="flex justify-between">
          <Button
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            পূর্ববর্তী
          </Button>
          {currentIndex === selectedQuestions.length - 1 ? (
            <Button onClick={finishExam}>জমা দিন</Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              পরবর্তী
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ---- RESULT STATE ----
  const percentage =
    selectedQuestions.length > 0
      ? Math.round((score.correct / selectedQuestions.length) * 100)
      : 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--neutral-950)]">
          ফলাফল
        </h1>
        <Button variant="secondary" onClick={reset}>
          আবার দিন
        </Button>
      </div>

      {/* Score card */}
      <Card className="text-center">
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-4xl font-bold text-[var(--neutral-950)]">
              {formatBengaliNumber(score.correct)}/{formatBengaliNumber(selectedQuestions.length)}
            </p>
            <p className="mt-1 text-sm text-[var(--neutral-600)]">সঠিক উত্তর</p>
          </div>
          <div className="text-5xl font-bold text-[var(--accent)]">
            {formatBengaliNumber(percentage)}%
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <span className="text-green-600">সঠিক: {formatBengaliNumber(score.correct)}</span>
          <span className="text-red-600">ভুল: {formatBengaliNumber(score.wrong)}</span>
          <span className="text-[var(--neutral-500)]">ফাঁকা: {formatBengaliNumber(score.empty)}</span>
        </div>
      </Card>

      {/* Detailed results */}
      <div className="flex flex-col gap-2">
        {selectedQuestions.map((q, i) => (
          <OMRResultRow
            key={q.id}
            index={i}
            question={q}
            studentAnswer={answers[q.id] ?? null}
          />
        ))}
      </div>
    </div>
  );
}
