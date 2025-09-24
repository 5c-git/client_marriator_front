import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getRadiusSelectSuccess from "./getRadiusSelectSuccess.schema.json";
import { GetRadiusSelectSuccess } from "./getRadiusSelectSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getRadiusSelectSuccess);

export const getRadiusSelectKeys = ["getRadiusSelect"];

export const getRadiusSelect = async (
  accessToken: string
): Promise<GetRadiusSelectSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_RADIUS_SELECT);

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
      data = response as unknown as GetRadiusSelectSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getRadiusSelect не валидны схеме`);
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
export const mockResponseSuccess: GetRadiusSelectSuccess = {
  data: [
    {
      id: 1,
      value: 10,
      default: true,
    },
    {
      id: 2,
      value: 20,
      default: false,
    },
  ],
};

export const mockResponseError = {};

export const getRadiusSelectMockResponse = http.get(
  `${import.meta.env.VITE_GET_RADIUS_SELECT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
