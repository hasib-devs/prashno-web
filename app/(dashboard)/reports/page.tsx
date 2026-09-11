import { EmptyState } from "@/components/ui/data-display";

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[var(--neutral-950)]">রিপোর্ট</h1>
      <EmptyState
        title="শীঘ্রই আসছে"
        description="রিপোর্টিং ফিচার শীঘ্রই চালু হবে"
        icon={<span className="text-4xl">📈</span>}
      />
    </div>
  );
}
