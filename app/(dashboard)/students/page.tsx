import { EmptyState } from "@/components/ui/data-display";

export default function StudentsPage() {
  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[var(--neutral-950)]">শিক্ষার্থী</h1>
      <EmptyState
        title="শীঘ্রই আসছে"
        description="শিক্ষার্থী ব্যবস্থাপনা শীঘ্রই চালু হবে"
        icon={<span className="text-4xl">👥</span>}
      />
    </div>
  );
}
