"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSession, clearSession } from "@/lib/auth";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session) setName(session.name);
  }, []);

  const handleSave = () => {
    if (!name.trim()) return;
    const session = getSession();
    if (session) {
      const users = JSON.parse(localStorage.getItem("pk-users-v1") || "[]");
      const updated = users.map((u: { id: string; name: string }) =>
        u.id === session.userId ? { ...u, name: name.trim() } : u
      );
      localStorage.setItem("pk-users-v1", JSON.stringify(updated));
      const newSession = { ...session, name: name.trim() };
      localStorage.setItem("pk-session-v1", JSON.stringify(newSession));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleResetData = () => {
    if (!confirm("সমস্ত প্রশ্ন ও ডেটা মুছে যাবে। নিশ্চিত?")) return;
    localStorage.removeItem("pk-questions-v1");
    localStorage.removeItem("pk-students-v1");
    localStorage.removeItem("pk-users-v1");
    clearSession();
    window.location.href = "/";
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-bold text-[var(--neutral-950)]">সেটিংস</h1>

      <Card>
        <h3 className="text-lg font-semibold text-[var(--neutral-900)]">
          প্রোফাইল
        </h3>
        <p className="mt-1 text-sm text-[var(--neutral-600)]">
          আপনার নাম পরিবর্তন করুন
        </p>
        <div className="mt-4 space-y-4">
          <Input
            label="নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={!name.trim()}>
              সংরক্ষণ
            </Button>
            {saved && (
              <span className="text-sm text-green-600">সংরক্ষিত ✓</span>
            )}
          </div>
        </div>
      </Card>

      <Card className="border-[var(--danger)]">
        <h3 className="text-lg font-semibold text-[var(--danger)]">
          বিপজ্জনক এলাকা
        </h3>
        <p className="mt-1 text-sm text-[var(--neutral-600)]">
          সমস্ত ডেটা মুছে ফেলুন এবং প্রস্থান করুন
        </p>
        <div className="mt-4">
          <Button variant="danger" onClick={handleResetData}>
            সমস্ত ডেটা মুছুন
          </Button>
        </div>
      </Card>
    </div>
  );
}
