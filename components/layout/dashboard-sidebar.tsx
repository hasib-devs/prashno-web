"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";
import { clearSession } from "@/lib/auth";
import { LogoMark } from "@/components/ui/logo";

const navItems = [
  { href: "/dashboard", label: "ড্যাশবোর্ড", icon: "🏠" },
  { href: "/dashboard/questions", label: "প্রশ্নব্যাংক", icon: "📝" },
  { href: "/dashboard/omr", label: "OMR", icon: "📊" },
  { href: "/dashboard/exams", label: "পরীক্ষা", icon: "💻" },
  { href: "/dashboard/students", label: "শিক্ষার্থী", icon: "👥" },
  { href: "/dashboard/reports", label: "রিপোর্ট", icon: "📈" },
  { href: "/dashboard/settings", label: "সেটিংস", icon: "⚙️" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-[var(--neutral-200)] bg-[var(--surface)] transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-[var(--neutral-200)] px-4">
        {!collapsed && (
          <span className="flex items-center gap-2 text-lg font-bold text-[var(--neutral-950)]">
            <LogoMark size={32} />
            PrashnoKotha
          </span>
        )}
        {collapsed && (
          <span className="mx-auto">
            <LogoMark size={32} />
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-500)] hover:bg-[var(--neutral-100)]"
          aria-label="Toggle sidebar"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-[var(--neutral-600)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)]",
                  item.href === "/dashboard" && "bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-[var(--neutral-200)] p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"
        >
          <span className="text-lg">🚪</span>
          {!collapsed && <span>লগআউট</span>}
        </button>
      </div>
    </aside>
  );
}
