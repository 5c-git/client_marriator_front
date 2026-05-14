import { http, delay, HttpResponse } from "msw";

import {
  postDeleteCounterpartySuccessSchema,
  PostDeleteCounterpartySuccess,
} from "./postDeleteCounterpartySuccess.schema";
import {
  postDeleteCounterpartyErrorSchema,
  PostDeleteCounterpartyError,
} from "./postDeleteCounterpartyError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postDeleteCounterpartyKeys = ["postDeleteCounterparty"];

export const postDeleteCounterparty = async (
  accessToken: string,
  userId: string,
  counterpartyId: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DELETE_COUNTERPARTY);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("counterpartyId", counterpartyId);

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

    const parsedSuccess =
      postDeleteCounterpartySuccessSchema.safeParse(response);
    const parsedError = postDeleteCounterpartyErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(
        `Данные запроса postDeleteCounterparty не валидны схеме`
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
export const mockResponseSuccess: PostDeleteCounterpartySuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError: PostDeleteCounterpartyError = {
  data: {
    error: true,
  },
};

export const postDeleteCounterpartyMockResponse = http.post(
  `${import.meta.env.VITE_POST_DELETE_COUNTERPARTY}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
