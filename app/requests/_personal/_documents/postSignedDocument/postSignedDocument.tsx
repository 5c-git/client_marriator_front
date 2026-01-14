import { http, delay, HttpResponse } from "msw";

import {
  postSignedDocumentSuccessSchema,
  PostSignedDocumentSuccess,
} from "./postSignedDocumentSuccess.schema";

import {
  postSignedDocumentErrorSchema,
  PostSignedDocumentError,
} from "./postSignedDocumentError.schema";

import { postSignedDocumentNoPaperErrorSchema } from "./postSignedDocumentNoPaperError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSignedDocumentKeys = ["postSignedDocument"];

export const postSignedDocument = async (accessToken: string) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SIGNED_DOCUMENT);

    // const formData = new FormData();

    // formData.append("bidId", bidId);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      // body: formData,
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postSignedDocumentSuccessSchema.safeParse(response);
    const parsedError = postSignedDocumentErrorSchema.safeParse(response);
    const parsedNoPaperError =
      postSignedDocumentNoPaperErrorSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else if (parsedNoPaperError.success) {
      data = {
        data: {
          error: parsedNoPaperError.data.data.description,
        },
      };
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSignedDocument не валидны схеме`);
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
export const mockResponseSuccess: PostSignedDocumentSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError: PostSignedDocumentError = {
  data: {
    error: true,
  },
};

export const postSignedDocumentMockResponse = http.post(
  `${import.meta.env.VITE_POST_SIGNED_DOCUMENT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
