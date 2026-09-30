import { http, delay, HttpResponse } from "msw";

import {
  postPayReportSuccessSchema,
  PostPayReportSuccess,
} from "./postPayReportSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postPayReportKeys = ["postPayReport"];

export const postPayReport = async (
  accessToken: string,
  reportId: string,
): Promise<PostPayReportSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_PAY_REPORT);

    const formData = new FormData();

    formData.append("reportId", reportId);

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

    const parsed = postPayReportSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postPayReport не валидны схеме`);
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
export const mockResponseSuccess: PostPayReportSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postPayReportMockResponse = http.post(
  `${import.meta.env.VITE_POST_PAY_REPORT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
