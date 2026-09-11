import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrashnoKotha — প্রশ্নপত্র তৈরী করুন ১ ক্লিকে",
  description: "বাংলাদেশের শিক্ষকদের জন্য সম্পূর্ণ বাংলায় তৈরি প্রশ্নব্যাংক, OMR মূল্যায়ন ও অনলাইন পরীক্ষা প্ল্যাটফর্ম",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
