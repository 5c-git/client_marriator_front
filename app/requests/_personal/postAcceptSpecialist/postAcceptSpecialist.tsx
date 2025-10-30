import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postAcceptSpecialistSuccess.schema.json";
import { PostAcceptSpecialistSuccess } from "./postAcceptSpecialistSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postAcceptSpecialistKeys = ["postAcceptSpecialist"];

export const postAcceptSpecialist = async (
  accessToken: string,
  bidId: string,
  specialistId: string
): Promise<PostAcceptSpecialistSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_ACCEPT_SPECIALIST);

    const formData = new FormData();

    formData.append("bidId", bidId);
    formData.append("specialistId", specialistId);

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
      data = response as unknown as PostAcceptSpecialistSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(
        `Данные запроса postAcceptSpecialist не валидны схеме`
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
export const mockResponseSuccess: PostAcceptSpecialistSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postAcceptSpecialistMockResponse = http.post(
  `${import.meta.env.VITE_POST_ACCEPT_SPECIALIST}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
