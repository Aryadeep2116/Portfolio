import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { CopyEmail } from "@/components/CopyEmail";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Final conversion moment before the contact form — quiet, confident.
 */
export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-heading" className="border-t border-border bg-surface py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col items-center gap-7 text-center">
          <p className="text-eyebrow text-muted">Next step</p>
          <h2 id="final-cta-heading" className="text-h2 max-w-2xl text-fg text-balance">
            Have an idea worth building properly?
          </h2>
          <p className="text-lead max-w-xl text-fg-2">
            Tell me what you're working on and what you need. I'll get back to you with the next
            steps — {site.availability.responseTime.toLowerCase()}.
          </p>
          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
            <Button to="/#contact" size="lg">
              Start a Project
              <ArrowRight size={17} aria-hidden />
            </Button>
            <CopyEmail />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
