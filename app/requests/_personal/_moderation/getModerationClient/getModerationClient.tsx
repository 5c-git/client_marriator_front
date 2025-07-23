import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getModerationClientSchema from "./getModerationClientSuccess.schema.json";
import { GetModerationClientSuccess } from "./getModerationClientSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getModerationClientSchema);

const sortMap = {
  new: 1,
  old: 2,
};

const statusMap = {
  new: 1,
};

const roleMap = {
  admin: "1",
  client: "2",
  manager: "3",
  recruiter: "4",
  specialist: "5",
  supervisor: "6",
};

export const getModerationClientKeys = ["getModerationClient"];

export const getModerationClient = async (
  accessToken: string,
  perPage: number,
  role:
    | "admin"
    | "client"
    | "manager"
    | "recruiter"
    | "specialist"
    | "supervisor",
  page: string | null,

  status: string | null,
  sort: string | null,
  search: string | null
): Promise<GetModerationClientSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_MODERATION_CLIENT);

    if (page) {
      url.searchParams.append("page", page);
    } else {
      url.searchParams.append("page", "1");
    }

    if (status) {
      url.searchParams.append("status", status);
    }
    if (sort) {
      url.searchParams.append("sort", sort);
    }
    if (search) {
      url.searchParams.append("search", search);
    }

    url.searchParams.append("perPage", perPage.toString());

    url.searchParams.append("role", roleMap[role]);

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
      data = response as unknown as GetModerationClientSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getModerationClient не валидны схеме`);
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
      id: 253,
      name: "client",
      phone: 72222222222,
      email: "client@gmail.com",
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
          id: 2,
          name: "client",
        },
      ],
      change_order: "23:59",
      cancel_order: "23:59",
      live_order: "23:59",
      change_task: "23:59",
      cancel_task: "23:59",
      live_task: "23:59",
      repeat_bid: "23:59",
      leave_bid: "04:00",
      refusal_task: "23:59",
      waiting_task: "60",
      count_wait_bid: "1",
      time_answer_bid: "24",
      notification_start: "60",
      supervisors: [],
      manager: [],
      counterparty: [],
    },
  ],
  links: {
    first:
      "http://preprod.marriator-api.fivecorners.ru/api/personal/moderation/getModerationClient?page=1",
    last: null,
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    path: "http://preprod.marriator-api.fivecorners.ru/api/personal/moderation/getModerationClient",
    per_page: 100,
    to: 1,
  },
};

export const mockResponseSuccessShort = {};

export const mockResponseEmpty = {
  data: [],
  links: {
    first: "http://localhost/api/personal/getModerationClient?page=1",
    last: null,
    prev: "http://localhost/api/personal/getModerationClient?page=29",
    next: null,
  },
  meta: {
    current_page: 30,
    from: null,
    path: "http://localhost/api/personal/getModerationClient",
    per_page: 2,
    to: null,
  },
};

export const getModerationClientMockResponse = http.get(
  `${import.meta.env.VITE_GET_MODERATION_CLIENT}`,
  async ({ request }) => {
    const url = new URL(request.url);

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);

    // const scenario = "step1";
    // const scenario = "error";

    // if (scenario === "success") {
    //   await delay(2000);
    //   return HttpResponse.json(mockStep1ResponseSuccess);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  }
);
