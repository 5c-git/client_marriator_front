import { http, delay, HttpResponse } from "msw";

import { postDelPlaceSuccessSchema } from "./postDelPlaceSuccess.schema";
import { postDelPlaceErrorSchema } from "./postDelPlaceError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postDelPlaceKeys = ["postDelPlace"];

export const postDelPlace = async (accessToken: string, placeId: string) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DEL_PLACE);

    const formData = new FormData();

    formData.append("placeId", placeId);

    const request = await fetch(url, {
      method: "POST",
      headers: {
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

    const parsedSuccess = postDelPlaceSuccessSchema.safeParse(response);
    const parsedError = postDelPlaceErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(`Данные запроса postDelPlace не валидны схеме`);
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

export const mockResponseError = {
  message: "The selected place id is invalid.",
  errors: {
    placeId: ["The selected place id is invalid."],
  },
};

export const postDelPlaceMockResponse = http.post(
  `${import.meta.env.VITE_POST_DEL_PLACE}`,
  async () =>
    // { request }
    {
      // const url = new URL(`${request.url}`);
      // const scenario = url.searchParams.get("scenario");

      await delay(2000);
      return HttpResponse.json(mockResponseSuccess);
    },
);
