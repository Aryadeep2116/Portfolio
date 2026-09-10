import { useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allProjects, featuredProject } from "@/data/projects";
import { track } from "@/lib/analytics";
import { setPageMeta } from "@/lib/seo";
import { BrowserFrame } from "@/components/BrowserFrame";
import { BuildItUpPreview } from "@/components/BuildItUpPreview";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export default function Work() {
  useEffect(() => {
    setPageMeta({
      title: "Work — Aryadeep Biswas Portfolio",
      description:
        "Selected projects by Alex Morgan: BuildItUp, an AI-powered project planning product, plus interface and website work. Case studies included.",
      path: "/work",
    });
  }, []);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border pt-16">
        <Container className="py-16 sm:py-20">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow text-link">Work</p>
            <h1 className="text-h2 text-fg text-balance">Selected work, built and shipped</h1>
            <p className="text-lead text-fg-2">
              Products and interfaces I've designed and built — each labeled honestly. No client
              logos that don't exist, no metrics that were never measured.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Featured */}
      <section aria-label="Featured project" className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <article className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <a
                href={featuredProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("view_project", { project: "builditup", source: "work" })}
                className="group block rounded-xl"
                aria-label="Open BuildItUp live demo in a new tab"
              >
                <BrowserFrame
                  url="builditup.dpdns.org"
                  className="transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-border-strong group-hover:shadow-pop"
                >
                  <BuildItUpPreview />
                </BrowserFrame>
              </a>
              <div className="flex flex-col items-start gap-5">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-tiny font-semibold text-link">
                  Featured · {featuredProject.kind}
                </span>
                <h2 className="text-h2 text-fg">{featuredProject.name}</h2>
                <p className="text-lead text-fg-2">{featuredProject.description}</p>
                <ul className="flex flex-wrap gap-1.5" aria-label="Technology stack">
                  {featuredProject.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 text-tiny font-medium text-fg-2"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button to="/work/builditup">
                    Case study
                    <ArrowRight size={16} aria-hidden />
                  </Button>
                  <Button href={featuredProject.liveUrl} external variant="secondary">
                    Live demo
                    <ArrowUpRight size={16} aria-hidden />
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Remaining projects */}
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {allProjects.slice(1).map((project, i) => (
              <Reveal key={project.id} delay={i * 90}>
                <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-tiny font-medium text-fg-2">
                      {project.kind}
                    </span>
                    <span className="text-tiny text-muted">{project.year}</span>
                  </div>
                  <h3 className="text-h3 mt-5 text-fg">{project.name}</h3>
                  <p className="mt-1 text-small font-medium text-link">{project.tagline}</p>
                  <p className="mt-3 text-small leading-relaxed text-fg-2">{project.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-5" aria-label={`${project.name} stack`}>
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border px-2 py-0.5 text-tiny font-medium text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <Reveal delay={120} className="mt-20">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="text-h3 text-fg">Have a project in mind?</h2>
                <p className="mt-2 text-small text-fg-2">
                  This page shows what I build alone — imagine what I can build for you.
                </p>
              </div>
              <Button to="/#contact" size="lg">
                Start a Project
                <ArrowRight size={17} aria-hidden />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
