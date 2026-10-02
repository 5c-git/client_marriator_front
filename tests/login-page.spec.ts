import { test, expect } from "@playwright/test";

test("login desktop page test", async ({ page }) => {
  await page.goto("");

  await expect(page.getByText("Войти или зарегистрироваться")).toBeVisible();
});
