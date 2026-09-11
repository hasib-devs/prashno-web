"use client";

import { cn } from "@/lib/cn";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--neutral-700)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--surface)] px-3 py-2 text-[15px] text-[var(--neutral-900)] placeholder:text-[var(--neutral-400)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-[var(--danger)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
