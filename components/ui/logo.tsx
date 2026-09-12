"use client";

import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="PrashnoKotha"
      width={size}
      height={size}
      className={`shrink-0 rounded-[var(--radius-md)] ${className || ""}`}
      priority
    />
  );
}

interface LogoWithTextProps {
  size?: number;
  className?: string;
}

export function LogoWithText({ size = 32, className }: LogoWithTextProps) {
  return (
    <span className={`flex items-center gap-2 ${className || ""}`}>
      <LogoMark size={size} />
      <span className="text-lg font-bold text-[var(--neutral-950)]">
        PrashnoKotha
      </span>
    </span>
  );
}
