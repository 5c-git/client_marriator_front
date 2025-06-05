import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getDocumentTerminateSuccess from "./getDocumentTerminateSuccess.schema.json";
import { GetDocumentTerminateSuccess } from "./getDocumentTerminateSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getDocumentTerminateSuccess);

export const getDocumentTerminateKeys = ["getDocumentTerminate"];

export const getDocumentTerminate = async (
  accessToken: string
): Promise<GetDocumentTerminateSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_DOCUMENT_TERMINATE);

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
      data = response as unknown as GetDocumentTerminateSuccess;
    } else {
      throw new Response(
        `Данные запроса getDocumentTerminate не валидны схеме`
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
  status: "success",
  result: {
    organization: [
      {
        uuid: "1",
        name: "organization name 1",
      },
      {
        uuid: "2",
        name: "organization name 2",
      },
    ],
  },
};

export const mockResponseError = {};

export const getDocumentTerminateMockResponse = http.get(
  `${import.meta.env.VITE_GET_DOCUMENT_TERMINATE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
