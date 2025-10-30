import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postEndJobSuccess.schema.json";
import { PostEndJobSuccess } from "./postEndJobSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postEndJobKeys = ["postEndJob"];

export const postEndJob = async (
  accessToken: string,
  bidId: string
): Promise<PostEndJobSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_END_JOB);

    const formData = new FormData();

    formData.append("bidId", bidId);

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
      data = response as unknown as PostEndJobSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса postEndJob не валидны схеме`);
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
export const mockResponseSuccess: PostEndJobSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postEndJobMockResponse = http.post(
  `${import.meta.env.VITE_POST_END_JOB}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
