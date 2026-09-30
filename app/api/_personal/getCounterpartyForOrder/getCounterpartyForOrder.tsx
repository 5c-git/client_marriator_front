import { http, delay, HttpResponse } from "msw";

import {
  getCounterpartyForOrderSchema,
  GetCounterpartyForOrderSuccess,
} from "./getCounterpartyForOrder.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getCounterpartyForOrderKeys = ["getCounterpartyForOrder"];

export const getCounterpartyForOrder = async (
  accessToken: string,
): Promise<GetCounterpartyForOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_COUNTERPARTY_FOR_ORDER);

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

    const parsed = getCounterpartyForOrderSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса getCounterpartyForOrder не валидны схеме`,
      );
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
export const mockResponseSuccess: GetCounterpartyForOrderSuccess = {
  data: [],
};

export const mockResponseError = {};

export const getCounterpartyForOrderMockResponse = http.get(
  import.meta.env.VITE_GET_COUNTERPARTY_FOR_ORDER,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
