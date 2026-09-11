import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>রেজিস্টার করুন</CardTitle>
        <CardDescription>নতুন অ্যাকাউন্ট তৈরি করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input label="নাম" type="text" placeholder="আপনার নাম" />
          <Input label="ইমেইল" type="email" placeholder="you@example.com" />
          <Input label="পাসওয়ার্ড" type="password" placeholder="••••••••" />
          <Button className="w-full" size="lg">রেজিস্টার</Button>
        </form>
        <p className="mt-4 text-center text-sm text-[var(--neutral-600)]">
          ইতিমধ্যে অ্যাকাউন্ট আছে? <a href="/login" className="font-medium text-[var(--accent)] hover:underline">লগইন করুন</a>
        </p>
      </CardContent>
    </Card>
  );
}
