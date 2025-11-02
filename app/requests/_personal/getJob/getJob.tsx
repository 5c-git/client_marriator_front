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
    id: 69,
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
    dateStart: "2025-10-29T21:20:00.000000Z",
    dateEnd: "2025-11-01T17:00:00.000000Z",
    needFoto: true,
    dateActivity: [
      {
        id: 1,
        timeStart: "2025-10-29T21:20:00.000Z",
        timeEnd: "2025-10-30T18:00:00.000Z",
        places: [],
      },
      {
        id: 2,
        timeStart: "2025-10-31T06:00:00.000Z",
        timeEnd: "2025-10-31T18:00:00.000Z",
        places: [],
      },
      {
        id: 3,
        timeStart: "2025-11-02T06:00:00.000Z",
        timeEnd: "2025-11-02T21:00:00.000Z",
        places: [],
      },
    ],
    order: {
      id: 300,
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
      id: 141,
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
        id: 19,
        dateStart: "2025-10-29T21:25:49.000000Z",
        dateEnd: "2025-10-29T21:25:59.000000Z",
        report: [
          "/storage/source/reports/406/19/AVtyxlMRrXQfQDq5So38BdPJZR2dAVUPnSwtpmNm.png",
          "/storage/source/reports/406/19/lDI2c1OtkEGxn5Rcl5UN3Lv8H9xlq2gVrvIzC5AO.png",
          "/storage/source/reports/406/19/OQg73rZmpdXG5ud0Md2pYifJJ1OADEszpxZhbabX.png",
          "/storage/source/reports/406/19/1kt6qNXCOaWl3qdmscbi8FXDEP3SKuqySsXYPjAX.png",
        ],
        dayActivityId: 1,
        status: 6,
        hours: "0.00",
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
