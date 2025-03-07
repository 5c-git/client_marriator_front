import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postCheckCodeSuccess.schema.json";
import responseError from "./postCheckCodeError.schema.json";

import { PostCheckCodeSuccessSchema } from "./postCheckCodeSuccess.type";
import { PostCheckCodeErrorSchema } from "./postCheckCodeError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postCheckCodeKeys = ["postCheckCode"];

export const postCheckCode = async (phone: string, code: string) => {
  try {
    const url = new URL(import.meta.env.VITE_CHECK_CODE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
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
      data = response as unknown as PostCheckCodeSuccessSchema;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostCheckCodeErrorSchema;
    } else {
      throw new Response("Данные запроса postCheckCode не соответствуют схеме");
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

export const mockPostCheckCodeResponseToken = {
  status: "success",
  result: {
    token: "token",
  },
};

export const mockPostCheckCodeResponseError = {
  result: {
    code: {
      status: "notExists",
    },
  },
  status: "error",
};

export const mockPostCheckCodeMockResponse = http.post(
  `${import.meta.env.VITE_CHECK_CODE}`,
  async () => {
    // const url = new URL(request.url);
    // const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockPostCheckCodeResponseToken);

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
