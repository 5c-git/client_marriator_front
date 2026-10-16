import { expect } from "@playwright/test";
import { test } from "../playwright.setup";

import { http, HttpResponse } from "msw";

//"FIX-247"
test.describe(() => {
  const today = new Date();

  const testData = {
    id: 1,
    timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T${today.getUTCHours().toString().padStart(2, "0")}:00:00.000Z`,
    timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T${today.getUTCHours().toString().padStart(2, "0")}:59:00.000Z`,
    places: [],
  };

  test(
    "FIX-247",
    {
      annotation: [
        {
          type: "баг 247",
          description:
            'Кнопка «Приступить» остаётся активной к моменту достижения времени "Дата окончания — 1 час"',
        },
        {
          type: "Данные",
          description: JSON.stringify(
            { currentDate: today.toISOString(), testData },
            null,
            2,
          ),
        },
        {
          type: "Итог",
          description: 'Кнопка "Приступить не отображается"',
        },
      ],
    },
    async ({ page, network, loginAs }) => {
      let jobs = {
        data: [
          {
            id: 400,
            user: {
              id: 800,
            },
            status: 3,
            place: {
              id: 3,
              name: "«Пятёрочка» на Арбате д. 24  г.Москва",
              latitude: "55.75007900",
              longitude: "37.59217700",
              address_kladr: "ул. Арбат д. 24  г.Москва",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              region: {
                id: 2,
                name: "Москва",
              },
              brand: {
                id: 1,
                name: "Пятёрочка",
                logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                description:
                  "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
              },
            },
            price: 0,
            viewActivity: {
              id: 3,
              name: "Пекарь (Физическое лицо)",
              logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              previewText:
                "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              detailName: "Пекарь  (Физическое лицо)",
              detailText:
                "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              detailImg:
                "/storage/source/directory/view_activities/3-imgDetail/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              linkText: "Пройти тест",
              link: null,
              traveling: false,
              standard: {
                id: 2,
                name: "Трудосмена",
                coefficient: 1,
              },
            },
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
            acceptingUser: {
              id: 600,
              phone: 76666666666,
              email: "specialist-test@mail.ru",
              logo: "",
              roles: [
                {
                  id: 5,
                  name: "specialist",
                },
              ],
              radius: "5",
              name: "Тестовый специалист",
              age: "23",
              country: "РОССИЯ",
              viewActivities: [
                "Продавец  (Физическое лицо)",
                "Пекарь (Физическое лицо)",
                "Курьер  (Физическое лицо)",
              ],
              status: 5,
            },
            createdAt: "2026-10-13T08:31:23.000000Z",
          },
        ],
      };
      let job = {
        data: {
          id: 400,
          user: {
            id: 800,
            phone: 78888888888,
            email: "supertest@mail.ru",
            logo: "",
            roles: [
              {
                id: 6,
                name: "supervisor",
              },
            ],
            name: "Тестовый супервайзер",
          },
          status: 3,
          selfEmployed: false,
          place: {
            id: 3,
            name: "«Пятёрочка» на Арбате д. 24  г.Москва",
            latitude: "55.75007900",
            longitude: "37.59217700",
            address_kladr: "ул. Арбат д. 24  г.Москва",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          },
          radius: 5,
          price: 0,
          priceResult: 0,
          income: 0,
          forPay: 0,
          viewActivity: {
            id: 3,
            name: "Пекарь (Физическое лицо)",
            logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
            previewText:
              "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
            detailName: "Пекарь  (Физическое лицо)",
            detailText:
              "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
            detailImg:
              "/storage/source/directory/view_activities/3-imgDetail/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
            linkText: "Пройти тест",
            link: null,
            traveling: false,
            standard: {
              id: 2,
              name: "Трудосмена",
              coefficient: 1,
            },
          },
          dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
          dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
          needFoto: false,
          dateActivity: [
            testData,
            {
              id: 2,
              timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
              timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
              places: [],
            },
            {
              id: 3,
              timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T06:00:00.000Z`,
              timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
              places: [],
            },
            {
              id: 4,
              timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
              timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T16:00:00.000Z`,
              places: [],
            },
          ],
          order: {
            id: 100,
            selfEmployed: false,
            status: 3,
            user: {
              id: 700,
              phone: 77777777777,
              email: "testclient@mail.ru",
              logo: "",
              roles: [
                {
                  id: 2,
                  name: "client",
                },
              ],
              name: "Тестировочный клиент",
            },
            statistic: [
              {
                accepted: 5,
                count: 1,
              },
            ],
            createdAt: "2026-10-13T08:28:50.000000Z",
          },
          task: {
            id: 200,
            selfEmployed: false,
            status: 3,
            user: {
              id: 900,
              phone: 79999999999,
              email: "test31318@bk.ru",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              roles: [
                {
                  id: 3,
                  name: "manager",
                },
              ],
              name: "Менеджер ТАТА",
            },
            statistic: [
              {
                accepted: 5,
                count: 1,
              },
            ],
            createdAt: "2026-10-13T08:30:44.000000Z",
          },
          acceptingUser: {
            id: 600,
            phone: 76666666666,
            email: "specialist-test@mail.ru",
            logo: "",
            roles: [
              {
                id: 5,
                name: "specialist",
              },
            ],
            radius: "5",
            name: "Тестовый специалист",
            age: "23",
            country: "РОССИЯ",
            viewActivities: [
              "Продавец  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Курьер  (Физическое лицо)",
            ],
            status: 5,
          },
          reports: [],
          project: {
            id: 0,
            name: "78412552 Пятерочка",
            dateStart: `2026-${(today.getMonth() - 3).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T00:00:00.000000Z`,
            dateEnd: `2026-${(today.getMonth() + 3).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T00:00:00.000000Z`,
            timeStart: "06:00",
            timeEnd: "18:00",
            brand: [
              {
                id: 1,
                name: "Пятёрочка",
                logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                description:
                  "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
              },
            ],
          },
          createdAt: "2026-10-13T08:31:23.000000Z",
        },
      };

      await test.step("Авторизуемся за специалиста", async () => {
        network.use(
          http.get(process.env.VITE_GET_JOBS, () => {
            return HttpResponse.json(jobs);
          }),
          http.get(process.env.VITE_GET_JOB, () => {
            return HttpResponse.json(job);
          }),
          http.get(process.env.VITE_SETTINGS_FROM_KEY, ({ request }) => {
            const url = new URL(request.url);
            const key = url.searchParams.get("key");

            if (key === "intervalDayStart") {
              return HttpResponse.json({
                data: {
                  key: "intervalDayStart",
                  value: "9:00",
                },
              });
            }
            return HttpResponse.json({
              data: {
                key: "intervalDayEnd",
                value: "21:00",
              },
            });
          }),
        );
        await loginAs("specialist");
        await expect(page.getByText("Задания")).toBeVisible();
      });

      await test.step("Стартуем рабочий день за специалиста", async () => {
        await page
          .getByRole("link", {
            name: "Задание Пекарь (Физическое лицо) 400 0 ₽ / Трудосмена ул. Арбат д. 24 г.Москва",
          })
          .click();

        await expect(page.getByText("Задание 400")).toBeVisible();

        await page.getByTestId(`AccordionSummary-0`).click();

        await expect(
          page.getByRole("button", { name: "Приступить" }),
        ).not.toBeVisible();
      });
    },
  );
});

