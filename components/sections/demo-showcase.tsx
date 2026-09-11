"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";

const tabs = [
  {
    id: "question-gen",
    label: "প্রশ্ন তৈরী",
    icon: "📝",
    bullets: ["অধ্যায় ও বিষয়ভিত্তিক প্রশ্ন সন্ধান", "বোর্ড ও নির্বাচনী পরীক্ষার প্রশ্ন", "নিজের প্রশ্ন যুক্ত করা যায়"],
  },
  {
    id: "omr",
    label: "OMR মূল্যায়ন",
    icon: "📊",
    bullets: ["স্ক্যান করা OMR শীট অটো চেক", "নেগেটিভ মার্কিং সুবিধা", "সঠিক/ভুল বিশ্লেষণ"],
  },
  {
    id: "online-exam",
    label: "অনলাইন পরীক্ষা",
    icon: "💻",
    bullets: ["এক্সাম ব্যাচ তৈরী", "সিকিউর লিংক শেয়ার", "ডিটেইল্ড রিপোর্ট"],
  },
];

export function DemoShowcase() {
  const [activeTab, setActiveTab] = useState("question-gen");
  const activeContent = tabs.find((t) => t.id === activeTab);

  return (
    <Section id="demo" className="bg-[var(--neutral-50)]">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              PRODUCT DEMO
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--neutral-950)]">
              দেখুন কিভাবে কাজ করে
            </h2>
            <p className="mt-4 text-[var(--neutral-600)]">
              প্রতিটি ফিচার কিভাবে আপনার কাজ সহজ করে দেয়
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 rounded-[var(--radius-lg)] border p-4 text-left transition-colors ${
                  activeTab === tab.id
                    ? "border-[var(--accent)] bg-[var(--accent-light)]"
                    : "border-[var(--neutral-200)] bg-[var(--surface)] hover:bg-[var(--neutral-50)]"
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="font-semibold text-[var(--neutral-900)]">{tab.label}</span>
              </button>
            ))}
          </div>

          <ul className="flex flex-col gap-3">
            {activeContent?.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-[var(--neutral-700)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-light)] text-xs text-[var(--accent)]">✓</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--neutral-200)] bg-[var(--surface)] shadow-xl">
            <div className="flex items-center gap-2 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="h-3 w-3 rounded-full bg-green-400"></span>
              <span className="ml-4 text-xs text-[var(--neutral-500)]">app.prashnokotha.com</span>
            </div>
            <div className="flex h-64 items-center justify-center p-8 text-center">
              <div>
                <p className="text-3xl">{activeContent?.icon}</p>
                <p className="mt-2 font-semibold text-[var(--neutral-900)]">{activeContent?.label}</p>
                <p className="mt-1 text-sm text-[var(--neutral-500)]">এখানে স্ক্রিনশট দেখানো হবে</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
