import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postAcceptBidSuccess.schema.json";
import { PostAcceptBidSuccess } from "./postAcceptBidSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postAcceptBidKeys = ["postAcceptBid"];

export const postAcceptBid = async (
  accessToken: string,
  bidId: string
): Promise<PostAcceptBidSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_ACCEPT_BID);

    const formData = new FormData();

    formData.append("bidId", bidId);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostAcceptBidSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса postAcceptBid не валидны схеме`);
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
export const mockResponseSuccess: PostAcceptBidSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postAcceptBidMockResponse = http.post(
  `${import.meta.env.VITE_POST_ACCEPT_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
