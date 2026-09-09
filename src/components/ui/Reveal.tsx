import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "up" | "mask" | "scale";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "article";
  /** up = default rise · mask = rise + blur + clip · scale = gentle grow */
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  up: "reveal",
  mask: "reveal-mask",
  scale: "reveal-scale",
};

/**
 * Scroll-into-view reveal. IntersectionObserver driven, CSS-transition applied.
 * Content is visible without JS and with prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as never}
      className={cn(variantClass[variant], className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
