import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getPlaceForBidSuccess from "./getPlaceForBidSuccess.schema.json";
import { GetPlaceForBidSuccess } from "./getPlaceForBidSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getPlaceForBidSuccess);

export const getPlaceForBidKeys = ["getPlaceForBid"];

export const getPlaceForBid = async (
  accessToken: string
): Promise<GetPlaceForBidSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_PLACE_FOR_BID);

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
      data = response as unknown as GetPlaceForBidSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getPlaceForBid не валидны схеме`);
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
export const mockResponseSuccess: GetPlaceForBidSuccess = {
  data: [
    {
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
    {
      id: 4,
      name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
      latitude: "55.00000000",
      longitude: "49.00000000",
      address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      region: {
        id: 1,
        name: "Татарстан Респ",
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

export const mockResponseError = {};

export const getPlaceForBidMockResponse = http.get(
  `${import.meta.env.VITE_GET_PLACE_FOR_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
