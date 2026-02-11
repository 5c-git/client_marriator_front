import { http, delay, HttpResponse } from "msw";

import {
  PostCreateSearchFromOrderSuccess,
  postCreateSearchFromOrderSuccessSchema,
} from "./postCreateSearchFromOrderSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postCreateSearchFromOrderKeys = ["postCreateSearchFromOrder"];

export const postCreateSearchFromOrder = async (
  accessToken: string,
  orderId: string,
  orderActivityId: string,
): Promise<PostCreateSearchFromOrderSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_CREATE_SEARCH_FROM_ORDER);

    const formData = new FormData();

    formData.append("orderId", orderId);
    formData.append("orderActivityId", orderActivityId);

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

    const parsed = postCreateSearchFromOrderSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postCreateSearchFromOrder не валидны схеме`,
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
export const mockResponseSuccess: PostCreateSearchFromOrderSuccess = {
  data: {
    id: 3,
    user: {
      id: 397,
      phone: 79887951616,
      email: "manager2@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      roles: [
        {
          id: 3,
          name: "manager",
        },
      ],
      name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
    },
    selfEmployed: false,
    place: {
      id: 4,
      name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
      latitude: "49.15342300",
      longitude: "55.77318600",
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
    radius: 5,
    price: 0,
    priceResult: 0,
    viewActivity: {
      id: 3,
      name: "Пекарь (Физическое лицо)",
      detailName: "Пекарь  (Физическое лицо)",
      previewText:
        "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
      logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
      traveling: false,
    },
    dateStart: "2026-02-10T12:15:00.000000Z",
    dateEnd: "2026-02-12T20:00:00.000000Z",
    needFoto: false,
    dateActivity: [
      {
        id: 1,
        timeStart: "2026-02-10T12:15:00.000Z",
        timeEnd: "2026-02-10T18:00:00.000Z",
        places: [],
      },
      {
        id: 2,
        timeStart: "2026-02-11T06:00:00.000Z",
        timeEnd: "2026-02-11T18:00:00.000Z",
        places: [],
      },
      {
        id: 3,
        timeStart: "2026-02-12T06:00:00.000Z",
        timeEnd: "2026-02-12T20:00:00.000Z",
        places: [],
      },
    ],
    order: null,
    task: {
      id: 337,
      selfEmployed: false,
      status: 3,
      user: {
        id: 397,
        phone: 79887951616,
        email: "manager2@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР ВТОРОЙ ПЯТЕРОЧКА",
      },
      statistic: [],
    },
    count: 1,
    project: {
      id: 1,
      name: "Договор на оказание услуг Пятёрочка",
      dateStart: "2025-12-09T00:00:00.000000Z",
      dateEnd: "2026-12-31T00:00:00.000000Z",
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
  },
};

export const mockResponseError = {};

export const postCreateSearchFromOrderMockResponse = http.post(
  `${import.meta.env.VITE_POST_CREATE_SEARCH_FROM_ORDER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
