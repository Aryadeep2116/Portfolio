import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

/**
 * Services — exactly what a client can hire me for, with deliverables,
 * ideal client and honest timelines. Each CTA preselects the matching project
 * type in the contact form.
 */
export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-border bg-surface py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Services"
          titleId="services-heading"
          title={<>What I can help with</>}
          description={
            <>
              Four clearly defined engagements. You always know what you get, who it's for, and
              roughly how long it takes. Not sure which fits?{" "}
              <a href="#contact" className="link-inline font-medium">
                Just ask
              </a>
              .
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={i * 80} variant="scale">
              <SpotlightCard className="bg-background shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift">
                <article className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="num text-[0.8125rem] font-medium text-signal" aria-hidden>
                      {service.number}
                    </span>
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-tiny font-medium text-link">
                      {service.timeline}
                    </span>
                  </div>

                  <h3 className="text-h3 mt-5 text-fg">{service.title}</h3>
                  <p className="mt-3 text-small text-fg-2">{service.summary}</p>

                  <ul className="mt-5 space-y-2" aria-label={`${service.title} — what's included`}>
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-small text-fg-2">
                        <Check
                          size={15}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-success transition-transform duration-300 group-hover:scale-110"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-5 border-t border-border pt-6">
                    <p className="text-tiny text-muted">
                      <span className="font-semibold text-fg-2">Ideal for:</span> {service.idealFor}
                    </p>
                    <Button
                      to={{ pathname: "/", search: `?type=${service.inquiryType}`, hash: "#contact" }}
                      variant="secondary"
                      size="md"
                      className="self-start"
                    >
                      Discuss this service
                      <ArrowRight size={15} aria-hidden />
                    </Button>
                  </div>
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
