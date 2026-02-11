import { http, delay, HttpResponse } from "msw";

import { postSetBrandImgSuccessSchema } from "./postSetBrandImgSuccess.schema";
import { postSetBrandImgErrorSchema } from "./postSetBrandImgError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetBrandImgKeys = ["postSetBrandImg"];

export const postSetBrandImg = async (accessToken: string, brandId: string) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_BRAND_IMG);

    const formData = new FormData();

    formData.append("brandId", brandId);

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

    const parsedSuccess = postSetBrandImgSuccessSchema.safeParse(response);
    const parsedError = postSetBrandImgErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
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
  },
);
