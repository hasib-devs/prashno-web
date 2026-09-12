"use client";

import { useEffect, useState } from "react";
import { StatCard, EmptyState } from "@/components/ui/data-display";
import { Button } from "@/components/ui/button";
import { formatBengaliNumber } from "@/lib/utils";
import { loadQuestions } from "@/lib/question-store";
import { getSession } from "@/lib/auth";

const quickActions = [
  { label: "নতুন প্রশ্ন তৈরী", icon: "📝", href: "/dashboard/questions" },
  { label: "OMR স্ক্যান", icon: "📊", href: "/dashboard/omr" },
  { label: "পরীক্ষা তৈরী", icon: "💻", href: "/dashboard/exams" },
];

export default function DashboardHome() {
  const [name, setName] = useState("");
  const [qCount, setQCount] = useState(0);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    const session = getSession();
    if (session) setName(session.name);
    const bank = loadQuestions();
    setQCount(bank.length);
    setSubjects(Array.from(new Set(bank.map((q) => q.subject))));
  }, []);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--neutral-950)]">
          স্বাগতম, {name || "শিক্ষক"} 👋
        </h1>
        <p className="mt-1 text-[var(--neutral-600)]">আজকের সংক্ষিপ্ত চিত্র</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={formatBengaliNumber(qCount)}
          label="মোট প্রশ্ন"
        />
        <StatCard
          value={formatBengaliNumber(subjects.length)}
          label="বিষয়"
        />
        <StatCard
          value="০"
          label="সক্রিয় পরীক্ষা"
        />
        <StatCard
          value="০"
          label="শিক্ষার্থী"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[var(--neutral-900)]">
          দ্রুত কাজ শুরু করুন
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)] hover:shadow-md"
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="font-semibold text-[var(--neutral-900)]">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[var(--neutral-900)]">
          প্রশ্ন বিভাগ অনুযায়ী
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-3">
              <EmptyState
                title="কোনো প্রশ্ন নেই"
                description="প্রশ্নব্যাংকে প্রশ্ন যোগ করুন"
                action={
                  <a
                    href="/dashboard/questions"
                    className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--accent-hover)]"
                  >
                    প্রশ্ন তৈরী
                  </a>
                }
                icon={<span className="text-4xl">📝</span>}
              />
            </div>
          ) : (
            subjects.map((s) => {
              const count = loadQuestions().filter((q) => q.subject === s).length;
              return (
                <a
                  key={s}
                  href="/dashboard/questions"
                  className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-3 hover:border-[var(--accent)]"
                >
                  <span className="font-medium text-[var(--neutral-900)]">
                    {s}
                  </span>
                  <span className="text-sm text-[var(--neutral-500)]">
                    {formatBengaliNumber(count)}টি
                  </span>
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
