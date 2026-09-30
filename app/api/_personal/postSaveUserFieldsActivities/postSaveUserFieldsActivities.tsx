import { http, delay, HttpResponse } from "msw";

import {
  postSaveUserFieldsActivitiesSuccessSchema,
  PostSaveUserFieldsActivitiesSuccess,
} from "./postSaveUserFieldsActivitiesSuccess.schema";
// import { postSaveUserFieldsActivitiesErrorSchema } from "./postSaveUserFieldsActivitiesError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSaveUserFieldsActivitiesKeys = [
  "postSaveUserFieldsActivities",
];

export const postSaveUserFieldsActivities = async (
  accessToken: string,
  step: number,
  formData: unknown,
): Promise<PostSaveUserFieldsActivitiesSuccess> => {
  try {
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

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed =
      postSaveUserFieldsActivitiesSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postSaveUserFieldsActivities, шаг - ${step} не валидны схеме`,
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
  },
);
