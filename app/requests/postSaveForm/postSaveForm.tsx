import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import { PostSaveFormInputsSchema } from "./postSaveForm.type";

import schema from "./postSaveForm.schema.json";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schema);

export const postSaveFormKeys = ["postSaveForm"];

export const postSaveForm = async (
  step: number,
  formData: unknown
): Promise<PostSaveFormInputsSchema> => {
  const url = new URL(import.meta.env.VITE_SAVE_FORM);

  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      step,
      formData,
    }),
  });
  const response = await request.json();

  let data: PostSaveFormInputsSchema;

  if (validateSuccess(response)) {
    data = response as PostSaveFormInputsSchema;
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
