import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postSetProjectSuccess from "./postSetProjectSuccess.schema.json";
import { PostSetProjectSuccess } from "./postSetProjectSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postSetProjectSuccess);

export const postSetProjectKeys = ["postSetProject"];

export const postSetProject = async (
  accessToken: string,
  userId: string,
  projects: string[]
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SET_PROJECT);

    const formData = new FormData();

    formData.append("userId", userId);

    projects.forEach((project, index) => {
      formData.append(`projectId[${index}]`, project);
    });

    const request = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostSetProjectSuccess;
    } else {
      throw new Response(`Данные запроса postSetProject не валидны схеме`);
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
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postSetProjectMockResponse = http.post(
  `${import.meta.env.VITE_POST_SET_PROJECT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
