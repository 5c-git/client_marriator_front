import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getOrdersSuccess from "./getOrdersSuccess.schema.json";
import { GetOrdersSuccess } from "./getOrdersSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getOrdersSuccess);

export const getOrdersKeys = ["getOrders"];

export const getOrders = async (
  accessToken: string,
  status?: string,
  sort?: string
): Promise<GetOrdersSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_ORDERS);

    if (status) {
      url.searchParams.append("status", status);
    }

    if (sort) {
      url.searchParams.append("status", sort);
    }

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
      data = response as unknown as GetOrdersSuccess;
    }
    // else if (validateError(response)) {
    //   data = response as unknown as GetOrderError;
    // }
    else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getOrders не валидны схеме`);
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
export const mockResponseSuccess = {
  data: [
    {
      id: 206,
      selfEmployed: false,
      status: 2,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "55.00000000",
        longitude: "37.00000000",
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
      },
      orderActivities: [
        {
          id: 117,
          viewActivity: {
            id: 2,
            name: "Курьер  (Физическое лицо)",
            detailName: "Курьер  (Физическое лицо)",
            previewText:
              "Доставка под разные задачи, быстрая курьерская доставка",
            logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
            traveling: true,
          },
          count: 1,
          dateStart: "2025-09-05T09:00:00.000000Z",
          dateEnd: "2025-09-06T18:00:00.000000Z",
          needFoto: false,
          dateActivity: [
            {
              timeStart: "2025-09-05T12:00:00.000Z",
              timeEnd: "2025-09-05T21:00:00.000Z",
              places: [],
            },
            {
              timeStart: "2025-09-06T13:00:00.000Z",
              timeEnd: "2025-09-06T18:00:00.000Z",
              places: [],
            },
          ],
        },
      ],
      acceptUser: null,
    },
    {
      id: 208,
      selfEmployed: false,
      status: 3,
      place: {
        id: 3,
        name: "Пятёрочка МСК ул. Арбат д. 24",
        latitude: "55.00000000",
        longitude: "37.00000000",
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
      },
      orderActivities: [
        {
          id: 118,
          viewActivity: {
            id: 1,
            name: "Продавец  (Физическое лицо)",
            detailName: "Продавец  (Физическое лицо)",
            previewText:
              "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
            logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
            traveling: false,
          },
          count: 1,
          dateStart: "2025-09-02T11:00:00.000000Z",
          dateEnd: "2025-09-02T18:00:00.000000Z",
          needFoto: false,
          dateActivity: [],
        },
      ],
      acceptUser: {
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
      },
    },
  ],
};

export const mockResponseSuccessEmpty = {
  data: [],
};

export const mockResponseError = {};

export const getOrdersMockResponse = http.get(
  `${import.meta.env.VITE_GET_ORDERS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
