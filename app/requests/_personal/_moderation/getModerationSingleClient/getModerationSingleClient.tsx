import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getModerationSingleClientSchema from "./getModerationSingleClientSuccess.schema.json";
import { GetModerationSingleClientSuccess } from "./getModerationSingleClientSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getModerationSingleClientSchema);

export const getModerationSingleClientKeys = ["getModerationSingleClient"];

export const getModerationSingleClient = async (
  accessToken: string,
  userId: number
): Promise<GetModerationSingleClientSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_MODERATION_SINGLE_CLIENT);

    url.searchParams.append("userId", userId.toString());

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as GetModerationSingleClientSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(
        `Данные запроса getModerationSingleClient не валидны схеме`
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
export const mockResponseSuccess: GetModerationSingleClientSuccess = {
  data: {
    id: 410,
    name: "Клиент Юля Тестовый",
    phone: 79899991111,
    email: "yuclient01@mail.ru",
    logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
    project: [
      {
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
    ],
    place: [
      {
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
      {
        id: 4,
        name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
        latitude: "55.00000000",
        longitude: "49.00000000",
        address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        region: {
          id: 1,
          name: "Татарстан Респ",
        },
        brand: {
          id: 1,
          name: "Пятёрочка",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          description:
            "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
        },
      },
    ],
    roles: [
      {
        id: 2,
        name: "client",
      },
    ],
    change_order: "23:59",
    cancel_order: "23:59",
    live_order: "23:59",
    change_task: "23:59",
    cancel_task: "23:59",
    live_task: "23:59",
    repeat_bid: "23:59",
    leave_bid: "04:00",
    refusal_task: "23:59",
    waiting_task: 60,
    count_wait_bid: 1,
    time_answer_bid: 24,
    notification_start: 60,
    supervisors: [],
    manager: [],
    counterparty: [],
  },
};

export const mockResponseEmpty = {};

export const getModerationSingleClientMockResponse = http.get(
  `${import.meta.env.VITE_GET_MODERATION_SINGLE_CLIENT}`,
  async () =>
    // { request }
    {
      // const url = new URL(request.url);

      await delay(2000);
      return HttpResponse.json(mockResponseSuccess);
    }
);
