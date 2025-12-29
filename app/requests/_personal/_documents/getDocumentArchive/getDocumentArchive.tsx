import { http, delay, HttpResponse } from "msw";

import {
  getDocumentArchiveSuccessSchema,
  GetDocumentArchiveSuccess,
} from "./getDocumentArchiveSuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getDocumentArchiveKeys = ["getDocumentArchive"];

export const getDocumentArchive = async (
  accessToken: string,
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

    const parsed = getDocumentArchiveSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getDocumentArchive не валидны схеме`);
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
export const mockResponseSuccess: GetDocumentArchiveSuccess = {
  data: [
    {
      id: 167,
      file_path:
        "/storage/source/document/550/202512261101099834626testDoc.pdf",
      file_name: "202512261101107934063testDoc.pdf",
      status_signature: "signed",
      date_signature: "2025-12-26T12:10:08.000000Z",
      file_path_signed: null,
    },
    {
      id: 168,
      file_path:
        "/storage/source/document/550/202512261101104614050testDoc.pdf",
      file_name: "202512261101102793431testDoc.pdf",
      status_signature: "signed",
      date_signature: "2025-12-26T12:10:08.000000Z",
      file_path_signed: null,
    },
    {
      id: 169,
      file_path:
        "/storage/source/document/550/202512261158171969743testDoc.pdf",
      file_name: "202512261158178146312testDoc.pdf",
      status_signature: "signed",
      date_signature: "2025-12-26T12:11:38.000000Z",
      file_path_signed: null,
    },
    {
      id: 170,
      file_path:
        "/storage/source/document/550/202512261158175350711testDoc.pdf",
      file_name: "202512261158175553423testDoc.pdf",
      status_signature: "signed",
      date_signature: "2025-12-26T12:11:38.000000Z",
      file_path_signed: null,
    },
  ],
};

export const mockResponseError = {};

export const getDocumentArchiveMockResponse = http.get(
  `${import.meta.env.VITE_GET_DOCUMENT_ARCHIVE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
