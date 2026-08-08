import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("carrega com título, H1 e seções principais", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/BetShow/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/paixão/i);

    await expect(page.locator("#calendario")).toBeVisible();
    await expect(page.locator("#copa2026")).toBeVisible();
    await expect(page.locator("#odds")).toBeVisible();
    await expect(page.locator("#cadastro")).toBeVisible();
  });

  test("skip link leva ao conteúdo principal", async ({ page }) => {
    await page.goto("/");

    const skipLink = page.getByRole("link", { name: /conteúdo principal/i });
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
    await skipLink.click();

    await expect(page.locator("#main")).toBeFocused();
  });

  test("footer contém links legais funcionais", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /termos de uso/i }).click();
    await expect(page).toHaveURL(/\/termos$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/termos de uso/i);
  });
});
