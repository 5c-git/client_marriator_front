import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getOrdersSuccess from "./getOrdersSuccess.schema.json";
import { GetOrdersSuccess } from "./getOrdersSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getOrdersSuccess);

export const getOrdersKeys = ["getOrders"];

export const getOrders = async (
  accessToken: string,
  status?: string
): Promise<GetOrdersSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_ORDERS);

    if (status) {
      url.searchParams.append("status", status);
    }

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

    if (validateSuccess(response)) {
      data = response as unknown as GetOrdersSuccess;
    }
    // else if (validateError(response)) {
    //   data = response as unknown as GetOrderError;
    // }
    else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getOrders не валидны схеме`);
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
      id: 1,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 1,
    },
    {
      id: 2,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 2,
    },
    {
      id: 3,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 2,
    },
    {
      id: 4,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 2,
    },
    {
      id: 5,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 2,
    },
    {
      id: 6,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 2,
    },
    {
      id: 7,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 3,
    },
    {
      id: 8,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 3,
    },
    {
      id: 9,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 4,
    },
    {
      id: 10,
      place: {
        id: 2,
        name: "fdfvdvdv",
        latitude: "21.00000000",
        longitude: "11.00000000",
        address_kladr: "dvdvdvdvdv",
        logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 1,
          name: "бренд 1",
          logo: "/storage/source/directory/brand/1-logo/achievement-1.png",
          description: "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
        },
      },
      selfEmployed: false,
      status: 4,
    },
  ],
  links: {
    first: "http://localhost/api/personal/getOrders?page=1",
    last: null,
    prev: null,
    next: "http://localhost/api/personal/getOrders?page=2",
  },
  meta: {
    current_page: 1,
    from: 1,
    path: "http://localhost/api/personal/getOrders",
    per_page: 10,
    to: 10,
  },
};

export const mockResponseSuccessEmpty = {
  data: [],
};

export const mockResponseError = {};

export const getOrdersMockResponse = http.get(
  `${import.meta.env.VITE_GET_ORDERS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
