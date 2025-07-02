import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postSetPlaceModerationSuccess from "./postSetPlaceModerationSuccess.schema.json";
import { PostSetPlaceModerationSuccess } from "./postSetPlaceModerationSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postSetPlaceModerationSuccess);

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

    if (validateSuccess(response)) {
      data = response as unknown as PostSetPlaceModerationSuccess;
    } else {
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
