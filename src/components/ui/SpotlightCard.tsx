import type { ReactNode } from "react";
import { usePointerGlow } from "@/hooks/useMotion";
import { cn } from "@/utils/cn";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Warm (amber) spotlight instead of the default jade — for accent cards */
  tone?: "accent" | "signal";
}

/**
 * Card with a soft light that follows the pointer, layered *under* the content.
 * Purely decorative: everything works with it absent.
 */
export function SpotlightCard({ children, className, tone = "accent" }: SpotlightCardProps) {
  const { ref, onPointerMove } = usePointerGlow<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative isolate overflow-hidden rounded-xl border border-border",
        tone === "accent" ? "hover:border-[color-mix(in_srgb,var(--accent)_42%,var(--border))]" : "hover:border-[color-mix(in_srgb,var(--signal)_48%,var(--border))]",
        className,
      )}
    >
      <div aria-hidden className="spot" />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
