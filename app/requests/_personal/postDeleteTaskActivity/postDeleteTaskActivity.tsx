import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postDeleteTaskActivitySuccess.schema.json";
import { PostDeleteTaskActivitySuccess } from "./postDeleteTaskActivitySuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postDeleteTaskActivityKeys = ["postDeleteTaskActivity"];

export const postDeleteTaskActivity = async (
  accessToken: string,
  taskId: string,
  taskActivityId: string
): Promise<PostDeleteTaskActivitySuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DELETE_TASK_ACTIVITY);

    const formData = new FormData();

    formData.append("taskId", taskId);
    formData.append("taskActivityId", taskActivityId);

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
      data = response as unknown as PostDeleteTaskActivitySuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(
        `Данные запроса postDeleteTaskActivity не валидны схеме`
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
  data: {
    id: 6,
    selfEmployed: true,
    status: "Принято",
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
  },
};
export const mockResponseError = {};

export const postDeleteTaskActivityMockResponse = http.post(
  `${import.meta.env.VITE_POST_DELETE_TASK_ACTIVITY}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
