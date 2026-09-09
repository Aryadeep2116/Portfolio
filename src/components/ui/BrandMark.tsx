import type { SVGProps } from "react";

/** Minimal AB monogram: a precise, quiet mark that holds up at favicon size. */
export function BrandMark({ size = 34, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className="brand-mark"
      aria-hidden="true"
      {...props}
    >
      <rect className="brand-mark-bg" x="1" y="1" width="38" height="38" rx="11" />
      <path className="brand-mark-ring" d="M20 7.5a12.5 12.5 0 1 1 0 25 12.5 12.5 0 0 1 0-25Z" />
      <path className="brand-mark-letter" d="m13.1 27 5.1-14h3.6l5.1 14m-11.8-4h9.7" />
      <path className="brand-mark-accent" d="M28.5 12.2v4.2" />
    </svg>
  );
}
