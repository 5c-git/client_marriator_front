import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postDelSupervisorSuccess.schema.json";
import { PostDelSupervisorSuccess } from "./postDelSupervisorSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postDelSupervisorKeys = ["postDelSupervisor"];

export const postDelSupervisor = async (
  accessToken: string,
  userId: string,
  supervisorId: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DEL_SUPERVISOR);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("surepvisorId", supervisorId);

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
      data = response as unknown as PostDelSupervisorSuccess;
    } else {
      throw new Response(
        `Данные запроса PostDelSupervisorSuccess не валидны схеме`
      );
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

export const postDelSupervisorMockResponse = http.post(
  `${import.meta.env.VITE_POST_DEL_SUPERVISOR}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
