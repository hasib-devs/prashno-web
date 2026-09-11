import { EmptyState } from "@/components/ui/data-display";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="text-3xl font-bold text-[var(--neutral-950)]">প্রাইসিং</h1>
      <p className="mt-4 text-[var(--neutral-600)]">আপনার প্রয়োজন অনুযায়ী প্ল্যান বেছে নিন</p>
      <div className="mt-8">
        <EmptyState
          title="শীঘ্রই আসছে"
          description="বিস্তারিত প্রাইসিং তথ্য শীঘ্রই যোগ করা হবে"
          icon={<span className="text-4xl">💰</span>}
        />
      </div>
    </div>
  );
}
