import { http, delay, HttpResponse } from "msw";

import {
  postSetCounterpartyForOrderSchema,
  PostSetCounterpartyForOrderSuccess,
} from "./postSetCounterpartyForOrder.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetCounterpartyForOrderKeys = ["postSetCounterpartyForOrder"];

export const postSetCounterpartyForOrder = async (
  accessToken: string,
  counterpartyIds: number[],
): Promise<PostSetCounterpartyForOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_COUNTERPARTY_FOR_ORDER);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        counterpartyIds,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postSetCounterpartyForOrderSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postSetCounterpartyForOrder не валидны схеме`,
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
export const mockResponseSuccess: PostSetCounterpartyForOrderSuccess = {
  data: {
    success: true,
  },
};

export const mockResponseError = {};

export const postSetCounterpartyForOrderMockResponse = http.post(
  import.meta.env.VITE_POST_SET_COUNTERPARTY_FOR_ORDER,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
