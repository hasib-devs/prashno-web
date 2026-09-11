import { EmptyState } from "@/components/ui/data-display";

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="text-3xl font-bold text-[var(--neutral-950)]">রিসোর্স</h1>
      <p className="mt-4 text-[var(--neutral-600)]">NCTB বই, ব্লগ ও সাহায্য</p>
      <div className="mt-8">
        <EmptyState
          title="শীঘ্রই আসছে"
          description="রিসোর্স সেকশন শীঘ্রই চালু হবে"
          icon={<span className="text-4xl">📚</span>}
        />
      </div>
    </div>
  );
}
