import { http, delay, HttpResponse } from "msw";

import { postChangeUserPhoneSuccessSchema } from "./postChangeUserPhoneSuccess.schema";
import { postChangeUserPhoneErrorSchema } from "./postChangeUserPhoneError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postChangeUserPhoneKeys = ["postChangeUserPhone"];

export const postChangeUserPhone = async (
  accessToken: string,
  phone: string,
) => {
  try {
    const url = new URL(import.meta.env.VITE_CHANGE_USER_PHONE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        phone,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsedSuccess = postChangeUserPhoneSuccessSchema.safeParse(response);
    const parsedError = postChangeUserPhoneErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(`Данные запроса postChangeUserPhone не валидны схеме`);
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
  result: {
    code: {
      status: "success",
      code: 9829,
      ttl: 120,
    },
  },
  status: "success",
};

export const mockResponseError = {
  error: "Phone отсутствует или присвоен другому пользователю",
  status: "error",
};

export const postChangeUserPhoneMockResponse = http.post(
  `${import.meta.env.VITE_CHANGE_USER_PHONE}`,
  async () => {
    // const url = new URL(request.url);
    // const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockResponseError);

    // if (scenario === "reg") {
    //   await delay(2000);
    //   return HttpResponse.json(mockPostSendPhoneResponseRegister);
    // }
    // else if (scenario === "auth") {
    //   // await delay(2000);
    //   // return HttpResponse.json();
    // }
    // else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  },
);
