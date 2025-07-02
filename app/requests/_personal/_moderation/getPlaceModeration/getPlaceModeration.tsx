import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getPlaceModerationSuccess from "./getPlaceModerationSuccess.schema.json";
import { GetPlaceModerationSuccess } from "./getPlaceModerationSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getPlaceModerationSuccess);

export const getPlaceModerationKeys = ["getPlaceModeration"];

export const getPlaceModeration = async (
  accessToken: string,
  userId: number
): Promise<GetPlaceModerationSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_PLACE_MODERATION);

    url.searchParams.append("userId", userId.toString());

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as GetPlaceModerationSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getPlaceModeration не валидны схеме`);
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
      logo: null,
      region: {
        id: 1,
        name: "Татарстан Респ",
      },
      brand: {
        id: 2,
        name: "vfdv",
        logo: null,
        description: "dvdvdvdv",
      },
    },
  ],
};

export const mockResponseError = {
  message: "The selected user id is invalid.",
  errors: {
    userId: ["The selected user id is invalid."],
  },
};

export const getPlaceModerationMockResponse = http.get(
  `${import.meta.env.VITE_GET_PLACE_MODERATION}`,
  async ({ request }) => {
    const url = new URL(request.url);

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
