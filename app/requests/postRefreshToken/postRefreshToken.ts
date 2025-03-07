import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postRefreshTokenSuccess.schema.json";

import responseError from "./postRefreshTokenError.schema.json";

import { PostRefreshTokenSuccessSchema } from "./postRefreshTokenSuccess.type";
import { PostRefreshTokenErrorSchema } from "./postRefreshTokenError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postRefreshTokenKeys = ["postRefreshToken"];

export const postRefreshToken = async (refreshToken: string) => {
  try {
    const url = new URL(import.meta.env.VITE_REFRESH_TOKEN);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });
    const response = await request.json();

    let data;

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostRefreshTokenSuccessSchema;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostRefreshTokenErrorSchema;
    } else {
      throw new Response(
        "Данные запроса postRefreshToken не соответствуют схеме"
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

export const mockPostRefreshTokenResponseToken = {
  status: "success",
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 604800,
      access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
      refresh_token:
        "def502003d38d8e66440cab04f02f070db9484f7c5d10d4a56fa873ae3ee8db467fe5e4e5bbed528a5",
    },
  },
};

export const mockPostRefreshTokenResponseError = {
  status: "success",
  result: {
    token: {
      error: "invalid_request",
      error_description: "The refresh token is invalid.",
      hint: "Token is not linked to client",
      message: "The refresh token is invalid.",
    },
  },
};

export const mockPostCheckCodeMockResponse = http.post(
  `${import.meta.env.VITE_REFRESH_TOKEN}`,
  async () => {
    // const url = new URL(request.url);
    // const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockPostRefreshTokenResponseToken);

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
