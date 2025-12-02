import { http, delay, HttpResponse } from "msw";

import {
  getPlaceForOrderSuccessSchema,
  GetPlaceForOrderSuccess,
} from "./getPlaceForOrderSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getPlaceForOrderKeys = ["getPlaceForOrder"];

export const getPlaceForOrder = async (
  accessToken: string,
): Promise<GetPlaceForOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_PLACE_FOR_ORDER);

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

    const parsed = getPlaceForOrderSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getPlaceForOrder не валидны схеме`);
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
export const mockResponseSuccess: GetPlaceForOrderSuccess = {
  data: [
    {
      id: 1,
      name: "Шестёрочка",
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
    {
      id: 2,
      name: "Семёрочка",
      latitude: "42.00000000",
      longitude: "24.00000000",
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

export const mockResponseError = {};

export const getPlaceForOrderMockResponse = http.get(
  `${import.meta.env.VITE_GET_PLACE_FOR_ORDER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
