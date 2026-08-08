/** Constantes SEO compartilhadas — meta tags, OG e structured data */

export const SITE_NAME = "BetShow";
export const SITE_TAGLINE = "Apostas Esportivas Premium";
export const PRODUCTION_ORIGIN = "https://betshow.netlify.app";
export const GITHUB_PAGES_ORIGIN = "https://jorgeramalho.github.io";
export const GITHUB_PAGES_BASE = "/Betshow";

export const DEFAULT_DESCRIPTION =
  "BetShow — apostas esportivas seguras, bônus exclusivos, cashback e cadastro com CPF verificado. Plataforma 100% regulada.";

export const OG_IMAGE_PATH = "/assets/og-cover.png";
export const LOGO_PATH = "/assets/logo-betshow.svg";

export function getSiteOrigin(): string {
  if (typeof window === "undefined") return PRODUCTION_ORIGIN;
  const { hostname } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return PRODUCTION_ORIGIN;
  }
  return window.location.origin;
}

export function getBasename(): string {
  if (typeof window === "undefined") return "";
  if (
    window.location.hostname.endsWith("github.io") &&
    window.location.pathname.toLowerCase().startsWith("/betshow")
  ) {
    return GITHUB_PAGES_BASE;
  }
  return "";
}

export function getCanonicalUrl(pathname: string): string {
  return `${getSiteOrigin()}${getBasename()}${pathname}`;
}

export function getOgImageUrl(): string {
  return `${getSiteOrigin()}${getBasename()}${OG_IMAGE_PATH}`;
}

export function getFullTitle(pageTitle: string): string {
  return pageTitle === "Início"
    ? `${SITE_NAME} — ${SITE_TAGLINE}`
    : `${pageTitle} | ${SITE_NAME}`;
}
