import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getPlaceSuccess from "./getPlaceSuccess.schema.json";
import { GetPlaceSuccess } from "./getPlaceSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getPlaceSuccess);

export const getPlaceKeys = ["getPlace"];

export const getPlace = async (
  accessToken: string
): Promise<GetPlaceSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_PLACE);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      data = response as unknown as GetPlaceSuccess;
    } else {
      throw new Response(`Данные запроса getPlace не валидны схеме`);
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
      name: "Ашан",
      latitude: "56.00000000",
      longitude: "37.00000000",
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
};

export const mockResponseError = {};

export const getPlaceMockResponse = http.get(
  `${import.meta.env.VITE_GET_PLACE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
