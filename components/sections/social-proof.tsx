import { Section } from "@/components/layout/section";
import { formatBengaliNumber } from "@/lib/utils";

const stats = [
  { value: 30000, label: "শিক্ষকবৃন্দ", suffix: "+" },
  { value: 500000, label: "প্রশ্ন তৈরি হয়েছে", suffix: "+" },
  { value: 98, label: "সন্তুষ্টি হার", suffix: "%" },
  { value: 24, label: "সাপোর্ট", suffix: "/৭" },
];

export function SocialProofBar() {
  return (
    <Section className="border-y border-[var(--neutral-200)] bg-[var(--neutral-50)] py-8">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-[var(--accent)]">
              {formatBengaliNumber(stat.value)}{stat.suffix}
            </p>
            <p className="mt-1 text-sm text-[var(--neutral-600)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
