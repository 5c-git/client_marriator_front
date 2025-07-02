import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postConfirmUserRegisterSuccess.schema.json";
import { PostConfirmUserRegisterSuccess } from "./postConfirmUserRegisterSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postConfirmUserRegisterKeys = ["postConfirmUserRegister"];

export const postConfirmUserRegister = async (
  accessToken: string,
  userId: string,
  confirm: string,
  fields?: { [key: string]: string }
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_CONFIRM_USER_REGISTER);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("confirm", confirm);

    if (fields) {
      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, JSON.stringify(value));
      }
    }

    const request = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostConfirmUserRegisterSuccess;
    } else {
      throw new Response(
        `Данные запроса postConfirmUserRegister не валидны схеме`
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
export const mockResponseSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postConfirmUserRegisterMockResponse = http.post(
  `${import.meta.env.VITE_POST_CONFIRM_USER_REGISTER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
