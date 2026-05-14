import { http, delay, HttpResponse } from "msw";

import {
  getStaticUserInfoSuccessSchema,
  GetStaticUserInfoSuccess,
} from "./getStaticUserInfo.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getStaticUserInfoKeys = ["getStaticUserInfo"];

export const getStaticUserInfo = async (
  accessToken: string,
): Promise<GetStaticUserInfoSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_STATIC_USER_INFO);

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

    const parsed = getStaticUserInfoSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getStaticUserInfo не валидны схеме`);
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
  result: {
    userData: {
      email: "yastrebsov@gmail.com",
      img: "",
    },
  },
  status: "success",
};

export const mockResponseError = {};

export const getStaticUserInfoMockResponse = http.get(
  `${import.meta.env.VITE_GET_STATIC_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
