import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import { PostSaveFormSuccessInputsSchema } from "./postSaveFormSuccess.type";

import schemaSuccess from "./postSaveFormSuccess.schema.json";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postSaveFormKeys = ["postSaveForm"];

export const postSaveForm = async (
  accessToken: string,
  step: number,
  formData: unknown
): Promise<PostSaveFormSuccessInputsSchema> => {
  try {
    const url = new URL(import.meta.env.VITE_SAVE_FORM);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        step,
        formData,
      }),
    });
    const response = await request.json();

    let data: PostSaveFormSuccessInputsSchema;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostSaveFormSuccessInputsSchema;
    } else {
      throw new Response(
        `Данные запроса saveForm, шаг - ${step} не валидны схеме`
      );
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
export const mockResponseNeedRequired = {
  result: {
    step: 1,
    type: "needRequired",
  },
  status: "success",
};
export const mockResponseAllowedNewStep = {
  result: {
    step: 1,
    type: "allowedNewStep",
  },
  status: "success",
};

export const postSaveFormMockResponse = http.post(
  `${import.meta.env.VITE_SAVE_FORM}`,
  async () => {
    // const scenario = "success";
    // const scenario = "error";

    // if (scenario === "success") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseSuccess);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }

    await delay(2000);
    return HttpResponse.json(mockResponseAllowedNewStep);
  }
);
