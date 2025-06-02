import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postSetPlaceSuccess.schema.json";
import schemaError from "./postSetPlaceError.schema.json";
import { PostSetPlaceSuccess } from "./postSetPlaceSuccess.type";
import { PostSetPlaceError } from "./postSetPlaceError.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);
const validateError = ajv.compile(schemaError);

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
        "Content-Type": "application/json",
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
      data = response as unknown as PostSetPlaceSuccess;
    } else if (validateError(response)) {
      data = response as unknown as PostSetPlaceError;
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
  }
);
