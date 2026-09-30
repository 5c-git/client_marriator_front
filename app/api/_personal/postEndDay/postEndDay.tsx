import { http, delay, HttpResponse } from "msw";

import {
  postEndDaySuccessSchema,
  PostEndDaySuccess,
} from "./postEndDaySuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postEndDayKeys = ["postEndDay"];

export const postEndDay = async (
  accessToken: string,
  bidId: string,
  files?: File[],
): Promise<PostEndDaySuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_END_DAY);

    const formData = new FormData();

    formData.append("bidId", bidId);

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append(`reports[${index}]`, file, file.name);
      });
    }

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

    const parsed = postEndDaySuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postEndDay не валидны схеме`);
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
export const mockResponseSuccess: PostEndDaySuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postEndDayMockResponse = http.post(
  `${import.meta.env.VITE_POST_END_DAY}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
