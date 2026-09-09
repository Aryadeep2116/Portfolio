import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const base =
  "btn-sheen relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl font-semibold transition-[filter,box-shadow,transform,border-color,background-color,color] duration-300 active:translate-y-px active:scale-[0.99] disabled:pointer-events-none disabled:opacity-55 [&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:translate-x-0.5 [&>svg]:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

const variants: Record<Variant, string> = {
  primary:
    "text-accent-solid-fg bg-[linear-gradient(180deg,var(--btn-a),var(--btn-b))] shadow-[inset_0_1px_0_var(--btn-edge),0_3px_16px_-4px_var(--accent-ring)] hover:brightness-[1.08] hover:shadow-[inset_0_1px_0_var(--btn-edge),0_10px_32px_-8px_var(--accent-ring)] hover:-translate-y-px",
  secondary:
    "border border-border-strong bg-surface/70 text-fg backdrop-blur-sm hover:border-accent hover:text-link hover:shadow-card hover:-translate-y-px",
  ghost: "text-fg-2 hover:bg-surface-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  to?: undefined;
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  to: string | { pathname: string; search?: string; hash?: string };
  href?: undefined;
  onClick?: () => void;
}

interface ButtonAsAnchor extends CommonProps {
  to?: undefined;
  href: string;
  external?: boolean;
  onClick?: () => void;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/** Polymorphic button — renders <button>, <Link> or <a> with one visual system. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls} onClick={props.onClick}>
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    const { href, external, onClick } = props;
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  const buttonProps = props as ButtonAsButton;
  return (
    <button {...buttonProps} className={cls}>
      {children}
    </button>
  );
}
