export type ThemeMode = "dark" | "light" | "system";

export type ResolvedTheme = "dark" | "light";

export const THEME_STORAGE_KEY = "betshow_theme";

export const COOKIE_CONSENT_KEY = "betshow_cookie_consent";
export const COOKIE_PREFS_KEY = "betshow_cookie_prefs";

export type CookiePrefs = {
  performance: boolean;
  marketing: boolean;
};

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

export function loadStoredTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light" || saved === "system") {
      return saved;
    }
  } catch {
    /* ignore */
  }
  return "dark";
}

export function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", resolved === "light" ? "#eef2f9" : "#050810");
  }
}

export function loadCookiePrefs(): CookiePrefs | null {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) return null;

    const raw = localStorage.getItem(COOKIE_PREFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CookiePrefs;
      return {
        performance: Boolean(parsed.performance),
        marketing: Boolean(parsed.marketing),
      };
    }

    if (consent === "accepted") {
      return { performance: true, marketing: true };
    }

    return { performance: false, marketing: false };
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  const prefs = loadCookiePrefs();
  if (!prefs) return false;
  return prefs.performance || prefs.marketing;
}
