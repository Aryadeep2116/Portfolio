import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";

const anchorLinks = [
  { label: "Services", hash: "#services" },
  { label: "About", hash: "#about" },
];

const navLinks = [
  { label: "Work", to: "/work" },
  ...anchorLinks.map((l) => ({ label: l.label, to: `/${l.hash}` })),
];

/**
 * Sticky site header: transparent over the hero, gains a blurred surface,
 * border, slight shrink and a reading-progress bar once scrolled.
 * Mobile menu is a focus-trapped dialog with ESC + scroll lock.
 */
export function Navigation() {
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-border bg-[color-mix(in_srgb,var(--background)_82%,transparent)] shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 transition-[height] duration-300 ease-out sm:px-8",
          scrolled ? "h-14" : "h-16",
        )}
      >
        {/* Wordmark */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-lg py-1.5 pr-2"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden
            className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[9px] bg-accent-solid text-[0.8125rem] font-bold text-accent-solid-fg transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
          >
            {site.initials}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </span>
          <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-fg">
            {site.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              data-active={location.pathname + location.hash === link.to}
              className="nav-link relative rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium text-fg-2 transition-colors duration-200 hover:bg-surface-2 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-5 w-px bg-border" aria-hidden />
          <ThemeToggle />
          <Button to="/#contact" variant="primary" size="md" className="ml-3">
            Start a Project
            <ArrowRight size={16} strokeWidth={2} aria-hidden />
          </Button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-fg transition-colors duration-200 hover:bg-surface-2"
          >
            <span className={cn("transition-transform duration-300", open ? "rotate-90" : "rotate-0")}>
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </span>
          </button>
        </div>
      </div>

      <ScrollProgress />

      {/* Mobile menu */}
      <div
        id={menuId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="border-t border-border bg-background md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-4">
          {[...navLinks, { label: "Contact", to: "/#contact" }].map((link, i) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold text-fg transition-colors duration-200 hover:bg-surface-2"
              style={open ? { animation: `fade-up 0.4s cubic-bezier(0.22,1,0.36,1) ${60 + i * 55}ms both` } : undefined}
            >
              {link.label}
              <ArrowRight size={18} className="text-muted" aria-hidden />
            </Link>
          ))}
          <div
            className="mt-3"
            style={open ? { animation: "fade-up 0.4s cubic-bezier(0.22,1,0.36,1) 300ms both" } : undefined}
          >
            <Button to="/#contact" size="lg" className="w-full">
              Start a Project
              <ArrowRight size={17} aria-hidden />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
