import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postInstructTaskSuccess from "./postInstructTaskSuccess.schema.json";
import { PostInstructTaskSuccess } from "./postInstructTaskSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postInstructTaskSuccess);

export const postInstructTaskKeys = ["postInstructTask"];

export const postInstructTask = async (
  accessToken: string,
  taskId: string,
  supervisorId: string
) => {
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

    if (validateSuccess(response)) {
      data = response as unknown as PostInstructTaskSuccess;
    } else {
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
  }
);
