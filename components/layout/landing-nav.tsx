"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { getSession, clearSession } from "@/lib/auth";
import { LogoMark } from "@/components/ui/logo";

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const session = typeof window !== "undefined" ? getSession() : null;
  const [loggedIn, setLoggedIn] = useState(!!session);

  const handleLogout = () => {
    clearSession();
    setLoggedIn(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[var(--neutral-200)] bg-[var(--surface)]/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--neutral-950)]">
          <LogoMark size={32} />
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--neutral-600)] transition-colors hover:text-[var(--neutral-900)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {loggedIn ? (
            <>
              <span className="text-sm font-medium text-[var(--neutral-600)]">
                {getSession()?.name}
              </span>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--neutral-900)] transition-colors hover:bg-[var(--neutral-100)]"
              >
                ড্যাশবোর্ড
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                লগআউট
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-transparent px-3 py-1.5 text-sm font-semibold text-[var(--neutral-600)] transition-colors hover:bg-[var(--neutral-100)]"
              >
                লগইন
              </Link>
              <Button size="sm" onClick={() => (window.location.href = "/signup")}>
                শুরু করুন
              </Button>
            </>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--neutral-600)] hover:bg-[var(--neutral-100)] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--neutral-200)] bg-[var(--surface)] p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {loggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white px-3 py-2 text-sm font-medium text-[var(--neutral-900)] hover:bg-[var(--neutral-100)]"
                  >
                    ড্যাশবোর্ড
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    লগআউট
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]"
                  >
                    লগইন
                  </Link>
                  <Button size="sm" onClick={() => (window.location.href = "/signup")}>
                    শুরু করুন
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
