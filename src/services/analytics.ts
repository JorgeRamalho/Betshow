import { hasAnalyticsConsent } from "../utils/theme";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      init: (key: string, options: Record<string, unknown>) => void;
      capture: (event: string, properties?: Record<string, unknown>) => void;
      opt_out_capturing?: () => void;
    };
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID;
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST ?? "https://app.posthog.com";

let initialized = false;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function initGa4() {
  if (!GA4_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, { send_page_view: false });

  void loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
}

async function initPosthog() {
  if (!POSTHOG_KEY || typeof window === "undefined") return;

  await loadScript(`${POSTHOG_HOST.replace(/\/$/, "")}/static/array.js`);

  window.posthog?.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    persistence: "localStorage",
  });
}

export function initAnalytics() {
  if (initialized || !hasAnalyticsConsent()) return;
  if (!GA4_ID && !POSTHOG_KEY) return;

  initialized = true;
  initGa4();
  void initPosthog();
}

export function trackPageView(path: string, title?: string) {
  if (!hasAnalyticsConsent()) return;

  if (GA4_ID && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title ?? document.title,
    });
  }

  if (POSTHOG_KEY && window.posthog?.capture) {
    window.posthog.capture("$pageview", {
      $current_url: `${window.location.origin}${path}`,
      title: title ?? document.title,
    });
  }
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) return;

  if (GA4_ID && window.gtag) {
    window.gtag("event", name, properties ?? {});
  }

  if (POSTHOG_KEY && window.posthog?.capture) {
    window.posthog.capture(name, properties);
  }
}

export function resetAnalytics() {
  initialized = false;
  window.posthog?.opt_out_capturing?.();
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(GA4_ID || POSTHOG_KEY);
}
