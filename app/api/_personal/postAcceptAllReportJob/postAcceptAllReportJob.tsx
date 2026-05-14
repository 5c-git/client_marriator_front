import { http, delay, HttpResponse } from "msw";

import {
  postAcceptAllReportJobSuccess,
  PostAcceptAllReportJobSuccess,
} from "./postAcceptAllReportJobSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postAcceptAllReportJobKeys = ["postAcceptAllReportJob"];

export const postAcceptAllReportJob = async (
  accessToken: string,
  payload: {
    bidId: number;
    specialistId: number;
    reports: {
      reportId: number;
      hours: number;
      reasons: {
        reasonId: number;
        count: number;
        amount: number;
      }[];
    }[];
  }
): Promise<PostAcceptAllReportJobSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_ACCEPT_ALL_REPORT_JOB);

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

    const parsed = postAcceptAllReportJobSuccess.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postAcceptAllReportJob не валидны схеме`
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
export const mockResponseSuccess: PostAcceptAllReportJobSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postAcceptAllReportJobMockResponse = http.post(
  `${import.meta.env.VITE_POST_ACCEPT_ALL_REPORT_JOB}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
