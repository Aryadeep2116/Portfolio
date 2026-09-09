import { useEffect, useState } from "react";
import {
  Check,
  Layers,
  ListChecks,
  Loader2,
  Server,
  Sparkles,
  Wand2,
} from "lucide-react";
import { cn } from "@/utils/cn";

const IDEAS = [
  "A marketplace for local artists…",
  "An AI resume review tool…",
  "A booking app for a gym…",
];

const STACK = ["React", "Tailwind", "Node", "Supabase"];

const ARCHITECTURE = [
  "Client — React SPA, responsive-first",
  "API — serverless functions, validated input",
  "AI — structured LLM output, safe parsing",
];

const MILESTONES = [
  "Core interface & state",
  "AI plan generation flow",
  "Polish, tests & deploy",
];

/**
 * Code-rendered product preview of BuildItUp — the hero visual.
 * No screenshots, no images: the interface is drawn with the same care as the
 * product, stays crisp at every resolution and costs nothing to load.
 * Subtle state cycle (generating → ready) pauses when hidden and never runs
 * for users who prefer reduced motion.
 */
export function BuildItUpPreview({ detailed = false }: { detailed?: boolean }) {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGenerating(false);
      return;
    }
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setGenerating((g) => {
        if (!g) setIdeaIndex((i) => (i + 1) % IDEAS.length);
        return !g;
      });
    }, 3600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* App header */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft-strong text-link"
          >
            <Layers size={13} strokeWidth={2} />
          </span>
          <span className="text-[0.8125rem] font-semibold tracking-[-0.01em] text-fg">
            BuildItUp
          </span>
        </div>
        <div className="hidden items-center gap-1 sm:flex" aria-hidden>
          {["Idea", "Plans", "Library"].map((item, i) => (
            <span
              key={item}
              className={cn(
                "rounded-md px-2.5 py-1 text-[0.6875rem] font-medium",
                i === 0 ? "bg-accent-soft text-link" : "text-muted",
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className={cn("grid flex-1 gap-4 p-4 sm:p-5", detailed ? "md:grid-cols-[1fr_1.15fr]" : "sm:grid-cols-[1fr_1.1fr]")}>
        {/* Input column */}
        <div
          className="flex flex-col gap-3"
          style={{ animation: "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted">
            Your idea
          </p>
          <div className="rounded-lg border border-border bg-surface-2 p-3">
            <p className="caret min-h-[2.4rem] text-[0.8125rem] leading-relaxed text-fg">
              {IDEAS[ideaIndex]}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5" aria-hidden>
            {["Web app", "AI feature", "Portfolio"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border px-2.5 py-1 text-[0.6875rem] font-medium text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-accent-solid px-3.5 py-2.5 text-[0.8125rem] font-semibold text-accent-solid-fg shadow-[0_1px_2px_rgba(10,10,20,0.14)]">
            <Sparkles size={14} aria-hidden />
            Generate plan
          </div>
        </div>

        {/* Output column */}
        <div
          className="flex flex-col gap-3 rounded-lg border border-border bg-surface-2 p-3.5"
          style={{ animation: "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted">
              Your build plan
            </p>
            <span
              aria-hidden
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold",
                generating
                  ? "bg-warning-soft text-warning"
                  : "bg-success-soft text-success",
              )}
            >
              {generating ? (
                <>
                  <Loader2 size={11} className="animate-spin" aria-hidden />
                  Generating
                </>
              ) : (
                <>
                  <Check size={11} strokeWidth={3} aria-hidden />
                  Plan ready
                </>
              )}
            </span>
          </div>

          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {STACK.map((s, i) => (
              <span
                key={s}
                className="rounded-md border border-border bg-surface px-2 py-1 text-[0.6875rem] font-medium text-fg-2"
                style={{ animation: `fade-up 0.5s ease ${(0.5 + i * 0.08).toFixed(2)}s both` }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Architecture */}
          <div className="rounded-md border border-border bg-surface p-2.5">
            <p className="mb-1.5 flex items-center gap-1.5 text-[0.6875rem] font-semibold text-fg">
              <Server size={11} className="text-muted" aria-hidden />
              Architecture
            </p>
            <ul className="space-y-1">
              {ARCHITECTURE.slice(0, detailed ? 3 : 2).map((row, i) => (
                <li
                  key={row}
                  className="flex items-center gap-1.5 text-[0.6875rem] text-fg-2"
                  style={{ animation: `fade-up 0.5s ease ${(0.65 + i * 0.08).toFixed(2)}s both` }}
                >
                  <Check size={10} strokeWidth={3} className="shrink-0 text-success" aria-hidden />
                  {row}
                </li>
              ))}
            </ul>
          </div>

          {/* Milestones */}
          {detailed && (
            <div className="rounded-md border border-border bg-surface p-2.5">
              <p className="mb-1.5 flex items-center gap-1.5 text-[0.6875rem] font-semibold text-fg">
                <ListChecks size={11} className="text-muted" aria-hidden />
                Milestones
              </p>
              <ul className="space-y-1">
                {MILESTONES.map((m, i) => (
                  <li key={m} className="flex items-center gap-2 text-[0.6875rem] text-fg-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-soft text-[0.5625rem] font-bold text-link">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI assistant note */}
          <div
            className="mt-auto flex items-start gap-2 rounded-md border border-accent-soft-strong bg-accent-soft p-2.5"
            style={{ animation: "fade-up 0.5s ease 0.9s both" }}
          >
            <Wand2 size={12} className="mt-0.5 shrink-0 text-link" aria-hidden />
            <p className="text-[0.6875rem] leading-snug text-fg-2">
              AI assistant — refined the scope and picked a stack that matches your timeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
