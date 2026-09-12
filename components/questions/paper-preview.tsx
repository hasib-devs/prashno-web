"use client";

import { OPTION_LABELS, type Question } from "@/lib/question-types";
import { formatBengaliNumber } from "@/lib/utils";

export function PaperPreview({ questions }: { questions: Question[] }) {
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const date = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (questions.length === 0) {
    return (
      <div
        id="paper-preview"
        className="flex min-h-[400px] flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--neutral-200)] bg-[var(--surface)] p-8 text-center"
      >
        <span className="text-4xl">📄</span>
        <p className="mt-4 font-semibold text-[var(--neutral-900)]">
          এখনো কোনো প্রশ্ন নির্বাচন করা হয়নি
        </p>
        <p className="mt-1 text-sm text-[var(--neutral-600)]">
          বাম পাশ থেকে প্রশ্ন টিক দিন — এখানে লাইভ প্রিভিউ দেখা যাবে
        </p>
      </div>
    );
  }

  return (
    <div
      id="paper-preview"
      className="rounded-[var(--radius-xl)] border border-[var(--neutral-200)] bg-[var(--surface)] p-8 shadow-sm"
    >
      <div className="border-b-2 border-[var(--neutral-900)] pb-4 text-center">
        <h2 className="text-xl font-bold text-[var(--neutral-950)]">
          প্রশ্নপত্র
        </h2>
        <p className="mt-1 text-sm text-[var(--neutral-600)]">PrashnoKotha মূল্যায়ন পত্র</p>
        <div className="mt-2 flex items-center justify-between text-sm text-[var(--neutral-600)]">
          <span>তারিখ: {date}</span>
          <span>
            পূর্ণমান: {formatBengaliNumber(totalMarks)} | প্রশ্ন:{" "}
            {formatBengaliNumber(questions.length)}টি
          </span>
        </div>
      </div>
      <ol className="mt-6 flex flex-col gap-5">
        {questions.map((q, qi) => (
          <li key={q.id}>
            <p className="font-medium text-[var(--neutral-900)]">
              {formatBengaliNumber(qi + 1)}. {q.stem}
              <span className="ml-2 text-sm font-normal text-[var(--neutral-500)]">
                [{formatBengaliNumber(q.marks)}]
              </span>
            </p>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {q.options.map((opt, oi) => (
                <li
                  key={oi}
                  className="text-[15px] text-[var(--neutral-700)]"
                >
                  {OPTION_LABELS[oi]}. {opt}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
