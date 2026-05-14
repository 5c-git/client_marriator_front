import { http, delay, HttpResponse } from "msw";

import {
  postSetMapFieldSuccessSchema,
  PostSetMapFieldSuccess,
} from "./postSetMapFieldSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSetMapFieldKeys = ["postSetMapField"];

export const postSetMapField = async (
  accessToken: string,
  mapAddress: string,
  mapRadius: string | null,
  latitude: string,
  longitude: string,
): Promise<PostSetMapFieldSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_MAP_FIELD);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        mapAddress,
        mapRadius,
        latitude,
        longitude,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = postSetMapFieldSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса postSetMapField не валидны схеме`);
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
export const mockResponseSuccess: PostSetMapFieldSuccess = {
  result: {
    mapAddress: "",
    mapRadius: "",
    latitude: null,
    longitude: null,
  },
  status: "success",
};

export const mockResponseError = {};

export const postSetMapFieldMockResponse = http.get(
  import.meta.env.VITE_POST_MAP_FIELD,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
