import { http, delay, HttpResponse } from "msw";

import {
  getDocumentTerminateSuccessSchema,
  GetDocumentTerminateSuccess,
} from "./getDocumentTerminateSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

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

    const parsed = getDocumentTerminateSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
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
