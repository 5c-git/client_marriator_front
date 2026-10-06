// import "dotenv/config";
import { expect } from "@playwright/test";
import { test } from "../playwright.setup";

import { http, HttpResponse } from "msw";

const sendPhoneAuth = {
  result: {
    type: "auth",
    code: {
      status: "success",
      code: 1111,
      ttl: 120,
    },
  },
  status: "success",
};
const sendSmsAuth = {
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 10800,
      access_token: "access_token",
      refresh_token: "refresh_token",
    },
  },
  status: "success",
};
const sendPinAuth = {
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 10800,
      access_token: "access_token",
      refresh_token: "refresh_token",
    },
  },
  status: "success",
};
const getClientData = {
  data: {
    id: 913,
    name: "Клиент Для Теста",
    phone: 79128491111,
    email: "testclientmar@mail.ru",
    logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
    project: [
      {
        id: 12,
        name: "78412552 Пятерочка",
        dateStart: "2026-01-20T00:00:00.000000Z",
        dateEnd: "2026-12-30T00:00:00.000000Z",
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
    ],
    place: [
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
        id: 17,
        name: "«Пятёрочка» на Новокузнецкой",
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
        name: "«Пятёрочка» на Садовой-Триумфальной",
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
    roles: [
      {
        id: 2,
        name: "client",
      },
    ],
    change_order: "02:00:00",
    cancel_order: "02:00:00",
    live_order: "02:00:00",
    change_task: "02:00",
    cancel_task: "02:00",
    live_task: "02:00",
    repeat_bid: "02:00",
    leave_bid: "01:00",
    refusal_task: "02:00",
    waiting_task: 60,
    count_wait_bid: 1,
    time_answer_bid: 12,
    notification_start: 60,
    supervisors: [],
    manager: [],
    userManager: [],
    userSupervisors: [],
    counterparty: [
      {
        id: 2,
        name: 'Торговая сеть "Пятёрочка"',
        ogrn: "1027700070210",
        legal_address: "123087, г. Москва, ул. Бакунинская, д. 71, стр. 1",
        legal_email: "5ka@mail.ru",
      },
    ],
    confirmRegister: true,
    finishRegister: true,
  },
};

const getOrders = {
  data: [
    {
      id: 852,
      status: 5,
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
        id: 913,
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
          dateStart: "2026-09-30T17:00:00.000000Z",
          dateEnd: "2026-09-30T18:00:00.000000Z",
          needFoto: false,
          dateActivity: [],
        },
      ],
      createdAt: "2026-09-30T16:15:23.000000Z",
    },
    {
      id: 853,
      status: 5,
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
        id: 913,
      },
      orderActivities: [
        {
          id: 567,
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
          dateStart: "2026-10-01T13:00:00.000000Z",
          dateEnd: "2026-10-01T15:00:00.000000Z",
          needFoto: false,
          dateActivity: [],
        },
      ],
      createdAt: "2026-09-30T16:16:09.000000Z",
    },
    {
      id: 854,
      status: 5,
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
        id: 913,
      },
      orderActivities: [
        {
          id: 568,
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
          dateStart: "2026-10-01T07:00:00.000000Z",
          dateEnd: "2026-10-04T16:00:00.000000Z",
          needFoto: false,
          dateActivity: [
            {
              id: 1,
              timeStart: "2026-10-01T07:00:00.000Z",
              timeEnd: "2026-10-01T18:00:00.000Z",
              places: [],
            },
            {
              id: 2,
              timeStart: "2026-10-02T06:00:00.000Z",
              timeEnd: "2026-10-02T18:00:00.000Z",
              places: [],
            },
            {
              id: 3,
              timeStart: "2026-10-03T06:00:00.000Z",
              timeEnd: "2026-10-03T18:00:00.000Z",
              places: [],
            },
            {
              id: 4,
              timeStart: "2026-10-04T06:00:00.000Z",
              timeEnd: "2026-10-04T16:00:00.000Z",
              places: [],
            },
          ],
        },
      ],
      createdAt: "2026-09-30T16:43:07.000000Z",
    },
  ],
};

test("login as client desktop", async ({ page, network }) => {
  network.use(
    http.post(process.env.VITE_SEND_PHONE, () => {
      return HttpResponse.json(sendPhoneAuth);
    }),
    http.post(process.env.VITE_CHECK_CODE, () => {
      return HttpResponse.json(sendSmsAuth);
    }),
    http.post(process.env.VITE_CHECK_PIN, () => {
      return HttpResponse.json(sendPinAuth);
    }),
    http.get(process.env.VITE_GET_DATA, () => {
      return HttpResponse.json(getClientData);
    }),
    http.get(process.env.VITE_GET_ORDERS, () => {
      return HttpResponse.json(getOrders);
    }),
  );

  //страница номера телефона
  await page.goto("");
  await page.getByLabel("Номер телефона").fill("70000000000");
  await page.getByText("Войти или зарегистрироваться").click();

  //страница sms кода
  await page.getByLabel("Код из смс").fill("0000");

  //страница pin кода
  await page.getByTestId("test_otp-input").fill("0000");

  await expect(page).toHaveURL("http://localhost:5173/dashboard/orders");
  await expect(page.getByText("Поручения")).toBeVisible();
});
