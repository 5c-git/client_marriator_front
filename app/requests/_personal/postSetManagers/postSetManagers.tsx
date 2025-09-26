import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import successSchema from "./postSetManagersSuccess.schema.json";
import { PostSetManagersSuccess } from "./postSetManagersSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(successSchema);

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

    if (validateSuccess(response)) {
      data = response as unknown as PostSetManagersSuccess;
    } else {
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
