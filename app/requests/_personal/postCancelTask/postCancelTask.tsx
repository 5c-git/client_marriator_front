import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postCancelTaskSuccess.schema.json";
import { PostCancelTaskSuccess } from "./postCancelTaskSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postCancelTaskKeys = ["postCancelTask"];

export const postCancelTask = async (
  accessToken: string,
  taskId: string
): Promise<PostCancelTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_CANCEL_TASK);

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

    if (validateSuccess(response)) {
      data = response as unknown as PostCancelTaskSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса postCancelTask не валидны схеме`);
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

export const postCancelTaskMockResponse = http.post(
  `${import.meta.env.VITE_POST_CANCEL_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
