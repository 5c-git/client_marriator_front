import { http, delay, HttpResponse } from "msw";

import {
  postAcceptTaskSuccessSchema,
  PostAcceptTaskSuccess,
} from "./postAcceptTaskSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postAcceptTaskKeys = ["postAcceptTask"];

export const postAcceptTask = async (
  accessToken: string,
  taskId: string,
): Promise<PostAcceptTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_ACCEPT_TASK);

    const formData = new FormData();

    formData.append("taskId", taskId);

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

    const parsed = postAcceptTaskSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postAcceptTask не валидны схеме`);
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
export const mockResponseSuccess: PostAcceptTaskSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postAcceptTaskMockResponse = http.post(
  `${import.meta.env.VITE_POST_ACCEPT_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
