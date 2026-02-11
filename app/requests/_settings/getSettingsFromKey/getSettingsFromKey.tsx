import { http, delay, HttpResponse } from "msw";

import {
  getSettingsFromKeySuccessSchema,
  GetSettingsFromKeySuccess,
} from "./getSettingsFromKeySuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getSettingsFromKeyKeys = ["getSettingsFromKey"];

type Setting = "radius";

export const getSettingsFromKey = async (
  accessToken: string,
  setting: Setting,
): Promise<GetSettingsFromKeySuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_SETTINGS_FROM_KEY);

    url.searchParams.append("key", setting);

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

    const parsed = getSettingsFromKeySuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getSettingsFromKey не валидны схеме`);
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
  result: "1",
};

export const mockResponseError = {};

export const getSettingsFromKeyMockResponse = http.get(
  import.meta.env.VITE_SETTINGS_FROM_KEY,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
