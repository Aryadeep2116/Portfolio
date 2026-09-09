import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";

/** One-click email copy with polite live feedback. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — mailto still works
    }
    setCopied(true);
    track("email_copied");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy email address ${site.email}`}
      className={`group inline-flex h-11 items-center gap-2.5 rounded-lg border border-border bg-surface px-4 text-[0.9375rem] font-medium text-fg-2 transition-colors duration-200 hover:border-accent hover:text-link ${className ?? ""}`}
    >
      <span>{site.email}</span>
      {copied ? (
        <Check size={15} className="text-success" aria-hidden />
      ) : (
        <Copy size={15} className="text-muted transition-colors group-hover:text-link" aria-hidden />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
