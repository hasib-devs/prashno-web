import { Section } from "@/components/layout/section";
import { Avatar } from "@/components/ui/data-display";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "রহিমা খাতুন",
    role: "সপ্তম শ্রেণির শিক্ষিকা, ঢাকা",
    fallback: "র",
    quote: "প্রশ্নপত্র তৈরী করতে আগে ২-৩ ঘণ্টা লাগত, এখন মাত্র ৫ মিনিটে হয়ে যায়। সত্যিই চমৎকার টুল!",
  },
  {
    name: "কামাল হোসেন",
    role: "দশম শ্রেণির শিক্ষক, চট্টগ্রাম",
    fallback: "ক",
    quote: "OMR মূল্যায়ন ফিচারটা অসাধারণ। আগে হাতে চেক করতে লাগত ১ ঘণা, এখন সেকেন্ডে হয়ে যায়।",
  },
  {
    name: "ফাহিম আহমেদ",
    role: "একাদশ শ্রেণির সহকারী অধ্যাপক, রাজশাহী",
    fallback: "ফ",
    quote: "অনলাইন পরীক্ষার ব্যবস্থা আমাদের স্কুলে জরুরি ছিল। PrashnoKotha সত্যিই সেই চাহিদা পূরণ করেছে।",
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          TESTIMONIALS
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[var(--neutral-950)]">
          শিক্ষকরা যা বলছেন
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name}>
            <CardContent>
              <div className="mb-4 text-yellow-500">★★★★★</div>
              <p className="text-[var(--neutral-700)]">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar fallback={testimonial.fallback} />
                <div>
                  <p className="font-semibold text-[var(--neutral-900)]">{testimonial.name}</p>
                  <p className="text-sm text-[var(--neutral-600)]">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
