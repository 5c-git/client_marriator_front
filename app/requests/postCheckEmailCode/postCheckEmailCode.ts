import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postCheckEmailCodeSuccess.schema.json";
import responseError from "./postCheckEmailCodeError.schema.json";

import { PostCheckEmailCodeSuccess } from "./postCheckEmailCodeSuccess.type";
import { PostCheckEmailCodeError } from "./postCheckEmailCodeError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postCheckEmailCodeKeys = ["postCheckEmailCode"];

export const postCheckEmailCode = async (accessToken: string, code: string) => {
  try {
    const url = new URL(import.meta.env.VITE_CHECK_EMAIL_CODE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        code,
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
      data = response as unknown as PostCheckEmailCodeSuccess;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostCheckEmailCodeError;
    } else {
      throw new Response(
        "Данные запроса postCheckEmailCode не соответствуют схеме"
      );
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
  status: "success",
};

export const mockResponseError = {
  status: "error",
  result: {
    code: {
      status: "error",
    },
  },
};

export const postCheckEmailCodeMockResponse = http.post(
  `${import.meta.env.VITE_CHECK_EMAIL_CODE}`,
  async () => {
    // const url = new URL(request.url);
    // const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);

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
