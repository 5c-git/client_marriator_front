import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import successSchema from "./getSupervisorsSuccess.schema.json";
import type { GetSupervisorsSuccess } from "./getSupervisorsSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(successSchema);

export const getSupervisorsKeys = ["getSupervisors"];

export const getSupervisors = async (
  accessToken: string,
  userId: number
): Promise<GetSupervisorsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_SUPERVISORS);

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
      data = response as unknown as GetSupervisorsSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getSupervisors не валидны схеме`);
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
      id: 2,
      phone: 79152142630,
      email: "testk@mail.ru",
      logo: "/storage/source/userImg/2/i1UCPw4mjAmZd0ZCEhDt.jpeg",
      roles: [
        {
          id: 3,
          name: "manager",
        },
        {
          id: 5,
          name: "specialist",
        },
        {
          id: 6,
          name: "supervisor",
        },
      ],
    },
    {
      id: 229,
      phone: 534534534534,
      email: "sfvdfvdfvdf@tt.tt",
      logo: null,
      roles: [
        {
          id: 2,
          name: "client",
        },
        {
          id: 3,
          name: "manager",
        },
        {
          id: 4,
          name: "recruiter",
        },
        {
          id: 5,
          name: "specialist",
        },
        {
          id: 6,
          name: "supervisor",
        },
      ],
    },
    {
      id: 232,
      phone: 534535345351,
      email: "dfdvdfff@tt.tt",
      logo: null,
      roles: [
        {
          id: 5,
          name: "specialist",
        },
        {
          id: 6,
          name: "supervisor",
        },
      ],
    },
    {
      id: 234,
      phone: 53453544345351,
      email: "dfdfvvdfff@tt.tt",
      logo: null,
      roles: [
        {
          id: 4,
          name: "recruiter",
        },
        {
          id: 5,
          name: "specialist",
        },
        {
          id: 6,
          name: "supervisor",
        },
      ],
    },
  ],
};

export const mockResponseEmpty = {};

export const getSupervisorsMockResponse = http.get(
  `${import.meta.env.VITE_GET_SUPERVISORS}`,
  async ({ request }) => {
    const url = new URL(request.url);

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
