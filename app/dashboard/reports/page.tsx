"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState, StatCard } from "@/components/ui/data-display";
import { loadExamResults, clearExamResults } from "@/lib/exam-result-store";
import { formatBengaliNumber } from "@/lib/utils";
import type { ExamResult } from "@/lib/exam-result-types";

export default function ReportsPage() {
  const [results, setResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    setResults(loadExamResults());
  }, []);

  const handleClear = () => {
    if (!confirm("সমস্ত রিপোর্ট মুছে যাবে। নিশ্চিত?")) return;
    clearExamResults();
    setResults([]);
  };

  // Aggregate stats
  const stats = useMemo(() => {
    if (results.length === 0) return null;
    const totalExams = results.length;
    const avgPercentage = Math.round(
      results.reduce((sum, r) => sum + r.percentage, 0) / totalExams
    );
    const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
    const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
    const overallAccuracy =
      totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    return { totalExams, avgPercentage, totalQuestions, overallAccuracy };
  }, [results]);

  // Subject breakdown
  const subjectStats = useMemo(() => {
    const map = new Map<string, { total: number; correct: number }>();
    for (const r of results) {
      for (const q of r.questions) {
        const existing = map.get(q.subject) || { total: 0, correct: 0 };
        existing.total++;
        if (q.studentAnswer === q.correctIndex) existing.correct++;
        map.set(q.subject, existing);
      }
    }
    return Array.from(map.entries())
      .map(([subject, { total, correct }]) => ({
        subject,
        total,
        correct,
        percentage: Math.round((correct / total) * 100),
      }))
      .sort((a, b) => b.total - a.total);
  }, [results]);

  if (results.length === 0) {
    return (
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[var(--neutral-950)]">রিপোর্ট</h1>
        <EmptyState
          title="কোনো রিপোর্ট নেই"
          description="পরীক্ষা দিন — ফলাফল এখানে দেখা যাবে"
          action={
            <a
              href="/dashboard/omr"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--accent-hover)]"
            >
              OMR মূল্যায়ন
            </a>
          }
          icon={<span className="text-4xl">📈</span>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--neutral-950)]">রিপোর্ট</h1>
          <p className="mt-1 text-[var(--neutral-600)]">
            {formatBengaliNumber(results.length)}টি পরীক্ষার ফলাফল
          </p>
        </div>
        <Button variant="danger" size="sm" onClick={handleClear}>
          সব মুছুন
        </Button>
      </div>

      {/* Summary stats */}
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            value={formatBengaliNumber(stats.totalExams)}
            label="মোট পরীক্ষা"
          />
          <StatCard
            value={`${formatBengaliNumber(stats.avgPercentage)}%`}
            label="গড় স্কোর"
          />
          <StatCard
            value={formatBengaliNumber(stats.totalQuestions)}
            label="মোট প্রশ্ন"
          />
          <StatCard
            value={`${formatBengaliNumber(stats.overallAccuracy)}%`}
            label="সামগ্রিক নির্ভুলতা"
          />
        </div>
      )}

      {/* Subject breakdown */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--neutral-900)]">
          বিষয়ভিত্তিক বিশ্লেষণ
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjectStats.map((s) => (
            <Card key={s.subject}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--neutral-900)]">
                  {s.subject}
                </span>
                <span className="text-2xl font-bold text-[var(--accent)]">
                  {formatBengaliNumber(s.percentage)}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--neutral-200)]">
                <div
                  className="h-full bg-[var(--accent)] transition-all"
                  style={{ width: `${s.percentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[var(--neutral-500)]">
                {formatBengaliNumber(s.correct)}/{formatBengaliNumber(s.total)} সঠিক
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent results */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--neutral-900)]">
          সাম্প্রতিক ফলাফল
        </h2>
        <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] text-left text-[var(--neutral-600)]">
                <th className="px-4 py-3 font-medium">তারিখ</th>
                <th className="px-4 py-3 font-medium">ধরন</th>
                <th className="px-4 py-3 font-medium">ফলাফল</th>
                <th className="px-4 py-3 font-medium text-right">শতাংশ</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[var(--neutral-100)] last:border-0 hover:bg-[var(--neutral-50)]"
                >
                  <td className="px-4 py-3 text-[var(--neutral-700)]">
                    {new Date(r.timestamp).toLocaleDateString("bn-BD")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        r.type === "omr"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {r.type === "omr" ? "OMR" : "অনলাইন"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">
                    {formatBengaliNumber(r.correct)}/{formatBengaliNumber(r.totalQuestions)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`font-semibold ${
                        r.percentage >= 70
                          ? "text-green-600"
                          : r.percentage >= 40
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatBengaliNumber(r.percentage)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
