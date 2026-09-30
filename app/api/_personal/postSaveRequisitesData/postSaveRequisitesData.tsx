import { http, delay, HttpResponse } from "msw";

import { postSaveRequisitesDataSuccessSchema } from "./postSaveRequisitesDataSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSaveRequisitesDataKeys = ["postSaveRequisitesData"];

export const postSaveRequisitesData = async (
  accessToken: string,
  formData: unknown,
  dataId: number,
) => {
  try {
    const url = new URL(import.meta.env.VITE_SAVE_REQUISITES_DATA);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        data: formData,
        dataId,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postSaveRequisitesDataSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postSaveRequisitesData не валидны схеме`,
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
  status: "success",
};
export const mockResponseError = {
  status: "error",
  error: "Ошибка",
};

export const postSaveRequisitesDataMockResponse = http.post(
  `${import.meta.env.VITE_SAVE_REQUISITES_DATA}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
