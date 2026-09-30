import { http, delay, HttpResponse } from "msw";

import {
  getRadiusSelectSuccessSchema,
  GetRadiusSelectSuccess,
} from "./getRadiusSelectSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getRadiusSelectKeys = ["getRadiusSelect"];

export const getRadiusSelect = async (
  accessToken: string,
): Promise<GetRadiusSelectSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_RADIUS_SELECT);

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

    const parsed = getRadiusSelectSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getRadiusSelect не валидны схеме`);
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
export const mockResponseSuccess: GetRadiusSelectSuccess = {
  data: [
    {
      id: 1,
      value: 10,
      default: true,
    },
    {
      id: 2,
      value: 20,
      default: false,
    },
  ],
};

export const mockResponseError = {};

export const getRadiusSelectMockResponse = http.get(
  `${import.meta.env.VITE_GET_RADIUS_SELECT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
