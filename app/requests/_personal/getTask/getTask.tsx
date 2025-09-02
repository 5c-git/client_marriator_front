import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getTaskSuccess from "./getTaskSuccess.schema.json";
import { GetTaskSuccess } from "./getTaskSuccess.type";
// import getTaskError from "./getTaskError.schema.json";
// import { GetTaskError } from "./getTaskError.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getTaskSuccess);
// const validateError = ajv.compile(getTaskError);

export const getTaskKeys = ["getTask"];

export const getTask = async (
  accessToken: string,
  taskId: string
): Promise<GetTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_TASK);

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

    if (validateSuccess(response)) {
      data = response as unknown as GetTaskSuccess;
    }
    // else if (validateError(response)) {
    //   data = response as unknown as GetTaskError;
    // }
    else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getTask не валидны схеме`);
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
    id: 32,
    selfEmployed: false,
    status: 1,
    place: {
      id: 3,
      name: "Пятёрочка МСК ул. Арбат д. 24",
      latitude: "55.00000000",
      longitude: "37.00000000",
      address_kladr: "ул. Арбат д. 24  г.Москва",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      region: {
        id: 2,
        name: "Москва",
      },
      brand: {
        id: 1,
        name: "Пятёрочка",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        description:
          "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
      },
    },
    project: {
      id: 1,
      name: "Договор на оказание услуг Пятёрочка",
      brand: [
        {
          id: 1,
          name: "Пятёрочка",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          description:
            "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
        },
      ],
    },
    user: {
      id: 391,
      phone: 79887951717,
      email: "manager@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      roles: [
        {
          id: 3,
          name: "manager",
        },
        {
          id: 1,
          name: "admin",
        },
      ],
    },
    acceptUser: null,
    orderActivities: [
      {
        id: 29,
        viewActivity: {
          id: 1,
          name: "Продавец  (Физическое лицо)",
          detailName: "Продавец  (Физическое лицо)",
          previewText:
            "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
          logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
          traveling: false,
        },
        count: 1,
        dateStart: "2025-09-05T10:00:00.000000Z",
        dateEnd: "2025-09-07T18:00:00.000000Z",
        needFoto: false,
        dateActivity: [
          {
            timeStart: "2025-09-05T13:00:00.000Z",
            timeEnd: "2025-09-05T21:00:00.000Z",
            places: [],
          },
          {
            timeStart: "2025-09-06T13:00:00.000Z",
            timeEnd: "2025-09-06T21:00:00.000Z",
            places: [],
          },
          {
            timeStart: "2025-09-07T13:00:00.000Z",
            timeEnd: "2025-09-07T18:00:00.000Z",
            places: [],
          },
        ],
      },
    ],
    acceptedUser: [],
  },
};

export const mockResponseError = {
  data: {
    id: 6,
    selfEmployed: true,
    status: 1,
    project: [
      {
        id: 7,
        name: "Проект 2",
        brand: [],
      },
    ],
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
    user: {
      id: 1,
      phone: 79152142639,
      email: "ilyaDevmarriator@gmail.com",
      logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
    },
    acceptUser: {
      id: 1,
      phone: 79152142639,
      email: "ilyaDevmarriator@gmail.com",
      logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
    },
    price: "0.00",
    income: "0.00",
    scopeOfServices: "0.00",
    orderActivities: [
      {
        viewActivity: {
          name: "Продавец",
          detailName: "Продавец",
          previewText:
            "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
          logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
        },
        count: 5,
        dateStart: "2024-03-01T09:00:00.000000Z",
        dateEnd: "2024-03-04T18:00:00.000000Z",
        needFoto: true,
        dateActivity: [
          {
            timeStart: "2024-03-01 09:00",
            timeEnd: "2024-03-01 12:00",
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
            timeStart: "2024-03-02 14:00",
            timeEnd: "2024-03-02 18:00",
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

export const getTaskMockResponse = http.get(
  `${import.meta.env.VITE_GET_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
