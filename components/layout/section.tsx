import { cn } from "@/lib/cn";
import { forwardRef, type HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  containerClassName?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className, containerClassName, children, ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={cn("py-16 lg:py-20", className)}
      {...props}
    >
      <div className={cn("mx-auto max-w-7xl px-4 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  )
);
Section.displayName = "Section";
