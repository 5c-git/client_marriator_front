import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import successSchema from "./getJobSuccess.schema.json";
import { GetJobSuccess } from "./getJobSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(successSchema);

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

    if (validateSuccess(response)) {
      data = response as unknown as GetJobSuccess;
    } else {
      console.log(validateSuccess.errors);
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
          accepted: 6,
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
          accepted: 6,
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
      status: 6,
    },
    reports: [
      {
        dateStart: "2025-09-29T11:32:51.000000Z",
        dateEnd: null,
        report: null,
        dayActivityId: null,
        status: 2,
        hours: "1.00",
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
