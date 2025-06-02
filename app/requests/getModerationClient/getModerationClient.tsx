import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getModerationClientSchema from "./getModerationClientSuccess.schema.json";
import { GetModerationClientSuccess } from "./getModerationClientSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getModerationClientSchema);

export const getModerationClientKeys = ["getModerationClient"];

export const getModerationClient = async (
  accessToken: string,
  page: number,
  perPage: number
): Promise<GetModerationClientSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_MODERATION_CLIENT);

    url.searchParams.append("page", page.toString());
    url.searchParams.append("perPage", perPage.toString());

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
      id: 230,
      phone: 534535345353,
      email: "dfdvdfv@tt.tt",
      logo: null,
      project: [
        {
          id: 7,
          name: "Проект 2",
          brand: [],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
        {
          id: 3,
          name: "manager",
        },
      ],
    },
    {
      id: 229,
      phone: 534534534534,
      email: "sfvdfvdfvdf@tt.tt",
      logo: null,
      project: [
        {
          id: 7,
          name: "Проект 2",
          brand: [],
        },
        {
          id: 8,
          name: "Проект 1",
          brand: [],
        },
        {
          id: 9,
          name: "Проект 3",
          brand: [],
        },
      ],
      place: [
        {
          id: 2,
          name: "fdfvdvdv",
          latitude: "21.00000000",
          longitude: "11.00000000",
          address_kladr: "dvdvdvdvdv",
        },
      ],
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
  ],
  links: {
    first: "http://localhost/api/personal/getModerationClient?page=1",
    last: null,
    prev: "http://localhost/api/personal/getModerationClient?page=1",
    next: null,
  },
  meta: {
    current_page: 2,
    from: 3,
    path: "http://localhost/api/personal/getModerationClient",
    per_page: 2,
    to: 4,
  },
};

export const mockResponseError = {};

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
