"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";

const faqs = [
  {
    question: "প্রশ্নব্যাংকে কোন বিষয়গুলো আছে?",
    answer: "আমাদের প্রশ্নব্যাংকে তৃতীয় থেকে দ্বাদশ শ্রেণির সকল বিষয়ের প্রশ্ন রয়েছে — গণিত, ইংরেজি, বাংলা, বিজ্ঞান, সামাজিক বিজ্ঞান, ইতিহাস ও অন্যান্য।",
  },
  {
    question: "OMR মূল্যায়ন কি ফ্রি?",
    answer: "হ্যাঁ, ফ্রি প্ল্যানে মাসে ১০ টি OMR স্ক্যান করা যায়। স্টার্টার প্ল্যানে ১০০ টি এবং প্রো প্ল্যানে আনলিমিটেড স্ক্যান।",
  },
  {
    question: "প্ল্যান কিভাবে আপগ্রেড করব?",
    answer: "ড্যাশবোর্ড থেকে Settings → Billing এ গিয়ে যেকোনো সময় আপনার প্ল্যান পরিবর্তন করতে পারবেন।",
  },
  {
    question: "অনলাইন পরীক্ষায় কতটি প্রশ্ন অ্যাড করা যায়?",
    answer: "ফ্রি প্ল্যানে ২৫ টি, স্টার্টার ১০০ টি এবং প্রো প্ল্যানে ২০০ টি পর্যন্ত প্রশ্ন অ্যাড করা যায়।",
  },
  {
    question: "পেমেন্ট কিভাবে করব?",
    answer: "আমরা bKash, Nagad, ক্রেডিট/ডেবিট কার্ড ও ব্যাংক ট্রান্সফার গ্রহণ করি।",
  },
  {
    question: "ডেটা কি নিরাপদ?",
    answer: "আপনার সমস্ত ডেটা এন্ড-টু-এন্ড এনক্রিপশন সহ ক্লাউডে সংরক্ষিত হয়। আমরা কখনোই তৃতীয় পক্ষের সাথে আপনার ডেটা শেয়ার করি না।",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" className="bg-[var(--neutral-50)]">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          FAQ
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[var(--neutral-950)]">
          সাধারণ প্রশ্নোত্তর
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <div className="flex flex-col divide-y divide-[var(--neutral-200)] rounded-[var(--radius-xl)] border border-[var(--neutral-200)] bg-[var(--surface)]">
          {faqs.map((faq, index) => (
            <div key={index} className="px-6">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="font-semibold text-[var(--neutral-900)]">{faq.question}</span>
                <span className={`text-[var(--neutral-400)] transition-transform ${openIndex === index ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <p className="pb-4 text-[var(--neutral-600)]">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
