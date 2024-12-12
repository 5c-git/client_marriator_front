import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postSetUserPinSuccess.schema.json";
import responseUnauth from "./postSetUserPinUnauth.schema.json";

import { PostSetUserPinSuccessSchema } from "./postSetUserPinSuccess.type";
import { PostSetUserPinUnauthSchema } from "./postSetUserPinUnauth.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseUnauth = ajv.compile(responseUnauth);

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

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostSetUserPinSuccessSchema;
    } else if (validateResponseUnauth(response)) {
      data = response as unknown as PostSetUserPinUnauthSchema;
    } else {
      throw new Response(
        "Данные запроса postSetUserPin не соответствуют схеме"
      );
    }

    return data;
  } catch (error) {
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
  }
);
