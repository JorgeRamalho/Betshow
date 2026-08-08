import type { Page } from "@playwright/test";

const CONSENT_KEY = "betshow_cookie_consent";

/** Evita que o banner de cookies bloqueie cliques nos testes E2E */
export async function preparePage(page: Page) {
  await page.addInitScript((key) => {
    localStorage.setItem(key, "accepted");
  }, CONSENT_KEY);
}
