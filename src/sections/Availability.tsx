import { ArrowRight, Check } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Availability — manually configured in data/site.ts. No fake urgency.
 */
export function Availability() {
  return (
    <section aria-labelledby="availability-heading" className="border-t border-border bg-surface py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-8 sm:p-12">
            <div
              aria-hidden
              className="animate-breathe pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ backgroundColor: "var(--glow-b)" }}
            />
            <div
              aria-hidden
              className="animate-breathe pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full blur-3xl [animation-delay:-7s]"
              style={{ backgroundColor: "var(--glow-a)" }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="flex items-center gap-2.5 text-eyebrow text-muted">
                  <span className="relative flex h-2 w-2" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Availability
                </p>
                <h2 id="availability-heading" className="text-h2 mt-4 text-fg text-balance">
                  {site.availability.status}
                </h2>
                <p className="text-lead mt-4 text-fg-2">
                  If your project fits one of the categories below, the fastest path is a short
                  message — {site.availability.responseTime.toLowerCase()}.
                </p>
                <Button to="/#contact" size="lg" className="mt-8">
                  Start a Project
                  <ArrowRight size={17} aria-hidden />
                </Button>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {site.availability.accepting.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-4 py-3 text-small font-medium text-fg-2"
                  >
                    <Check size={15} strokeWidth={2.5} className="shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
