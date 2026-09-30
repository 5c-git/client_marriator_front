import { http, delay, HttpResponse } from "msw";

import {
  GetFormActivitiesSuccess,
  getFormActivitiesSuccessSchema,
} from "./getFormActivities.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getFormActivitiesKeys = ["getFormActivities"];

export const getFormActivities = async (
  accessToken: string,
  step: number,
): Promise<GetFormActivitiesSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_FORM_ACTIVITIES);

    url.searchParams.append("step", step.toString());

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = getFormActivitiesSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса getFormActitvities, шаг - ${step} не валидны схеме`,
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
export const mockStep1ResponseSuccess = {
  result: {
    formData: [
      {
        inputType: "photoCheckbox",
        name: "testitem",
        value: [],
        disabled: false,
        options: [
          {
            value: "directory_activities1",
            label: "Строитель",
            disabled: false,
            img: "/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities2",
            label: "Продавец",
            disabled: false,
            img: "/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
        ],
        validation: "default",
        dividerTop: true,
      },
    ],
    step: 1,
    type: "needRequired",
  },
  status: "success",
};

export const mockStep2ResponseSuccess = {
  result: {
    formData: [
      {
        inputType: "checkbox",
        name: "nalogstatus",
        value: false,
        label: "Налоговый статус",
        disabled: false,
        validation: "checked",
      },
      {
        inputType: "checkbox",
        name: "gov",
        value: false,
        label: "Гражданство",
        disabled: false,
        validation: "checked",
      },
      {
        inputType: "text",
        name: "vnj_vrp",
        value: "",
        disabled: false,
        validation: "none",
        placeholder: "",
      },
    ],
    step: 2,
    type: "needRequired",
  },
  status: "success",
};

export const mockResponseError = {};

export const getFormActivitiesMockResponse = http.get(
  `${import.meta.env.VITE_GET_FORM_ACTIVITIES}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const step = url.searchParams.get("step");

    if (step === "1") {
      await delay(2000);
      return HttpResponse.json(mockStep1ResponseSuccess);
    } else if (step === "2") {
      await delay(2000);
      return HttpResponse.json(mockStep2ResponseSuccess);
    }

    // const scenario = "step1";
    // const scenario = "error";

    // if (scenario === "success") {
    //   await delay(2000);
    //   return HttpResponse.json(mockStep1ResponseSuccess);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  },
);
