import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import schemaSuccess from "./success.schema.json";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(schemaSuccess);

export const postRegStep2Keys = ["postRegStep2"];

type RegStep2 = {
  status: string;
};

// unknown из-за того, что мы не знаем какие пол нам прилетят с сервера и какую форму мы в итоге отдадим обратно
export const postRegStep2 = async (body: unknown): Promise<RegStep2> => {
  const url = new URL(import.meta.env.VITE_REG_STEP_2);

  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const response = await request.json();

  let data: RegStep2;

  if (validateSuccess(response)) {
    data = response as RegStep2;
  } else {
    throw new Response("Данные запроса postRegStep2 не валидны схеме");
  }

  return data;
};

// MOCKS
export const mockResponseSuccess = {
  status: "Success",
};
export const mockResponseError = {
  inputs: [],
};

export const postRegStep2MockResponse = http.post(
  `${import.meta.env.VITE_REG_STEP_2}`,
  async () => {
    const scenario = "success";
    // const scenario = "error";

    if (scenario === "success") {
      await delay(2000);
      return HttpResponse.json(mockResponseSuccess);
    } else if (scenario === "error") {
      await delay(2000);
      return HttpResponse.json(mockResponseError);
    }
  }
);