//"FIX-248"
test.describe(() => {
  test.slow();
  test(
    "FIX-248",
    {
      annotation: [
        {
          type: "баг 248",
          description:
            'В задании при нажатии кнопки "К оплате" возникает ошибка "Данные запроса postPayReportForManager не валидны схеме", код 422 ',
        },
        {
          type: "причина бага",
          description: "Устаревший API контракт",
        },
        {
          type: "Итог",
          description: "Запрос оплаты проходит успешно",
        },
      ],
    },
    async ({ page, network, loginAs }) => {
      let orders = {
        data: [],
      };
      let bids = {
        data: [
          {
            id: 565,
            user: {
              id: 679,
            },
            status: 8,
            place: {
              id: 13,
              name: "Перекрёсток» на Новом Арбате",
              latitude: "55.75193300",
              longitude: "37.59306600",
              address_kladr: "ул. Новый Арбат, д. 15,  г.Москва",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              region: {
                id: 2,
                name: "Москва",
              },
              brand: {
                id: 6,
                name: "Перекрёсток",
                logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                description:
                  "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
              },
            },
            viewActivity: {
              id: 1,
              name: "Продавец  (Физическое лицо)",
              detailName: "Продавец  (Физическое лицо)",
              previewText:
                "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
              logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
              traveling: false,
              standard: {
                id: 2,
                name: "Трудосмена",
                coefficient: 1,
              },
            },
            dateStart: "2026-10-09T07:00:00.000000Z",
            dateEnd: "2026-10-11T12:00:00.000000Z",
            createdAt: "2026-10-08T14:14:28.000000Z",
          },
        ],
      };
      let bid = {
        data: {
          id: 565,
          user: {
            id: 679,
            phone: 79770023131,
            email: "test31318@bk.ru",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            roles: [
              {
                id: 3,
                name: "manager",
              },
            ],
            name: "Менеджер ТАТА",
          },
          status: 8,
          selfEmployed: false,
          place: {
            id: 13,
            name: "Перекрёсток» на Новом Арбате",
            latitude: "55.75193300",
            longitude: "37.59306600",
            address_kladr: "ул. Новый Арбат, д. 15,  г.Москва",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 6,
              name: "Перекрёсток",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              description:
                "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
            },
          },
          radius: 5,
          price: 1000,
          priceResult: 1000,
          viewActivity: {
            id: 1,
            name: "Продавец  (Физическое лицо)",
            detailName: "Продавец  (Физическое лицо)",
            previewText:
              "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
            logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
            traveling: false,
            standard: {
              id: 2,
              name: "Трудосмена",
              coefficient: 1,
            },
          },
          dateStart: "2026-10-09T07:00:00.000000Z",
          dateEnd: "2026-10-11T12:00:00.000000Z",
          needFoto: true,
          dateActivity: [
            {
              id: 1,
              timeStart: "2026-10-09T07:00:00.000Z",
              timeEnd: "2026-10-09T10:00:00.000Z",
              places: [],
            },
            {
              id: 2,
              timeStart: "2026-10-10T07:00:00.000Z",
              timeEnd: "2026-10-10T11:15:00.000Z",
              places: [],
            },
            {
              id: 3,
              timeStart: "2026-10-11T07:00:00.000Z",
              timeEnd: "2026-10-11T12:00:00.000Z",
              places: [],
            },
          ],
          order: null,
          task: {
            id: 787,
            selfEmployed: false,
            status: 5,
            user: {
              id: 679,
              phone: 79770023131,
              email: "test31318@bk.ru",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              roles: [
                {
                  id: 3,
                  name: "manager",
                },
              ],
              name: "Менеджер ТАТА",
            },
            statistic: [
              {
                accepted: 6,
                count: 2,
              },
              {
                accepted: 5,
                count: 2,
              },
            ],
            createdAt: "2026-10-08T14:11:41.000000Z",
          },
          acceptingUsers: [
            {
              id: 897,
              phone: 79986656666,
              email: "kjdguf@mail.ru",
              logo: "/storage/source/userImg/897/dGCTLv2YVUMs1AF7wYFX.jpeg",
              roles: [
                {
                  id: 5,
                  name: "specialist",
                },
              ],
              radius: "10",
              name: "тест тпрпр",
              age: "21",
              country: "РОССИЯ",
              viewActivities: [
                "Продавец  (Физическое лицо)",
                "Курьер  (Физическое лицо)",
              ],
              status: 5,
            },
          ],
          count: 2,
          statistic: [
            {
              accepted: 6,
              count: 2,
            },
            {
              accepted: 5,
              count: 2,
            },
          ],
          project: {
            id: 14,
            name: "Перекресток проект с 20.07.2026",
            dateStart: "2026-07-20T00:00:00.000000Z",
            dateEnd: "2026-11-05T00:00:00.000000Z",
            timeStart: "07:00",
            timeEnd: "20:00",
            brand: [
              {
                id: 6,
                name: "Перекрёсток",
                logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                description:
                  "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
              },
            ],
          },
          createdAt: "2026-10-08T14:14:28.000000Z",
        },
      };
      let job = {
        data: {
          id: 565,
          user: {
            id: 679,
            phone: 79770023131,
            email: "test31318@bk.ru",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            roles: [
              {
                id: 3,
                name: "manager",
              },
            ],
            name: "Менеджер ТАТА",
          },
          status: 5,
          selfEmployed: false,
          place: {
            id: 13,
            name: "Перекрёсток» на Новом Арбате",
            latitude: "55.75193300",
            longitude: "37.59306600",
            address_kladr: "ул. Новый Арбат, д. 15,  г.Москва",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 6,
              name: "Перекрёсток",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              description:
                "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
            },
          },
          radius: 5,
          price: 1000,
          priceResult: 1000,
          income: 0,
          forPay: 7870,
          viewActivity: {
            id: 1,
            name: "Продавец  (Физическое лицо)",
            logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
            previewText:
              "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
            detailName: "Продавец  (Физическое лицо)",
            detailText:
              "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
            detailImg:
              "/storage/source/directory/view_activities/1-imgDetail/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
            linkText: null,
            link: null,
            traveling: false,
            standard: {
              id: 2,
              name: "Трудосмена",
              coefficient: 1,
            },
          },
          dateStart: "2026-10-09T07:00:00.000000Z",
          dateEnd: "2026-10-11T12:00:00.000000Z",
          needFoto: true,
          dateActivity: [
            {
              id: 1,
              timeStart: "2026-10-09T07:00:00.000Z",
              timeEnd: "2026-10-09T10:00:00.000Z",
              places: [],
            },
            {
              id: 2,
              timeStart: "2026-10-10T07:00:00.000Z",
              timeEnd: "2026-10-10T11:15:00.000Z",
              places: [],
            },
            {
              id: 3,
              timeStart: "2026-10-11T07:00:00.000Z",
              timeEnd: "2026-10-11T12:00:00.000Z",
              places: [],
            },
          ],
          order: null,
          task: {
            id: 787,
            selfEmployed: false,
            status: 5,
            user: {
              id: 679,
              phone: 79770023131,
              email: "test31318@bk.ru",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              roles: [
                {
                  id: 3,
                  name: "manager",
                },
              ],
              name: "Менеджер ТАТА",
            },
            statistic: [
              {
                accepted: 6,
                count: 2,
              },
              {
                accepted: 5,
                count: 2,
              },
            ],
            createdAt: "2026-10-08T14:11:41.000000Z",
          },
          acceptingUser: {
            id: 897,
            phone: 79986656666,
            email: "kjdguf@mail.ru",
            logo: "/storage/source/userImg/897/dGCTLv2YVUMs1AF7wYFX.jpeg",
            roles: [
              {
                id: 5,
                name: "specialist",
              },
            ],
            radius: "10",
            name: "тест тпрпр",
            age: "21",
            country: "РОССИЯ",
            viewActivities: [
              "Продавец  (Физическое лицо)",
              "Курьер  (Физическое лицо)",
            ],
            status: 5,
          },
          reports: [
            {
              id: 92,
              dateStart: "2026-10-09T08:45:46.000000Z",
              dateEnd: "2026-10-09T14:37:57.000000Z",
              report: [
                "/storage/source/reports/897/92/9uyEhlvD5S0rEWKZUVeohs1TIwWE0sjL3hnSqdBG.jpg",
                "/storage/source/reports/897/92/9TLQSU0aiW8MrHw1ebr1FXbnT9b8XNuQTGjt9TVf.jpg",
                "/storage/source/reports/897/92/34PDXnpdqqFRyhbVUv1CF56nH0JhQKumwedBvJNI.jpg",
                "/storage/source/reports/897/92/8Mjts7MGcrsR7s1RKR9HcbhEmI3Sn2y8y23i4g4z.jpg",
              ],
              dayActivityId: 1,
              status: 4,
              hours: "5.87",
              reasons: [
                {
                  id: 8,
                  value:
                    "Своевременность: Новый график. Согласование изменений в графике оказания услуг в течение 4 и менее часов с момента извещения Заказчиком (повтор)                                              1000руб.",
                  amount: 1000,
                  count: 2,
                },
              ],
            },
          ],
          project: {
            id: 14,
            name: "Перекресток проект с 20.07.2026",
            dateStart: "2026-07-20T00:00:00.000000Z",
            dateEnd: "2026-11-05T00:00:00.000000Z",
            timeStart: "07:00",
            timeEnd: "20:00",
            brand: [
              {
                id: 6,
                name: "Перекрёсток",
                logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                description:
                  "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
              },
            ],
          },
          createdAt: "2026-10-08T14:14:28.000000Z",
        },
      };

      const specialistForBid = {
        data: [],
      };
      const placeForBid = {
        data: [
          {
            id: 15,
            name: "«Перекрёсток» на Долгоруковской",
            latitude: "55.77201800",
            longitude: "37.60316300",
            address_kladr: "Долгоруковская ул., д. 5 г.Москва",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 6,
              name: "Перекрёсток",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              description:
                "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
            },
          },
          {
            id: 16,
            name: "«Перекрёсток» на Большой Дорогомиловской",
            latitude: "55.74691000",
            longitude: "37.53526000",
            address_kladr: "Большая Дорогомиловская ул., д. 8,  г.Москва",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 6,
              name: "Перекрёсток",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              description:
                "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
            },
          },
          {
            id: 19,
            name: "Перекресток г. Москва, просп. Мира, 119 (ВДНХ)",
            latitude: "55.82869300",
            longitude: "37.63372400",
            address_kladr: "г. Москва, просп. Мира, 119 (ВДНХ)",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 6,
              name: "Перекрёсток",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              description:
                "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
            },
          },
          {
            id: 20,
            name: "Большая Грузинская улица, 1",
            latitude: "55.76239900",
            longitude: "37.57869300",
            address_kladr: "Большая Грузинская улица, 1",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 6,
              name: "Перекрёсток",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              description:
                "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
            },
          },
          {
            id: 3,
            name: "«Пятёрочка» на Арбате д. 24  г.Москва",
            latitude: "55.75007900",
            longitude: "37.59217700",
            address_kladr: "ул. Арбат д. 24  г.Москва",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          },
          {
            id: 4,
            name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
            latitude: "55.77318600",
            longitude: "49.15342300",
            address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            region: {
              id: 1,
              name: "Татарстан Респ",
            },
            brand: {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          },
          {
            id: 13,
            name: "Перекрёсток» на Новом Арбате",
            latitude: "55.75193300",
            longitude: "37.59306600",
            address_kladr: "ул. Новый Арбат, д. 15,  г.Москва",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 6,
              name: "Перекрёсток",
              logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              description:
                "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
            },
          },
        ],
      };
      const radiusSelect = {
        data: [
          {
            id: 1,
            value: 1,
            default: false,
          },
          {
            id: 2,
            value: 2,
            default: false,
          },
          {
            id: 3,
            value: 3,
            default: false,
          },
          {
            id: 4,
            value: 4,
            default: false,
          },
          {
            id: 5,
            value: 5,
            default: true,
          },
          {
            id: 10,
            value: 10,
            default: false,
          },
          {
            id: 15,
            value: 15,
            default: false,
          },
          {
            id: 17,
            value: 25,
            default: false,
          },
          {
            id: 18,
            value: 20,
            default: false,
          },
          {
            id: 19,
            value: 30,
            default: false,
          },
          {
            id: 20,
            value: 12,
            default: false,
          },
          {
            id: 21,
            value: 40,
            default: false,
          },
        ],
      };

      await test.step("Авторизуемся за менеджера", async () => {
        network.use(
          http.get(process.env.VITE_GET_ORDERS, () => {
            return HttpResponse.json(orders);
          }),
          http.get(process.env.VITE_GET_BIDS, () => {
            return HttpResponse.json(bids);
          }),
          http.get(process.env.VITE_GET_BID, () => {
            return HttpResponse.json(bid);
          }),
          http.get(process.env.VITE_GET_JOB, () => {
            return HttpResponse.json(job);
          }),
        );
        await loginAs("manager");
        await expect(page.getByText("Поручения")).toBeVisible();
      });

      await test.step("Переходим к специалисту", async () => {
        network.use(
          http.get(process.env.VITE_GET_SPECIALIST_FOR_BID, () => {
            return HttpResponse.json(specialistForBid);
          }),
          http.get(process.env.VITE_GET_PLACE_FOR_BID, () => {
            return HttpResponse.json(placeForBid);
          }),
          http.get(process.env.VITE_GET_RADIUS_SELECT, () => {
            return HttpResponse.json(radiusSelect);
          }),
          http.get(process.env.VITE_SETTINGS_FROM_KEY, ({ request }) => {
            const url = new URL(request.url);
            const key = url.searchParams.get("key");

            if (key === "intervalDayStart") {
              return HttpResponse.json({
                data: {
                  key: "intervalDayStart",
                  value: "9:00",
                },
              });
            }
            return HttpResponse.json({
              data: {
                key: "intervalDayEnd",
                value: "21:00",
              },
            });
          }),
          http.post(process.env.VITE_POST_PAY_REPORT_FOR_MANAGER, () => {
            job.data.reports[0].status = 5;
            return HttpResponse.json({
              data: {
                success: true,
              },
            });
          }),
        );

        await page.getByRole("link", { name: "Заявки" }).click();

        await page
          .getByRole("link", {
            name: "Продавец  (Физическое лицо)",
          })
          .click();

        await page.getByRole("tab", { name: "Специалисты" }).click();
        await page.getByRole("link", { name: "тест тпрпр" }).click();
        await expect(page.getByText("Задание 565")).toBeVisible();

        await page.getByRole(`button`, { name: "К оплате" }).click();
        await expect(page.getByText("Оплата одобрена")).toBeVisible();
      });
    },
  );
});
