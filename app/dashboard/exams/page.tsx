"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExamTimer } from "@/components/exam/exam-timer";
import { ExamQuestionCard } from "@/components/exam/exam-question-card";
import { loadQuestions } from "@/lib/question-store";
import { formatBengaliNumber } from "@/lib/utils";
import { saveExamResult } from "@/lib/exam-result-store";
import type { ExamResult } from "@/lib/exam-result-types";
import type { Question } from "@/lib/question-types";

type ExamState = "setup" | "active" | "result";

export default function ExamsPage() {
  const [bank, setBank] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [state, setState] = useState<ExamState>("setup");
  const [duration, setDuration] = useState(5); // minutes
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

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
    setSecondsLeft(duration * 60);
    setState("active");
  };

  const setAnswer = (questionId: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: idx }));
  };

  const finishExam = useCallback(() => {
    const result: ExamResult = {
      id: crypto.randomUUID(),
      type: "online",
      title: `অনলাইন পরীক্ষা — ${new Date().toLocaleDateString("bn-BD")}`,
      timestamp: Date.now(),
      totalQuestions: selectedQuestions.length,
      correct: 0,
      wrong: 0,
      empty: 0,
      percentage: 0,
      durationSeconds: duration * 60 - secondsLeft,
      questions: selectedQuestions.map((q) => {
        const a = answers[q.id];
        return {
          id: q.id,
          stem: q.stem,
          subject: q.subject,
          studentAnswer: a ?? null,
          correctIndex: q.correctIndex,
        };
      }),
    };
    for (const q of selectedQuestions) {
      const a = answers[q.id];
      if (a === undefined || a === null) result.empty++;
      else if (a === q.correctIndex) result.correct++;
      else result.wrong++;
    }
    result.percentage =
      selectedQuestions.length > 0
        ? Math.round((result.correct / selectedQuestions.length) * 100)
        : 0;
    saveExamResult(result);
    setState("result");
  }, [answers, duration, secondsLeft, selectedQuestions]);

  // Timer
  useEffect(() => {
    if (state !== "active") return;
    if (secondsLeft <= 0) {
      finishExam();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [state, secondsLeft, finishExam]);

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
        <div>
          <h1 className="text-2xl font-bold text-[var(--neutral-950)]">
            পরীক্ষা ব্যবস্থাপনা
          </h1>
          <p className="mt-1 text-[var(--neutral-600)]">
            প্রশ্ন নির্বাচন করুন ও সময় নির্ধারণ করুন, তারপর পরীক্ষা শুরু করুন
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--neutral-900)]">
                প্রশ্ন নির্বাচন
              </h2>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={selectAll}>
                  সব নির্বাচন
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  মুছুন
                </Button>
              </div>
            </div>
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
                পরীক্ষা সেটিংস
              </h3>
              <div className="mt-4 space-y-4">
                <Input
                  label="সমযকাল (মিনিট)"
                  type="number"
                  min={1}
                  max={180}
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <div className="space-y-2 text-sm">
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
              </div>
              <Button
                className="mt-4 w-full"
                disabled={selectedIds.length === 0}
                onClick={startExam}
              >
                পরীক্ষা শুরু করুন
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ---- ACTIVE EXAM STATE ----
  if (state === "active") {
    const q = selectedQuestions[currentIndex];
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--neutral-950)]">
              পরীক্ষা চলছে
            </h1>
            <p className="text-sm text-[var(--neutral-600)]">
              {formatBengaliNumber(answeredCount)}/{formatBengaliNumber(selectedQuestions.length)}টি উত্তর দিয়েছেন
            </p>
          </div>
          <ExamTimer secondsLeft={secondsLeft} totalSeconds={duration * 60} />
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
          <ExamQuestionCard
            question={q}
            index={currentIndex}
            value={answers[q.id] ?? null}
            onChange={(idx) => setAnswer(q.id, idx)}
            showResult={false}
          />
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
          পরীক্ষার ফলাফল
        </h1>
        <Button variant="secondary" onClick={reset}>
          নতুন পরীক্ষা
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
      <div className="flex flex-col gap-4">
        {selectedQuestions.map((q, i) => (
          <Card key={q.id}>
            <ExamQuestionCard
              question={q}
              index={i}
              value={answers[q.id] ?? null}
              onChange={() => {}}
              showResult={true}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
