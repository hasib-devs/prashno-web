"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/data-display";
import { getSession } from "@/lib/auth";

export function DashboardTopBar() {
  const [name, setName] = useState("শিক্ষক");

  useEffect(() => {
    const session = getSession();
    if (session) setName(session.name);
  }, []);
  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--neutral-200)] bg-[var(--surface)] px-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="খুঁজুন..."
          className="w-64"
          icon={
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--danger)]"></span>
        </button>

        <div className="h-6 w-px bg-[var(--neutral-200)]"></div>

        <button className="flex items-center gap-2 rounded-[var(--radius-md)] px-2 py-1.5 hover:bg-[var(--neutral-100)]">
          <Avatar fallback={name.charAt(0)} />
          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium text-[var(--neutral-900)]">{name}</p>
            <p className="text-xs text-[var(--neutral-500)]">শিক্ষক</p>
          </div>
        </button>
      </div>
    </header>
  );
}
