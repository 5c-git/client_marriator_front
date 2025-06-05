import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getDocumentSignedSuccess from "./getDocumentSignedSuccess.schema.json";
import { GetDocumentSignedSuccess } from "./getDocumentSignedSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getDocumentSignedSuccess);

export const getDocumentSignedKeys = ["getDocumentSigned"];

export const getDocumentSigned = async (
  accessToken: string
): Promise<GetDocumentSignedSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_DOCUMENT_SIGNED);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as GetDocumentSignedSuccess;
    } else {
      throw new Response(`Данные запроса getDocumentSigned не валидны схеме`);
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
  result: [
    {
      uuid: "1",
      name: "file name",
    },
    {
      uuid: "2",
      name: "file name 2",
    },
  ],
};

export const mockResponseError = {};

export const getDocumentSignedMockResponse = http.get(
  `${import.meta.env.VITE_GET_DOCUMENT_SIGNED}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
