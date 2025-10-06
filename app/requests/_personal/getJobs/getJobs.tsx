import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import schemaSuccess from "./getJobsSuccess.schema.json";
import { GetJobsSuccess } from "./getJobsSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(schemaSuccess);

export const getJobsKeys = ["getJobs"];

export const getJobs = async (accessToken: string): Promise<GetJobsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_JOBS);

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
      data = response as unknown as GetJobsSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getJobs не валидны схеме`);
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
export const mockResponseSuccess: GetJobsSuccess = {
  data: [
    {
      id: 6,
      selfEmployed: true,
      status: 1,
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
      radius: 5,
      price: 0.0,
      priceResult: 0.0,
      income: 100,
      forPay: 100,
      viewActivity: {
        name: "Продавец",
        detailName: "Продавец",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
      },
      dateStart: "2024-03-01T09:00:00.000000Z",
      dateEnd: "2024-03-04T18:00:00.000000Z",
      needFoto: true,
      dateActivity: [
        {
          id: 1,
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
          id: 2,
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
      order: null,
      task: {
        id: 1,
        selfEmployed: false,
        status: "Новый",
        user: {
          id: 1,
          phone: 79152142639,
          email: "ilyaDevmarriator@gmail.com",
          logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
        },
      },
      acceptingUsers: {
        id: 414,
        phone: 79885555555,
        email: "test555@mail.ru",
        logo: "/storage/source/userImg/414/9Lp4FMi61rhLi5R0E3Hz.jpeg",
        roles: [
          {
            id: 6,
            name: "supervisor",
          },
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "5",
        name: "Наргиз Тестия",
        age: "23",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 1,
      },
      reports: [
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
      ],
    },
    {
      id: 6,
      selfEmployed: true,
      status: 1,
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
      radius: 5,
      price: 0.0,
      priceResult: 0.0,
      income: 100,
      forPay: 100,
      viewActivity: {
        name: "Продавец",
        detailName: "Продавец",
        previewText:
          "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
        logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
      },
      dateStart: "2024-03-01T09:00:00.000000Z",
      dateEnd: "2024-03-04T18:00:00.000000Z",
      needFoto: true,
      dateActivity: [
        {
          id: 1,
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
          id: 2,
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
      order: null,
      task: {
        id: 1,
        selfEmployed: false,
        status: "Новый",
        user: {
          id: 1,
          phone: 79152142639,
          email: "ilyaDevmarriator@gmail.com",
          logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
        },
      },
      acceptingUsers: {
        id: 414,
        phone: 79885555555,
        email: "test555@mail.ru",
        logo: "/storage/source/userImg/414/9Lp4FMi61rhLi5R0E3Hz.jpeg",
        roles: [
          {
            id: 6,
            name: "supervisor",
          },
          {
            id: 5,
            name: "specialist",
          },
        ],
        radius: "5",
        name: "Наргиз Тестия",
        age: "23",
        country: "РОССИЯ",
        viewActivities: [
          "Курьер  (Физическое лицо)",
          "Пекарь (Физическое лицо)",
          "Продавец  (Физическое лицо)",
        ],
        status: 1,
      },
      reports: [
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
        {
          dateStart: "2024-03-01T09:00:00.000000Z",
          dateEnd: "2024-03-04T18:00:00.000000Z",
          report: [
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
            "ссылки на картинки",
          ],
          dayActivityId: 1,
          status: 1,
        },
      ],
    },
  ],
};

export const mockResponseSuccessEmpty = {};

export const mockResponseError = {};

export const getJobsMockResponse = http.get(
  `${import.meta.env.VITE_GET_JOBS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
