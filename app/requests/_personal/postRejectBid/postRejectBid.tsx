import { http, delay, HttpResponse } from "msw";

import {
  postRejectBidSuccessSchema,
  PostRejectBidSuccess,
} from "./postRejectBidSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postRejectBidKeys = ["postRejectBid"];

export const postRejectBid = async (
  accessToken: string,
  bidId: string,
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

    const parsed = postRejectBidSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
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
  },
);
