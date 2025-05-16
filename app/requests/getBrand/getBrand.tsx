import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getBrandSuccess from "./getBrandSuccess.schema.json";
import { GetBrandSuccess } from "./getBrandSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getBrandSuccess);

export const getBrandKeys = ["getBrand"];

export const getBrand = async (
  accessToken: string,
  userId: string,
  confirm: string
): Promise<GetBrandSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_BRAND);

    url.searchParams.append("userId", userId);
    url.searchParams.append("confirm", confirm);

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
      data = response as unknown as GetBrandSuccess;
    } else {
      throw new Response(`Данные запроса getBrand не валидны схеме`);
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
      name: "vfdv",
      logo: null,
      description: "dvdvdvdv",
    },
    {
      id: 3,
      name: "sdvsvsvs",
      logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
      description: "vsvsfvfvdvdvdvfdv",
    },
    {
      id: 1,
      name: "бренд 1",
      logo: null,
      description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
    },
  ],
};

export const mockResponseError = {};

export const getBrandMockResponse = http.get(
  `${import.meta.env.VITE_GET_BRAND}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
