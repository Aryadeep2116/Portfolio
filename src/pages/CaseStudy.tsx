import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  Database,
  FileText,
  Layers,
  ListChecks,
  Loader2,
  Puzzle,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  SquareStack,
} from "lucide-react";
import { featuredProject } from "@/data/projects";
import { injectJsonLd, setPageMeta } from "@/lib/seo";
import { track } from "@/lib/analytics";
import { BrowserFrame } from "@/components/BrowserFrame";
import { BuildItUpPreview } from "@/components/BuildItUpPreview";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/BrandIcons";

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Key features" },
  { id: "design", label: "Design decisions" },
  { id: "engineering", label: "Engineering" },
  { id: "ai-workflow", label: "AI workflow" },
  { id: "challenges", label: "Challenges" },
  { id: "result", label: "Result" },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Project generation",
    text: "A plain-language idea becomes a structured project direction in one step — no forms with twenty fields.",
  },
  {
    icon: SquareStack,
    title: "Tailored ideas",
    text: "Instead of generic advice, recommendations adapt to the idea's scope, audience and constraints.",
  },
  {
    icon: Layers,
    title: "Stack recommendations",
    text: "A concrete technology shortlist with reasons — what to use, and just as importantly, what not to.",
  },
  {
    icon: Braces,
    title: "Architecture guidance",
    text: "How the pieces fit: frontend, backend, data and third-party services, at the right level of detail.",
  },
  {
    icon: ListChecks,
    title: "Build guide",
    text: "An ordered, milestone-based plan that turns 'big scary project' into 'do this, then this'.",
  },
  {
    icon: FileText,
    title: "Resume-ready outputs",
    text: "Plans are written so developers can lift them straight into portfolios, proposals and READMEs.",
  },
];

const DESIGN_DECISIONS = [
  {
    title: "One job per screen",
    text: "The generator lives at the center of the app. Everything else — plans, library, settings — is secondary and stays out of the way until needed.",
  },
  {
    title: "Progressive disclosure",
    text: "Nothing is asked upfront that isn't needed. The idea goes in first; details and refinements come after the first generation, not before.",
  },
  {
    title: "Designed loading, not spinners",
    text: "AI generation takes seconds, so the waiting state is designed: status, progress and reassurance — not a frozen page.",
  },
  {
    title: "Mobile-first density",
    text: "Plans are information-dense. On phones they reflow into a single readable column with sticky navigation instead of shrinking desktop tables.",
  },
];

const ENGINEERING_DECISIONS = [
  {
    icon: Puzzle,
    title: "Component-driven React",
    text: "A small set of composable components keeps the UI consistent and the codebase easy to extend — new features read like configuration, not surgery.",
  },
  {
    icon: ShieldCheck,
    title: "Keys never touch the client",
    text: "LLM calls run through a serverless endpoint. API keys live in environment variables server-side — nothing sensitive ever ships in the bundle.",
  },
  {
    icon: RefreshCcw,
    title: "Graceful failure",
    text: "Network errors, rate limits and malformed responses are all handled — with a retry path and honest messaging instead of a dead screen.",
  },
  {
    icon: Database,
    title: "Validated, structured output",
    text: "AI responses are parsed against an expected shape before rendering. The UI never renders unvalidated model output directly.",
  },
];

const CHALLENGES = [
  {
    title: "Making a multi-second AI call feel fast",
    text: "Generation isn't instant — so the interface shows staged progress (understanding → planning → writing) instead of one long spinner. Perceived wait dropped sharply even though the real time didn't change.",
  },
  {
    title: "Rendering structured AI output reliably",
    text: "Language models occasionally drift from the expected format. The parsing layer validates every response, retries once on malformed output, and falls back to a clear error with a retry action.",
  },
  {
    title: "Prompt quality is product quality",
    text: "Early plans were generic and safe. Iterating prompts against real ideas — and constraining the model to specific sections — is what made recommendations feel tailored instead of templated.",
  },
];

