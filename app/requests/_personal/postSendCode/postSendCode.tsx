import { http, delay, HttpResponse } from "msw";

import {
  postSendCodeSuccessSchema,
  PostSendCodeSuccess,
} from "./postSendCodeSuccess.schema";
import {
  postSendCodeErrorSchema,
  PostSendCodeError,
} from "./postSendCodeError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSendCodeKeys = ["postSendCode"];

export const postSendCode = async (accessToken: string, code: number) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SEND_CODE);

    const formData = new FormData();

    formData.append("code", code.toString());

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

    const parsed = postSendCodeSuccessSchema.safeParse(response);
    const parsedError = postSendCodeErrorSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSendCode не валидны схеме`);
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
export const mockResponseSuccess: PostSendCodeSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError: PostSendCodeError = {
  data: {
    error: true,
  },
};

export const postSendCodeMockResponse = http.post(
  `${import.meta.env.VITE_POST_SEND_CODE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
