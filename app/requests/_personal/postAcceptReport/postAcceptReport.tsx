import { http, delay, HttpResponse } from "msw";

import {
  postAcceptReportSuccess,
  PostAcceptReportSuccess,
} from "./postAcceptReportSuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postAcceptReportKeys = ["postAcceptReport"];

export const postAcceptReport = async (
  accessToken: string,
  payload: {
    reportId: number;
    hours: number;
    reasons: {
      reasonId: number;
      count: number;
      amount: number;
    }[];
  }
): Promise<PostAcceptReportSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_ACCEPT_REPORT);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postAcceptReportSuccess.safeParse(response);
    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postAcceptReport не валидны схеме`);
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
export const mockResponseSuccess: PostAcceptReportSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postAcceptReportMockResponse = http.post(
  `${import.meta.env.VITE_POST_ACCEPT_REPORT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
