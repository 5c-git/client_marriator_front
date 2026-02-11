import { http, delay, HttpResponse } from "msw";

import { postSetUserPinSuccessSchema } from "./postSetUserPinSuccess.schema";
import { postSetUserPinUnauthSchema } from "./postSetUserPinUnauth.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetUserPinKeys = ["postSetUserPin"];

export const postSetUserPin = async (accessToken: string, pin: string) => {
  try {
    const url = new URL(import.meta.env.VITE_SET_USER_PIN);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        pin,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsedSuccess = postSetUserPinSuccessSchema.safeParse(response);
    const parsedError = postSetUserPinUnauthSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(`Данные запроса postSetUserPin не валидны схеме`);
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
export const mockPostSetUserPinResponseSuccess = {
  status: "success",
};

export const mockPostSetUserPinResponseUnauth = {
  message: "Unauthenticated",
};

export const mockPostSetUserPinMockResponse = http.post(
  `${import.meta.env.VITE_SET_USER_PIN}`,
  async () => {
    // const url = new URL(request.url);
    // const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockPostSetUserPinResponseSuccess);

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
