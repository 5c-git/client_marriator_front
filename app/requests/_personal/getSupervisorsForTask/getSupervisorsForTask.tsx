import { http, delay, HttpResponse } from "msw";

import {
  getSupervisorsForTaskSuccessSchema,
  GetSupervisorsForTaskSuccess,
} from "./getSupervisorsForTaskSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getSupervisorsForTaskKeys = ["getSupervisorsForTask"];

export const getSupervisorsForTask = async (
  accessToken: string,
  taskId: string,
): Promise<GetSupervisorsForTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_SUPERVISORS_FOR_TASK);

    url.searchParams.append("taskId", taskId);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
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

    const parsed = getSupervisorsForTaskSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса getSupervisorsForTask не валидны схеме`,
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

export const mockResponseError = {};

export const getSupervisorsForTaskMockResponse = http.get(
  `${import.meta.env.VITE_GET_SUPERVISORS_FOR_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
