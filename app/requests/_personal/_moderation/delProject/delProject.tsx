import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import delProjectSuccess from "./delProjectSuccess.schema.json";
import { PostDelPlaceSuccess } from "~/requests/postDelPlace/postDelPlaceSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(delProjectSuccess);

export const delProjectKeys = ["delProject"];

export const postDelProject = async (
  accessToken: string,
  userId: string,
  projectId: string
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DEL_PROJECT);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("projectId", projectId);

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
      data = response as unknown as PostDelPlaceSuccess;
    } else {
      throw new Response(`Данные запроса postDelProject не валидны схеме`);
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
    id: 235,
    name: null,
    phone: 34234,
    email: "fvdfvdf@tt.tt",
    logo: null,
    project: [
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
    ],
    place: [],
    roles: [
      {
        id: 2,
        name: "client",
      },
    ],
  },
};
export const mockResponseError = {};

export const postDelProjectMockResponse = http.post(
  `${import.meta.env.VITE_POST_DEL_PROJECT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
