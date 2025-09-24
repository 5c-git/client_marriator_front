import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import successSchema from "./getBidSuccess.schema.json";
import { GetBidSuccess } from "./getBidSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(successSchema);

export const getBidKeys = ["getBid"];

export const getBid = async (
  accessToken: string,
  bidId: string
): Promise<GetBidSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_BID);

    url.searchParams.append("bidId", bidId);

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
      data = response as unknown as GetBidSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getBid не валидны схеме`);
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
export const mockResponseSuccess: GetBidSuccess = {
  data: {
    id: 11,
    user: {
      id: 398,
      phone: 79887951515,
      email: "manager3@mail.ru",
      logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
      roles: [
        {
          id: 3,
          name: "manager",
        },
      ],
    },
    status: 1,
    selfEmployed: true,
    place: {
      id: 1,
      name: "Ашан МСК",
      latitude: "37.73043700",
      longitude: "55.72987300",
      address_kladr: "Рязанский пр-т, д. 2, корп. 2, Москва",
      logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
      region: {
        id: 2,
        name: "Москва",
      },
      brand: {
        id: 2,
        name: "Ашан",
        logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
        description:
          "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
      },
    },
    radius: 0,
    price: 1000,
    priceResult: 940,
    viewActivity: {
      id: 2,
      name: "Курьер  (Физическое лицо)",
      detailName: "Курьер  (Физическое лицо)",
      previewText: "Доставка под разные задачи, быстрая курьерская доставка",
      logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
      traveling: true,
    },
    dateStart: "2025-09-19T12:00:00.000000Z",
    dateEnd: "2025-09-20T21:00:00.000000Z",
    needFoto: true,
    dateActivity: [
      {
        timeStart: "2025-09-19T09:00:00.000Z",
        timeEnd: "2025-09-19T12:00:00.000Z",
        places: [
          {
            id: 1,
            name: "Ашан МСК",
            latitude: "37.73043700",
            longitude: "55.72987300",
            address_kladr: "Рязанский пр-т, д. 2, корп. 2, Москва",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          },
        ],
      },
      {
        timeStart: "2025-09-20T14:00:00.000Z",
        timeEnd: "2025-09-20T18:00:00.000Z",
        places: [
          {
            id: 1,
            name: "Ашан МСК",
            latitude: "37.73043700",
            longitude: "55.72987300",
            address_kladr: "Рязанский пр-т, д. 2, корп. 2, Москва",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            region: {
              id: 2,
              name: "Москва",
            },
            brand: {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          },
        ],
      },
    ],
    order: null,
    task: {
      id: 47,
      selfEmployed: true,
      status: 1,
      user: {
        id: 398,
        phone: 79887951515,
        email: "manager3@mail.ru",
        logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
      },
    },
    acceptingUsers: [],
    count: 1,
  },
};

export const mockResponseSuccessEmpty = {
  data: [],
};

export const mockResponseError = {};

export const getBidMockResponse = http.get(
  `${import.meta.env.VITE_GET_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
