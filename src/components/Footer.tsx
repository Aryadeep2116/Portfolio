import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

const year = new Date().getFullYear();

const socials = [
  { label: "GitHub", href: site.links.github, icon: GithubIcon, event: "github_clicked" as const },
  { label: "LinkedIn", href: site.links.linkedin, icon: LinkedinIcon, event: "linkedin_clicked" as const },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail, event: "email_clicked" as const },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-accent-solid text-[0.8125rem] font-bold text-accent-solid-fg"
              >
                {site.initials}
              </span>
              <span className="text-[0.9375rem] font-semibold text-fg">{site.name}</span>
            </Link>
            <p className="mt-4 text-small text-fg-2">
              Frontend developer building modern websites and web applications with React,
              JavaScript and AI integrations.
            </p>
            <p className="mt-3 text-tiny text-muted">{site.notes.remote}.</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="text-eyebrow text-muted">Menu</p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
              <Link to="/work" className="text-small font-medium text-fg-2 transition-colors hover:text-link">
                Work
              </Link>
              <Link to="/#services" className="text-small font-medium text-fg-2 transition-colors hover:text-link">
                Services
              </Link>
              <Link to="/#about" className="text-small font-medium text-fg-2 transition-colors hover:text-link">
                About
              </Link>
              <Link to="/#contact" className="text-small font-medium text-fg-2 transition-colors hover:text-link">
                Contact
              </Link>
            </div>
          </nav>

          {/* Elsewhere */}
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow text-muted">Elsewhere</p>
            <ul className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon, event }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onClick={() => track(event)}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-link"
                  >
                    <Icon size={17} strokeWidth={1.8} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.email}`}
              onClick={() => track("email_clicked")}
              className="text-small font-medium text-fg-2 transition-colors hover:text-link"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-tiny text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-tiny text-muted">{site.positioning}</p>
        </div>
      </div>
    </footer>
  );
}
