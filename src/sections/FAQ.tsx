import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/utils/cn";

/**
 * FAQ — single-open accordion with an animated height (grid-rows technique),
 * keyboard and screen-reader accessible via native button + region semantics.
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="py-24 sm:py-32" aria-labelledby="faq-heading">
      <Container className="max-w-[760px]">
        <SectionHeading
          eyebrow="FAQ"
          titleId="faq-heading"
          title="Questions clients ask before we start"
          align="center"
        />

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            const btnId = `${baseId}-btn-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <Reveal key={faq.question} delay={i * 55}>
                <div
                  className={cn(
                    "group overflow-hidden rounded-xl border bg-surface transition-[border-color,box-shadow,background-color] duration-300",
                    open ? "border-border-strong shadow-card" : "border-border hover:border-border-strong",
                  )}
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-[0.9375rem] font-semibold text-fg transition-colors duration-200 group-hover:text-link">
                        {faq.question}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-fg-2 transition-all duration-300",
                          open
                            ? "rotate-45 border-transparent bg-accent-solid text-accent-solid-fg"
                            : "bg-surface-2 group-hover:border-border-strong",
                        )}
                      >
                        <Plus size={14} strokeWidth={2.4} />
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} className="acc-body" data-open={open}>
                    <div>
                      <p className="px-6 pb-6 text-small leading-relaxed text-fg-2">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
