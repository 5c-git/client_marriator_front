import { http, delay, HttpResponse } from "msw";

import {
  getRequisitesDataSuccessSchema,
  GetRequisitesDataSuccess,
} from "./getRequisitesDataSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getRequisitesDataKeys = ["getRequisitesData"];

export const getRequisitesData = async (
  accessToken: string,
): Promise<GetRequisitesDataSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_REQUISITES_DATA);

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

    const parsed = getRequisitesDataSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getRequisitesData не валидны схеме`);
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
  result: [
    {
      bik: "0000",
      fio: "test2",
      card: "5536913757516790",
      account: "12121121121212121212",
      cardDue: "2024-08-26",
      confidant: false,
      payWithCard: "yes",
    },
  ],
  status: "success",
};

export const mockResponseError = {};

export const getRequisitesDataMockResponse = http.get(
  `${import.meta.env.VITE_GET_REQUISITES_DATA}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
