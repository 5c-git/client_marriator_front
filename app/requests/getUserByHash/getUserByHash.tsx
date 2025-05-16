import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getUserByHashSuccessSchema from "./getUserByHashSuccess.schema.json";
import getUserByHashSuccessError from "./getUserByHashError.schema.json";
import { GetUserByHashSuccess } from "./getUserByHashSuccess.type";
import { GetUserByHashError } from "./getUserByHashError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getUserByHashSuccessSchema);
const validateError = ajv.compile(getUserByHashSuccessError);

export const getUserByHashKeys = ["getUserByHash"];

export const getUserByHash = async (
  accessToken: string,
  hash: string
): Promise<GetUserByHashSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_USER_BY_HASH);

    url.searchParams.append("hash", hash);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as GetUserByHashSuccess;
    } else if (validateError(response)) {
      data = response as unknown as GetUserByHashError;
      throw new Response(data.error);
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getUserByHash не валидны схеме`);
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
    userId: 187,
    phone: 1213123123,
    email: "dggjihn@mail.ru",
    roles: ["manager", "client", "recruiter"],
  },
  status: "success",
};

export const mockResponseError = {
  error: "Недействительная ссылка для регистрации",
  status: "error",
};

export const getUserByHashMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_BY_HASH}`,
  async ({ request }) => {
    // const url = new URL(request.url);

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);

    // const scenario = "step1";
    // const scenario = "error";

    // if (scenario === "success") {
    //   await delay(2000);
    //   return HttpResponse.json(mockStep1ResponseSuccess);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  }
);
