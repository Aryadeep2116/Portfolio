import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "success";
}

export function Badge({ children, className, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.8125rem] font-medium leading-5",
        tone === "default" && "border-border bg-surface text-fg-2",
        tone === "accent" && "border-transparent bg-accent-soft text-link",
        tone === "success" && "border-transparent bg-success-soft text-success",
        className,
      )}
    >
      {children}
    </span>
  );
}
