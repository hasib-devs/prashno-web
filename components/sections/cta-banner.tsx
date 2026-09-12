"use client";

import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";

export function CTABanner() {
  const session = typeof window !== "undefined" ? getSession() : null;

  return (
    <section className="bg-[var(--accent)] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="text-3xl font-bold text-white">
          আজই শুরু করুন — বিনামূল্যে
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          ৫০ টি প্রশ্ন তৈরী করুন কোনো কার্ড ছাড়াই
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-[var(--accent)] hover:bg-blue-50"
            onClick={() => (window.location.href = session ? "/dashboard" : "/signup")}
          >
            এখনই শুরু করুন
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
            onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
          >
            ডেমো দেখুন
          </Button>
        </div>
      </div>
    </section>
  );
}
