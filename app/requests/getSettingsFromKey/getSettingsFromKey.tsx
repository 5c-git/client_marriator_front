import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getSettingsFromKeySuccess from "./getSettingsFromKey.schema.json";
import { GetSettingsFromKeySuccess } from "./getSettingsFromKey.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getSettingsFromKeySuccess);

export const getSettingsFromKeyKeys = ["getSettingsFromKey"];

type Setting = "radius";

export const getSettingsFromKey = async (
  accessToken: string,
  setting: Setting
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

    if (validateSuccess(response)) {
      data = response as unknown as GetSettingsFromKeySuccess;
    } else {
      throw new Response(`Данные запроса getSettingsFromKey не валидны схеме`);
    }

    return data;
  } catch (error) {
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
  }
);
