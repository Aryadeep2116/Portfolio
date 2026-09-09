/**
 * Minimal per-page SEO manager for the SPA.
 * Updates document title + meta description + canonical per route.
 */

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

export function setPageMeta(opts: { title: string; description: string; path?: string }) {
  document.title = opts.title;
  upsertMeta('meta[name="description"]', { name: "description", content: opts.description });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: opts.title });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: opts.description,
  });

  if (opts.path) {
    const url = `https://alexmorgan.dev${opts.path}`; // CONFIG: production domain
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }
}

/** Inject a JSON-LD script block for the current page (idempotent by id). */
export function injectJsonLd(id: string, data: object) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
