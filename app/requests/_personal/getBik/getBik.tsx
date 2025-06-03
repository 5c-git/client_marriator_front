import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getBikSuccess from "./getBikSuccess.schema.json";
import { GetBikSuccess } from "./gitBikSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getBikSuccess);

export const getBikKeys = ["getBik"];

export const getBik = async (accessToken: string): Promise<GetBikSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_BIK);

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
      data = response as unknown as GetBikSuccess;
    } else {
      throw new Response(`Данные запроса getBik не валидны схеме`);
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
    bankData: [
      {
        value: "044535974",
        bic: "044535974",
        label: "НЕПРАВИЛЬНЫЙ БИК-TEST",
        disabled: false,
      },
      {
        value: "044525974",
        label: "ТИНЬКОФФ-TEST",
        disabled: false,
      },
      {
        value: "044525225",
        label: "СБЕРБАНК-TEST",
        disabled: false,
      },
      {
        value: "044525600",
        label: "МИНБАНК-TEST",
        disabled: false,
      },
    ],
  },
  status: "success",
};

export const mockResponseError = {};

export const getBikMockResponse = http.get(
  `${import.meta.env.VITE_GET_BIK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
