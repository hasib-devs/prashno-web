"use client";

import { cn } from "@/lib/cn";
import { OPTION_LABELS } from "@/lib/question-types";
import type { Question } from "@/lib/question-types";

interface ExamQuestionCardProps {
  question: Question;
  index: number;
  value: number | null;
  onChange: (idx: number) => void;
  showResult: boolean;
}

export function ExamQuestionCard({
  question,
  index,
  value,
  onChange,
  showResult,
}: ExamQuestionCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
          {index + 1}
        </span>
        <p className="text-base font-medium text-[var(--neutral-900)]">
          {question.stem}
        </p>
      </div>
      <div className="grid gap-2 pl-11 sm:grid-cols-2">
        {question.options.map((opt, idx) => {
          const isSelected = value === idx;
          const isCorrect = question.correctIndex === idx;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !showResult && onChange(idx)}
              disabled={showResult}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm transition-colors",
                !showResult && isSelected && "border-[var(--accent)] bg-blue-50",
                !showResult && !isSelected && "border-[var(--neutral-200)] bg-[var(--surface)] hover:border-[var(--accent)]",
                showCorrect && "border-green-400 bg-green-50",
                showWrong && "border-red-400 bg-red-50",
                showResult && !showCorrect && !showWrong && "border-[var(--neutral-200)] bg-[var(--surface)] opacity-60"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  !showResult && "bg-[var(--neutral-100)] text-[var(--neutral-600)]",
                  showCorrect && "bg-green-500 text-white",
                  showWrong && "bg-red-500 text-white",
                  showResult && !showCorrect && !showWrong && "bg-[var(--neutral-100)] text-[var(--neutral-400)]"
                )}
              >
                {OPTION_LABELS[idx]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
