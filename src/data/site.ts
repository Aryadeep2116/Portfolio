/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIGURATION — single source of truth.
 * Everything a real owner must personalize lives here, clearly marked with
 * `CONFIG`. No values in this file should be presented as verified facts
 * unless the owner confirms them (availability, response time, links).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  // CONFIG: replace with your real name / wordmark
  name: "Aryadeep Biswas",
  initials: "AB",

  role: "Frontend Developer",
  positioning: "Frontend Developer · React · JavaScript · AI Integrations",
  tagline: "Modern websites that feel as good as they work.",

  // CONFIG: replace with a professional email address (ideally on your domain)
  email: "aryadeepbiswas014@gmail.com",
  phone: "+91 97483 79277",

  location: "Remote — working with clients worldwide",

  // CONFIG: keep this truthful. Set to "false" when you are not taking work.
  availability: {
    status: "Available for new projects",
    accepting: [
      "Landing pages & business websites",
      "React / frontend development",
      "Website fixes & improvements",
      "Small React projects",
      "AI web integrations",
    ],
    // CONFIG: only keep this if you genuinely reply within this window
    responseTime: "Typical response within 24 hours",
  },

  links: {
    // CONFIG: point these at your real profiles / repositories
    github: "https://github.com/alexmorgan",
    linkedin: "https://www.linkedin.com/in/aryadeep-biswas-09a416338/",
    builditup: "https://builditup.dpdns.org",
    // CONFIG: BuildItUp source repository — replace with the real repo URL
    builditupSource: "https://github.com/alexmorgan/builditup",
    // CONFIG: optional booking link (Calendly etc.) — leave empty to hide
    calendar: "",
  },

  // Optional footer note — keep truthful
  notes: {
    remote: "Available for remote work worldwide",
  },

  /**
   * CONFIG: contact form endpoint (e.g. Formspree / Basin / your serverless
   * function with rate limiting). Leave empty while no backend is connected —
   * the form then runs in demo mode and clearly tells the visitor to use email.
   * Never place API keys or secrets here; use a proxy endpoint URL only.
   */
  contactEndpoint: "",
} as const;

export type Site = typeof site;
