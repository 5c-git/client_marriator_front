import { http, delay, HttpResponse } from "msw";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

import {
  getReasonsSuccessSchema,
  GetReasonsSuccess,
} from "./getReasonsSuccess.schema";

export const getReasonsKeys = ["getReasons"];

export const getReasons = async (
  accessToken: string
): Promise<GetReasonsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_REASONS);

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

    const parsed = getReasonsSuccessSchema.safeParse(response);
    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getReasons не валидны схеме`);
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
export const mockResponseSuccess: GetReasonsSuccess = {
  data: [
    {
      id: 1,
      value: "Название причины",
    },
    {
      id: 2,
      value: "Название причины",
    },
    {
      id: 3,
      value: "Название причины",
    },
    {
      id: 4,
      value: "Название причины",
    },
    {
      id: 5,
      value: "Название причины",
    },
  ],
};

export const mockResponseError = {};

export const getReasonsMockResponse = http.get(
  `${import.meta.env.VITE_GET_REASONS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
