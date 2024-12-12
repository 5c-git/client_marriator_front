import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postFinishRegisterSuccess.schema.json";

import { PostFinishRegisterSuccess } from "./postFinishRegisterSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postFinishRegisterKeys = ["postFinishRegister"];

export const postFinishRegister = async (
  accessToken: string
): Promise<PostFinishRegisterSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_FINISH_REGISTER);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data: PostFinishRegisterSuccess;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostFinishRegisterSuccess;
    } else {
      throw new Response(`Данные запроса postFinishRegister не валидны схеме`);
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
      expires_in: 100500,
      access_token: "1234456789qwerty",
      refresh_token: "987654321ytrewq",
    },
  },
};

export const postFinishRegisterResponse = http.post(
  `${import.meta.env.VITE_FINISH_REGISTER}`,
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
