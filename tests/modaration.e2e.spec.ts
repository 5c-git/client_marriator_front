import { expect } from "@playwright/test";
import { test } from "../playwright.setup";

import { http, HttpResponse } from "msw";

test.describe("Тесты модерации", () => {
  test("Менеджер модерирует супервайзера", async ({
    page,
    network,
    loginAs,
  }) => {
    test.setTimeout(300000);

    const supervisors = {
      data: [
        {
          id: 100,
          name: "Тестовый супервайзер",
          phone: 77777777777,
          email: "supervisor@mail.ru",
          logo: "",
          project: [
            {
              id: 1,
              name: "Проект тестовый",
              dateStart: "2026-01-01T00:00:00.000000Z",
              dateEnd: "2027-01-20T00:00:00.000000Z",
              timeStart: null,
              timeEnd: null,
              brand: [
                {
                  id: 5,
                  name: "Тестовый бренд",
                  logo: "",
                  description: "Тестовый бренд",
                },
              ],
            },
          ],
          place: [
            {
              id: 2,
              name: "улица Тестовая",
              latitude: "55.79175900",
              longitude: "49.15874100",
              address_kladr: "тестовый адрес",
              logo: "",
              region: {
                id: 1,
                name: "Тестовая область",
              },
              brand: {
                id: 5,
                name: "Тестовый бренд",
                logo: "",
                description: "Тестовый бренд",
              },
            },
          ],
          roles: [
            {
              id: 6,
              name: "supervisor",
            },
          ],
          change_order: "02:00",
          cancel_order: "02:00",
          live_order: "02:00",
          change_task: "02:00",
          cancel_task: "02:00",
          live_task: "02:00:00",
          repeat_bid: "02:00:00",
          leave_bid: "01:00:00",
          refusal_task: "02:00:00",
          waiting_task: 60,
          count_wait_bid: 1,
          time_answer_bid: 12,
          notification_start: 60,
          supervisors: [],
          manager: [
            {
              id: 999,
              phone: 79128443334,
              email: " testmanager@mail.ru",
              logo: "",
              roles: [
                {
                  id: 3,
                  name: "manager",
                },
              ],
              name: "Тестовый менеджер",
            },
          ],
          counterparty: [
            {
              id: 1,
              name: "Тестовый контрагент",
              ogrn: "1040501262867",
              legal_address: "",
              legal_email: "favorit56@mail.ru",
            },
          ],
          confirmRegister: true,
          finishRegister: true,
        },
      ],
      links: {
        first:
          "http://preprod.marriator-api.fivecorners.ru/api/personal/moderation/getModerationClient?page=1",
        last: null,
        prev: null,
        next: null,
      },
      meta: {
        current_page: 1,
        from: 1,
        path: "http://preprod.marriator-api.fivecorners.ru/api/personal/moderation/getModerationClient",
        per_page: 1000000,
        to: 9,
      },
    };

    let supervisor = {
      data: {
        id: 100,
        name: "Тестовый супервайзер",
        phone: 77777777777,
        email: "supervisor@mail.ru",
        logo: "",
        project: [
          // {
          //   id: 9,
          //   name: "ЗЯ ТАТ",
          //   dateStart: "2026-01-01T00:00:00.000000Z",
          //   dateEnd: "2027-01-20T00:00:00.000000Z",
          //   timeStart: null,
          //   timeEnd: null,
          //   brand: [
          //     {
          //       id: 5,
          //       name: "Зеленое яблоко",
          //       logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          //       description: "Зеленое яблоко",
          //     },
          //   ],
          // },
        ],
        place: [
          // {
          //   id: 12,
          //   name: "улица Николая Ершова, 20В, Казань, РТ",
          //   latitude: "55.79175900",
          //   longitude: "49.15874100",
          //   address_kladr:
          //     "Респ. Татарстан, г.о. город Казань, г. Казань, ул. Николая Ершова, зд. 20В",
          //   logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          //   region: {
          //     id: 1,
          //     name: "Татарстан Респ",
          //   },
          //   brand: {
          //     id: 5,
          //     name: "Зеленое яблоко",
          //     logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          //     description: "Зеленое яблоко",
          //   },
          // },
        ],
        roles: [
          {
            id: 6,
            name: "supervisor",
          },
        ],
        change_order: "02:00",
        cancel_order: "02:00",
        live_order: "02:00",
        change_task: "02:00",
        cancel_task: "02:00",
        live_task: "02:00:00",
        repeat_bid: "02:00:00",
        leave_bid: "01:00:00",
        refusal_task: "02:00:00",
        waiting_task: 60,
        count_wait_bid: 1,
        time_answer_bid: 12,
        notification_start: 60,
        supervisors: [],
        manager: [
          {
            id: 999,
            phone: 79128443334,
            email: " testmanager@mail.ru",
            logo: "",
            roles: [
              {
                id: 3,
                name: "manager",
              },
            ],
            name: "Тестовый менеджер",
          },
        ],
        counterparty: [
          // {
          //   id: 1,
          //   name: "Тестовый контрагент",
          //   ogrn: "1040501262867",
          //   legal_address: "",
          //   legal_email: "favorit56@mail.ru",
          // },
        ],
        confirmRegister: true,
        finishRegister: true,
      },
    };

    await test.step("Авторизуемся за менеджера", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDERS, () => {
          return HttpResponse.json({ data: [] });
        }),
      );
      await loginAs("manager");
      await expect(page.getByText("Поручения")).toBeVisible();
    });

    await test.step("Переходим к модерации супервайзеров", async () => {
      network.use(
        http.get(process.env.VITE_GET_MODERATION_CLIENT, () => {
          return HttpResponse.json(supervisors);
        }),
        http.get(process.env.VITE_GET_MODERATION_SINGLE_CLIENT, () => {
          return HttpResponse.json(supervisor);
        }),
      );

      await page.getByRole("link", { name: "Супервайзеры" }).click();

      await expect(page.getByText("Поручений пока нет.")).not.toBeVisible();
    });
  });
});
