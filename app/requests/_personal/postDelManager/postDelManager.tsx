import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postDelManagerSuccess.schema.json";
import { PostDelManagerSuccess } from "./postDelManagerSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postDelManagerKeys = ["postDelManager"];

export const postDelManager = async (
  accessToken: string,
  userId: string,
  managerId: string,
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DEL_MANAGER);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("managerId", managerId);

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
      data = response as unknown as PostDelManagerSuccess;
    } else {
      throw new Response(`Данные запроса postDelManager не валидны схеме`);
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
export const mockResponseSuccess: PostDelManagerSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postDelManagerMockResponse = http.post(
  `${import.meta.env.VITE_POST_DEL_MANAGER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
