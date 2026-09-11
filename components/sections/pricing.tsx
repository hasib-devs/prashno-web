"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { formatBengaliCurrency } from "@/lib/utils";

const plans = [
  {
    name: "ফ্রি",
    price: 0,
    description: "শুরু করুন বিনামূল্যে",
    features: [
      "৫০ টি প্রশ্ন/মাস",
      "৫ টি পরীক্ষা/মাস",
      "১০ টি OMR স্ক্যান",
      "ক্লাউড ব্যাকআপ নেই",
    ],
    cta: "বিনামূল্যে শুরু",
    highlighted: false,
  },
  {
    name: "স্টার্টার",
    price: 299,
    description: "ব্যক্তিগত শিক্ষকদের জন্য",
    features: [
      "আনলিমিটেড প্রশ্ন",
      "৫০ টি পরীক্ষা/মাস",
      "১০০ টি OMR স্ক্যান",
      "ক্লাউড ব্যাকআপ",
    ],
    cta: "স্টার্টার শুরু",
    highlighted: true,
  },
  {
    name: "প্রো",
    price: 799,
    description: "পাওয়ার ইউজারদের জন্য",
    features: [
      "আনলিমিটেড প্রশ্ন",
      "আনলিমিটেড পরীক্ষা",
      "আনলিমিটেড OMR স্ক্যান",
      "কাস্টম ব্র্যান্ডিং",
      "প্রায়োরিটি সাপোর্ট",
    ],
    cta: "প্রো শুরু",
    highlighted: false,
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <Section id="pricing">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          PRICING
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[var(--neutral-950)]">
          আপনার প্রয়োজন অনুযায়ী প্ল্যান বেছে নিন
        </h2>
        <p className="mt-4 text-[var(--neutral-600)]">
          বিনামূল্যে শুরু করুন, প্রয়োজনে আপগ্রেড করুন
        </p>

        <div className="mt-8 inline-flex rounded-full border border-[var(--neutral-200)] bg-[var(--surface)] p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              billing === "monthly"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--neutral-600)] hover:text-[var(--neutral-900)]"
            }`}
          >
            মাসিক
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              billing === "annual"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--neutral-600)] hover:text-[var(--neutral-900)]"
            }`}
          >
            বার্ষিক (২ মাস ফ্রি)
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = billing === "annual" && plan.price > 0 ? Math.round(plan.price * 10) : plan.price;
          return (
            <Card
              key={plan.name}
              className={plan.highlighted ? "border-2 border-[var(--accent)] shadow-lg lg:scale-105" : ""}
            >
              <CardHeader>
                {plan.highlighted && (
                  <span className="mb-2 inline-block w-fit rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                    জনপ্রিয়
                  </span>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-sm text-[var(--neutral-600)]">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[var(--neutral-950)]">
                  {formatBengaliCurrency(price)}
                  <span className="text-sm font-normal text-[var(--neutral-600)]">
                    /{billing === "monthly" ? "মাস" : "বছর"}
                  </span>
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[var(--neutral-700)]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-light)] text-xs text-[var(--accent)]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.highlighted ? "primary" : "secondary"} size="lg">
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
