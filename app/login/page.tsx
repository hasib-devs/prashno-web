"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LogoWithText } from "@/components/ui/logo";
import { validateCredentials, createSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    const user = validateCredentials(email.trim(), password);
    if (!user) {
      setError("ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }

    createSession(user);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--neutral-50)] px-4">
      <Card className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-block">
            <LogoWithText />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[var(--neutral-950)]">লগইন করুন</h1>
          <p className="mt-1 text-sm text-[var(--neutral-600)]">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            লগইন
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--neutral-600)]">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-[var(--accent)] hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </Card>
    </div>
  );
}
