import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postAcceptAllReportJobSuccess.schema.json";
import { PostAcceptAllReportJobSuccess } from "./postAcceptAllReportJobSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postAcceptAllReportJobKeys = ["postAcceptAllReportJob"];

export const postAcceptAllReportJob = async (
  accessToken: string,
  bidId: string,
  specialistId: string
): Promise<PostAcceptAllReportJobSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_ACCEPT_ALL_REPORT_JOB);

    const formData = new FormData();

    formData.append("bidId", bidId);
    formData.append("specialistId", specialistId);

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
      data = response as unknown as PostAcceptAllReportJobSuccess;
    } else {
      console.log(validateSuccess.errors);
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
