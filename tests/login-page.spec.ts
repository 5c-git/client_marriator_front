import { expect } from "@playwright/test";
import { test } from "../playwright.setup";

import { http, HttpResponse } from "msw";
import { mockPostSendPhoneResponseRegister } from "~/api/postSendPhone/postSendPhone";

if (!import.meta.env) {
  (import.meta as any).env = process.env;
}

test("login desktop page test", async ({ page, network }) => {
  network.use(
    http.post(
      `http://preprod.marriator-api.fivecorners.ru/api/sendPhone`,
      // process.env.VITE_SEND_PHONE,
      () => {
        // return HttpResponse.json(mockPostSendPhoneResponseRegister);
        return HttpResponse.json(mockPostSendPhoneResponseRegister);
      },
    ),
  );

  await page.goto("");

  await page.getByLabel("Номер телефона").fill("79152142630");
  await page.getByText("Войти или зарегистрироваться").click();

  await expect(page.getByText("Назад")).toBeVisible();
});

test("orders desktop page test", async ({ page, isMobile }) => {
  test.skip(isMobile);

  await page.goto("http://localhost:5173/dashboard/orders");

  await expect(page.getByText("Поручения")).toBeVisible();
});
