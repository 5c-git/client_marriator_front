import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getBikSuccess from "./getBikSuccess.schema.json";
import { GetBikSuccess } from "./gitBikSuccess.type";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getBikSuccess);

export const getBikKeys = ["getBik"];

export const getBik = async (accessToken: string): Promise<GetBikSuccess> => {
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
};

// MOCKS
export const mockResponseSuccess = {
  result: {
    bankData: [
      {
        value: "044535974",
        bic: "044535974",
        label: "Неверный БИК",
        disabled: false,
      },
      {
        value: "044525974",
        bic: "044525974",
        label: "ТИНЬКОФФ",
        disabled: false,
      },
      {
        value: "044525225",
        bic: "044525225",
        label: "СБЕРБАНК",
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
