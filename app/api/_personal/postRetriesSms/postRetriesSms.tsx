import { http, delay, HttpResponse } from "msw";

import {
  postRetriesSmsSuccessSchema,
  PostRetriesSmsSuccess,
} from "./postRetriesSmsSuccess.schema";

import {
  postRetriesSmsErrorSchema,
  PostRetriesSmsError,
} from "./postRetriesSmsError.schema";

import { postRetriesSmsNoPaperErrorSchema } from "./postRetriesSmsNoPaperError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postRetriesSmsKeys = ["postRetriesSms"];

export const postRetriesSms = async (accessToken: string) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_RETRIES_SMS);

    // const formData = new FormData();

    // formData.append("bidId", bidId);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      // body: formData,
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postRetriesSmsSuccessSchema.safeParse(response);
    const parsedError = postRetriesSmsErrorSchema.safeParse(response);
    const parsedNoPaperError =
      postRetriesSmsNoPaperErrorSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else if (parsedNoPaperError.success) {
      data = {
        data: {
          error: parsedNoPaperError.data.data.description,
        },
      };
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postRetriesSms не валидны схеме`);
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
export const mockResponseSuccess: PostRetriesSmsSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError: PostRetriesSmsError = {
  data: {
    error: true,
  },
};

export const postRetriesSmsMockResponse = http.post(
  `${import.meta.env.VITE_POST_RETRIES_SMS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
