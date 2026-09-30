import { http, delay, HttpResponse } from "msw";

import {
  getSignedDocumentSuccessSchema,
  GetSignedDocumentSuccess,
} from "./getSignedDocumentSuccess.schema";
import {
  getSignedDocumentErrorSchema,
  GetSignedDocumentError,
} from "./getSignedDocumentError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getSignedDocumentKeys = ["getSignedDocument"];

export const getSignedDocument = async (
  accessToken: string,
  documentId: string,
) => {
  try {
    const url = new URL(import.meta.env.VITE_SIGNED_DOCUMENT);

    url.searchParams.append("documentId", documentId);

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

    const parsed = getSignedDocumentSuccessSchema.safeParse(response);
    const parsedError = getSignedDocumentErrorSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getSignedDocument не валидны схеме`);
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
export const mockResponseSuccess: GetSignedDocumentSuccess = {
  data: {
    id: 26,
    file_path: "/storage/source/directory/brand/1-logo/achievement-1.png",
    file_name: "achievement-1.png",
    status_signature: "signed",
    date_signature: "2025-05-25T09:00:00.000000Z",
    file_path_signed:
      "/storage/source/directory/brand/1-logo/achievement-1.png",
  },
};

export const mockResponseError: GetSignedDocumentError = {
  message: "Document not found or not signed",
  errors: {
    documentId: ["Document not found or not signed"],
  },
};

export const getSignedDocumentMockResponse = http.get(
  `${import.meta.env.VITE_SIGNED_DOCUMENT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
