import { http, delay, HttpResponse } from "msw";
// import Ajv from "ajv";

// import getUserInfoSuccess from "./getUserInfo.schema.json";
// import { GetUserInfoSuccess } from "./getUserInfo.type";

// const ajv = new Ajv();

// const validateSuccess = ajv.compile(getUserInfoSuccess);

export const getUserInfoKeys = ["getUserInfo"];

export const getUserInfo = async (accessToken: string): Promise<unknown> => {
  const url = new URL(import.meta.env.VITE_GET_USER_INFO);

  const request = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const response = await request.json();

  // let data;

  if (request.status === 401) {
    throw new Response("Unauthorized", {
      status: 401,
    });
  }

  // if (validateSuccess(response)) {
  //   data = response as unknown as GetUserInfoSuccess;
  // } else {
  //   console.log(validateSuccess.errors);
  //   throw new Response(`Данные запроса getUserInfo не валидны схеме`);
  // }

  // return data;
  return response;
};

// MOCKS
export const mockResponseSuccess = {};

export const mockResponseError = {};

export const getUserInfoMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
