import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { budgetRanges, projectTypes, timelines } from "@/data/services";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/utils/cn";
import { Button } from "./ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

interface Fields {
  name: string;
  email: string;
  project: string;
  type: string;
  details: string;
  budget: string;
  timeline: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fieldError(key: keyof Fields, value: string): string | null {
  switch (key) {
    case "name":
      if (!value.trim()) return "Please tell me your name.";
      if (value.trim().length < 2) return "Name looks too short.";
      return null;
    case "email":
      if (!value.trim()) return "Please add your email so I can reply.";
      if (!EMAIL_RE.test(value.trim())) return "That email doesn't look right.";
      return null;
    case "details":
      if (!value.trim()) return "A sentence or two about the project is enough.";
      if (value.trim().length < 10) return "Just a little more detail, please.";
      return null;
    default:
      return null;
  }
}

const inputBase =
  "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-fg placeholder:text-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-accent";

export function ContactForm() {
  const [params] = useSearchParams();
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    project: "",
    type: "website",
    details: "",
    budget: "",
    timeline: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string | null>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const startedRef = useRef(false);
  const honeypotGuard = useRef<HTMLInputElement>(null);

  // Preselect project type from ?type= (service CTAs link here)
  useEffect(() => {
    const t = params.get("type");
    if (t && projectTypes.some((p) => p.value === t)) {
      setFields((f) => ({ ...f, type: t }));
    }
  }, [params]);

  const setField = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (touched[key]) setErrors((e) => ({ ...e, [key]: fieldError(key, value) }));
    if (!startedRef.current) {
      startedRef.current = true;
      track("contact_form_started");
    }
  };

  const blurField = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: fieldError(key, fields[key]) }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return; // duplicate-submission guard

    // Honeypot filled → almost certainly a bot. Drop silently.
    if (honeypotGuard.current?.value) {
      setStatus("success");
      return;
    }

    const nextErrors = {
      name: fieldError("name", fields.name),
      email: fieldError("email", fields.email),
      details: fieldError("details", fields.details),
    };
    setErrors(nextErrors);
    setTouched({ name: true, email: true, details: true });
    if (nextErrors.name || nextErrors.email || nextErrors.details) {
      document.getElementById("cf-name")?.focus();
      return;
    }

    setStatus("submitting");
    try {
      if (site.contactEndpoint) {
        const res = await fetch(site.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...fields, _replyto: fields.email }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Demo mode — no backend connected yet. Simulate network latency.
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("success");
      track("contact_form_submitted", { type: fields.type });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface p-8 text-center shadow-card"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle2 size={24} aria-hidden />
        </span>
        <h3 className="text-h3 text-fg">Message sent</h3>
        <p className="max-w-sm text-small text-fg-2">
          Thanks, {fields.name.split(" ")[0] || "there"} — your message is on its way.
          {" "}
          {site.availability.responseTime}. Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="link-inline font-medium">
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8"
    >
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-transparent bg-error-soft p-4"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-error" aria-hidden />
          <div className="text-small">
            <p className="font-semibold text-error">Something went wrong sending your message.</p>
            <p className="mt-0.5 text-fg-2">
              Please try again, or email me directly at{" "}
              <a href={`mailto:${site.email}`} className="link-inline font-medium">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="cf-name"
          label="Name"
          required
          error={touched.name ? errors.name : undefined}
          autoComplete="name"
          placeholder="Jane Smith"
          value={fields.name}
          onChange={(v) => setField("name", v)}
          onBlur={() => blurField("name")}
        />
        <Field
          id="cf-email"
          label="Email"
          type="email"
          required
          error={touched.email ? errors.email : undefined}
          autoComplete="email"
          inputMode="email"
          placeholder="jane@company.com"
          value={fields.email}
          onChange={(v) => setField("email", v)}
          onBlur={() => blurField("email")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="cf-project"
          label="Company / project"
          hint="optional"
          autoComplete="organization"
          placeholder="Acme Inc. — or leave blank"
          value={fields.project}
          onChange={(v) => setField("project", v)}
        />
        <Select
          id="cf-type"
          label="Project type"
          value={fields.type}
          onChange={(v) => setField("type", v)}
          options={projectTypes.map((t) => ({ value: t.value, label: t.label }))}
        />
      </div>

      <div>
        <label htmlFor="cf-details" className="mb-1.5 block text-[0.875rem] font-semibold text-fg">
          What do you need? <span className="text-muted">(required)</span>
        </label>
        <textarea
          id="cf-details"
          rows={4}
          required
          placeholder="A few sentences — what you're building, what exists already, and what a win looks like."
          aria-invalid={Boolean(touched.details && errors.details)}
          aria-describedby={touched.details && errors.details ? "cf-details-error" : undefined}
          className={cn(inputBase, "resize-y min-h-[104px]", touched.details && errors.details && "border-error")}
          value={fields.details}
          onChange={(e) => setField("details", e.target.value)}
          onBlur={() => blurField("details")}
        />
        {touched.details && errors.details && (
          <p id="cf-details-error" role="alert" className="mt-1.5 text-tiny font-medium text-error">
            {errors.details}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          id="cf-budget"
          label="Budget range"
          hint="optional"
          value={fields.budget}
          onChange={(v) => setField("budget", v)}
          placeholder="Prefer not to say"
          options={budgetRanges.map((b) => ({ value: b.value, label: b.label }))}
        />
        <Select
          id="cf-timeline"
          label="Timeline"
          hint="optional"
          value={fields.timeline}
          onChange={(v) => setField("timeline", v)}
          placeholder="No rush"
          options={timelines.map((t) => ({ value: t.value, label: t.label }))}
        />
      </div>

      {/* Honeypot — invisible to humans, catches naive bots */}
      <div aria-hidden="true" className="fixed -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          ref={honeypotGuard}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-tiny text-muted">
          {site.availability.responseTime}. No spam, no newsletters.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="sm:min-w-[190px]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight size={17} aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/* ── Field primitives ─────────────────────────────────────────────────────── */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | null;
  type?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "email" | "text" | "url";
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  required,
  hint,
  placeholder,
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-[0.875rem] font-semibold text-fg">
        {label}
        {required && <span className="text-muted">(required)</span>}
        {hint && <span className="text-tiny font-normal text-muted">({hint})</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputBase, error && "border-error")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-tiny font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
  placeholder?: string;
}

function Select({ id, label, value, onChange, options, hint, placeholder }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-[0.875rem] font-semibold text-fg">
        {label}
        {hint && <span className="text-tiny font-normal text-muted">({hint})</span>}
      </label>
      <select
        id={id}
        className={cn(inputBase, "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236d6d79%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[position:right_0.9rem_center] bg-no-repeat pr-10")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
