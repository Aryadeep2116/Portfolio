import { site } from "./site";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Honest label — never implies client work that didn't happen */
  kind: string;
  year: string;
  role: string;
  stack: string[];
  liveUrl?: string;
  sourceUrl?: string;
  caseStudy?: boolean;
}

export const featuredProject: Project & { liveUrl: string; sourceUrl: string } = {
  id: "builditup",
  name: "BuildItUp",
  tagline: "AI-powered project planning for developers",
  description:
    "A web application that turns a rough project idea into a structured, technically realistic build plan — project direction, technology choices, architecture and a step-by-step implementation guide.",
  kind: "Independent product",
  year: "2024",
  role: "Design & frontend development",
  stack: ["React", "JavaScript", "Tailwind CSS", "AI/LLM API", "Vercel"],
  liveUrl: site.links.builditup,
  sourceUrl: site.links.builditupSource,
  caseStudy: true,
};

export const additionalProjects: Project[] = [
  {
    id: "portfolio",
    name: "This website",
    tagline: "A portfolio designed like a product",
    description:
      "The site you're reading — a design-system-driven portfolio with theming, accessibility, SEO and performance treated as features, not afterthoughts.",
    kind: "Personal product",
    year: "2025",
    role: "Design & development",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "ui-lab",
    name: "UI Lab",
    tagline: "Interface experiments & components",
    description:
      "A growing collection of self-initiated interface builds — responsive layouts, interaction patterns and AI-UX concepts I explore between client-style projects.",
    kind: "Ongoing experiments",
    year: "2023 — ongoing",
    role: "Design & development",
    stack: ["React", "JavaScript", "CSS", "AI APIs"],
    // CONFIG: add a live URL or repository when a public version exists
  },
];

export const allProjects = [featuredProject, ...additionalProjects];
