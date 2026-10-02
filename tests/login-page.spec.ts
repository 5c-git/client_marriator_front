import { test, expect } from "@playwright/test";

test("login desktop page test", async ({ page }) => {
  await page.goto("");

  await expect(page.getByText("Войти или зарегистрироваться")).toBeVisible();
});

// test("login desktop page test", async ({ page }) => {
//   await page.goto("http://localhost:5173/dashboard/orders");

//   await expect(page.getByText("Поручения")).toBeVisible();
// });
