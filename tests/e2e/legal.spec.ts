import { test, expect } from "@playwright/test";

const LEGAL_PAGES = [
  { path: "/termos", heading: /termos de uso/i },
  { path: "/privacidade", heading: /política de privacidade/i },
  { path: "/cookies", heading: /política de cookies/i },
  { path: "/jogo-responsavel", heading: /jogo responsável/i },
] as const;

test.describe("Páginas legais", () => {
  for (const { path, heading } of LEGAL_PAGES) {
    test(`${path} carrega com H1 e navegação`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      await expect(page.getByRole("navigation", { name: /páginas legais/i })).toBeVisible();
      await expect(page.locator("#main")).toBeVisible();
    });
  }

  test("navegação entre páginas legais", async ({ page }) => {
    await page.goto("/termos");
    await page.getByRole("link", { name: "Cookies", exact: true }).click();
    await expect(page).toHaveURL(/\/cookies$/);
    await page.getByRole("link", { name: "Jogo responsável", exact: true }).click();
    await expect(page).toHaveURL(/\/jogo-responsavel$/);
  });
});
