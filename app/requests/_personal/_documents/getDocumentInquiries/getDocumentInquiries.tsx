import { http, delay, HttpResponse } from "msw";

import {
  getDocumentInquiriesSuccessSchema,
  GetDocumentInquiriesSuccess,
} from "./getDocumentInquiriesSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getDocumentInquiriesKeys = ["getDocumentInquiries"];

export const getDocumentInquiries = async (
  accessToken: string
): Promise<GetDocumentInquiriesSuccess> => {
  try {
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

    const parsed = getDocumentInquiriesSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса getDocumentInquiries не валидны схеме`
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
