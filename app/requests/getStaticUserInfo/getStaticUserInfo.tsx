import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
// import addFormats from "ajv-formats";

import getStaticUserInfoSuccess from "./getStaticUserInfo.schema.json";
import { GetStaticUserInfoSuccess } from "./getStaticUserInfo.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
// addFormats(ajv);

const validateSuccess = ajv.compile(getStaticUserInfoSuccess);

export const getStaticUserInfoKeys = ["getStaticUserInfo"];

export const getStaticUserInfo = async (
  accessToken: string
): Promise<GetStaticUserInfoSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_STATIC_USER_INFO);

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
      data = response as unknown as GetStaticUserInfoSuccess;
    } else {
      console.log(console.log(validateSuccess.errors));
      throw new Response(`Данные запроса getStaticUserInfo не валидны схеме`);
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
  result: {
    userData: {
      email: "yastrebsov@gmail.com",
      img: "",
    },
  },
  status: "success",
};

export const mockResponseError = {};

export const getStaticUserInfoMockResponse = http.get(
  `${import.meta.env.VITE_GET_STATIC_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
