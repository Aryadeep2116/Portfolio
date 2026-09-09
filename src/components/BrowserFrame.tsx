import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/utils/cn";

interface BrowserFrameProps {
  url: string;
  children: ReactNode;
  className?: string;
  label?: string;
}

/** Minimal, premium browser chrome around product previews. */
export function BrowserFrame({ url, children, className, label }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-lift",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b border-border bg-surface-2 px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="mx-auto flex h-6 w-full max-w-[260px] items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3">
          <Lock size={10} className="shrink-0 text-muted" aria-hidden />
          <span className="truncate text-[0.6875rem] font-medium text-muted">{url}</span>
        </div>
        <div className="w-10" aria-hidden />
      </div>
      {children}
      {label && <div className="border-t border-border bg-surface-2 px-4 py-2 text-right">
        <span className="text-[0.6875rem] font-medium text-muted">{label}</span>
      </div>}
    </div>
  );
}
