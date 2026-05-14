import { http, delay, HttpResponse } from "msw";

import { getJobsSuccessSchema, GetJobsSuccess } from "./getJobsSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getJobsKeys = ["getJobs"];

export const getJobs = async (accessToken: string): Promise<GetJobsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_JOBS);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = getJobsSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getJobs не валидны схеме`);
    }

    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    if (error instanceof Error) {
      throw new UnxpectedError(error.message);
    } else {
      throw new UnxpectedError("Unknown unexpected error");
    }
  }
};

// MOCKS
export const mockResponseSuccess: GetJobsSuccess = {
  data: [
    {
      id: 28,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 1000,
      priceResult: 870,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 1,
        name: "Продавец  (Физическое лицо)",
        detailName: "Продавец  (Физическое лицо)",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        traveling: false,
      },
      dateStart: "2025-09-29T02:30:00.000000Z",
      dateEnd: "2025-09-30T19:00:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: {
        id: 240,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 3,
            count: 1,
          },
          {
            accepted: 1,
            count: 2,
          },
        ],
      },
      task: {
        id: 81,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 3,
            count: 1,
          },
          {
            accepted: 1,
            count: 2,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 3,
      },
      reports: [
        {
          dateStart: "2025-09-29T11:32:51.000000Z",
          dateEnd: null,
          report: null,
          dayActivityId: null,
          status: 3,
          hours: "1.00",
        },
      ],
    },
    {
      id: 29,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 1500,
      priceResult: 1305,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 2,
        name: "Курьер  (Физическое лицо)",
        detailName: "Курьер  (Физическое лицо)",
        previewText: "Доставка под разные задачи, быстрая курьерская доставка",
        logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
        traveling: true,
      },
      dateStart: "2025-09-29T02:30:00.000000Z",
      dateEnd: "2025-09-30T20:30:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: {
        id: 241,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 1,
          },
          {
            accepted: 1,
            count: 2,
          },
        ],
      },
      task: {
        id: 82,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 1,
          },
          {
            accepted: 1,
            count: 2,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 5,
      },
      reports: [
        {
          dateStart: "2025-09-29T11:33:48.000000Z",
          dateEnd: null,
          report: null,
          dayActivityId: null,
          status: 3,
          hours: "1.00",
        },
      ],
    },
    {
      id: 30,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 3000,
      priceResult: 2610,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 3,
        name: "Пекарь (Физическое лицо)",
        detailName: "Пекарь  (Физическое лицо)",
        previewText:
          "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
        logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
        traveling: false,
      },
      dateStart: "2025-09-29T02:45:00.000000Z",
      dateEnd: "2025-09-30T19:45:00.000000Z",
      needFoto: true,
      dateActivity: [],
      order: {
        id: 242,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 2,
          },
          {
            accepted: 1,
            count: 1,
          },
        ],
      },
      task: {
        id: 83,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 2,
          },
          {
            accepted: 1,
            count: 1,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 5,
      },
      reports: [],
    },
    {
      id: 31,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 1500,
      priceResult: 1305,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 2,
        name: "Курьер  (Физическое лицо)",
        detailName: "Курьер  (Физическое лицо)",
        previewText: "Доставка под разные задачи, быстрая курьерская доставка",
        logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
        traveling: true,
      },
      dateStart: "2025-09-29T02:45:00.000000Z",
      dateEnd: "2025-09-29T19:15:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: {
        id: 243,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 2,
          },
          {
            accepted: 1,
            count: 1,
          },
        ],
      },
      task: {
        id: 84,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 2,
          },
          {
            accepted: 1,
            count: 1,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 5,
      },
      reports: [],
    },
    {
      id: 35,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 1000,
      priceResult: 870,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 1,
        name: "Продавец  (Физическое лицо)",
        detailName: "Продавец  (Физическое лицо)",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        traveling: false,
      },
      dateStart: "2025-10-06T20:30:00.000000Z",
      dateEnd: "2025-10-07T20:00:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: {
        id: 244,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 4,
            count: 2,
          },
          {
            accepted: 3,
            count: 1,
          },
        ],
      },
      task: {
        id: 86,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 4,
            count: 2,
          },
          {
            accepted: 3,
            count: 1,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 4,
      },
      reports: [],
    },
    {
      id: 36,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 1500,
      priceResult: 1305,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 2,
        name: "Курьер  (Физическое лицо)",
        detailName: "Курьер  (Физическое лицо)",
        previewText: "Доставка под разные задачи, быстрая курьерская доставка",
        logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
        traveling: true,
      },
      dateStart: "2025-10-07T01:50:00.000000Z",
      dateEnd: "2025-10-08T19:00:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: {
        id: 245,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 1,
          },
          {
            accepted: 4,
            count: 1,
          },
          {
            accepted: 1,
            count: 1,
          },
        ],
      },
      task: {
        id: 87,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 5,
            count: 1,
          },
          {
            accepted: 4,
            count: 1,
          },
          {
            accepted: 1,
            count: 1,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 5,
      },
      reports: [],
    },
    {
      id: 37,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 1000,
      priceResult: 870,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 1,
        name: "Продавец  (Физическое лицо)",
        detailName: "Продавец  (Физическое лицо)",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        traveling: false,
      },
      dateStart: "2025-10-09T11:15:00.000000Z",
      dateEnd: "2025-10-10T19:00:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: {
        id: 246,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 3,
            count: 1,
          },
          {
            accepted: 6,
            count: 1,
          },
          {
            accepted: 4,
            count: 1,
          },
        ],
      },
      task: {
        id: 88,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 3,
            count: 1,
          },
          {
            accepted: 6,
            count: 1,
          },
          {
            accepted: 4,
            count: 1,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 3,
      },
      reports: [
        {
          dateStart: "2025-10-09T11:45:57.000000Z",
          dateEnd: "2025-10-09T12:48:36.000000Z",
          report: null,
          dayActivityId: null,
          status: 3,
          hours: "1.04",
        },
      ],
    },
    {
      id: 39,
      user: {
        id: 391,
        phone: 79887951717,
        email: "manager@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
          {
            id: 1,
            name: "admin",
          },
        ],
        name: "МЕНЕДЖЕР ПЕРВЫЙ ПЯТЕРОЧКА",
      },
      status: 2,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
        detailName: "Пекарь  (Физическое лицо)",
        previewText:
          "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
        logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
        traveling: false,
      },
      dateStart: "2025-10-20T07:00:00.000000Z",
      dateEnd: "2025-10-21T16:00:00.000000Z",
      needFoto: false,
      dateActivity: [
        {
          id: 1,
          timeStart: "2025-10-20T16:00:00.000Z",
          timeEnd: "2025-10-21T01:00:00.000Z",
          places: [],
        },
        {
          id: 2,
          timeStart: "2025-10-21T16:00:00.000Z",
          timeEnd: "2025-10-21T22:00:00.000Z",
          places: [],
        },
      ],
      order: null,
      task: {
        id: 91,
        selfEmployed: false,
        status: 3,
        user: {
          id: 391,
          phone: 79887951717,
          email: "manager@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
            {
              id: 1,
              name: "admin",
            },
          ],
          name: "МЕНЕДЖЕР ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 1,
            count: 2,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 1,
      },
      reports: [],
    },
    {
      id: 40,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 2,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      radius: 20,
      price: 1000,
      priceResult: 870,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 1,
        name: "Продавец  (Физическое лицо)",
        detailName: "Продавец  (Физическое лицо)",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        traveling: false,
      },
      dateStart: "2025-10-25T07:00:00.000000Z",
      dateEnd: "2025-10-26T15:00:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: null,
      task: {
        id: 96,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 1,
            count: 2,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 1,
      },
      reports: [],
    },
    {
      id: 41,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 4,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 3000,
      priceResult: 2610,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 3,
        name: "Пекарь (Физическое лицо)",
        detailName: "Пекарь  (Физическое лицо)",
        previewText:
          "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
        logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
        traveling: false,
      },
      dateStart: "2025-10-20T11:00:00.000000Z",
      dateEnd: "2025-10-20T13:00:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: null,
      task: {
        id: 95,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 1,
            count: 2,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 1,
      },
      reports: [],
    },
    {
      id: 42,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      status: 2,
      selfEmployed: false,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "37.59217700",
        longitude: "55.75007900",
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
      price: 3000,
      priceResult: 2610,
      income: 0,
      forPay: 0,
      viewActivity: {
        id: 3,
        name: "Пекарь (Физическое лицо)",
        detailName: "Пекарь  (Физическое лицо)",
        previewText:
          "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
        logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
        traveling: false,
      },
      dateStart: "2025-12-01T07:00:00.000000Z",
      dateEnd: "2025-12-05T09:00:00.000000Z",
      needFoto: false,
      dateActivity: [],
      order: {
        id: 254,
        selfEmployed: false,
        status: 3,
        user: {
          id: 392,
          phone: 79887777777,
          email: "client@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 2,
              name: "client",
            },
          ],
          name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 4,
            count: 1,
          },
        ],
      },
      task: {
        id: 97,
        selfEmployed: false,
        status: 3,
        user: {
          id: 397,
          phone: 79887951616,
          email: "manager2@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          roles: [
            {
              id: 3,
              name: "manager",
            },
          ],
          name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
        },
        statistic: [
          {
            accepted: 4,
            count: 1,
          },
        ],
      },
      acceptingUser: {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "1",
        name: "ТЕСТЕР СПЕЦИАЛИСТ",
        age: "27",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 4,
      },
      reports: [],
    },
  ],
};

export const mockResponseSuccessEmpty = {};

export const mockResponseError = {};

export const getJobsMockResponse = http.get(
  `${import.meta.env.VITE_GET_JOBS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
