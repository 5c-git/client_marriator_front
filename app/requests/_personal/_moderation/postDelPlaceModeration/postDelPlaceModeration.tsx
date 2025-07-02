import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postDelPlaceModerationSuccess from "./postDelPlaceModerationSuccess.schema.json";
import { PostDelPlaceSuccess } from "~/requests/postDelPlace/postDelPlaceSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postDelPlaceModerationSuccess);

export const postDelPlaceModerationKeys = ["postDelPlaceModeration"];

export const postDelPlaceModeration = async (
  accessToken: string,
  userId: string,
  placeId: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DEL_PLACE_MODERATION);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("placeId", placeId);

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
      data = response as unknown as PostDelPlaceSuccess;
    } else {
      throw new Response(`Данные запроса PostDelPlaceSuccess не валидны схеме`);
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

export const postDelPlaceModerationMockResponse = http.post(
  `${import.meta.env.VITE_POST_DEL_PLACE_MODERATION}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
