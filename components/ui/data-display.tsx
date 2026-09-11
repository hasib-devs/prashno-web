import { cn } from "@/lib/cn";
import { forwardRef, type HTMLAttributes } from "react";

export const Badge = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string; fallback?: string }>(
  ({ className, src, alt, fallback, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--neutral-100)]",
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || ""} className="aspect-square h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-medium text-[var(--neutral-600)]">
          {fallback || "?"}
        </span>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";

export const StatCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { value: string | number; label: string; trend?: { value: string; positive?: boolean } }>(
  ({ className, value, label, trend, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)] p-5",
        className
      )}
      {...props}
    >
      <p className="text-2xl font-bold text-[var(--neutral-950)]">{value}</p>
      <p className="mt-1 text-sm text-[var(--neutral-600)]">{label}</p>
      {trend && (
        <p className={cn("mt-2 text-xs font-medium", trend.positive ? "text-[var(--success)]" : "text-[var(--danger)]")}>
          {trend.positive ? "↑" : "↓"} {trend.value}
        </p>
      )}
    </div>
  )
);
StatCard.displayName = "StatCard";

export const EmptyState = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { title: string; description?: string; action?: React.ReactNode; icon?: React.ReactNode }>(
  ({ className, title, description, action, icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--neutral-200)] bg-[var(--neutral-50)] px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon && <div className="mb-4 text-[var(--neutral-400)]">{icon}</div>}
      <h3 className="text-lg font-semibold text-[var(--neutral-900)]">{title}</h3>
      {description && <p className="mt-1 text-sm text-[var(--neutral-600)]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
);
EmptyState.displayName = "EmptyState";
