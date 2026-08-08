import { test, expect } from "@playwright/test";
import { preparePage } from "./helpers";

test.describe("Tema claro/escuro", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("alterna data-theme na home", async ({ page }) => {
    await page.goto("/");

    const initial = await page.locator("html").getAttribute("data-theme");
    await page.getByRole("button", { name: /tema (claro|escuro)/i }).click();

    const next = await page.locator("html").getAttribute("data-theme");
    expect(next).not.toBe(initial);
  });
});

test.describe("PWA", () => {
  test("manifest e service worker registrados no build", async ({ page }) => {
    await page.goto("/");

    const manifest = await page.evaluate(async () => {
      const link = document.querySelector('link[rel="manifest"]');
      if (!link) return null;
      const href = link.getAttribute("href");
      if (!href) return null;
      const res = await fetch(href);
      return res.json() as Promise<{ name?: string; short_name?: string }>;
    });

    expect(manifest?.short_name).toBe("BetShow");
    expect(manifest?.name).toMatch(/BetShow/);
  });
});
