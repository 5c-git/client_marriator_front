import { http, delay, HttpResponse } from "msw";

import { getUserByHashSuccessSchema } from "./getUserByHashSuccess.schema";
import { getUserByHashErrorSchema } from "./getUserByHashError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getUserByHashKeys = ["getUserByHash"];

export const getUserByHash = async (accessToken: string, hash: string) => {
  try {
    const url = new URL(import.meta.env.VITE_GET_USER_BY_HASH);

    url.searchParams.append("hash", hash);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsedSuccess = getUserByHashSuccessSchema.safeParse(response);
    const parsedError = getUserByHashErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(`Данные запроса getUserByHash не валидны схеме`);
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
    userId: 187,
    phone: 79152142630,
    email: "dggjihn@mail.ru",
    role: "manager",
  },
  status: "success",
};

export const mockResponseRecruiter = {
  result: {
    userId: 187,
    phone: 79152142630,
    email: "dggjihn@mail.ru",
    role: "recruiter",
  },
  status: "success",
};

export const mockResponseError = {
  error: "Недействительная ссылка для регистрации",
  status: "error",
};

export const getUserByHashMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_BY_HASH}`,
  async () =>
    // { request }
    {
      // const url = new URL(request.url);

      await delay(2000);
      return HttpResponse.json(mockResponseRecruiter);

      // const scenario = "step1";
      // const scenario = "error";

      // if (scenario === "success") {
      //   await delay(2000);
      //   return HttpResponse.json(mockStep1ResponseSuccess);
      // } else if (scenario === "error") {
      //   await delay(2000);
      //   return HttpResponse.json(mockResponseError);
      // }
    },
);
