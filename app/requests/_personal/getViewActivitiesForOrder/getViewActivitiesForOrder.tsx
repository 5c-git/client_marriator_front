import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import schemaSuccess from "./getViewActivitiesForOrderSuccess.schema.json";
import { GetViewActivitiesForOrderSuccess } from "./getViewActivitiesForOrderSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(schemaSuccess);

export const getViewActivitiesForOrderKeys = ["GetViewActivitiesForOrder"];

export const getViewActivitiesForOrder = async (
  accessToken: string,
  orderId: string
): Promise<GetViewActivitiesForOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_VIEW_ACTIVITIES_FOR_ORDER);

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
      data = response as unknown as GetViewActivitiesForOrderSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(
        `Данные запроса getViewActivitiesForOrder не валидны схеме`
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
  data: [
    {
      id: 1,
      name: "Продавец",
      detailName: "Продавец",
      previewText:
        "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
      logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
      traveling: false,
    },
    {
      id: 2,
      name: "Курьер",
      detailName: "Курьер",
      previewText: "Доставка под разные задачи, быстрая курьерская доставка",
      logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
      traveling: true,
    },
    {
      id: 3,
      name: "Пекарь",
      detailName: "Пекарь",
      previewText:
        "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
      logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
      traveling: false,
    },
  ],
};

export const mockResponseError = {};

export const getViewActivitiesForOrderMockResponse = http.get(
  `${import.meta.env.VITE_GET_VIEW_ACTIVITIES_FOR_ORDER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
