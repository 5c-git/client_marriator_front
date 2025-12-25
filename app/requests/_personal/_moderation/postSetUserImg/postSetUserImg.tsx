import { http, delay, HttpResponse } from "msw";

import {
  postSetUserImgSuccessSchema,
  PostSetUserImgSuccess,
} from "./postSetUserImgSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetUserImgKeys = ["postSetUserImg"];

export const postSetUserImg = async (
  accessToken: string,
  userId: string,
  projectId: string,
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

    const parsed = postSetUserImgSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
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
export const mockResponseSuccess: PostSetUserImgSuccess = {
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
  },
);
