import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postAcceptReportSuccess.schema.json";
import { PostAcceptReportSuccess } from "./postAcceptReportSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postAcceptReportKeys = ["postAcceptReport"];

export const postAcceptReport = async (
  accessToken: string,
  reportId: string
): Promise<PostAcceptReportSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_ACCEPT_REPORT);

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

    if (validateSuccess(response)) {
      data = response as unknown as PostAcceptReportSuccess;
    } else {
      console.log(validateSuccess.errors);
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
