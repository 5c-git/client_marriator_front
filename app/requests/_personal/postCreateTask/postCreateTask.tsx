import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postCreateTaskSuccess.schema.json";
import { PostCreateTaskSuccess } from "./postCreateTaskSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postCreateTaskKeys = ["postCreateTask"];

export const postCreateTask = async (
  accessToken: string,
  placeId: number,
  projectId: number,
  selfEmployed: boolean
): Promise<PostCreateTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_CREATE_TASK);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        placeId,
        projectId,
        selfEmployed,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostCreateTaskSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса postCreateTask не валидны схеме`);
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
    acceptedUser: [
      {
        id: 1,
        phone: 79152142639,
        email: "ilyaDevmarriator@gmail.com",
        logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
      },
      {
        id: 2,
        phone: 79152142649,
        email: "ilyaDevmarriator@gmail.com",
        logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
      },
      {
        id: 3,
        phone: 79152142659,
        email: "ilyaDevmarriator@gmail.com",
        logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
      },
    ],
  },
};
export const mockResponseError = {};

export const postCreateTaskMockResponse = http.post(
  `${import.meta.env.VITE_POST_CREATE_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
