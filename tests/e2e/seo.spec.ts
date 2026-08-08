import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test("home possui meta description e Open Graph", async ({ page }) => {
    await page.goto("/");

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /apostas esportivas/i);

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /BetShow/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /og-cover\.png/
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image"
    );
  });

  test("home possui JSON-LD Organization e WebSite", async ({ page }) => {
    await page.goto("/");

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);

    const data = JSON.parse((await jsonLd.textContent()) ?? "{}");
    const types = JSON.stringify(data).toLowerCase();

    expect(types).toContain("organization");
    expect(types).toContain("website");
    expect(types).toContain("webpage");
  });

  test("login atualiza o título da página", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Login.*BetShow/);
  });

  test("imagens do hero possuem texto alternativo", async ({ page }) => {
    await page.goto("/");

    const heroImages = page.locator(".hero__carousel-slide img");
    const count = await heroImages.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const alt = await heroImages.nth(i).getAttribute("alt");
      expect(alt?.trim().length).toBeGreaterThan(0);
    }
  });
});
