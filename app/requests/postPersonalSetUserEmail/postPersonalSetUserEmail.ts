import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postPersonalSetUserEmail.schema.json";
import responseError from "./postPersonalSetUserEmailError.schema.json";

import { PostPersonalSetUserEmailSuccessSchema } from "./postPersonalSetUserEmail.type";
import { PostPersonalSetUserEmailErrorSchema } from "./postPersonalSetUserEmailError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postPersonalSetUserEmailKeys = ["postPersonalSetUserEmail"];

export const postPersonalSetUserEmail = async (
  accessToken: string,
  email: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_SET_PERSONAL_USER_EMAIL);

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

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostPersonalSetUserEmailSuccessSchema;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostPersonalSetUserEmailErrorSchema;
    } else {
      throw new Response(
        "Данные запроса postPersonalSetUserEmail не соответствуют схеме"
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
  error: "Email отсутствует или присвоен другому пользователю",
  status: "error",
};

export const postPersonalSetUserEmailMockResponse = http.post(
  `${import.meta.env.VITE_SET_PERSONAL_USER_EMAIL}`,
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
