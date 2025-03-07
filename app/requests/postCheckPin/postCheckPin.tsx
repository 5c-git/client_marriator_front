import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postCheckPinSuccess.schema.json";
import schemaError from "./postCheckPinError.schema.json";

import { PostCheckPinSuccess } from "./postCheckPinSuccess.type";
import { PostCheckPinError } from "./postCheckPinError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);
const validateError = ajv.compile(schemaError);

export const postCheckPinKeys = ["postCheckPin"];

export const postCheckPin = async (accessToken: string, pin: string) => {
  try {
    const url = new URL(import.meta.env.VITE_CHECK_PIN);

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

    if (validateSuccess(response)) {
      data = response as unknown as PostCheckPinSuccess;
    } else if (validateError(response)) {
      data = response as unknown as PostCheckPinError;
    } else {
      throw new Response(`Данные запроса postCheckPin не валидны схеме`);
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
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 100500,
      access_token: "1234456789qwerty",
      refresh_token: "987654321ytrewq",
    },
  },
};

export const mockResponseError = {
  status: "error",
};

export const postCheckPinResponse = http.post(
  `${import.meta.env.VITE_CHECK_PIN}`,
  async () => {
    // const scenario = "success";
    // const scenario = "error";

    // if (scenario === "success") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseSuccess);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
