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
      name: "вамвамвмвм",
      latitude: "24.00000000",
      longitude: "42.00000000",
      address_kladr: "вмвмвмв",
    },
    {
      id: 2,
      name: "fdfvdvdv",
      latitude: "21.00000000",
      longitude: "11.00000000",
      address_kladr: "dvdvdvdvdv",
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
