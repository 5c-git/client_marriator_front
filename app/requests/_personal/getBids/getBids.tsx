import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import successSchema from "./getBidsSuccess.schema.json";
import { GetBidsSuccess } from "./getBidsSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(successSchema);

export const getBidsKeys = ["getBids"];

export const getBids = async (
  accessToken: string,
  status?: string,
  sort?: string
): Promise<GetBidsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_BIDS);

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
      data = response as unknown as GetBidsSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getBids не валидны схеме`);
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
      id: 1,
      user: {
        id: 365,
        phone: 71111111111,
        email: "manager@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
      },
      acceptUserId: null,
      status: 2,
      selfEmployed: false,
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
      radius: null,
      price: null,
      priceResult: 0,
      viewActivity: {
        id: 1,
        name: "Продавец  (Физическое лицо)",
        detailName: "Продавец  (Физическое лицо)",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        traveling: false,
      },
      date_start: "2025-08-20T10:00:00.000000Z",
      date_end: "2025-08-20T12:00:00.000000Z",
      need_foto: true,
      date_activity: [],
    },
    {
      id: 2,
      user: {
        id: 365,
        phone: 71111111111,
        email: "manager@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
      },
      acceptUserId: null,
      status: 2,
      selfEmployed: false,
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
      radius: null,
      price: null,
      priceResult: 0,
      viewActivity: {
        id: 1,
        name: "Продавец  (Физическое лицо)",
        detailName: "Продавец  (Физическое лицо)",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        traveling: false,
      },
      date_start: "2025-08-20T10:00:00.000000Z",
      date_end: "2025-08-20T20:00:00.000000Z",
      need_foto: true,
      date_activity: [],
    },
  ],
};

export const mockResponseSuccessEmpty = {
  data: [],
};

export const mockResponseError = {};

export const getBidsMockResponse = http.get(
  `${import.meta.env.VITE_GET_BIDS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
