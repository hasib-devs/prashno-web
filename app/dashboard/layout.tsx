"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { getSession } from "@/lib/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setAuthed(true);
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--neutral-50)]">
        <p className="text-sm text-[var(--neutral-500)]">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!authed) return null;

  return <DashboardLayout>{children}</DashboardLayout>;
}
