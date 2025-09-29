import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import successSchema from "./postConvertTaskSuccess.schema.json";
import { PostConvertTaskSuccess } from "./postConvertTaskSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(successSchema);

export const postConvertTaskKeys = ["postConvertTask"];

export const postConvertTask = async (
  accessToken: string,
  orderId: string,
): Promise<PostConvertTaskSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_CONVERT_TASK);

    const formData = new FormData();

    formData.append("orderId", orderId);

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

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostConvertTaskSuccess;
    } else {
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
export const mockResponseSuccess: PostConvertTaskSuccess = {
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

export const mockResponseError = {};

export const postConvertTaskMockResponse = http.post(
  `${import.meta.env.VITE_POST_CONVERT_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
