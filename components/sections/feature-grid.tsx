import { Section } from "@/components/layout/section";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: "📝",
    title: "১ ক্লিকে প্রশ্ন তৈরী",
    description: "বোর্ড প্রশ্ন, অধ্যায়ভিত্তিক, বিষয়ভিত্তিক প্রশ্ন সন্ধান করে তাৎক্ষণিকভাবে প্রশ্নপত্র তৈরী করুন।",
  },
  {
    icon: "📊",
    title: "চোখের পলকে OMR মূল্যায়ন",
    description: "স্ক্যান করুন OMR শীট, অটো চেক করুন সঠিক/ভুল, নেগেটিভ মার্কিং সহ রেজাল্ট জেনারেট করুন।",
  },
  {
    icon: "💻",
    title: "অনলাইন পরীক্ষা তৈরী",
    description: "এক্সাম ব্যাচ তৈরী করুন, সিকিউর লিংক শেয়ার করুন, ডিটেইল্ড রিপোর্ট পান।",
  },
];

export function FeatureGrid() {
  return (
    <Section id="features">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          FEATURES
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[var(--neutral-950)]">
          সবকিছু এক জায়গায়
        </h2>
        <p className="mt-4 text-[var(--neutral-600)]">
          প্রশ্ন তৈরী থেকে পরীক্ষা পর্যন্ত — সম্পূর্ণ ওয়ার্কফ্লো
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-shadow hover:shadow-lg">
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription className="mt-2">{feature.description}</CardDescription>
          </Card>
        ))}
      </div>
    </Section>
  );
}
