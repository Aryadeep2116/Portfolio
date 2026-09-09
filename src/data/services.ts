export interface Service {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  idealFor: string;
  timeline: string;
  /** Value passed to the contact form to preselect project type */
  inquiryType: string;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Modern Website Development",
    summary:
      "Responsive, high-performance marketing sites and landing pages built with React and modern tooling — designed to convert, not just to look good.",
    deliverables: [
      "Mobile-first responsive implementation",
      "Component-based build you can extend",
      "Basic on-page SEO & meta setup",
      "Analytics-ready structure",
      "Deployment (Vercel) & handoff",
    ],
    idealFor: "Businesses launching or modernizing their web presence",
    timeline: "Landing pages typically 1–3 weeks",
    inquiryType: "website",
  },
  {
    number: "02",
    title: "React & Frontend Development",
    summary:
      "Production-ready interfaces, dashboards and features for web applications — from your Figma file or existing product.",
    deliverables: [
      "Figma-to-React implementation",
      "Reusable component architecture",
      "API integration & state handling",
      "Cross-browser & mobile testing",
      "Clean, documented handoff",
    ],
    idealFor: "SaaS founders and teams needing reliable frontend capacity",
    timeline: "Scoped per milestone",
    inquiryType: "react",
  },
  {
    number: "03",
    title: "Website Fixes & Improvements",
    summary:
      "Responsive bugs, UI issues, slow pages and small missing features — diagnosed properly and fixed cleanly.",
    deliverables: [
      "Debugging & root-cause fixes",
      "Responsive & cross-browser corrections",
      "Performance improvements",
      "Small feature work",
      "Clear before/after summary",
    ],
    idealFor: "Anyone with an existing site that needs care",
    timeline: "Small fixes often within days",
    inquiryType: "fix",
  },
  {
    number: "04",
    title: "AI Web Integrations",
    summary:
      "AI-powered features added to existing websites and products — chat, content generation, automation — with loading and error states that feel intentional.",
    deliverables: [
      "LLM / AI API integration",
      "Conversational interfaces",
      "Prompt flow design",
      "Streaming & loading UX",
      "Failure handling & guardrails",
    ],
    idealFor: "Products that want AI features without an in-house team",
    timeline: "Scoped per feature",
    inquiryType: "ai",
  },
];

export const projectTypes = [
  { value: "website", label: "Website" },
  { value: "landing", label: "Landing page" },
  { value: "react", label: "React / frontend" },
  { value: "fix", label: "Bug fix / improvement" },
  { value: "ai", label: "AI integration" },
  { value: "other", label: "Other" },
] as const;

export const budgetRanges = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-5k", label: "$3,000 – $5,000" },
  { value: "5k-plus", label: "$5,000+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "month", label: "Within a month" },
  { value: "quarter", label: "In the next quarter" },
  { value: "flexible", label: "Flexible" },
] as const;
