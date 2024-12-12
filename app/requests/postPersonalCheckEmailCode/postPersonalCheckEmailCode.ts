import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postPersonalCheckEmailCodeSuccess.schema.json";
import responseError from "./postPersonalCheckEmailCodeError.schema.json";

import { PostPersonalCheckEmailCodeSuccess } from "./postPersonalCheckEmailCodeSuccess.type";
import { PostPersonalCheckEmailCodeError } from "./postPersonalCheckEmailCodeError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postPersonalCheckEmailCodeKeys = ["postPersonalCheckEmailCode"];

export const postPersonalCheckEmailCode = async (
  accessToken: string,
  code: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_PERSONAL_CHECK_EMAIL_CODE);

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
      data = response as unknown as PostPersonalCheckEmailCodeSuccess;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostPersonalCheckEmailCodeError;
    } else {
      throw new Response(
        "Данные запроса postPersonalCheckEmailCode не соответствуют схеме"
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

export const postPersonalCheckEmailCodeMockResponse = http.post(
  `${import.meta.env.VITE_PERSONAL_CHECK_EMAIL_CODE}`,
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
