import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getDocumentArchiveSuccess from "./getDocumentArchiveSuccess.schema.json";
import { GetDocumentArchiveSuccess } from "./getDocumentArchiveSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getDocumentArchiveSuccess);

export const getDocumentArchiveKeys = ["getDocumentArchive"];

export const getDocumentArchive = async (
  accessToken: string
): Promise<GetDocumentArchiveSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_DOCUMENT_ARCHIVE);

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
      data = response as unknown as GetDocumentArchiveSuccess;
    } else {
      throw new Response(`Данные запроса getDocumentArchive не валидны схеме`);
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
  result: [
    {
      uuid: "1",
      name: "file name",
      path: "path",
    },
    {
      uuid: "2",
      name: "file name 2",
      path: "path",
    },
  ],
};

export const mockResponseError = {};

export const getDocumentArchiveMockResponse = http.get(
  `${import.meta.env.VITE_GET_DOCUMENT_ARCHIVE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
