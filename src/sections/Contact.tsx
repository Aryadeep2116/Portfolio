import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const channels = [
  {
    label: "LinkedIn",
    description: "Professional background & updates",
    href: site.links.linkedin,
    onClick: () => track("linkedin_clicked", { source: "contact" }),
    external: true,
  },
  {
    label: "GitHub",
    description: "Code, projects & open work",
    href: site.links.github,
    onClick: () => track("github_clicked", { source: "contact" }),
    external: true,
  },
];

/**
 * Contact — lowest possible friction: form for detail, direct channels for speed.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora absolute inset-0" />
        <div
          className="morph-blob animate-breathe right-[-10%] top-[-10%] h-[46vh] w-[46vh]"
          style={{ backgroundColor: "var(--orb-amber)" }}
        />
        <div
          className="morph-blob animate-breathe bottom-[-16%] left-[-8%] h-[50vh] w-[50vh] [animation-delay:-8s]"
          style={{ backgroundColor: "var(--orb-jade)" }}
        />
      </div>
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Direct channels */}
          <Reveal className="flex flex-col gap-7">
            <div>
              <p className="text-eyebrow text-link">Contact</p>
              <h2 id="contact-heading" className="text-h2 mt-4 text-fg text-balance">
                Have something you want to build?
              </h2>
              <p className="text-lead mt-4 text-fg-2">
                Tell me what you're working on and what you need. I'll get back to you with the
                next steps — {site.availability.responseTime.toLowerCase()}.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-small font-semibold text-fg">Email me directly</p>
              <CopyEmail className="self-start" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-small font-semibold text-fg">Or find me here</p>
              <ul className="flex flex-col gap-2.5">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={channel.onClick}
                      className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-lg border border-border bg-surface px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
                    >
                      <span className="flex items-center gap-3">
                        {channel.label === "GitHub" ? (
                          <GithubIcon size={17} className="text-fg-2" />
                        ) : (
                          <span
                            aria-hidden
                            className="flex h-[17px] w-[17px] items-center justify-center rounded-[4px] bg-accent-soft text-[9px] font-bold text-link"
                          >
                            in
                          </span>
                        )}
                        <span>
                          <span className="block text-small font-semibold text-fg">{channel.label}</span>
                          <span className="block text-tiny text-muted">{channel.description}</span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-link"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-tiny leading-relaxed text-muted">
              Prefer a call? Mention it in your message and we'll set up a time that works across
              time zones.
            </p>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
