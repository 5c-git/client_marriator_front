import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getUserPersonalMenuSchema from "./getUserPersonalMenu.schema.json";
import { GetUserPersonalMenuSuccess } from "./getUserPersonalMenu.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getUserPersonalMenuSchema);

export const getUserPersonalMenuKeys = ["getUserPersonalMenu"];

export const getUserPersonalMenu = async (
  accessToken: string
): Promise<GetUserPersonalMenuSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_USER_PERSONAL_MENU);

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

    if (validateSuccess(response)) {
      data = response as unknown as GetUserPersonalMenuSuccess;
    } else {
      throw new Response(`Данные запроса getUserPersonalMenu не валидны схеме`);
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
    section: [
      {
        name: "\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435",
        value: 1,
        notification: false,
      },
      {
        name: "\u0414\u043e\u043f\u0443\u0441\u043a\u0438, \u0441\u043f\u0440\u0430\u0432\u043a\u0438, \u0443\u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u0435\u043d\u0438\u044f",
        value: 2,
        notification: false,
      },
      {
        name: "\u0420\u0430\u0434\u0438\u0443\u0441 \u043f\u043e\u0438\u0441\u043a\u0430 \u0440\u0430\u0431\u043e\u0442\u044b",
        value: 3,
        notification: false,
      },
      {
        name: "\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b \u0438\u043d\u043e\u0441\u0442\u0440\u0430\u043d\u043d\u043e\u0433\u043e \u0433\u0440\u0430\u0436\u0434\u0430\u043d\u0438\u043d\u0430",
        value: 4,
        notification: false,
      },
    ],
  },
  status: "success",
};

export const getUserPersonalMenuMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
