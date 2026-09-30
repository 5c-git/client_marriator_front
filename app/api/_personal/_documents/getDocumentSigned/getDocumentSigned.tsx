import { http, delay, HttpResponse } from "msw";

import {
  getDocumentSignedSuccessSchema,
  GetDocumentSignedSuccess,
} from "./getDocumentSignedSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getDocumentSignedKeys = ["getDocumentSigned"];

export const getDocumentSigned = async (
  accessToken: string,
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

    const parsed = getDocumentSignedSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
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
      id: 140,
      name: "docForPay_29.10.2025 17:08:07.pdf",
      status_signature: "noSend",
    },
    {
      id: 143,
      name: "docForPay_29.10.2025 21:27:51.pdf",
      status_signature: "noSend",
    },
    {
      id: 144,
      name: "docForPay_29.10.2025 21:38:35.pdf",
      status_signature: "noSend",
    },
    {
      id: 145,
      name: "docForPay_30.10.2025 08:17:03.pdf",
      status_signature: "noSend",
    },
    {
      id: 146,
      name: "docForPay_30.10.2025 09:20:17.pdf",
      status_signature: "noSend",
    },
    {
      id: 150,
      name: "docForPay_17.11.2025 07:53:43.pdf",
      status_signature: "noSend",
    },
  ],
};

export const mockResponseError = {};

export const getDocumentSignedMockResponse = http.get(
  `${import.meta.env.VITE_GET_DOCUMENT_SIGNED}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
