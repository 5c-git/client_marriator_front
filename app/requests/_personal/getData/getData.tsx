import { http, delay, HttpResponse } from "msw";

import { getDataSuccessSchema, GetDataSuccess } from "./getDataSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getDataKeys = ["getData"];

export const getData = async (
  accessToken: string,
  // userId: number,
): Promise<GetDataSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_DATA);

    // url.searchParams.append("userId", userId.toString());

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

    const parsed = getDataSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getData не валидны схеме`);
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
export const mockResponseSuccess = {};

export const mockResponseEmpty = {};

export const getDataMockResponse = http.get(
  `${import.meta.env.VITE_GET_DATA}`,
  async () =>
    // { request }
    {
      // const url = new URL(request.url);

      await delay(2000);
      return HttpResponse.json(mockResponseSuccess);
    },
);
