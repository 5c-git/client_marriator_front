import { http, delay, HttpResponse } from "msw";

import {
  postUpdateReportSuccess,
  PostUpdateReportSuccess,
} from "./postUpdateReportSuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postUpdateReportKeys = ["postUpdateReport"];

export const postUpdateReport = async (
  accessToken: string,
  payload: {
    reportId: number;
    hours: number;
    reasons: {
      reasonId: number;
      count: number;
    }[];
  }
): Promise<PostUpdateReportSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_UPDATE_REPORT);

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

    const parsed = postUpdateReportSuccess.safeParse(response);
    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postUpdateReport не валидны схеме`);
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
export const mockResponseSuccess: PostUpdateReportSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postUpdateReportMockResponse = http.post(
  `${import.meta.env.VITE_POST_UPDATE_REPORT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
