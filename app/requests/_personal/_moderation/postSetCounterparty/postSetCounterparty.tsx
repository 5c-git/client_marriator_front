import { http, delay, HttpResponse } from "msw";

import {
  postSetCounterpartySuccessSchema,
  PostSetCounterpartySuccess,
} from "./postSetCounterpartySuccess.schema";
import {
  postSetCounterpartyErrorSchema,
  PostSetCounterpartyError,
} from "./postSetCounterpartyError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetCounterpartyKeys = ["postSetCounterparty"];

export const postSetCounterparty = async (
  accessToken: string,
  userId: string,
  counterparties: string[]
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_COUNTERPARTY);

    const formData = new FormData();

    formData.append("userId", userId);

    counterparties.forEach((counterparty, index) =>
      formData.append(`counterpartyIds[${index}]`, counterparty)
    );

    const request = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsedSuccess = postSetCounterpartySuccessSchema.safeParse(response);
    const parsedError = postSetCounterpartyErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(`Данные запроса postSetCounterparty не валидны схеме`);
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
export const mockResponseSuccess: PostSetCounterpartySuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError: PostSetCounterpartyError = {
  data: {
    error: true,
  },
};

export const postSetCounterpartyMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_COUNTERPARTY}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
