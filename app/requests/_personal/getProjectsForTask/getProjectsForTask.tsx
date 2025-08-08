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
      name: "Шестёрочка",
      latitude: "24.00000000",
      longitude: "42.00000000",
      address_kladr: "вмвмвмв",
      logo: null,
      region: {
        id: 1,
        name: "Татарстан Респ",
      },
      brand: {
        id: 2,
        name: "vfdv",
        logo: null,
        description: "dvdvdvdv",
      },
    },
    {
      id: 2,
      name: "Семёрочка",
      latitude: "42.00000000",
      longitude: "24.00000000",
      address_kladr: "вмвмвмв",
      logo: null,
      region: {
        id: 1,
        name: "Татарстан Респ",
      },
      brand: {
        id: 2,
        name: "vfdv",
        logo: null,
        description: "dvdvdvdv",
      },
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
