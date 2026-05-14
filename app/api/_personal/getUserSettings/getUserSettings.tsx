import { http, delay, HttpResponse } from "msw";

import { getUserSettingsSuccessSchema, GetUserSettingsSuccess } from "./getUserSettingsSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getUserSettingsKeys = ["getUserSettings"];


export const getUserSettings = async (
  accessToken: string,
): Promise<GetUserSettingsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_USER_SETTINGS);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }



    const parsed = getUserSettingsSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getUserSettings не валидны схеме`);
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
export const mockResponseSuccess: GetUserSettingsSuccess = {
  "data": {
      "notificationNewBids": 1
  }
}

export const mockResponseError = {};

export const getUserSettingsMockResponse = http.get(
  import.meta.env.VITE_GET_USER_SETTINGS,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
