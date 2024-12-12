import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postChangeUserPhoneSuccess.schema.json";
import responseError from "./postChangeUserPhoneError.schema.json";

import { PostChangeUserPhoneSuccess } from "./postChangeUserPhoneSuccess.type";
import { PostChangeUserPhoneError } from "./postChangeUserPhoneError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postChangeUserPhoneKeys = ["postChangeUserPhone"];

export const postChangeUserPhone = async (
  accessToken: string,
  phone: string
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

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostChangeUserPhoneSuccess;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostChangeUserPhoneError;
    } else {
      throw new Response(
        "Данные запроса postChangeUserPhone не соответствуют схеме"
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
  }
);
