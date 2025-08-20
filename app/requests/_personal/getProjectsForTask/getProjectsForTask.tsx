import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getProjectsForTaskSuccess from "./getProjectsForTaskSuccess.schema.json";
import { GetProjectsForTaskSuccess } from "./getProjectsForTaskSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getProjectsForTaskSuccess);

export const getProjectsForTaskKeys = ["getProjectsForTask"];

export const getProjectsForTask = async (
  accessToken: string,
  placeId: string
): Promise<GetProjectsForTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_PROJECTS_FOR_TASK);

    url.searchParams.append("placeId", placeId);

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
      data = response as unknown as GetProjectsForTaskSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getProjectsForTask не валидны схеме`);
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
  data: [
    {
      id: 1,
      name: "\u0414\u043e\u0433\u043e\u0432\u043e\u0440 \u043d\u0430 \u043e\u043a\u0430\u0437\u0430\u043d\u0438\u0435 \u0443\u0441\u043b\u0443\u0433 \u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430",
      brand: [
        {
          id: 1,
          name: "\u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430",
          logo: "\/storage\/source\/directory\/brand\/1-logo\/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
          description:
            "\u00ab\u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430\u00bb \u2014 \u043a\u0440\u0443\u043f\u043d\u0435\u0439\u0448\u0430\u044f \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u0441\u0435\u0442\u044c \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u043e\u0432 \u00ab\u0443 \u0434\u043e\u043c\u0430\u00bb \u0432 \u0420\u043e\u0441\u0441\u0438\u0438.",
        },
      ],
    },
  ],
};

export const mockResponseError = {};

export const getProjectsForTaskMockResponse = http.get(
  `${import.meta.env.VITE_GET_PROJECTS_FOR_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
