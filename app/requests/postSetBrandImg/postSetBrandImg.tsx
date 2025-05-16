import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postSetBrandImgSuccess.schema.json";
import schemaError from "./postSetBrandImgError.schema.json";
import { PostSetBrandImgSuccess } from "./postSetBrandImgSuccess.type";
import { PostSetBrandImgError } from "./postSetBrandImgError.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);
const validateError = ajv.compile(schemaError);

export const postSetBrandImgKeys = ["postSetBrandImg"];

export const postSetBrandImg = async (accessToken: string, brandId: string) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_BRAND_IMG);

    const formData = new FormData();

    formData.append("brandId", brandId);

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
      data = response as unknown as PostSetBrandImgSuccess;
    } else if (validateError(response)) {
      data = response as unknown as PostSetBrandImgError;
      throw new Response(data.message);
    } else {
      throw new Response(`Данные запроса postSetBrandImg не валидны схеме`);
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
  message: "The selected brand id is invalid.",
  errors: {
    brandId: ["The selected brand id is invalid."],
  },
};

export const postSetBrandImgMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_BRAND_IMG}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
