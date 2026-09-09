import { ArrowUpRight } from "lucide-react";
import { additionalProjects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const HELP_WITH = [
  "Landing pages",
  "Business websites",
  "React interfaces",
  "Frontend bug fixes",
  "Responsive fixes",
  "Figma → React",
  "API integration",
  "AI website features",
];

/**
 * "What I can help with" quick-answer list + additional, honestly-labeled work.
 */
export function AdditionalWork() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="more-work-heading">
      <Container>
        <SectionHeading
          eyebrow="Built & shipped"
          titleId="more-work-heading"
          title="What I can help with"
          description="The requests I handle most often — bring yours, even if it's not on the list."
        />

        <Reveal delay={80}>
          <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Common project types">
            {HELP_WITH.map((item, i) => (
              <li
                key={item}
                className="group cursor-default rounded-full border border-border bg-surface px-4 py-2 text-small font-medium text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-link"
                style={{ animation: `fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 45}ms both` }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {additionalProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 90}>
              <article className="group flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-surface-2 px-2.5 py-1 text-tiny font-medium text-fg-2">
                    {project.kind}
                  </span>
                  <span className="text-tiny text-muted">{project.year}</span>
                </div>
                <h3 className="text-h3 mt-5 text-fg">{project.name}</h3>
                <p className="mt-1 text-small font-medium text-link">{project.tagline}</p>
                <p className="mt-3 text-small leading-relaxed text-fg-2">{project.description}</p>
                <div className="mt-auto flex flex-col gap-4 border-t border-border pt-5">
                  <ul className="flex flex-wrap gap-1.5" aria-label={`${project.name} stack`}>
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border px-2 py-0.5 text-tiny font-medium text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-small font-semibold text-link"
                    >
                      Visit
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  ) : (
                    <p className="text-tiny text-muted">
                      {project.role} · work in progress
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
