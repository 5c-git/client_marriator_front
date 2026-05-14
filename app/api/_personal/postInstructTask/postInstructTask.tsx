import { http, delay, HttpResponse } from "msw";

import {
  postInstructTaskSuccessSchema,
  PostInstructTaskSuccess,
} from "./postInstructTaskSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postInstructTaskKeys = ["postInstructTask"];

export const postInstructTask = async (
  accessToken: string,
  taskId: string,
  supervisorId: string,
): Promise<PostInstructTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_INSTRUCT_TASK);

    const formData = new FormData();

    formData.append("taskId", taskId);
    formData.append("supervisorId", supervisorId);

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

    const parsed = postInstructTaskSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postInstructTask не валидны схеме`);
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
export const mockResponseSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postInstructTaskMockResponse = http.post(
  `${import.meta.env.VITE_POST_INSTRUCT_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