export default function CaseStudy() {
  useEffect(() => {
    setPageMeta({
      title: "BuildItUp Case Study — Aryadeep Biswas Portfolio",
      description:
        "How I designed and built BuildItUp: an AI-powered web app that turns project ideas into structured build plans. Design decisions, architecture, AI workflow and challenges.",
      path: "/work/builditup",
    });
    injectJsonLd("ld-builditup", {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "BuildItUp",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: featuredProject.liveUrl,
      description: featuredProject.description,
      author: { "@type": "Person", name: "Alex Morgan" },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
    track("case_study_opened");
  }, []);

  return (
    <>
      {/* ── Case study hero ─────────────────────────────────────────────── */}
      <section className="border-b border-border pt-16">
        <Container className="py-14 sm:py-20">
          <Reveal className="flex flex-col gap-6">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-small font-medium text-muted transition-colors hover:text-link"
            >
              <ArrowLeft size={15} aria-hidden />
              All work
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-tiny font-semibold text-link">
                {featuredProject.kind}
              </span>
              <span className="text-tiny text-muted">{featuredProject.year}</span>
              <span aria-hidden className="text-muted">·</span>
              <span className="text-tiny text-muted">{featuredProject.role}</span>
            </div>
            <h1 className="text-hero max-w-3xl text-fg text-balance">BuildItUp</h1>
            <p className="text-lead max-w-2xl text-fg-2">{featuredProject.description}</p>
            <div className="flex flex-wrap gap-3">
              <Button
                href={featuredProject.liveUrl}
                external
                size="lg"
                onClick={() => track("live_demo_clicked", { source: "case_study" })}
              >
                Try the live demo
                <ArrowUpRight size={17} aria-hidden />
              </Button>
              <Button
                href={featuredProject.sourceUrl}
                external
                variant="secondary"
                size="lg"
                onClick={() => track("github_clicked", { source: "case_study" })}
              >
                <GithubIcon size={17} />
                View source
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Body with sticky nav ────────────────────────────────────────── */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-56 xl:block" aria-hidden />
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[200px_1fr] lg:gap-14">
          {/* Sticky section nav (desktop) */}
          <aside className="hidden lg:block">
            <nav aria-label="Case study sections" className="sticky top-24 flex flex-col gap-1 border-l border-border">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="-ml-px border-l-2 border-transparent py-1.5 pl-4 text-small font-medium text-muted transition-all duration-300 hover:translate-x-0.5 hover:border-accent hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Sections */}
          <div className="flex max-w-3xl flex-col gap-20">
            {/* Overview */}
            <section id="overview" className="scroll-mt-28">
              <Reveal>
                <h2 className="text-h2 text-fg">Overview</h2>
                <div className="mt-5 flex flex-col gap-4 text-lead text-fg-2">
                  <p>
                    BuildItUp is an independent product I designed, built and shipped — an
                    AI-powered web application that turns a rough project idea into a structured,
                    technically realistic build plan: project direction, technology choices,
                    architecture and a step-by-step implementation guide.
                  </p>
                  <p>
                    It started as a tool for myself. Like most developers, I had a notes app full of
                    ideas that never became anything — not because they were bad, but because
                    "what stack? what architecture? what do I build first?" is a real barrier.
                    BuildItUp removes it.
                  </p>
                </div>
                <dl className="mt-8 grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-3">
                  <div>
                    <dt className="text-eyebrow text-muted">Role</dt>
                    <dd className="mt-2 text-small font-medium text-fg">{featuredProject.role}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-muted">Stack</dt>
                    <dd className="mt-2 text-small font-medium text-fg">
                      {featuredProject.stack.join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-muted">Status</dt>
                    <dd className="mt-2 flex items-center gap-1.5 text-small font-medium text-fg">
                      <Check size={14} className="text-success" aria-hidden />
                      Live & usable today
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </section>

            {/* Problem */}
            <section id="problem" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">01 — Problem</p>
                <h2 className="text-h2 mt-4 text-fg text-balance">
                  Between "I have an idea" and "I'm building it"
                </h2>
                <div className="mt-5 flex flex-col gap-4 text-lead text-fg-2">
                  <p>
                    Developers — especially early in their careers — stall at the same spot: the
                    idea exists, the motivation exists, but the plan doesn't. Tutorials teach
                    syntax, not decisions. Generic advice doesn't account for the specific product
                    you're trying to build.
                  </p>
                  <p>
                    The result is a familiar loop: an excited note in a phone, a half-read tutorial,
                    then nothing. The hardest part of a project shouldn't be starting it.
                  </p>
                </div>
              </Reveal>
            </section>

            {/* Solution */}
            <section id="solution" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">02 — Solution</p>
                <h2 className="text-h2 mt-4 text-fg text-balance">
                  Describe the idea. Get a plan you can execute.
                </h2>
                <p className="text-lead mt-5 text-fg-2">
                  BuildItUp asks for one thing — your idea, in plain language. In return it
                  generates a structured recommendation covering project direction, technology
                  choices, architecture and an ordered build guide. The output is specific enough to
                  act on and honest about trade-offs.
                </p>
                <div className="mt-8">
                  <BrowserFrame url="builditup.dpdns.org">
                    <BuildItUpPreview detailed />
                  </BrowserFrame>
                  <p className="mt-3 text-center text-tiny text-muted">
                    The generation flow — interface preview, rendered from the product design
                  </p>
                </div>
              </Reveal>
            </section>

            {/* Key features */}
            <section id="features" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">03 — Key features</p>
                <h2 className="text-h2 mt-4 text-fg">What the product does</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {FEATURES.map((feature) => (
                    <div key={feature.title} className="rounded-xl border border-border bg-surface p-6">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-link">
                        <feature.icon size={16} strokeWidth={1.8} aria-hidden />
                      </span>
                      <h3 className="mt-4 text-[0.9375rem] font-semibold text-fg">{feature.title}</h3>
                      <p className="mt-1.5 text-small leading-relaxed text-fg-2">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Design decisions */}
            <section id="design" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">04 — Design</p>
                <h2 className="text-h2 mt-4 text-fg">Design decisions</h2>
                <ol className="mt-8 flex flex-col gap-5">
                  {DESIGN_DECISIONS.map((decision, i) => (
                    <li key={decision.title} className="flex gap-5 rounded-xl border border-border bg-surface p-6">
                      <span className="font-mono text-[0.8125rem] font-medium text-muted" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[0.9375rem] font-semibold text-fg">{decision.title}</h3>
                        <p className="mt-1.5 text-small leading-relaxed text-fg-2">{decision.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>

            {/* Engineering decisions */}
            <section id="engineering" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">05 — Engineering</p>
                <h2 className="text-h2 mt-4 text-fg">Engineering decisions</h2>
                <p className="text-lead mt-5 text-fg-2">
                  A React single-page application, deployed on Vercel, with AI calls proxied through
                  serverless functions. The interesting decisions were about trust and failure:
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {ENGINEERING_DECISIONS.map((decision) => (
                    <div key={decision.title} className="rounded-xl border border-border bg-surface p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-link">
                          <decision.icon size={16} strokeWidth={1.8} aria-hidden />
                        </span>
                        <h3 className="text-[0.9375rem] font-semibold text-fg">{decision.title}</h3>
                      </div>
                      <p className="mt-3 text-small leading-relaxed text-fg-2">{decision.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* AI workflow */}
            <section id="ai-workflow" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">06 — AI workflow</p>
                <h2 className="text-h2 mt-4 text-fg">How the AI is integrated</h2>
                <p className="text-lead mt-5 text-fg-2">
                  The AI is treated as a backend service with a contract, not a magic box. The flow
                  from idea to plan:
                </p>
                <ol className="mt-8 flex flex-col gap-3">
                  {[
                    {
                      icon: Bot,
                      title: "User input",
                      text: "The idea is captured in plain language and lightly normalized — no rigid forms.",
                    },
                    {
                      icon: Braces,
                      title: "Structured prompt",
                      text: "A serverless function wraps the idea in a carefully tuned prompt that requests output in a defined shape: direction, stack, architecture, milestones.",
                    },
                    {
                      icon: Loader2,
                      title: "Streaming UX",
                      text: "While the model works, the UI shows staged progress so the wait feels intentional, not broken.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Validation & parsing",
                      text: "The response is checked against the expected schema. Malformed output triggers one silent retry, then a graceful error.",
                    },
                    {
                      icon: Layers,
                      title: "Rendering",
                      text: "Validated data renders through the same React components every time — consistent typography, hierarchy and responsive behavior.",
                    },
                  ].map((step, i) => (
                    <li key={step.title} className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-link">
                        <step.icon size={16} strokeWidth={1.8} aria-hidden />
                      </span>
                      <div>
                        <p className="text-small font-semibold text-fg">
                          <span className="text-muted" aria-hidden>
                            {i + 1}.{" "}
                          </span>
                          {step.title}
                        </p>
                        <p className="mt-1 text-small text-fg-2">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>

            {/* Challenges */}
            <section id="challenges" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">07 — Challenges</p>
                <h2 className="text-h2 mt-4 text-fg">What was hard — and how it got solved</h2>
                <div className="mt-8 flex flex-col gap-5">
                  {CHALLENGES.map((challenge) => (
                    <div key={challenge.title} className="rounded-xl border border-border bg-surface p-6 sm:p-7">
                      <h3 className="text-[0.9375rem] font-semibold text-fg">{challenge.title}</h3>
                      <p className="mt-2 text-small leading-relaxed text-fg-2">{challenge.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Result */}
            <section id="result" className="scroll-mt-28">
              <Reveal>
                <p className="text-eyebrow text-link">08 — Result</p>
                <h2 className="text-h2 mt-4 text-fg">What shipped</h2>
                <div className="mt-5 flex flex-col gap-4 text-lead text-fg-2">
                  <p>
                    BuildItUp is live today at{" "}
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-inline font-medium"
                    >
                      builditup.dpdns.org
                    </a>
                    . It takes an idea and returns a usable, structured plan — the kind I wish I'd
                    had when starting it.
                  </p>
                  <p>
                    Building it end to end sharpened the exact skills I bring to client work:
                    designing for AI latency, handling failure gracefully, structuring a codebase
                    that stays maintainable, and shipping something real.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={featuredProject.liveUrl} external size="lg">
                    Try it with your own idea
                    <ArrowUpRight size={17} aria-hidden />
                  </Button>
                  <Button to="/#contact" variant="secondary" size="lg">
                    Build something like this with me
                    <ArrowRight size={17} aria-hidden />
                  </Button>
                </div>
              </Reveal>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
