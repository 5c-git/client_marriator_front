import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postStartDaySuccess.schema.json";
import { PostStartDaySuccess } from "./postStartDaySuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postStartDayKeys = ["postStartDay"];

export const postStartDay = async (
  accessToken: string,
  bidId: string
): Promise<PostStartDaySuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_START_DAY);

    const formData = new FormData();

    formData.append("bidId", bidId);

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
      data = response as unknown as PostStartDaySuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса postStartDay не валидны схеме`);
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
export const mockResponseSuccess: PostStartDaySuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postStartDayMockResponse = http.post(
  `${import.meta.env.VITE_POST_START_DAY}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
