import { GraduationCap } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * About — human and short. Capability first, education secondary.
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="about-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal className="flex max-w-xl flex-col gap-5">
            <p className="text-eyebrow text-link">About</p>
            <h2 id="about-heading" className="text-h2 text-fg text-balance">
              A developer who thinks like a product person
            </h2>
            <div className="mt-2 flex flex-col gap-4 text-lead text-fg-2">
              <p>
                I'm {site.name}, a frontend developer with a computer science background, focused on
                React, JavaScript and AI-powered web features. Right now I split my time between
                client work and building my own product, BuildItUp.
              </p>
              <p>
                The problems I enjoy most sit between design and engineering: turning a Figma file
                into a fast, accessible interface; making an existing website work beautifully on
                every phone; adding an AI feature so it feels like part of the product instead of a
                bolt-on gimmick.
              </p>
              <p>
                I believe software quality is felt, not argued — in load times, in how a form
                recovers from an error, in whether a button is where your thumb already is. That's
                the standard I build to.
              </p>
            </div>
            <p className="mt-3 flex items-center gap-2.5 text-tiny text-muted">
              <GraduationCap size={15} aria-hidden />
              B.Sc. Computer Science — the theory behind the practice.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="flex h-full flex-col gap-6 rounded-xl border border-border bg-surface p-7 sm:p-8">
              <div>
                <dt className="text-eyebrow text-muted">Focus</dt>
                <dd className="mt-2 text-small font-medium text-fg">
                  React interfaces, landing pages & AI integrations
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-muted">Currently building</dt>
                <dd className="mt-2 text-small font-medium text-fg">
                  BuildItUp — AI-powered project planning
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-muted">Works with</dt>
                <dd className="mt-2 text-small font-medium text-fg">
                  Startups, agencies, SaaS teams & small businesses
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow text-muted">Based</dt>
                <dd className="mt-2 text-small font-medium text-fg">{site.location}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-muted">Open to</dt>
                <dd className="mt-2 text-small font-medium text-fg">
                  Freelance projects & contract frontend work
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
