import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getOrderSuccess from "./getOrderSuccess.schema.json";
import { GetOrderSuccess } from "./getOrderSuccess.type";
import getOrderError from "./getOrderError.schema.json";
import { GetOrderError } from "./getOrderError.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getOrderSuccess);
const validateError = ajv.compile(getOrderError);

export const getOrderKeys = ["getOrder"];

export const getOrder = async (
  accessToken: string,
  orderId: string
): Promise<GetOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_ORDER);

    url.searchParams.append("orderId", orderId);

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
      data = response as unknown as GetOrderSuccess;
    }
    // else if (validateError(response)) {
    //   data = response as unknown as GetOrderError;
    // }
    else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getOrder не валидны схеме`);
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
    id: 25,
    selfEmployed: true,
    status: 1,
    place: {
      id: 1,
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
    user: {
      id: 1,
      phone: 79152142639,
      email: "ilyaDevmarriator@gmail.com",
      logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
    },
    orderActivities: [
      {
        viewActivity: {
          name: "Продавец",
          detailName: "Продавец",
          previewText:
            "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
          logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        },
        id: 44,
        count: 5,
        dateStart: "2025-05-25T09:00:00.000000Z",
        dateEnd: "2025-05-25T18:00:00.000000Z",
        needFoto: true,
        dateActivity: [
          {
            timeStart: "2025-05-25 09:00",
            timeEnd: "2025-05-25 12:00",
            places: [
              {
                id: 1,
                name: "вамвамвмвм",
                latitude: "24.00000000",
                longitude: "42.00000000",
                address_kladr: "вмвмвмв",
                logo: null,
                region: {
                  id: 1,
                  name: "Татарстан Респ",
                },
                brand: {
                  id: 2,
                  name: "vfdv",
                  logo: null,
                  description: "dvdvdvdv",
                },
              },
              {
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
                  description:
                    "аммвамвмвам вам вам вм вм в мва мвамвм вмвмвмвм вмвм",
                },
              },
            ],
          },
          {
            timeStart: "2025-05-25 14:00",
            timeEnd: "2025-05-25 18:00",
            places: [
              {
                id: 1,
                name: "вамвамвмвм",
                latitude: "24.00000000",
                longitude: "42.00000000",
                address_kladr: "вмвмвмв",
                logo: null,
                region: {
                  id: 1,
                  name: "Татарстан Респ",
                },
                brand: {
                  id: 2,
                  name: "vfdv",
                  logo: null,
                  description: "dvdvdvdv",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export const mockResponseError = {
  message: "The selected order id is invalid.",
  errors: {
    orderId: ["The selected order id is invalid."],
  },
};

export const getOrderMockResponse = http.get(
  `${import.meta.env.VITE_GET_ORDER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
