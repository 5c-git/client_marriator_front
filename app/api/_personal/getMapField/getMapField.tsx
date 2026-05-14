import { http, delay, HttpResponse } from "msw";

import {
  GetMapFieldSuccess,
  getMapFieldSuccessSchema,
} from "./getMapFieldSuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getMapFieldKeys = ["getMapField"];

export const getMapField = async (
  accessToken: string,
): Promise<GetMapFieldSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_MAP_FIELD);

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

    const parsed = getMapFieldSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getMapField не валидны схеме`);
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
export const mockResponseSuccess: GetMapFieldSuccess = {
  result: {
    mapAddress: "",
    mapRadius: "",
    latitude: null,
    longitude: null,
  },
  status: "success",
};

export const mockResponseError = {};

export const getMapFieldMockResponse = http.get(
  import.meta.env.VITE_GET_MAP_FIELD,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
