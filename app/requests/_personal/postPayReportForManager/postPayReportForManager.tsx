import { http, delay, HttpResponse } from "msw";

import {
  postPayReportForManagerSuccessSchema,
  PostPayReportForManagerSuccess,
} from "./postPayReportForManagerSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const PostPayReportForManagerKeys = ["PostPayReportForManager"];

export const postPayReportForManager = async (
  accessToken: string,
  reportId: string,
): Promise<PostPayReportForManagerSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_PAY_REPORT_FOR_MANAGER);

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

    const parsed = postPayReportForManagerSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postPayReportForManager не валидны схеме`,
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
export const mockResponseSuccess: PostPayReportForManagerSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postPayReportForManagerMockResponse = http.post(
  `${import.meta.env.VITE_POST_PAY_REPORT_FOR_MANAGER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
