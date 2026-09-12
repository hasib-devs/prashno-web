"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createUser, getUsers, createSession } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("নাম দিন");
      return;
    }
    if (!email.trim()) {
      setError("ইমেইল দিন");
      return;
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    const existing = getUsers().find((u) => u.email === email.trim().toLowerCase());
    if (existing) {
      setError("এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে");
      return;
    }

    const user = createUser(name.trim(), email.trim(), password);
    createSession(user);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--neutral-50)] px-4">
      <Card className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-[var(--neutral-950)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] text-sm font-bold text-white">প</span>
            PrashnoKotha
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[var(--neutral-950)]">সাইন আপ করুন</h1>
          <p className="mt-1 text-sm text-[var(--neutral-600)]">
            বিনামূল্যে শুরু করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="নাম"
            type="text"
            placeholder="আপনার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="ইমেইল"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="পাসওয়ার্ড"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-sm text-[var(--danger)]">{error}</p>
          )}
          <Button type="submit" className="w-full">
            সাইন আপ
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--neutral-600)]">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="font-medium text-[var(--accent)] hover:underline">
            লগইন করুন
          </Link>
        </p>
      </Card>
    </div>
  );
}
