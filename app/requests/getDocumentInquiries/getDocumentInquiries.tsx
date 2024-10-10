import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getDocumentInquiriesSuccess from "./getDocumentInquiriesSuccess.schema.json";
import { GetDocumentInquiriesSuccess } from "./getDocumentInquiriesSuccess.type";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getDocumentInquiriesSuccess);

export const getDocumentInquiriesKeys = ["getDocumentInquiries"];

export const getDocumentInquiries = async (
  accessToken: string
): Promise<GetDocumentInquiriesSuccess> => {
  const url = new URL(import.meta.env.VITE_GET_DOCUMENTS_INQUIRIES);

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
    data = response as unknown as GetDocumentInquiriesSuccess;
  } else {
    throw new Response(`Данные запроса getDocumentInquiries не валидны схеме`);
  }

  return data;
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

export const getDocumentInquiriesMockResponse = http.get(
  `${import.meta.env.VITE_GET_DOCUMENTS_INQUIRIES}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
