import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postSaveUserFieldsActivitiesSuccess.schema.json";

import { PostSaveUserFieldsActivitiesSuccess } from "./postSaveUserFieldsActivitiesSuccess.type";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postSaveUserFieldsActivitiesKeys = [
  "postSaveUserFieldsActivities",
];

export const postSaveUserFieldsActivities = async (
  accessToken: string,
  step: number,
  formData: unknown
): Promise<PostSaveUserFieldsActivitiesSuccess> => {
  const url = new URL(import.meta.env.VITE_SAVE_USER_FIELDS_ACTIVITIES);

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

  let data: PostSaveUserFieldsActivitiesSuccess;

  if (request.status === 401) {
    throw new Response("Unauthorized", {
      status: 401,
    });
  }

  if (validateSuccess(response)) {
    data = response as unknown as PostSaveUserFieldsActivitiesSuccess;
  } else {
    throw new Response(
      `Данные запроса postSaveUserFieldsActivities, шаг - ${step} не валидны схеме`
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

export const postSaveUserFieldsActivitiesMockResponse = http.post(
  `${import.meta.env.VITE_SAVE_USER_FIELDS_ACTIVITIES}`,
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
