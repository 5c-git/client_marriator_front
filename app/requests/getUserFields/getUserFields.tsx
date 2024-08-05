import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getUserFieldsSchema from "./getUserFields.schema.json";
import { GetUserFieldsSuccess } from "./getUserFields.type";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getUserFieldsSchema);

export const getUserFieldsKeys = ["getUserFields"];

export const getUserFields = async (
  accessToken: string,
  section: number
): Promise<GetUserFieldsSuccess> => {
  const url = new URL(import.meta.env.VITE_GET_USER_FIELDS);

  url.searchParams.append("section", section.toString());

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
    data = response as unknown as GetUserFieldsSuccess;
  } else {
    throw new Response(`Данные запроса getUserFields не валидны схеме`);
  }

  return data;
};

// MOCKS
export const mockResponseSuccess = {
  status: "success",
  result: {
    formData: [],
    section: [],
    type: "allowedNewStep",
  },
};

export const getUserFieldsMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_FIELDS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
