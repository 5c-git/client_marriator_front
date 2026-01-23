import { http, delay, HttpResponse } from "msw";

import {
  postSetTerminateSuccessSchema,
  PostSetTerminateSuccess,
} from "./postSetTerminateSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetTerminateKeys = ["postSetTerminate"];

export const postSetTerminate = async (
  accessToken: string,
  uuid: string[]
): Promise<PostSetTerminateSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_SET_TERMINATE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uuid,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postSetTerminateSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSetTerminate не валидны схеме`);
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
  status: "success",
};

export const mockResponseError = {};

export const postSetTerminateMockResponse = http.get(
  import.meta.env.VITE_SET_TERMINATE,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
