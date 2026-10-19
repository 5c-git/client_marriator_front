import { http, delay, HttpResponse } from "msw";

import {
  postSetTimeZoneSuccessSchema,
  PostSetTimeZoneSuccess,
} from "./postSetTimeZone.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetTimeZoneKeys = ["postSetTimeZone"];

export const postSetTimeZone = async (
  accessToken: string,
  time: string,
): Promise<PostSetTimeZoneSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_TIME_ZONE);

    const formData = new FormData();

    formData.append("time", time);

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

    const parsed = postSetTimeZoneSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSetTimeZone не валидны схеме`);
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
export const mockResponseSuccess = {};

export const mockResponseEmpty = {};

export const postSetTimeZoneMockResponse = http.get(
  `${import.meta.env.VITE_POST_SET_TIME_ZONE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
