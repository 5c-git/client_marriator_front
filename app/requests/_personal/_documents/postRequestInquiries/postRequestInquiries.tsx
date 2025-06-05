import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postRequestInquiriesSuccess from "./postRequestInquiriesSuccess.schema.json";
import { PostRequestInquiriesSuccess } from "./postRequestInquiriesSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postRequestInquiriesSuccess);

export const postRequestInquiriesKeys = ["postRequestInquiries"];

export const postRequestInquiries = async (
  accessToken: string,
  uuid: string,
  certificates: string
): Promise<PostRequestInquiriesSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_REQUEST_INQUIRIES);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uuid,
        certificates,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostRequestInquiriesSuccess;
    } else {
      throw new Response(
        `Данные запроса postRequestInquiries не валидны схеме`
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
};

export const mockResponseError = {};

export const postRequestInquiriesMockResponse = http.get(
  import.meta.env.VITE_REQUEST_INQUIRIES,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
