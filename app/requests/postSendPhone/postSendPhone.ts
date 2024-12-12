import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postSendPhoneSuccess.schema.json";
import responseError from "./postSendPhoneError.schema.json";

import { PostSendPhoneSuccessSchema } from "./postSendPhoneSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postSendPhoneKeys = ["postSendPhone"];

export const postSendPhone = async (
  phone: string
): Promise<PostSendPhoneSuccessSchema> => {
  try {
    const url = new URL(import.meta.env.VITE_SEND_PHONE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
      }),
    });
    const response = await request.json();

    let data: PostSendPhoneSuccessSchema;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostSendPhoneSuccessSchema;
    } else if (validateResponseError(response)) {
      throw new Response("Поле телефон обязательно для заполнения");
    } else {
      throw new Response("Данные запроса postSendPhone не соответствуют схеме");
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
export const mockPostSendPhoneResponseRegister = {
  result: {
    type: "register",
    code: {
      status: "success",
      code: 7642,
      ttl: 120,
    },
  },
  status: "success",
};

export const mockPostSendPhoneResponseExists = {
  result: {
    type: "register",
    code: {
      status: "exists",
      ttl: 89,
    },
  },
  status: "success",
};

export const mockPostSendPhoneResponseError = {
  result: {
    type: "register",
    code: {
      status: "errorSend",
    },
  },
  status: "success",
};

export const mockResponseError = {
  status: "error",
  error: "Поле телефон обязательна для заполнения",
};

export const postSendPhoneMockResponse = http.post(
  `${import.meta.env.VITE_SEND_PHONE}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockResponseError);

    if (scenario === "reg") {
      await delay(2000);
      return HttpResponse.json(mockPostSendPhoneResponseRegister);
    }
    // else if (scenario === "auth") {
    //   // await delay(2000);
    //   // return HttpResponse.json();
    // }
    else if (scenario === "error") {
      await delay(2000);
      return HttpResponse.json(mockResponseError);
    }
  }
);
