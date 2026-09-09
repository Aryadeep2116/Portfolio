import type { CSSProperties } from "react";
import { ArrowRight, Clock, Globe } from "lucide-react";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { usePointerGlow, useParallax } from "@/hooks/useMotion";
import { BrowserFrame } from "@/components/BrowserFrame";
import { BuildItUpPreview } from "@/components/BuildItUpPreview";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const HEADLINE = [
  { text: "Modern websites", gradient: false },
  { text: "that feel as good", gradient: true },
  { text: "as they work.", gradient: false },
];

/**
 * Hero — who / what / for whom / why, within seconds.
 * Rendered over an aurora field with morphing orbs and a conic halo behind
 * the product visual. The visual itself is code-rendered: instant and crisp.
 */
export function Hero() {
  const { ref: glowRef, onPointerMove } = usePointerGlow<HTMLElement>();
  const visualRef = useParallax<HTMLDivElement>(0.035);

  return (
    <section
      ref={glowRef}
      onPointerMove={onPointerMove}
      className="relative overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Aurora field + morphing colour orbs + pointer light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora absolute inset-0" />
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-[0.6]" />
        <div
          className="morph-blob animate-breathe left-[-8%] top-[-12%] h-[46vh] w-[46vh]"
          style={{ backgroundColor: "var(--orb-jade)" }}
        />
        <div
          className="morph-blob animate-breathe right-[-6%] top-[30%] h-[40vh] w-[40vh] [animation-delay:-5s]"
          style={{ backgroundColor: "var(--orb-amber)" }}
        />
        <div
          className="morph-blob animate-breathe left-[24%] bottom-[-18%] h-[52vh] w-[52vh] [animation-delay:-10s]"
          style={{ backgroundColor: "var(--orb-iris)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(620px circle at var(--mx, 50%) var(--my, 25%), var(--spot), transparent 66%)",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pb-28">
          {/* Copy */}
          <div className="flex max-w-xl flex-col items-start">
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[0.8125rem] font-medium text-fg shadow-card backdrop-blur-xl">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                {site.availability.status}
              </span>
              <span className="text-eyebrow text-muted">{site.positioning}</span>
            </div>

            <h1 id="hero-heading" className="text-hero line-mask mt-4 text-fg">
              {HEADLINE.map((line, i) => (
                <span key={line.text} className="line-mask-line">
                  <span
                    className={line.gradient ? "grad-word" : ""}
                    style={{ "--line-delay": `${140 + i * 115}ms` } as CSSProperties}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="text-lead mt-7 text-fg-2"
              style={{ animation: "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both" }}
            >
              I'm {site.name.split(" ")[0]} — a frontend developer who builds fast, responsive React
              websites, landing pages and AI-powered product features for startups and businesses,
              from first design to production.
            </p>

            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              style={{ animation: "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.54s both" }}
            >
              <Button to="/#contact" size="lg" onClick={() => track("hero_cta", { cta: "start" })}>
                Start a Project
                <ArrowRight size={17} aria-hidden />
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                View My Work
              </Button>
            </div>

            <ul
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-tiny text-muted"
              style={{ animation: "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.66s both" }}
            >
              <li className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-signal-soft text-signal-text">
                  <Clock size={12} aria-hidden />
                </span>
                {site.availability.responseTime}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent-soft text-link">
                  <Globe size={12} aria-hidden />
                </span>
                Remote · Worldwide
              </li>
            </ul>
          </div>

          {/* Product visual with conic halo */}
          <div
            className="relative"
            style={{ animation: "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
          >
            <div
              aria-hidden
              className="animate-beam absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "conic-gradient(from var(--beam), transparent, rgba(27,200,167,0.28), transparent 18%, rgba(244,182,74,0.22) 34%, transparent 46%, rgba(142,128,248,0.2) 62%, transparent)",
                filter: "blur(54px)",
                opacity: 0.55,
              }}
            />
            <div ref={visualRef} className="will-change-transform">
              <BrowserFrame url="builditup.dpdns.org" className="shadow-pop">
                <BuildItUpPreview />
              </BrowserFrame>
            </div>

            {/* Floating glass chips — decorative, desktop only */}
            <div
              aria-hidden
              className="animate-float absolute -left-7 top-8 hidden items-center gap-2 rounded-xl border border-border bg-surface/70 px-3.5 py-2 text-tiny font-medium text-fg-2 shadow-lift backdrop-blur-xl lg:flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              responsive by default
            </div>
            <div
              aria-hidden
              className="animate-float absolute -right-6 bottom-20 hidden items-center gap-2 rounded-xl border border-border bg-surface/70 px-3.5 py-2 text-tiny font-medium text-fg-2 shadow-lift backdrop-blur-xl lg:flex [animation-delay:-2.4s]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              ai-assisted, human-reviewed
            </div>
            <div
              aria-hidden
              className="animate-float absolute -left-5 bottom-4 hidden items-center gap-2 rounded-xl border border-border bg-surface/70 px-3.5 py-2 text-tiny font-medium text-fg-2 shadow-lift backdrop-blur-xl lg:flex [animation-delay:-4.2s]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-iris" />
              deployed on Vercel
            </div>

            <p className="mt-4 text-center text-tiny text-muted">
              BuildItUp — my independent AI product, live today
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
