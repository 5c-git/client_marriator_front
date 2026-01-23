import { http, delay, HttpResponse } from "msw";

import {
  postSetConcludeSuccessSchema,
  PostSetConcludeSuccess,
} from "./postSetConcludeSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetConcludeKeys = ["postSetConclude"];

export const postSetConclude = async (
  accessToken: string,
  uuid: string[]
): Promise<PostSetConcludeSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_SET_CONCLUDE);

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

    const parsed = postSetConcludeSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSetConclude не валидны схеме`);
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

export const postSetConcludeMockResponse = http.get(
  import.meta.env.VITE_SET_CONCLUDE,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
