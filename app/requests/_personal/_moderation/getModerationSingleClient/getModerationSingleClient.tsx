import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getModerationSingleClientSchema from "./getModerationSingleClientSuccess.schema.json";
import { GetModerationSingleClientSuccess } from "./getModerationSingleClientSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getModerationSingleClientSchema);

export const getModerationSingleClientKeys = ["getModerationSingleClient"];

export const getModerationSingleClient = async (
  accessToken: string,
  userId: number
): Promise<GetModerationSingleClientSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_MODERATION_SINGLE_CLIENT);

    url.searchParams.append("userId", userId.toString());

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

    if (validateSuccess(response)) {
      data = response as unknown as GetModerationSingleClientSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(
        `Данные запроса getModerationSingleClient не валидны схеме`
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
export const mockResponseSuccess = {
  data: {
    id: 252,
    name: "manager",
    phone: 71111111111,
    email: "manager@gmail.com",
    logo: "/storage/source/directory/brand/1-logo/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
    project: [
      {
        id: 1,
        name: "\u0414\u043e\u0433\u043e\u0432\u043e\u0440 \u043d\u0430 \u043e\u043a\u0430\u0437\u0430\u043d\u0438\u0435 \u0443\u0441\u043b\u0443\u0433 \u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430",
        brand: [
          {
            id: 1,
            name: "\u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430",
            logo: "/storage/source/directory/brand/1-logo/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
            description:
              "\u00ab\u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430\u00bb \u2014 \u043a\u0440\u0443\u043f\u043d\u0435\u0439\u0448\u0430\u044f \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u0441\u0435\u0442\u044c \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u043e\u0432 \u00ab\u0443 \u0434\u043e\u043c\u0430\u00bb \u0432 \u0420\u043e\u0441\u0441\u0438\u0438.",
          },
        ],
      },
    ],
    place: [],
    roles: [
      {
        id: 3,
        name: "manager",
      },
    ],
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
    supervisors: [],
    manager: [],
  },
};

export const mockResponseEmpty = {};

export const getModerationSingleClientMockResponse = http.get(
  `${import.meta.env.VITE_GET_MODERATION_SINGLE_CLIENT}`,
  async ({ request }) => {
    const url = new URL(request.url);

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
