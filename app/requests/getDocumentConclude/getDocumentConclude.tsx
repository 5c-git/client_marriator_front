import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getDocumentConcludeSuccess from "./getDocumentConcludeSuccess.schema.json";
import { GetDocumentConcludeSuccess } from "./getDocumentConcludeSuccess.type";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getDocumentConcludeSuccess);

export const getDocumentConcludeKeys = ["getDocumentConclude"];

export const getDocumentConclude = async (
  accessToken: string
): Promise<GetDocumentConcludeSuccess> => {
  const url = new URL(import.meta.env.VITE_GET_DOCUMENT_CONCLUDE);

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
    data = response as unknown as GetDocumentConcludeSuccess;
  } else {
    throw new Response(`Данные запроса getDocumentConclude не валидны схеме`);
  }

  return data;
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

export const getDocumentConcludeMockResponse = http.get(
  `${import.meta.env.VITE_GET_DOCUMENT_CONCLUDE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
