import { http, delay, HttpResponse } from "msw";

import {
  postSendOrderSuccessSchema,
  PostSendOrderSuccess,
} from "./postSendOrderSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSendOrderKeys = ["postSendOrder"];

export const postSendOrder = async (
  accessToken: string,
  orderId: string,
): Promise<PostSendOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SEND_ORDER);

    const formData = new FormData();

    formData.append("orderId", orderId);

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

    const parsed = postSendOrderSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSendOrder не валидны схеме`);
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
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postSendOrderMockResponse = http.post(
  `${import.meta.env.VITE_POST_SEND_ORDER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
