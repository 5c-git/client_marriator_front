import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postSaveUserFieldsSuccess.schema.json";
import schemaError from "./postSaveUserFieldsError.schema.json";

import { PostSaveUserFieldsSuccess } from "./postSaveUserFieldsSuccess.type";
import { PostSaveUserFieldsError } from "./postSaveUserFieldsError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);
const validateError = ajv.compile(schemaError);

export const postSaveUserFieldsKeys = ["postSaveUserFields"];

export const postSaveUserFields = async (
  accessToken: string,
  formData: unknown
) => {
  try {
    const url = new URL(import.meta.env.VITE_SAVE_USER_FIELDS);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        formData,
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
      data = response as unknown as PostSaveUserFieldsSuccess;
    } else if (validateError(response)) {
      data = response as unknown as PostSaveUserFieldsError;
    } else {
      throw new Response(`Данные запроса postSaveUserFields не валидны схеме`);
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
};
export const mockResponseError = {
  status: "error",
  error: "Ошибка",
};

export const postSaveFormMockResponse = http.post(
  `${import.meta.env.VITE_SAVE_USER_FIELDS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
