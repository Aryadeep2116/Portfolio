import { Braces, Cloud, Layout, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Technical capabilities — only technologies I genuinely use.
 * Detailed engineering talk lives here, below the business-first sections.
 */
const groups = [
  {
    icon: Layout,
    title: "Frontend",
    items: ["React — hooks, state, composition", "JavaScript (ES6+)", "HTML5 & semantic markup", "CSS3 · responsive design"],
  },
  {
    icon: Braces,
    title: "Styling & UI",
    items: ["Tailwind CSS", "Design tokens & theming", "Figma → code implementation", "Motion & micro-interactions"],
  },
  {
    icon: Cloud,
    title: "Services & APIs",
    items: ["REST API integration", "AI / LLM APIs", "Serverless functions (Vercel)", "Forms, validation & spam protection"],
  },
  {
    icon: Wrench,
    title: "Workflow & tooling",
    items: ["Git & GitHub", "Vercel deployments", "Chrome DevTools & Lighthouse", "AI-assisted development"],
  },
];

export function Capabilities() {
  return (
    <section className="border-t border-border bg-surface py-24 sm:py-32" aria-labelledby="stack-heading">
      <Container>
        <SectionHeading
          eyebrow="Technical capabilities"
          titleId="stack-heading"
          title="The stack behind the work"
          description="A focused toolset I know well, rather than a long list of logos. For anything outside it, I'll tell you honestly."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 70}>
              <div className="h-full rounded-xl border border-border bg-background p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-link">
                    <group.icon size={16} strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="text-[0.9375rem] font-semibold text-fg">{group.title}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-small text-fg-2">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
