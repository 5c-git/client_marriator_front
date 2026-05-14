import { http, delay, HttpResponse } from "msw";

import { postSetUserEmailSuccessSchema } from "./postSetUserEmailSuccess.schema";
import { postSetUserEmailErrorSchema } from "./postSetUserEmailError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetUserEmailKeys = ["postSetUserEmail"];

export const postSetUserEmail = async (accessToken: string, email: string) => {
  try {
    const url = new URL(import.meta.env.VITE_SET_USER_EMAIL);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsedSuccess = postSetUserEmailSuccessSchema.safeParse(response);
    const parsedError = postSetUserEmailErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(`Данные запроса postSetUserEmail не валидны схеме`);
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
  error: "Email отсутствует или присвоен другому пользователю",
  status: "error",
};

export const mockPostSetUserEmailMockResponse = http.post(
  `${import.meta.env.VITE_SET_USER_EMAIL}`,
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
