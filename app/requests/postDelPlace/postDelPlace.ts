import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postDelPlaceSuccess.schema.json";
import { PostDelPlaceSuccess } from "./postDelPlaceSuccess.type";

import responseError from "./postDelPlaceError.schema.json";
import { PostDelPlaceError } from "./postDelPlaceError.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postDelPlaceKeys = ["postDelPlace"];

export const postDelPlace = async (accessToken: string, placeId: string) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DEL_PLACE);

    const formData = new FormData();

    formData.append("placeId", placeId);

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

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostDelPlaceSuccess;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostDelPlaceError;
    } else {
      throw new Response("Данные запроса postDelPlace не соответствуют схеме");
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
    }
);
