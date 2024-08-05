import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getUserPersonalMenuSchema from "./getUserPersonalMenu.schema.json";
import { GetUserPersonalMenuSuccess } from "./getUserPersonalMenu.type";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getUserPersonalMenuSchema);

export const getUserPersonalMenuKeys = ["getUserPersonalMenu"];

export const getUserPersonalMenu = async (
  accessToken: string
): Promise<GetUserPersonalMenuSuccess> => {
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
};

// MOCKS
export const mockResponseSuccess = {
  status: "success",
  result: {
    section: [],
  },
};

export const getUserPersonalMenuMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
