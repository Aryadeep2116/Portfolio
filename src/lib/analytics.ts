/**
 * Privacy-friendly, optional analytics shim.
 * Forwards events to `window.dataLayer` (GA4 / Vercel Analytics style) when
 * present. Nothing is sent anywhere by default — wire up your provider in
 * one place here.
 */

export type AnalyticsEvent =
  | "hero_cta"
  | "view_project"
  | "case_study_opened"
  | "contact_form_started"
  | "contact_form_submitted"
  | "email_clicked"
  | "email_copied"
  | "github_clicked"
  | "linkedin_clicked"
  | "live_demo_clicked";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } catch {
    // analytics must never break the UI
  }
}
