import { StatCard, EmptyState } from "@/components/ui/data-display";
import { Button } from "@/components/ui/button";
import { formatBengaliNumber } from "@/lib/utils";

const stats = [
  { value: formatBengaliNumber(127), label: "এই মাসে প্রশ্ন তৈরি", trend: { value: "১২%", positive: true } },
  { value: formatBengaliNumber(8), label: "পরীক্ষা দেওয়া", trend: { value: "৩", positive: true } },
  { value: formatBengaliNumber(45), label: "OMR স্ক্যান", trend: { value: "৮%", positive: true } },
  { value: "৮৫%", label: "সামগ্রিক স্কোর গড়", trend: { value: "২%", positive: true } },
];

const quickActions = [
  { label: "নতুন প্রশ্ন তৈরী", icon: "📝", href: "/dashboard/questions" },
  { label: "OMR স্ক্যান", icon: "📊", href: "/dashboard/omr" },
  { label: "পরীক্ষা তৈরী", icon: "💻", href: "/dashboard/exams" },
];

export default function DashboardHome() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--neutral-950)]">স্বাগতম, বাবুল আক্তার 👋</h1>
        <p className="mt-1 text-[var(--neutral-600)]">আজকের সংক্ষিপ্ত চিত্র</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            trend={stat.trend}
          />
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[var(--neutral-900)]">দ্রুত কাজ শুরু করুন</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)] hover:shadow-md"
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="font-semibold text-[var(--neutral-900)]">{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[var(--neutral-900)]">সাম্প্রতিক কার্যকলাপ</h2>
        <div className="mt-4">
          <EmptyState
            title="এখনো কোনো কার্যকলাপ নেই"
            description="আপনার প্রথম প্রশ্নপত্র তৈরী করুন শুরু করতে"
            action={<Button>নতুন প্রশ্ন তৈরী করুন</Button>}
            icon={<span className="text-4xl">📋</span>}
          />
        </div>
      </div>
    </div>
  );
}
