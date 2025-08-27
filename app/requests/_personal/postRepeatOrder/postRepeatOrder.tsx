import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postRepeatOrderSuccess.schema.json";
import { PostRepeatOrderSuccess } from "./postRepeatOrderSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postRepeatOrderKeys = ["postRepeatOrder"];

export const postRepeatOrder = async (
  accessToken: string,
  orderId: string
): Promise<PostRepeatOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_REPEAT_ORDER);

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

    if (validateSuccess(response)) {
      data = response as unknown as PostRepeatOrderSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса postRepeatOrder не валидны схеме`);
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

export const postRepeatOrderMockResponse = http.post(
  `${import.meta.env.VITE_POST_REPEAT_ORDER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
