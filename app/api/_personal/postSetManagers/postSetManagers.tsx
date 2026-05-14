import { http, delay, HttpResponse } from "msw";

import {
  postSetManagersSuccessSchema,
  PostSetManagersSuccess,
} from "./postSetManagersSuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetManagersKeys = ["postSetManagers"];

export const postSetManagers = async (
  accessToken: string,
  userId: string,
  managers: string[],
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_MANAGERS);

    const formData = new FormData();

    formData.append("userId", userId);

    managers.forEach((manager, index) => {
      formData.append(`managerIds[${index}]`, manager);
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

    const parsed = postSetManagersSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSetManagers не валидны схеме`);
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
export const mockResponseSuccess: PostSetManagersSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postSetManagersMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_MANAGERS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
