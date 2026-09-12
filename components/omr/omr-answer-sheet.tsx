"use client";

import { cn } from "@/lib/cn";
import { OPTION_LABELS } from "@/lib/question-types";
import type { Question } from "@/lib/question-types";

interface OMRAnswerSheetProps {
  question: Question;
  value: number | null;
  onChange: (idx: number) => void;
}

export function OMRAnswerSheet({ question, value, onChange }: OMRAnswerSheetProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 w-8 shrink-0 text-sm font-medium text-[var(--neutral-600)]">
        {value !== null ? OPTION_LABELS[value] : ""}
      </span>
      <div className="flex gap-2">
        {OPTION_LABELS.map((label, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(idx)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
              value === idx
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--neutral-300)] bg-[var(--surface)] text-[var(--neutral-700)] hover:border-[var(--accent)]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
