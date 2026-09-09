import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Optional id for the h2 — required when the section uses aria-labelledby */
  titleId?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section header: eyebrow → title → supporting line. */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        centered && "mx-auto items-center text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-muted",
          centered ? "justify-center" : "",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "h-px bg-[linear-gradient(90deg,transparent,var(--signal))]",
            centered ? "w-8" : "w-9",
          )}
        />
        <span className="text-eyebrow">{eyebrow}</span>
        {centered && (
          <span aria-hidden className="h-px w-8 bg-[linear-gradient(90deg,var(--signal),transparent)]" />
        )}
      </p>
      <h2 id={titleId} className="text-h2 text-fg text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-lead text-fg-2 text-pretty">{description}</p>
      )}
    </Reveal>
  );
}
