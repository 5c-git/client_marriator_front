import { http, delay, HttpResponse } from "msw";

import {
  postEndSpecialistJobSuccessSchema,
  PostEndSpecialistJobSuccess,
} from "./postEndSpecialistJobSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postEndSpecialistJobKeys = ["postEndSpecialistJob"];

export const postEndSpecialistJob = async (
  accessToken: string,
  bidId: string,
  specialistId: string,
): Promise<PostEndSpecialistJobSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_END_SPECIALIST_JOB);

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

    const parsed = postEndSpecialistJobSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postEndSpecialistJob не валидны схеме`,
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
export const mockResponseSuccess: PostEndSpecialistJobSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postEndSpecialistJobMockResponse = http.post(
  `${import.meta.env.VITE_POST_END_SPECIALIST_JOB}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
