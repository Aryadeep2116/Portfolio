import { Gauge, MessagesSquare, MousePointerClick, ScanEye, Sparkles, Waypoints } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

/**
 * Why work with me — concrete client benefits, not adjectives.
 */
const reasons = [
  {
    icon: MessagesSquare,
    title: "Clear communication",
    description:
      "Plain-language updates at every step. You always know what's happening, what's next, and what it costs — no chasing.",
  },
  {
    icon: Gauge,
    title: "Fast on well-scoped work",
    description:
      "Landing pages in weeks, fixes often in days. I commit to timelines I can actually keep — and tell you early when something changes.",
  },
  {
    icon: MousePointerClick,
    title: "Detail that users feel",
    description:
      "Loading states, hover feedback, error handling, 44px touch targets. Small things that decide whether a product feels cheap or considered.",
  },
  {
    icon: ScanEye,
    title: "Product thinking, not ticket-punching",
    description:
      "I ask about your goals and your customers before writing code — and flag ideas when I see a better path to the result you want.",
  },
  {
    icon: Waypoints,
    title: "Clean, maintainable code",
    description:
      "Structured, documented and typed where it counts. You can hand the codebase to any developer later without an archaeology project.",
  },
  {
    icon: Sparkles,
    title: "AI-assisted, human-verified",
    description:
      "I use AI tooling across my workflow to move faster — every line is reviewed, tested and owned by me. Speed without the slop.",
  },
];

export function WhyMe() {
  return (
    <section className="border-t border-border bg-surface py-24 sm:py-32" aria-labelledby="why-heading">
      <Container>
        <SectionHeading
          eyebrow="Why work with me"
          titleId="why-heading"
          title="What you actually get"
          description="Hiring a freelancer is a trust decision. Here's specifically how I try to earn it — in ways you'll notice in the first week."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 3) * 80} variant="scale">
              <SpotlightCard
                className="h-full bg-background p-7 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                tone={i % 3 === 1 ? "signal" : "accent"}
              >
                <div className="h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-link transition-transform duration-500 group-hover:scale-110">
                    <reason.icon size={18} strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                    {reason.title}
                  </h3>
                  <p className="mt-2.5 text-small text-fg-2">{reason.description}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
