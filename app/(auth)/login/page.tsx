import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>লগইন করুন</CardTitle>
        <CardDescription>আপনার অ্যাকাউন্টে প্রবেশ করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input label="ইমেইল" type="email" placeholder="you@example.com" />
          <Input label="পাসওয়ার্ড" type="password" placeholder="••••••••" />
          <Button className="w-full" size="lg">লগইন</Button>
        </form>
        <p className="mt-4 text-center text-sm text-[var(--neutral-600)]">
          অ্যাকাউন্ট নেই? <a href="/register" className="font-medium text-[var(--accent)] hover:underline">রেজিস্টার করুন</a>
        </p>
      </CardContent>
    </Card>
  );
}
