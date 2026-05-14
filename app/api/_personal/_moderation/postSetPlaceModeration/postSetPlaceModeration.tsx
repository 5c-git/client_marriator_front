import { http, delay, HttpResponse } from "msw";

import { postSetPlaceModerationSuccessSchema } from "./postSetPlaceModerationSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetPlaceModerationKeys = ["postSetPlaceModeration"];

export const postSetPlaceModeration = async (
  accessToken: string,
  userId: string,
  places: string[]
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_PLACE_MODERATION);

    const formData = new FormData();

    formData.append("userId", userId);

    places.forEach((place, index) => {
      formData.append(`placeId[${index}]`, place);
    });

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

    const parsed = postSetPlaceModerationSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса PostSetPlaceModeration не валидны схеме`
      );
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

export const postSetPlaceModerationMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_PLACE_MODERATION}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
