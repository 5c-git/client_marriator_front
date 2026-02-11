import { http, delay, HttpResponse } from "msw";

import { postSetPlaceSuccessSchema } from "./postSetPlaceSuccess.schema";
import { postSetPlaceErrorSchema } from "./postSetPlaceError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetPlaceKeys = ["postSetPlace"];

export const postSetPlace = async (accessToken: string, placeIds: string[]) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_PLACE);

    const formData = new FormData();

    placeIds.forEach((place, index) => {
      formData.append(`placeId[${index}]`, place);
    });

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

    const parsedSuccess = postSetPlaceSuccessSchema.safeParse(response);
    const parsedError = postSetPlaceErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
      throw new Response(data.message);
    } else {
      throw new Response(`Данные запроса postSetPlace не валидны схеме`);
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

export const postSetPlaceMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_PLACE}`,
  async ({ request }) => {
    const url = new URL(`${request.url}?scenario=success`);
    const scenario = url.searchParams.get("scenario");

    if (scenario === "success") {
      await delay(2000);
      return HttpResponse.json(mockResponseSuccess);
    } else if (scenario === "error") {
      await delay(2000);
      return HttpResponse.json(mockResponseError);
    }
  },
);
