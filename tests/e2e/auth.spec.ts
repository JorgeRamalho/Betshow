import { test, expect } from "@playwright/test";
import { preparePage } from "./helpers";

test.describe("Autenticação", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("página de login renderiza formulário", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/entrar/i);
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/senha/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /entrar/i })).toBeVisible();
  });

  test("link para cadastro funciona", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: /cadastre-se/i }).click();

    await expect(page).toHaveURL(/\/cadastro$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/criar conta/i);
  });

  test("login admin redireciona ao painel", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/e-mail/i).fill("admin@betshow.com");
    await page.getByLabel(/senha/i).fill("Admin@2026");
    await page.getByRole("checkbox", { name: /administrativo/i }).check();
    await page.getByRole("button", { name: /entrar/i }).click();

    await expect(page).toHaveURL(/\/admin$/, { timeout: 10_000 });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/painel administrativo/i);
  });
});
