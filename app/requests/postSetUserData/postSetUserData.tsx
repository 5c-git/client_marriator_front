import { http, delay, HttpResponse } from "msw";

import { postSetUserDataSuccessSchema } from "./postSetUserDataSuccess.schema";
import { postSetUserDataErrorSchema } from "./postSetUserDataError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetUserDataKeys = ["postSetUserData"];

type Fields = {
  name?: string;
};

export const postSetUserData = async (accessToken: string, fields: Fields) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_USER_DATA);

    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
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

    const parsedSuccess = postSetUserDataSuccessSchema.safeParse(response);
    const parsedError = postSetUserDataErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
      throw new Response(data.message);
    } else {
      throw new Response(`Данные запроса postSetUserData не валидны схеме`);
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

export const postSetUserDataMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_USER_DATA}`,
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
