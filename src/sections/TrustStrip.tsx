import { Container } from "@/components/ui/Container";

/**
 * Capability strip — the technologies I actually work with.
 * A slow, pointer-paused marquee keeps the strip alive without stealing focus;
 * it degrades to a static clipped row with reduced motion.
 */
const STACK = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "HTML & CSS",
  "REST APIs",
  "AI / LLM APIs",
  "Git & GitHub",
  "Vercel",
  "Figma → Code",
  "Responsive & a11y",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center gap-10 pr-10"
    >
      {STACK.map((tech, i) => (
        <li key={tech} className="flex items-center gap-3 whitespace-nowrap">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rotate-45"
            style={{ backgroundColor: i % 3 === 1 ? "var(--signal)" : "var(--accent)" }}
          />
          <span className="text-[0.9375rem] font-medium text-fg-2">{tech}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Technologies I work with" className="relative border-y border-border bg-surface py-6">
      <Container>
        <div className="marquee-wrap flex items-center gap-8">
          <p className="text-eyebrow shrink-0 text-muted">Daily toolkit</p>
          <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track flex w-max">
              <Row />
              <Row hidden />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
