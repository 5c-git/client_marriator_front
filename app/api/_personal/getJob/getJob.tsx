import { http, delay, HttpResponse } from "msw";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

import { getJobSuccessSchema, GetJobSuccess } from "./getJobSuccess.schema";

export const getJobKeys = ["getJob"];

export const getJob = async (
  accessToken: string,
  specialistId: string,
  bidId: string
): Promise<GetJobSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_JOB);

    url.searchParams.append("bidId", bidId);
    url.searchParams.append("specialistId", specialistId);

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

    const parsed = getJobSuccessSchema.safeParse(response);
    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getJob не валидны схеме`);
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
export const mockResponseSuccess: GetJobSuccess = {
  data: {
    id: 75,
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
    status: 3,
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
    forPay: 780,
    viewActivity: {
      id: 3,
      name: "Пекарь (Физическое лицо)",
      detailName: "Пекарь  (Физическое лицо)",
      previewText:
        "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
      logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
      traveling: false,
      standard: {
        id: 1,
        coefficient: 1,
        name: "Трудотонна",
      },
    },
    dateStart: "2025-11-05T16:30:00.000000Z",
    dateEnd: "2025-11-09T20:00:00.000000Z",
    needFoto: false,
    dateActivity: [
      {
        id: 1,
        timeStart: "2025-11-05T16:30:00.000Z",
        timeEnd: "2025-11-05T20:00:00.000Z",
        places: [],
      },
      {
        id: 2,
        timeStart: "2025-11-06T06:00:00.000Z",
        timeEnd: "2025-11-06T20:00:00.000Z",
        places: [],
      },
      {
        id: 3,
        timeStart: "2025-11-07T06:00:00.000Z",
        timeEnd: "2025-11-07T20:00:00.000Z",
        places: [],
      },
      {
        id: 4,
        timeStart: "2025-11-08T06:00:00.000Z",
        timeEnd: "2025-11-08T20:00:00.000Z",
        places: [],
      },
      {
        id: 5,
        timeStart: "2025-11-09T06:00:00.000Z",
        timeEnd: "2025-11-09T20:00:00.000Z",
        places: [],
      },
    ],
    order: {
      id: 310,
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
      ],
    },
    task: {
      id: 148,
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
      ],
    },
    acceptingUser: {
      id: 409,
      phone: 79881234567,
      email: "tt@mail.ru",
      logo: "/storage/source/userImg/409/lvQA2xIcemehfKaMFIqM.jpeg",
      roles: [
        {
          id: 5,
          name: "specialist",
        },
      ],
      radius: "2",
      name: "Супервайзер Тестовый",
      age: "22",
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
        id: 27,
        dateStart: "2025-11-05T18:51:38.000000Z",
        dateEnd: "2025-11-05T19:07:26.000000Z",
        report: null,
        dayActivityId: 1,
        status: 4,
        hours: "0.26",
        reasons: [],
      },
      {
        id: 28,
        dateStart: "2025-11-06T11:22:47.000000Z",
        dateEnd: "2025-11-06T11:23:25.000000Z",
        report: null,
        dayActivityId: 2,
        status: 3,
        hours: "0.01",
        reasons: [],
      },
    ],
  },
};

export const mockResponseError = {};

export const getJobMockResponse = http.get(
  `${import.meta.env.VITE_GET_JOB}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
