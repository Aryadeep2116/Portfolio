import { Code2, Map, Rocket, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Understand",
    description:
      "You explain what you need — in plain language. I ask questions until the goal, scope and constraints are genuinely clear.",
  },
  {
    number: "02",
    icon: Map,
    title: "Plan",
    description:
      "You get a short written plan: what will be built, the technical approach, the timeline and the price. Agreed before anything starts.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description:
      "Implementation with regular check-ins. Responsive UI, integrations and testing happen in the open — you always see progress.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Ship",
    description:
      "Deployment, final QA on real devices, and a clean handoff. You get something that works — and code you can hand to any developer later.",
  },
];

/**
 * How I work — four steps that reassure clients: you explain the what,
 * I handle the how. The connector line draws itself as the row reveals.
 */
export function Process() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="process-heading">
      <Container>
        <SectionHeading
          eyebrow="How I work"
          titleId="process-heading"
          title="A calm, four-step process"
          description="You don't need to know how to build it. You explain what you need — I handle the implementation and keep you in the loop throughout."
        />

        <Reveal className="relative mt-14">
          {/* Connector line that draws in on reveal (desktop) */}
          <div
            aria-hidden
            className="draw-x absolute left-0 right-0 top-[3.9rem] hidden h-px bg-gradient-to-r from-accent via-signal to-accent opacity-40 lg:block"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 90}>
                <SpotlightCard className="h-full bg-surface transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-link transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                        <step.icon size={18} strokeWidth={1.8} aria-hidden />
                      </span>
                      <span className="num text-[0.8125rem] font-medium text-muted" aria-hidden>
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                      {step.title}
                    </h3>
                    <p className="text-small text-fg-2">{step.description}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={200} className="mt-8">
          <p className="group flex items-start gap-3 rounded-xl border border-border bg-surface-2 p-5 text-small text-fg-2 transition-colors duration-300 hover:border-border-strong">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal transition-transform duration-300 group-hover:scale-150" />
            <span>
              <span className="font-semibold text-fg">Working async or with calls —</span> your
              choice. Most clients combine a short kickoff call with written updates, which works
              well across time zones.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
