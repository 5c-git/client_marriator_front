import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import { PostSaveFormSuccessInputsSchema } from "./postSaveFormSuccess.type";

import schemaSuccess from "./postSaveFormSuccess.schema.json";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postSaveFormKeys = ["postSaveForm"];

export const postSaveForm = async (
  step: number,
  formData: unknown
): Promise<PostSaveFormSuccessInputsSchema> => {
  const url = new URL(import.meta.env.VITE_SAVE_FORM);

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      step,
      formData,
    }),
  });
  const response = await request.json();

  let data: PostSaveFormSuccessInputsSchema;

  if (validateSuccess(response)) {
    data = response as PostSaveFormSuccessInputsSchema;
  } else {
    throw new Response(
      `Данные запроса saveForm, шаг - ${step} не валидны схеме`
    );
  }

  return data;
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
