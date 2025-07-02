import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import GetProjectSuccessSchema from "./GetProjectSuccess.schema.json";
import { GetProjectSuccess } from "./getProjectSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(GetProjectSuccessSchema);

export const getProjectKeys = ["getProject"];

export const getProject = async (
  accessToken: string,
  userId: number
): Promise<GetProjectSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_PROJECT);

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
      data = response as unknown as GetProjectSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getProject не валидны схеме`);
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
      id: 7,
      name: "Проект 2",
      brand: [
        {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      ],
    },
    {
      id: 8,
      name: "Проект 1",
      brand: [
        {
          id: 4,
          name: "чамавмвамва",
          logo: null,
          description: "мвамвмвмвм",
        },
      ],
    },
    {
      id: 9,
      name: "Проект 3",
      brand: [
        {
          id: 3,
          name: "sdvsvsvs",
          logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
          description: "vsvsfvfvdvdvdvfdv",
        },
      ],
    },
    {
      id: 10,
      name: "Бренд new",
      brand: [
        {
          id: 2,
          name: "vfdv",
          logo: null,
          description: "dvdvdvdv",
        },
      ],
    },
    {
      id: 11,
      name: "Проект 2 new",
      brand: [
        {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      ],
    },
  ],
};

export const mockResponseError = {
  message: "The selected user id is invalid.",
  errors: {
    userId: ["The selected user id is invalid."],
  },
};

export const getProjectMockResponse = http.get(
  `${import.meta.env.VITE_GET_PROJECT}`,
  async ({ request }) => {
    const url = new URL(request.url);

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
