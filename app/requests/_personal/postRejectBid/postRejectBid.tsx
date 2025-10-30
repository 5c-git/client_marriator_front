import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postRejectBidSuccess.schema.json";
import { PostRejectBidSuccess } from "./postRejectBidSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postRejectBidKeys = ["postRejectBid"];

export const postRejectBid = async (
  accessToken: string,
  bidId: string
): Promise<PostRejectBidSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_REJECT_BID);

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
      data = response as unknown as PostRejectBidSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса postRejectBid не валидны схеме`);
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
export const mockResponseSuccess: PostRejectBidSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postRejectBidMockResponse = http.post(
  `${import.meta.env.VITE_POST_REJECT_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
