import { http, delay, HttpResponse } from "msw";

import { postSetUserSettingsSuccessSchema, PostSetUserSettingsSuccess } from "./postSetUserSettingsSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetUserSettingsKeys = ["postSetUserSettings"];

export const postSetUserSettings = async (
  accessToken: string,
  notificationNewBids: boolean,
): Promise<PostSetUserSettingsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_USER_SETTINGS);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        notificationNewBids,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postSetUserSettingsSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSetUserSettings не валидны схеме`);
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
export const mockResponseSuccess: PostSetUserSettingsSuccess = {
  data: {
    success: true,
  },
};

export const mockResponseError = {};

export const postSetUserSettingsMockResponse = http.post(
  import.meta.env.VITE_POST_SET_USER_SETTINGS,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
