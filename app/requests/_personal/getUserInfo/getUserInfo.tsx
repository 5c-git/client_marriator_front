import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getUserInfoSuccess from "./getUserInfo.schema.json";
import { GetUserInfoSuccess } from "./getUserInfo.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getUserInfoSuccess);

export const getUserInfoKeys = ["getUserInfo"];

export const getUserInfo = async (
  accessToken: string
): Promise<GetUserInfoSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_USER_INFO);

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
      data = response as unknown as GetUserInfoSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getUserInfo не валидны схеме`);
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
export const mockResponseSuccess = {};

export const mockResponseSuccessManager = {
  result: {
    userData: {
      // id: 286,
      id: 253,
      name: "\u041f\u041c\u0447\u0438\u043a",
      email: "manager@test.ru",
      email_verified_at: null,
      created_at: "2025-07-04T10:24:18.000000Z",
      updated_at: "2025-07-04T10:42:49.000000Z",
      api_token: null,
      phone: 76665554433,
      data: null,
      img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/1-logo/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
      confirmRegister: 1,
      pin: 1111,
      finishRegister: 1,
      expansionData: "[]",
      errorData: "[]",
      estateData: null,
      requisitesData: null,
      mapAddress: "",
      mapRadius: "",
      updateData: null,
      uuid: "6867ac3030e78",
      register_hash: null,
      change_order: null,
      cancel_order: null,
      live_order: null,
      change_task: null,
      cancel_task: null,
      live_task: null,
      repeat_bid: null,
      leave_bid: null,
      refusal_task: null,
      waiting_task: null,
      latitude: null,
      longitude: null,
      count_wait_bid: null,
      time_answer_bid: null,
      notification_start: null,
      roles: [
        {
          id: 3,
          name: "client",
        },
      ],
    },
  },
  status: "success",
};

export const mockResponseError = {};

export const getUserInfoMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccessManager);
  }
);
