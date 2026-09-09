import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { featuredProject } from "@/data/projects";
import { track } from "@/lib/analytics";
import { BrowserFrame } from "@/components/BrowserFrame";
import { BuildItUpPreview } from "@/components/BuildItUpPreview";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/BrandIcons";

const keyPoints = [
  "Idea-to-plan generation with AI",
  "Stack & architecture recommendations",
  "Step-by-step build guides",
];

export function FeaturedProject() {
  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="featured-heading">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow flex items-center gap-3 text-muted">
              <span aria-hidden className="h-px w-9 bg-[linear-gradient(90deg,transparent,var(--signal))]" />
              <span>Featured work</span>
            </p>
            <h2 id="featured-heading" className="text-h2 text-fg text-balance">
              <span className="grad-word">BuildItUp</span> — AI-powered project planning, built end
              to end
            </h2>
            <p className="text-lead text-fg-2">
              An independent product, live today. It turns a rough project idea into a structured,
              technically realistic build plan — direction, stack, architecture and milestones.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{featuredProject.kind}</Badge>
            <Badge>{featuredProject.year}</Badge>
          </div>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Preview — wrapped in a rotating conic beam frame */}
          <Reveal delay={80} variant="mask">
            <div className="beam-border shadow-lift">
              <div className="beam-inner">
                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("view_project", { project: "builditup" })}
                  className="group block focus-visible:outline-2"
                  aria-label="Open BuildItUp live demo in a new tab"
                >
                  <BrowserFrame
                    url="builditup.dpdns.org"
                    className="transition-[transform,box-shadow] duration-500 group-hover:scale-[1.012]"
                  >
                    <BuildItUpPreview />
                  </BrowserFrame>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={160} className="flex flex-col gap-6">
            <div>
              <h3 className="text-h3 text-fg">The problem it solves</h3>
              <p className="mt-3 text-small leading-relaxed text-fg-2">
                Developers often stall between "I have an idea" and "I know exactly what to build."
                Generic tutorials don't answer project-specific questions — which stack, which
                architecture, what to build first. BuildItUp fills that gap with a plan generated
                for your idea, not a template.
              </p>
            </div>

            <div>
              <h3 className="text-h3 text-fg">What it does</h3>
              <ul className="mt-3 space-y-2">
                {keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-small text-fg-2">
                    <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-success" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-h3 text-fg">Built with</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technology stack">
                {featuredProject.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-tiny font-medium text-fg-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:flex-wrap">
              <Button
                href={featuredProject.liveUrl}
                external
                size="md"
                onClick={() => track("live_demo_clicked", { project: "builditup" })}
              >
                Live Demo
                <ArrowUpRight size={16} aria-hidden />
              </Button>
              <Button to="/work/builditup" variant="secondary" size="md">
                Read the case study
                <ArrowRight size={16} aria-hidden />
              </Button>
              <Button
                href={featuredProject.sourceUrl}
                external
                variant="ghost"
                size="md"
                onClick={() => track("github_clicked", { project: "builditup" })}
              >
                <GithubIcon size={16} />
                Source
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
