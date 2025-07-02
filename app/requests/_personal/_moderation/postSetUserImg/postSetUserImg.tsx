import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postSetUserImgSuccessSchema from "./postSetUserImgSuccess.schema.json";
import { PostSetUserImgSuccess } from "./postSetUserImgSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postSetUserImgSuccessSchema);

export const postSetUserImgKeys = ["postSetUserImg"];

export const postSetUserImg = async (
  accessToken: string,
  userId: string,
  projectId: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_USER_IMG);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("projectId", projectId);

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
      data = response as unknown as PostSetUserImgSuccess;
    } else {
      throw new Response(`Данные запроса postSetUserImg не валидны схеме`);
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

export const postSetUserImgMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_USER_IMG}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
