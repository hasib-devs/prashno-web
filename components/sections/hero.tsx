"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { getSession } from "@/lib/auth";

export function HeroSection() {
  const session = typeof window !== "undefined" ? getSession() : null;

  return (
    <Section className="pt-24 lg:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            TEACHER-FOCUSED EXAM TOOLS
          </p>
          <h1 className="text-4xl font-bold leading-tight text-[var(--neutral-950)] sm:text-5xl">
            প্রশ্নপত্র তৈরী করুন ১ ক্লিকে — দ্রুত, সহজ, নির্ভুল
          </h1>
          <p className="text-lg leading-8 text-[var(--neutral-600)]">
            বাংলাদেশের শিক্ষকদের জন্য সম্পূর্ণ বাংলায় তৈরি প্রশ্নব্যাংক, OMR মূল্যায়ন ও অনলাইন পরীক্ষা প্ল্যাটফর্ম।
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => (window.location.href = session ? "/dashboard" : "/signup")}>
              বিনামূল্যে শুরু করুন
            </Button>
            <Button variant="secondary" size="lg">ডেমো দেখুন</Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--neutral-600)]">
            <span className="text-yellow-500">★★★★★</span>
            <span>ইতিমধ্যে ৩০,০০০+ শিক্ষা প্রতিষ্ঠান ব্যবহার করছে</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--neutral-200)] bg-[var(--surface)] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="h-3 w-3 rounded-full bg-green-400"></span>
              <span className="ml-4 text-xs text-[var(--neutral-500)]">app.prashnokotha.com</span>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-[var(--neutral-900)]">নতুন প্রশ্নপত্র তৈরী করুন</h3>
                <span className="rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">নতুন</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] text-sm font-bold text-white">প</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--neutral-900)]">গণিত — অধ্যায় ৩</p>
                    <p className="text-xs text-[var(--neutral-500)]">১৫ টি প্রশ্ন নির্বাচিত</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--success)] text-sm font-bold text-white">ই</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--neutral-900)]">ইংরেজি — অধ্যায় ৫</p>
                    <p className="text-xs text-[var(--neutral-500)]">১০ টি প্রশ্ন নির্বাচিত</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--warning)] text-sm font-bold text-white">ব</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--neutral-900)]">বিজ্ঞান — অধ্যায় ২</p>
                    <p className="text-xs text-[var(--neutral-500)]">২০ টি প্রশ্ন নির্বাচিত</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)] px-4 py-2 shadow-lg">
            <p className="text-xs font-medium text-[var(--success)]">✓ প্রশ্নপত্র তৈরি হয়েছে!</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
