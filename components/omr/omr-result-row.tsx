"use client";

import { cn } from "@/lib/cn";
import { OPTION_LABELS } from "@/lib/question-types";
import type { Question } from "@/lib/question-types";

interface OMRResultRowProps {
  index: number;
  question: Question;
  studentAnswer: number | null;
}

export function OMRResultRow({ index, question, studentAnswer }: OMRResultRowProps) {
  const isCorrect = studentAnswer === question.correctIndex;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-[var(--radius-md)] border px-4 py-3",
        isCorrect
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[var(--neutral-500)]">
          {index + 1}.
        </span>
        <span className="text-sm font-medium text-[var(--neutral-900)]">
          {question.stem}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {OPTION_LABELS.map((label, idx) => {
            const isStudent = studentAnswer === idx;
            const isAnswer = question.correctIndex === idx;
            return (
              <span
                key={idx}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                  isAnswer && "bg-green-500 text-white",
                  isStudent && !isAnswer && "bg-red-500 text-white",
                  !isStudent && !isAnswer && "bg-[var(--neutral-100)] text-[var(--neutral-500)]"
                )}
              >
                {label}
              </span>
            );
          })}
        </div>
        <span
          className={cn(
            "min-w-[60px] text-right text-sm font-semibold",
            isCorrect ? "text-green-600" : "text-red-600"
          )}
        >
          {isCorrect ? "সঠিক" : studentAnswer === null ? "ফাঁকা" : "ভুল"}
        </span>
      </div>
    </div>
  );
}
