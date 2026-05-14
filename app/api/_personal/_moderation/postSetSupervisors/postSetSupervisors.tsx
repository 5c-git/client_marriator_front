import { http, delay, HttpResponse } from "msw";

import {
  postSetSupervisorsSuccessSchema,
  PostSetSupervisorsSuccess,
} from "./postSetSupervisorsSuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetSupervisorsKeys = ["postSetSupervisors"];

export const postSetSupervisors = async (
  accessToken: string,
  userId: string,
  supervisors: string[],
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_SUPERVISORS);

    const formData = new FormData();

    formData.append("userId", userId);

    supervisors.forEach((supervisor, index) => {
      formData.append(`surepvisorIds[${index}]`, supervisor);
    });

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

    const parsed = postSetSupervisorsSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSetSupervisors не валидны схеме`);
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
export const mockResponseSuccess: PostSetSupervisorsSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postSetSupervisorsMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_SUPERVISORS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
