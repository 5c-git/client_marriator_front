import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import successSchema from "./postSetSupervisorsSuccess.schema.json";
import { PostSetSupervisorsSuccess } from "./postSetSupervisorsSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(successSchema);

export const postSetSupervisorsKeys = ["postSetSupervisors"];

export const postSetSupervisors = async (
  accessToken: string,
  userId: string,
  supervisors: string[]
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

    if (validateSuccess(response)) {
      data = response as unknown as PostSetSupervisorsSuccess;
    } else {
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
export const mockResponseSuccess = {
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
  }
);
