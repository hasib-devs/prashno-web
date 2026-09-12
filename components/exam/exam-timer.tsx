"use client";

import { cn } from "@/lib/cn";
import { OPTION_LABELS } from "@/lib/question-types";
import type { Question } from "@/lib/question-types";

interface ExamTimerProps {
  secondsLeft: number;
  totalSeconds: number;
}

export function ExamTimer({ secondsLeft, totalSeconds }: ExamTimerProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLow = secondsLeft <= 60;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-1.5 font-mono text-lg font-bold",
        isLow ? "bg-red-100 text-red-700" : "bg-[var(--neutral-100)] text-[var(--neutral-800)]"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
