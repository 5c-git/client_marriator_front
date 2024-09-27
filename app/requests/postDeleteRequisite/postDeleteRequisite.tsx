import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postDeleteRequisiteSuccess.schema.json";
import { PostDeleteRequisiteSuccess } from "./postDeleteRequisiteSuccess.type";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postDeleteRequisiteKeys = ["postDeleteRequisite"];

export const postDeleteRequisite = async (
  accessToken: string,
  dataId: number
) => {
  const url = new URL(import.meta.env.VITE_DELETE_REQUISITE);

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      dataId,
    }),
  });
  const response = await request.json();

  let data;

  if (request.status === 401) {
    throw new Response("Unauthorized", {
      status: 401,
    });
  }

  if (validateSuccess(response)) {
    data = response as unknown as PostDeleteRequisiteSuccess;
  } else {
    throw new Response(`Данные запроса postDeleteRequisite не валидны схеме`);
  }

  return data;
};

// MOCKS
export const mockResponseSuccess = {
  status: "success",
};
export const mockResponseError = {
  status: "error",
  error: "Ошибка",
};

export const postDeleteRequisiteMockResponse = http.post(
  `${import.meta.env.VITE_DELETE_REQUISITE}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
