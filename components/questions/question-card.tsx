"use client";

import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { OPTION_LABELS, type Question } from "@/lib/question-types";

type QuestionCardProps = {
  question: Question;
  checked: boolean;
  onToggle: () => void;
};

export function QuestionCard({ question, checked, onToggle }: QuestionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors",
        checked && "border-[var(--accent)] bg-[var(--accent-light)]/30"
      )}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 h-4 w-4 accent-[#2563eb]"
          aria-label="নির্বাচন"
        />
        <div className="flex-1">
          <p className="font-medium text-[var(--neutral-900)]">{question.stem}</p>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {question.options.map((opt, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-[var(--neutral-600)]"
              >
                <span className="font-semibold text-[var(--neutral-900)]">
                  {OPTION_LABELS[i]}.
                </span>
                {opt}
                {i === question.correctIndex && (
                  <span className="rounded-full bg-[var(--accent-light)] px-1.5 text-xs text-[var(--accent)]">
                    ✓
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-[var(--neutral-100)] px-2 py-0.5 text-xs text-[var(--neutral-600)]">
              {question.subject}
            </span>
            <span className="rounded-full bg-[var(--neutral-100)] px-2 py-0.5 text-xs text-[var(--neutral-600)]">
              {question.chapter}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
