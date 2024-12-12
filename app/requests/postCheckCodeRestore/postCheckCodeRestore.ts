import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postCheckCodeRestoreSuccess.schema.json";
import responseError from "./postCheckCodeRestoreError.schema.json";

import { PostCheckCodeRestoreSuccess } from "./postCheckCodeRestoreSuccess.type";
import { PostCheckCodeRestoreError } from "./postCheckCodeRestoreError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postCheckCodeRestoreKeys = ["postCheckCodeRestore"];

export const postCheckCodeRestore = async (
  accessToken: string,
  code: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_CHECK_CODE_RESTORE);

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
      data = response as unknown as PostCheckCodeRestoreSuccess;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostCheckCodeRestoreError;
    } else {
      throw new Response(
        "Данные запроса postCheckCodeRestore не соответствуют схеме"
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
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 120,
      access_token: "токен доступа",
      refresh_token: "токен восстановления access_token",
    },
  },
};

export const mockResponseError = {
  status: "error",
  result: {
    code: {
      status: "error",
    },
  },
};

export const postCheckCodeRestoreMockResponse = http.post(
  `${import.meta.env.VITE_CHECK_CODE_RESTORE}`,
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
