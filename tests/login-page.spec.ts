import { expect } from "@playwright/test";
import { test } from "../playwright.setup";

import { http, HttpResponse } from "msw";

test.describe("Через конвертацию ПМ", () => {
  test("Клиент создаёт поручение 14:00", async ({ page, network, loginAs }) => {
    // TO-DO IMPLEMENT TYPES FOR MOCK DATA AFTER API HAVE MOVED TO ORVAL
    //mock data
    const today = new Date();
    const orders = {
      data: [],
    };
    let order = {};
    const placesForOrder = {
      data: [
        {
          id: 0,
          name: "«Семёрочка»",
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
          id: 17,
          name: "Шестёрочка",
          latitude: "55.73426800",
          longitude: "37.62961200",
          address_kladr: "Новокузнецкая ул., д. 39, г.Москва",
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
          id: 18,
          name: "«Пятёрочка»",
          latitude: "55.77191000",
          longitude: "37.60406200",
          address_kladr: "Садовая-Триумфальная ул., д. 22/31,  г.Москва",
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
      ],
    };
    const projectsForOrder = {
      data: [
        {
          id: 0,
          name: "Десяточка",
          dateStart: "2026-01-20T00:00:00.000000Z",
          dateEnd: "2026-12-30T00:00:00.000000Z",
          timeStart: "06:00",
          timeEnd: "18:00",
          brand: [
            {
              id: 1,
              name: "Десяточка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "Десяточка — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
    };
    const activitiesForOrder = {
      data: [
        {
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
        {
          id: 2,
          name: "Курьер  (Физическое лицо)",
          detailName: "Курьер  (Физическое лицо)",
          previewText:
            "Доставка под разные задачи, быстрая курьерская доставка",
          logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
          traveling: true,
          standard: {
            id: 1,
            name: "Трудотонну",
            coefficient: 3,
          },
        },
        {
          id: 3,
          name: "Пекарь (Физическое лицо)",
          detailName: "Пекарь  (Физическое лицо)",
          previewText:
            "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
          logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
          traveling: false,
          standard: {
            id: 2,
            name: "Трудосмена",
            coefficient: 1,
          },
        },
      ],
    };
    //mock data

    await test.step("Авторизуемся за клиента", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDERS, () => {
          return HttpResponse.json(orders);
        }),
        http.post(process.env.VITE_POST_CREATE_ORDER, () => {
          order = {
            data: {
              id: 100,
              selfEmployed: false,
              status: 1,
              place: null,
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
              orderActivities: [],
              acceptUser: null,
              statistic: [],
              project: null,
              createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            },
          };
          return HttpResponse.json(order);
        }),
      );
      await loginAs("client");
      await expect(page.getByText("Поручения")).toBeVisible();
    });

    await test.step("Создаём поручение за клиента", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDER, () => {
          return HttpResponse.json(order);
        }),
        http.get(process.env.VITE_GET_PLACE_FOR_ORDER, () => {
          return HttpResponse.json(placesForOrder);
        }),
        http.get(process.env.VITE_GET_PROJECTS_FOR_ORDER, () => {
          return HttpResponse.json(projectsForOrder);
        }),
        http.post(process.env.VITE_POST_UPDATE_ORDER, async ({ request }) => {
          const payload = await request.clone().json();

          if (payload.placeId) {
            order.data.place = {
              id: 0,
              name: "«Семёрочка»",
              latitude: "55.75007900",
              longitude: "37.59217700",
              address_kladr: "Атлантида",
              logo: "",
              region: {
                id: 0,
                name: "Атлантида",
              },
              brand: {
                id: 0,
                name: "«Семёрочка»",
                logo: "",
                description:
                  "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
              },
            };
          }
          if (payload.projectId) {
            order.data.project = {
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
            };
          }

          return HttpResponse.json(order);
        }),
      );

      await page.getByRole("button", { name: "Create new order" }).click();

      await expect(page.getByText("Создание поручения")).toBeVisible();

      await page
        .getByRole("combobox", { name: "Место оказания услуг *" })
        .click();
      await page.getByRole("option", { name: "«Семёрочка» Москва" }).click();

      await page.getByRole("combobox", { name: "Проект" }).click();
      await page.getByRole("option", { name: "Десяточка" }).click();

      await page.getByRole("link", { name: "Добавить услугу" }).click();
    });

    await test.step("Создаём услугу в поручении", async () => {
      network.use(
        http.get(process.env.VITE_GET_VIEW_ACTIVITIES_FOR_ORDER, () => {
          return HttpResponse.json(activitiesForOrder);
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
        http.post(process.env.VITE_POST_CREATE_ORDER_ACTIVITY, () => {
          order.data.orderActivities = [
            {
              id: 578,
              viewActivity: {
                id: 3,
                name: "Пекарь (Физическое лицо)",
                detailName: "Пекарь  (Физическое лицо)",
                previewText:
                  "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
                logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
                traveling: false,
                standard: {
                  id: 2,
                  name: "Трудосмена",
                  coefficient: 1,
                },
              },
              count: 1,
              dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T11:00:00.000Z`,
              dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T15:00:00.000000Z`,
              needFoto: false,
              dateActivity: [],
              buttonSearchNeed: false,
              buttonBidNeed: true,
            },
          ];

          return HttpResponse.json(order);
        }),
        http.post(process.env.VITE_POST_SEND_ORDER, () => {
          orders.data.push({
            id: 100,
            status: 2,
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
            user: {
              id: 700,
            },
            orderActivities: [
              {
                id: 566,
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
                count: 1,
                dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T11:00:00.000Z`,
                dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T15:00:00.000000Z`,
                needFoto: false,
                dateActivity: [],
              },
            ],
            createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
          });
          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await expect(page.getByText("Заказ услуги")).toBeVisible();

      await page.getByRole("combobox", { name: "Вид услуг *" }).click();
      await page
        .getByRole("option", { name: "Пекарь (Физическое лицо" })
        .click();

      await page.getByRole("textbox", { name: "Количество *" }).fill("1");

      const today = new Date();

      const fieldStart = await page.getByRole("group", {
        name: "Дата и время начала оказания услуг *",
      });
      await fieldStart.click();
      await fieldStart
        .getByRole("spinbutton", { name: "Day" })
        .fill(`${today.getDate() + 1}`.padStart(2, "0"));
      await fieldStart
        .getByRole("spinbutton", { name: "Month" })
        .fill(`${today.getMonth() + 1}`.padStart(2, "0"));
      await fieldStart
        .getByRole("spinbutton", { name: "Year" })
        .fill(`${today.getFullYear()}`);
      await fieldStart.getByRole("spinbutton", { name: "Hours" }).fill("14");
      await fieldStart.getByRole("spinbutton", { name: "Minutes" }).fill("00");

      const fieldEnd = await page.getByRole("group", {
        name: "Дата и время окончания оказания услуг *",
      });
      await fieldEnd
        .getByRole("spinbutton", { name: "Day" })
        .fill(`${today.getDate() + 4}`.padStart(2, "0"));
      await fieldEnd
        .getByRole("spinbutton", { name: "Month" })
        .fill(`${today.getMonth() + 1}`.padStart(2, "0"));
      await fieldEnd
        .getByRole("spinbutton", { name: "Year" })
        .fill(`${today.getFullYear()}`);
      await fieldEnd.getByRole("spinbutton", { name: "Hours" }).fill("19");
      await fieldEnd.getByRole("spinbutton", { name: "Minutes" }).fill("00");

      // await page
      //   .getByRole("checkbox", { name: "Раскрыть по дням" })
      //   .setChecked(true);

      await page.getByRole("button", { name: "Сохранить" }).click();

      await expect(page.getByText("Создание поручения")).toBeVisible();

      await page.getByRole("button", { name: "Отправить поручение" }).click();

      await expect(page.getByText("Поручений пока нет.")).not.toBeVisible();
    });
  });

  test("Клиент создаёт поручение", async ({ page, network, loginAs }) => {
    // TO-DO IMPLEMENT TYPES FOR MOCK DATA AFTER API HAVE MOVED TO ORVAL
    //mock data
    const today = new Date();
    const orders = {
      data: [],
    };
    let order = {};
    const placesForOrder = {
      data: [
        {
          id: 0,
          name: "«Семёрочка»",
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
          id: 17,
          name: "Шестёрочка",
          latitude: "55.73426800",
          longitude: "37.62961200",
          address_kladr: "Новокузнецкая ул., д. 39, г.Москва",
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
          id: 18,
          name: "«Пятёрочка»",
          latitude: "55.77191000",
          longitude: "37.60406200",
          address_kladr: "Садовая-Триумфальная ул., д. 22/31,  г.Москва",
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
      ],
    };
    const projectsForOrder = {
      data: [
        {
          id: 0,
          name: "Десяточка",
          dateStart: "2026-01-20T00:00:00.000000Z",
          dateEnd: "2026-12-30T00:00:00.000000Z",
          timeStart: "06:00",
          timeEnd: "18:00",
          brand: [
            {
              id: 1,
              name: "Десяточка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "Десяточка — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
    };
    const activitiesForOrder = {
      data: [
        {
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
        {
          id: 2,
          name: "Курьер  (Физическое лицо)",
          detailName: "Курьер  (Физическое лицо)",
          previewText:
            "Доставка под разные задачи, быстрая курьерская доставка",
          logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
          traveling: true,
          standard: {
            id: 1,
            name: "Трудотонну",
            coefficient: 3,
          },
        },
        {
          id: 3,
          name: "Пекарь (Физическое лицо)",
          detailName: "Пекарь  (Физическое лицо)",
          previewText:
            "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
          logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
          traveling: false,
          standard: {
            id: 2,
            name: "Трудосмена",
            coefficient: 1,
          },
        },
      ],
    };
    //mock data

    await test.step("Авторизуемся за клиента", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDERS, () => {
          return HttpResponse.json(orders);
        }),
        http.post(process.env.VITE_POST_CREATE_ORDER, () => {
          order = {
            data: {
              id: 100,
              selfEmployed: false,
              status: 1,
              place: null,
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
              orderActivities: [],
              acceptUser: null,
              statistic: [],
              project: null,
              createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            },
          };
          return HttpResponse.json(order);
        }),
      );
      await loginAs("client");
      await expect(page.getByText("Поручения")).toBeVisible();
    });

    await test.step("Создаём поручение за клиента", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDER, () => {
          return HttpResponse.json(order);
        }),
        http.get(process.env.VITE_GET_PLACE_FOR_ORDER, () => {
          return HttpResponse.json(placesForOrder);
        }),
        http.get(process.env.VITE_GET_PROJECTS_FOR_ORDER, () => {
          return HttpResponse.json(projectsForOrder);
        }),
        http.post(process.env.VITE_POST_UPDATE_ORDER, async ({ request }) => {
          const payload = await request.clone().json();

          if (payload.placeId) {
            order.data.place = {
              id: 0,
              name: "«Семёрочка»",
              latitude: "55.75007900",
              longitude: "37.59217700",
              address_kladr: "Атлантида",
              logo: "",
              region: {
                id: 0,
                name: "Атлантида",
              },
              brand: {
                id: 0,
                name: "«Семёрочка»",
                logo: "",
                description:
                  "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
              },
            };
          }
          if (payload.projectId) {
            order.data.project = {
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
            };
          }

          return HttpResponse.json(order);
        }),
      );

      await page.getByRole("button", { name: "Create new order" }).click();

      await expect(page.getByText("Создание поручения")).toBeVisible();

      await page
        .getByRole("combobox", { name: "Место оказания услуг *" })
        .click();
      await page.getByRole("option", { name: "«Семёрочка» Москва" }).click();

      await page.getByRole("combobox", { name: "Проект" }).click();
      await page.getByRole("option", { name: "Десяточка" }).click();

      await page.getByRole("link", { name: "Добавить услугу" }).click();
    });

    await test.step("Создаём услугу в поручении", async () => {
      network.use(
        http.get(process.env.VITE_GET_VIEW_ACTIVITIES_FOR_ORDER, () => {
          return HttpResponse.json(activitiesForOrder);
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
        http.post(process.env.VITE_POST_CREATE_ORDER_ACTIVITY, () => {
          order.data.orderActivities = [
            {
              id: 578,
              viewActivity: {
                id: 3,
                name: "Пекарь (Физическое лицо)",
                detailName: "Пекарь  (Физическое лицо)",
                previewText:
                  "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
                logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
                traveling: false,
                standard: {
                  id: 2,
                  name: "Трудосмена",
                  coefficient: 1,
                },
              },
              count: 1,
              dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
              dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
              needFoto: false,
              dateActivity: [
                {
                  id: 1,
                  timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
                  timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
                  places: [],
                },
                {
                  id: 2,
                  timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
                  timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
                  places: [],
                },
                {
                  id: 3,
                  timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
                  timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
                  places: [],
                },
                {
                  id: 4,
                  timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
                  timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
                  places: [],
                },
              ],
              buttonSearchNeed: false,
              buttonBidNeed: true,
            },
          ];

          console.log(JSON.stringify(order));
          return HttpResponse.json(order);
        }),
        http.post(process.env.VITE_POST_SEND_ORDER, () => {
          orders.data.push({
            id: 100,
            status: 2,
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
            user: {
              id: 700,
            },
            orderActivities: [
              {
                id: 566,
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
                count: 1,
                dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
                dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
                needFoto: false,
                dateActivity: [],
              },
            ],
            createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
          });
          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await expect(page.getByText("Заказ услуги")).toBeVisible();

      await page.getByRole("combobox", { name: "Вид услуг *" }).click();
      await page
        .getByRole("option", { name: "Пекарь (Физическое лицо" })
        .click();

      await page.getByRole("textbox", { name: "Количество *" }).fill("1");

      const today = new Date();

      const fieldStart = await page.getByRole("group", {
        name: "Дата и время начала оказания услуг *",
      });
      await fieldStart.click();
      await fieldStart
        .getByRole("spinbutton", { name: "Day" })
        .fill(`${today.getDate() + 1}`.padStart(2, "0"));
      await fieldStart
        .getByRole("spinbutton", { name: "Month" })
        .fill(`${today.getMonth() + 1}`.padStart(2, "0"));
      await fieldStart
        .getByRole("spinbutton", { name: "Year" })
        .fill(`${today.getFullYear()}`);
      await fieldStart.getByRole("spinbutton", { name: "Hours" }).fill("10");
      await fieldStart.getByRole("spinbutton", { name: "Minutes" }).fill("00");

      const fieldEnd = await page.getByRole("group", {
        name: "Дата и время окончания оказания услуг *",
      });
      await fieldEnd
        .getByRole("spinbutton", { name: "Day" })
        .fill(`${today.getDate() + 4}`.padStart(2, "0"));
      await fieldEnd
        .getByRole("spinbutton", { name: "Month" })
        .fill(`${today.getMonth() + 1}`.padStart(2, "0"));
      await fieldEnd
        .getByRole("spinbutton", { name: "Year" })
        .fill(`${today.getFullYear()}`);
      await fieldEnd.getByRole("spinbutton", { name: "Hours" }).fill("19");
      await fieldEnd.getByRole("spinbutton", { name: "Minutes" }).fill("00");

      await page
        .getByRole("checkbox", { name: "Раскрыть по дням" })
        .setChecked(true);

      await page.getByRole("button", { name: "Сохранить" }).click();

      await expect(page.getByText("Создание поручения")).toBeVisible();

      await page.getByRole("button", { name: "Отправить поручение" }).click();

      await expect(page.getByText("Поручений пока нет.")).not.toBeVisible();
    });
  });

  test("Менеджер принимает поручение", async ({ page, network, loginAs }) => {
    const today = new Date();
    const orders = {
      data: [
        {
          id: 100,
          status: 2,
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
          user: {
            id: 700,
          },
          orderActivities: [
            {
              id: 566,
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
              count: 1,
              dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
              dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
              needFoto: false,
              dateActivity: [],
            },
          ],
          createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
        },
      ],
    };
    const tasks = {
      data: [
        {
          id: 200,
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
          user: {
            id: 900,
          },
          orderActivities: [
            {
              id: 566,
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
              count: 1,
              dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
              dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
              needFoto: false,
              dateActivity: [],
            },
          ],
          createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
        },
      ],
    };
    let order = {
      data: {
        id: 100,
        selfEmployed: false,
        status: 2,
        place: {
          id: 0,
          name: "«Семёрочка»",
          latitude: "55.75007900",
          longitude: "37.59217700",
          address_kladr: "Атлантида",
          logo: "",
          region: { id: 0, name: "Атлантида" },
          brand: {
            id: 0,
            name: "«Семёрочка»",
            logo: "",
            description:
              "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
          },
        },
        user: {
          id: 700,
          phone: 77777777777,
          email: "testclient@mail.ru",
          logo: "",
          roles: [{ id: 2, name: "client" }],
          name: "Тестировочный клиент",
        },
        orderActivities: [
          {
            id: 578,
            viewActivity: {
              id: 3,
              name: "Пекарь (Физическое лицо)",
              detailName: "Пекарь  (Физическое лицо)",
              previewText:
                "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              traveling: false,
              standard: {
                id: 2,
                name: "Трудосмена",
                coefficient: 1,
              },
            },
            count: 1,
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
            needFoto: false,
            dateActivity: [
              {
                id: 1,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 2,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 3,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 4,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
                places: [],
              },
            ],
            buttonSearchNeed: false,
            buttonBidNeed: true,
          },
        ],
        acceptUser: null,
        statistic: [],
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
        createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
      },
    };
    let task = {
      data: {
        id: 200,
        selfEmployed: false,
        status: 3,
        place: {
          id: 0,
          name: "«Семёрочка»",
          latitude: "55.75007900",
          longitude: "37.59217700",
          address_kladr: "Атлантида",
          logo: "",
          region: { id: 0, name: "Атлантида" },
          brand: {
            id: 0,
            name: "«Семёрочка»",
            logo: "",
            description:
              "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
          },
        },
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
        acceptUser: {
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
        orderActivities: [
          {
            id: 578,
            viewActivity: {
              id: 3,
              name: "Пекарь (Физическое лицо)",
              detailName: "Пекарь  (Физическое лицо)",
              previewText:
                "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              traveling: false,
              standard: {
                id: 2,
                name: "Трудосмена",
                coefficient: 1,
              },
            },
            count: 1,
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
            needFoto: false,
            dateActivity: [
              {
                id: 1,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 2,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 3,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 4,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
                places: [],
              },
            ],
            buttonSearchNeed: false,
            buttonBidNeed: true,
          },
        ],
        acceptedUser: [],
        statistic: [],
        createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
      },
    };

    await test.step("Авторизуемся за менеджера", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDERS, () => {
          return HttpResponse.json(orders);
        }),
      );
      await loginAs("manager");
      await expect(page.getByText("Поручения")).toBeVisible();
    });
    await test.step("Менеджер принимает поручение и конвертирует в задачу", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDER, () => {
          return HttpResponse.json(order);
        }),
        http.post(process.env.VITE_POST_ACCEPT_ORDER, () => {
          order.data.status = 3;
          orders.data[0].status = 3;

          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
        http.get(process.env.VITE_GET_PLACE_FOR_BID, () => {
          return HttpResponse.json({
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
            ],
          });
        }),
        http.get(process.env.VITE_GET_SUPERVISORS_FOR_TASK, () => {
          return HttpResponse.json({
            data: [
              {
                id: 800,
                phone: 78888888888,
                email: "test554h@mail.ru",
                logo: "/storage/source/userImg/589/cfIr4b4ZVRepN1K8GU4g.jpeg",
                roles: [
                  {
                    id: 5,
                    name: "specialist",
                  },
                  {
                    id: 6,
                    name: "supervisor",
                  },
                ],
                name: "Тестовый супервайзер",
              },
            ],
          });
        }),
        http.get(process.env.VITE_GET_TASKS, () => {
          return HttpResponse.json(tasks);
        }),
        http.post(process.env.VITE_POST_CONVERT_TASK, () => {
          return HttpResponse.json(task);
        }),
        http.get(process.env.VITE_GET_TASK, () => {
          return HttpResponse.json(task);
        }),
      );
      await page.getByRole("link", { name: "Услуг 1 100" }).click();

      await expect(page.getByText("Поручение 100")).toBeVisible();

      await page.getByRole("button", { name: "Принять" }).click();

      await expect(
        page.getByRole("button", { name: "Принять" }),
      ).not.toBeVisible();

      await page.getByRole("button", { name: "Создать задачу" }).click();

      await expect(page.getByText("Назначить ответственным")).toBeVisible();

      await page
        .getByRole("radio", { name: "Тестовый супервайзер" })
        .setChecked(true);

      await page
        .getByRole("button", { name: "Конвертировать в задачу" })
        .click();

      await expect(page.getByText("Задача 200")).toBeVisible();
    });
  });

  test("Супервайзер принимает задачу, приглашает в заявку специалиста", async ({
    page,
    network,
    loginAs,
  }) => {
    const today = new Date();
    const orders = {
      data: [],
    };
    const tasks = {
      data: [
        {
          id: 200,
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
          user: {
            id: 900,
          },
          orderActivities: [
            {
              id: 566,
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
              count: 1,
              dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
              dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
              needFoto: false,
              dateActivity: [],
            },
          ],
          createdAt: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
        },
      ],
    };
    const bids = {
      data: [
        {
          id: 300,
          user: {
            id: 999,
          },
          status: 1,
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
          viewActivity: {
            id: 1,
            name: "Пекарь  (Физическое лицо)",
            detailName: "Пекарь  (Физическое лицо)",
            previewText: "пекарь",
            logo: "",
            traveling: false,
            standard: {
              id: 2,
              name: "Трудосмена",
              coefficient: 1,
            },
          },
          dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
          dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
          createdAt: "2026-09-03T10:31:20.000000Z",
        },
      ],
    };
    let task = {
      data: {
        id: 200,
        selfEmployed: false,
        status: 3,
        place: {
          id: 0,
          name: "«Семёрочка»",
          latitude: "55.75007900",
          longitude: "37.59217700",
          address_kladr: "Атлантида",
          logo: "",
          region: { id: 0, name: "Атлантида" },
          brand: {
            id: 0,
            name: "«Семёрочка»",
            logo: "",
            description:
              "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
          },
        },
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
        acceptUser: null,
        orderActivities: [
          {
            id: 578,
            viewActivity: {
              id: 3,
              name: "Пекарь (Физическое лицо)",
              detailName: "Пекарь  (Физическое лицо)",
              previewText:
                "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              traveling: false,
              standard: {
                id: 2,
                name: "Трудосмена",
                coefficient: 1,
              },
            },
            count: 1,
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
            needFoto: false,
            dateActivity: [
              {
                id: 1,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 2,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 3,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
                places: [],
              },
              {
                id: 4,
                timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
                timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
                places: [],
              },
            ],
            buttonSearchNeed: false,
            buttonBidNeed: true,
          },
        ],
        acceptedUser: [
          {
            id: 999,
            phone: 78888888888,
            email: "supertest@mail.ru",
            logo: "/storage/source/userImg/883/SU5yXOrBQEppd03sgBFq.jpeg",
            roles: [
              {
                id: 6,
                name: "supervisor",
              },
            ],
            name: "ТЕСТ Супервайзер",
          },
        ],
        statistic: [],
        createdAt: "2026-10-08T14:59:48.000000Z",
      },
    };
    let bid = {
      data: {
        id: 300,
        user: {
          id: 999,
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
        status: 1,
        selfEmployed: false,
        place: {
          id: 0,
          name: "«Семёрочка»",
          latitude: "55.75007900",
          longitude: "37.59217700",
          address_kladr: "Атлантида",
          logo: "",
          region: { id: 0, name: "Атлантида" },
          brand: {
            id: 0,
            name: "«Семёрочка»",
            logo: "",
            description:
              "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
          },
        },
        radius: 5,
        price: 0,
        priceResult: 0,
        viewActivity: {
          id: 3,
          name: "Пекарь (Физическое лицо)",
          detailName: "Пекарь  (Физическое лицо)",
          previewText:
            "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
          logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
          traveling: false,
          standard: {
            id: 2,
            name: "Трудосмена",
            coefficient: 1,
          },
        },
        dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
        dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
        needFoto: false,
        dateActivity: [
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 2,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 3,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 4,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
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
            roles: [{ id: 2, name: "client" }],
            name: "Тестировочный клиент",
          },
          statistic: [],
          createdAt: "2026-10-12T15:45:00.000000Z",
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
          statistic: [],
          createdAt: "2026-10-12T15:46:48.000000Z",
        },
        acceptingUsers: [],
        count: 1,
        statistic: [],
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
        createdAt: "2026-10-12T15:55:24.000000Z",
      },
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
    const specialistRadiusSelect = {
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
    const specialistForBid = {
      data: [
        {
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
          radius: 1.84,
          name: "Тестовый специалист",
          age: "27",
          country: "РОССИЯ",
          viewActivities: [
            "Курьер  (Физическое лицо)",
            "Пекарь (Физическое лицо)",
            "Продавец  (Физическое лицо)",
          ],
          viewActivitiesAccurate: true,
        },
        {
          id: 681,
          phone: 79881717171,
          email: "i.sai@gmail.com",
          logo: "/storage/source/userImg/681/oyrbnTjbfffo92GyfS4r.jpeg",
          roles: [
            {
              id: 5,
              name: "specialist",
            },
          ],
          radius: 1.61,
          name: "НЕ ТОТ Специалист",
          age: "26",
          country: "РОССИЯ",
          viewActivities: [
            "Курьер  (Физическое лицо)",
            "Пекарь (Физическое лицо)",
            "Продавец  (Физическое лицо)",
          ],
          viewActivitiesAccurate: true,
        },
      ],
    };

    await test.step("Авторизуемся за супервайзера", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDERS, () => {
          return HttpResponse.json(orders);
        }),
      );
      await loginAs("supervisor");
    });

    await test.step("Создаём заявку по принятой задаче", async () => {
      network.use(
        http.get(process.env.VITE_GET_BIDS, () => {
          return HttpResponse.json(bids);
        }),
        http.get(process.env.VITE_GET_BID, () => {
          return HttpResponse.json(bid);
        }),
        http.get(process.env.VITE_GET_TASKS, () => {
          return HttpResponse.json(tasks);
        }),
        http.get(process.env.VITE_GET_TASK, () => {
          return HttpResponse.json(task);
        }),
        http.get(process.env.VITE_GET_PLACE_FOR_BID, () => {
          return HttpResponse.json(placeForBid);
        }),
        http.post(process.env.VITE_POST_CREATE_BID_FROM_TASK, () => {
          return HttpResponse.json(bid);
        }),
        http.get(process.env.VITE_GET_RADIUS_SELECT, () => {
          return HttpResponse.json(specialistRadiusSelect);
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
      await page.getByRole("link", { name: "Задачи" }).click();
      await expect(page.getByText("200")).toBeVisible();

      await page.getByRole("link", { name: "Задачи" }).click();
      await expect(page.getByText("200")).toBeVisible();

      await page.getByRole("link", { name: "Услуг 1 200" }).click();
      await expect(page.getByText("Задача 200")).toBeVisible();

      await page.getByRole("button", { name: "Создать заявку" }).click();
      await expect(page.getByText("Новый", { exact: true })).toBeVisible();
    });

    await test.step("Приглашаем специалистов в заявку", async () => {
      network.use(
        http.get(process.env.VITE_GET_SPECIALIST_FOR_BID, () => {
          return HttpResponse.json(specialistForBid);
        }),
        http.post(process.env.VITE_POST_INVOICE_BID, () => {
          bids.data[0].status = 6;
          bid.data.status = 6;
          bid.data.acceptingUsers = [
            {
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
              status: 1,
            },
          ];

          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await page.getByRole("tab", { name: "Специалисты" }).click();

      await page
        .getByRole("checkbox", {
          name: "http://preprod.marriator-api.fivecorners.ru Тестовый специалист РОССИЯ Курьер (Физическое лицо) , Пекарь (Физическое лицо) , Продавец (Физическое лицо)",
          exact: true,
        })
        .setChecked(true);

      await page.getByRole("button", { name: "Отправить заявку" }).click();

      await expect(
        page.getByRole("button", { name: "Отправить заявку" }),
      ).not.toBeVisible();
    });
  });

  test("Специалист принимает задание", async ({ page, network, loginAs }) => {
    const today = new Date();
    const jobs = {
      data: [
        {
          id: 400,
          user: {
            id: 800,
          },
          status: 2,
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
          dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
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
            status: 1,
          },
          createdAt: "2026-10-12T15:55:24.000000Z",
        },
      ],
    };
    const job = {
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
        status: 2,
        selfEmployed: false,
        place: {
          id: 0,
          name: "«Семёрочка»",
          latitude: "55.75007900",
          longitude: "37.59217700",
          address_kladr: "Атлантида",
          logo: "",
          region: { id: 0, name: "Атлантида" },
          brand: {
            id: 0,
            name: "«Семёрочка»",
            logo: "",
            description:
              "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
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
        dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
        dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
        needFoto: false,
        dateActivity: [
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 2,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 3,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 4,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
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
              accepted: 1,
              count: 1,
            },
          ],
          createdAt: "2026-10-12T15:45:00.000000Z",
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
              accepted: 1,
              count: 1,
            },
          ],
          createdAt: "2026-10-12T15:46:48.000000Z",
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
          status: 1,
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
        createdAt: "2026-10-12T15:55:24.000000Z",
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

    await test.step("Cпециалист принимает заявку", async () => {
      network.use(
        http.post(process.env.VITE_POST_ACCEPT_BID, () => {
          jobs.data[0].acceptingUser.status = 4;
          job.data.acceptingUser.status = 4;

          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await page
        .getByRole("link", {
          name: "Заявка Пекарь (Физическое лицо) 400 0 ₽ / Трудосмена ул. Арбат д. 24 г.Москва",
        })
        .click();

      await expect(page.getByText("Заявка 400")).toBeVisible();

      await page.getByRole("button", { name: "Принять" }).click();

      await expect(
        page.getByRole("button", { name: "Принять" }),
      ).not.toBeVisible();
    });
  });

  test("Супервайзер одобряет отклик специалиста", async ({
    page,
    network,
    loginAs,
  }) => {
    const today = new Date();
    const orders = {
      data: [],
    };
    let bids = {
      data: [
        {
          id: 400,
          user: {
            id: 800,
          },
          status: 7,
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
          viewActivity: {
            id: 3,
            name: "Пекарь (Физическое лицо)",
            detailName: "Пекарь  (Физическое лицо)",
            previewText:
              "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
            logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
            traveling: false,
            standard: {
              id: 2,
              name: "Трудосмена",
              coefficient: 1,
            },
          },
          dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
          dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
          createdAt: "2026-10-12T15:55:24.000000Z",
        },
      ],
    };
    let bid = {
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
        status: 7,
        selfEmployed: false,
        place: {
          id: 0,
          name: "«Семёрочка»",
          latitude: "55.75007900",
          longitude: "37.59217700",
          address_kladr: "Атлантида",
          logo: "",
          region: { id: 0, name: "Атлантида" },
          brand: {
            id: 0,
            name: "«Семёрочка»",
            logo: "",
            description:
              "«Семёрочка» — крупнейшая торговая сеть магазинов «у дома»",
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
        dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
        dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
        needFoto: false,
        dateActivity: [
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 2,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 3,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 4,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
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
              accepted: 1,
              count: 1,
            },
          ],
          createdAt: "2026-10-12T15:45:00.000000Z",
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
              accepted: 1,
              count: 1,
            },
          ],
          createdAt: "2026-10-12T15:46:48.000000Z",
        },
        acceptingUsers: [
          {
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
            status: 4,
          },
        ],

        count: 1,
        statistic: [
          {
            accepted: 4,
            count: 1,
          },
        ],
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
        createdAt: "2026-10-12T15:55:24.000000Z",
      },
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
        status: 2,
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
        dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
        dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000000Z`,
        needFoto: false,
        dateActivity: [
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 1).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 2,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 2).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 3,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 3).toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
          {
            id: 4,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T06:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate() + 4).toString().padStart(2, "0")}T16:00:00.000Z`,
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
              accepted: 1,
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
              accepted: 1,
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
          status: 4,
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
    const specialistRadiusSelect = {
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
    const specialistForBid = {
      data: [
        {
          id: 613,
          phone: 79181111111,
          email: "oskolkova12345@yandex.ru",
          logo: "/storage/source/userImg/613/AnWoXnyoHIXqURWtx3Zw.jpeg",
          roles: [
            {
              id: 5,
              name: "specialist",
            },
          ],
          radius: 1.84,
          name: "Осколкова Анастасия Валерьевна",
          age: "27",
          country: "РОССИЯ",
          viewActivities: [
            "Курьер  (Физическое лицо)",
            "Пекарь (Физическое лицо)",
            "Продавец  (Физическое лицо)",
          ],
          viewActivitiesAccurate: true,
        },
        {
          id: 681,
          phone: 79881717171,
          email: "i.sai@gmail.com",
          logo: "/storage/source/userImg/681/oyrbnTjbfffo92GyfS4r.jpeg",
          roles: [
            {
              id: 5,
              name: "specialist",
            },
          ],
          radius: 1.61,
          name: "Смирнов Стас",
          age: "26",
          country: "РОССИЯ",
          viewActivities: [
            "Курьер  (Физическое лицо)",
            "Пекарь (Физическое лицо)",
            "Продавец  (Физическое лицо)",
          ],
          viewActivitiesAccurate: true,
        },
        {
          id: 788,
          phone: 79284512366,
          email: "hhh@mail.ru",
          logo: "/storage/source/userImg/788/Z6oK9w4QEfgEk2Fp6lii.jpeg",
          roles: [
            {
              id: 5,
              name: "specialist",
            },
          ],
          radius: 3.81,
          name: "Иванов Леонович Ева-Мария Магдалена Евгеньевна -Иванова",
          age: "26",
          country: "РОССИЯ",
          viewActivities: [
            "Продавец  (Физическое лицо)",
            "Курьер  (Физическое лицо)",
            "Пекарь (Физическое лицо)",
          ],
          viewActivitiesAccurate: true,
        },
      ],
    };

    await test.step("Авторизуемся за супервайзера", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDERS, () => {
          return HttpResponse.json(orders);
        }),
      );
      await loginAs("supervisor");
    });

    await test.step("Переходим к отклику специалиста в заявке", async () => {
      network.use(
        http.get(process.env.VITE_GET_BIDS, () => {
          return HttpResponse.json(bids);
        }),
        http.get(process.env.VITE_GET_BID, () => {
          return HttpResponse.json(bid);
        }),
        http.get(process.env.VITE_GET_JOB, () => {
          return HttpResponse.json(job);
        }),

        http.get(process.env.VITE_GET_PLACE_FOR_BID, () => {
          return HttpResponse.json(placeForBid);
        }),
        http.get(process.env.VITE_GET_SPECIALIST_FOR_BID, () => {
          return HttpResponse.json(specialistForBid);
        }),
        http.get(process.env.VITE_GET_RADIUS_SELECT, () => {
          return HttpResponse.json(specialistRadiusSelect);
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

        http.post(process.env.VITE_POST_ACCEPT_SPECIALIST, () => {
          bids.data[0].status = 8;
          job.data.status = 3;
          job.data.acceptingUser.status = 5;

          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await page.getByRole("link", { name: "Заявки" }).click();
      await page.getByRole("link", { name: "Услуг 1 400" }).click();

      await page.getByRole("tab", { name: "Специалисты" }).click();

      await expect(page.getByText("600")).toBeVisible();

      await page
        .getByRole("link", { name: "http://preprod.marriator-api." })
        .click();
      await page.getByRole("button", { name: "Принять" }).click();

      await expect(
        page.getByRole("button", { name: "Принять" }),
      ).not.toBeVisible();
    });
  });

  test("Специалист приступает к работе после одобрения супервайзером", async ({
    page,
    network,
    loginAs,
  }) => {
    const today = new Date();
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
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T18:00:00.000Z`,
            places: [],
          },
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
      network.use(
        http.post(process.env.VITE_POST_START_DAY, () => {
          job.data.reports.push({
            id: 10,
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T18:00:00.000Z`,
            report: null,
            dayActivityId: 1,
            status: 1,
            hours: "1.00",
            reasons: [],
          });
          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await page
        .getByRole("link", {
          name: "Задание Пекарь (Физическое лицо) 400 0 ₽ / Трудосмена ул. Арбат д. 24 г.Москва",
        })
        .click();

      await page.getByRole("button", { name: "ВТ 10:00-21:00" }).click();

      await page.getByRole("button", { name: "Приступить" }).click();

      await expect(
        page.getByRole("button", { name: "Приступить" }),
      ).not.toBeVisible();
    });
  });

  test("Специалист заканчивает рабочий день", async ({
    page,
    network,
    loginAs,
  }) => {
    const today = new Date();
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
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:30:00.000Z`,
            places: [],
          },
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
        reports: [
          {
            id: 10,
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:30:00.000Z`,
            report: null,
            dayActivityId: 1,
            status: 1,
            hours: "1.00",
            reasons: [],
          },
        ],
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
      network.use(
        http.post(process.env.VITE_POST_END_DAY, () => {
          job.data.reports[0].status = 2;

          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await page
        .getByRole("link", {
          name: "Задание Пекарь (Физическое лицо) 400 0 ₽ / Трудосмена ул. Арбат д. 24 г.Москва",
        })
        .click();

      await page.getByRole("button", { name: "ВТ 10:00-10:30" }).click();

      await page.getByRole("button", { name: "Закончить" }).click();

      await expect(page.getByText("День завершен")).toBeVisible();
    });
  });

  test("Супервайзер проверят работу специалиста", async ({
    page,
    network,
    loginAs,
  }) => {
    const today = new Date();
    const orders = {
      data: [],
    };

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
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:30:00.000Z`,
            places: [],
          },
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
        reports: [
          {
            id: 10,
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:30:00.000Z`,
            report: null,
            dayActivityId: 1,
            status: 2,
            hours: "1.00",
            reasons: [],
          },
        ],
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

    const reasons = {
      data: [
        {
          id: 1,
          value: "Причина 1",
          amount: 100,
        },
        {
          id: 2,
          value: "Причина 2",
          amount: 200,
        },
        {
          id: 3,
          value: "Причина 3",
          amount: 300,
        },
      ],
    };

    await test.step("Авторизуемся за супервайзера", async () => {
      network.use(
        http.get(process.env.VITE_GET_ORDERS, () => {
          return HttpResponse.json(orders);
        }),
      );
      await loginAs("supervisor");
    });

    await test.step("Переходим в задачу", async () => {
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

      await page.getByRole("link", { name: "Задания" }).click();
      await page
        .getByRole("link", {
          name: "Задание Пекарь (Физическое лицо) 400 0 ₽ / Трудосмена ул. Арбат д. 24 г.Москва",
        })
        .click();

      await expect(page.getByText("Задание 400")).toBeVisible();
    });

    await test.step("Проверяем и принимаем работу", async () => {
      network.use(
        http.get(process.env.VITE_GET_BIDS, () => {
          return HttpResponse.json(jobs);
        }),
        http.get(process.env.VITE_GET_REASONS, () => {
          return HttpResponse.json(reasons);
        }),
        http.post(process.env.VITE_POST_ACCEPT_REPORT, () => {
          job.data.reports[0].status = 5;

          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await page.getByRole("link", { name: "Проверить" }).click();

      await expect(page.getByText("Проверка выполненных работ")).toBeVisible();

      await page.getByRole("button", { name: "Принять" }).click();

      await expect(page.getByText("Задание 400")).toBeVisible();
    });
  });

  test("Специалист получает оплату", async ({ page, network, loginAs }) => {
    const today = new Date();

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
          {
            id: 1,
            timeStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            timeEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:30:00.000Z`,
            places: [],
          },
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
        reports: [
          {
            id: 10,
            dateStart: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:00:00.000Z`,
            dateEnd: `2026-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}T07:30:00.000Z`,
            report: null,
            dayActivityId: 1,
            status: 5,
            hours: "1.00",
            reasons: [],
          },
        ],
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

    await test.step("Запрашиваем оплату за отработанный день", async () => {
      network.use(
        http.post(process.env.VITE_POST_PAY_REPORT, () => {
          job.data.reports[0].status = 6;

          return HttpResponse.json({
            data: {
              success: true,
            },
          });
        }),
      );

      await page
        .getByRole("link", {
          name: "Задание Пекарь (Физическое лицо) 400 0 ₽ / Трудосмена ул. Арбат д. 24 г.Москва",
        })
        .click();

      await page.getByRole("button", { name: "ВТ 10:00-10:30" }).click();

      await page.getByRole("button", { name: "К оплате" }).click();

      await expect(page.getByText("Оплачено")).toBeVisible();
    });
  });
});
