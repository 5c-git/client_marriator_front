import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getMapFieldSuccess from "./getMapFieldSuccess.schema.json";
import { GetMapFieldSuccess } from "./getMapFieldSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getMapFieldSuccess);

export const getMapFieldKeys = ["getMapField"];

export const getMapField = async (
  accessToken: string
): Promise<GetMapFieldSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_MAP_FIELD);

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
      data = response as unknown as GetMapFieldSuccess;
    } else {
      throw new Response(`Данные запроса getMapField не валидны схеме`);
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
    mapAddress:
      "Россия, Московская область, Павловский Посад, Красноармейская улица, 32",
    mapRadius: "1",
    coordinates: "38.638562 55.77913",
  },
  status: "success",
};

export const mockResponseError = {};

export const getMapFieldMockResponse = http.get(
  import.meta.env.VITE_GET_MAP_FIELD,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
