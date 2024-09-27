import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postSetMapFieldSuccess from "./postSetMapFieldSuccess.schema.json";
import { PostSetMapFieldSuccess } from "./postSetMapFieldSuccess.type";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postSetMapFieldSuccess);

export const postSetMapFieldKeys = ["postSetMapField"];

export const postSetMapField = async (
  accessToken: string,
  mapAddress: string,
  coordinates: string,
  mapRadius: string
): Promise<PostSetMapFieldSuccess> => {
  const url = new URL(import.meta.env.VITE_POST_MAP_FIELD);

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      mapAddress,
      coordinates,
      mapRadius,
    }),
  });
  const response = await request.json();

  let data;

  if (request.status === 401 || request.status === 403) {
    throw new Response("Unauthorized", {
      status: 401,
    });
  }

  if (validateSuccess(response)) {
    data = response as unknown as PostSetMapFieldSuccess;
  } else {
    throw new Response(`Данные запроса postSetMapField не валидны схеме`);
  }

  return data;
};

// MOCKS
export const mockResponseSuccess = {
  status: "success",
  result: {
    mapAddress: "Россия, Москва, парк Зарядье",
    mapRadius: "2",
    coordinates: "37.627939 55.751188",
  },
};

export const mockResponseError = {};

export const postSetMapFieldMockResponse = http.get(
  import.meta.env.VITE_POST_MAP_FIELD,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
