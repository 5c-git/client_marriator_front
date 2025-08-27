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
  status?: string,
  sort?: string
): Promise<GetOrdersSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_ORDERS);

    if (status) {
      url.searchParams.append("status", status);
    }

    if (sort) {
      url.searchParams.append("status", sort);
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
      id: 91,
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [
        {
          id: 9,
          viewActivity: {
            id: 2,
            name: "Курьер",
            detailName: "Курьер",
            previewText:
              "Доставка под разные задачи, быстрая курьерская доставка",
            logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
            traveling: true,
          },
          count: 2,
          dateStart: "2025-09-10T10:00:00.000000Z",
          dateEnd: "2025-09-15T10:00:00.000000Z",
          needFoto: false,
          dateActivity: [
            {
              timeStart: "2025-09-10T10:00:00.000Z",
              timeEnd: "2025-09-10T21:00:00.000Z",
              places: [
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
                  address_kladr:
                    "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
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
            },
            {
              timeStart: "2025-09-11T09:00:00.000Z",
              timeEnd: "2025-09-11T21:00:00.000Z",
              places: [
                {
                  id: 4,
                  name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
                  latitude: "55.00000000",
                  longitude: "49.00000000",
                  address_kladr:
                    "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
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
            },
            {
              timeStart: "2025-09-12T09:00:00.000Z",
              timeEnd: "2025-09-12T21:00:00.000Z",
              places: [],
            },
            {
              timeStart: "2025-09-13T09:00:00.000Z",
              timeEnd: "2025-09-13T21:00:00.000Z",
              places: [],
            },
            {
              timeStart: "2025-09-14T09:00:00.000Z",
              timeEnd: "2025-09-14T21:00:00.000Z",
              places: [],
            },
            {
              timeStart: "2025-09-15T09:00:00.000Z",
              timeEnd: "2025-09-15T10:00:00.000Z",
              places: [],
            },
          ],
        },
      ],
    },
    {
      id: 90,
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [
        {
          id: 9,
          viewActivity: {
            id: 2,
            name: "Курьер",
            detailName: "Курьер",
            previewText:
              "Доставка под разные задачи, быстрая курьерская доставка",
            logo: "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
            traveling: true,
          },
          count: 2,
          dateStart: "2025-08-10T10:00:00.000000Z",
          dateEnd: "2025-08-15T10:00:00.000000Z",
          needFoto: false,
          dateActivity: [
            {
              timeStart: "2025-09-10T10:00:00.000Z",
              timeEnd: "2025-09-10T21:00:00.000Z",
              places: [
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
                  address_kladr:
                    "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
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
            },
            {
              timeStart: "2025-09-11T09:00:00.000Z",
              timeEnd: "2025-09-11T21:00:00.000Z",
              places: [
                {
                  id: 4,
                  name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
                  latitude: "55.00000000",
                  longitude: "49.00000000",
                  address_kladr:
                    "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
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
            },
            {
              timeStart: "2025-09-12T09:00:00.000Z",
              timeEnd: "2025-09-12T21:00:00.000Z",
              places: [],
            },
            {
              timeStart: "2025-09-13T09:00:00.000Z",
              timeEnd: "2025-09-13T21:00:00.000Z",
              places: [],
            },
            {
              timeStart: "2025-09-14T09:00:00.000Z",
              timeEnd: "2025-09-14T21:00:00.000Z",
              places: [],
            },
            {
              timeStart: "2025-09-15T09:00:00.000Z",
              timeEnd: "2025-09-15T10:00:00.000Z",
              places: [],
            },
          ],
        },
      ],
    },
    {
      id: 1,
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [],
    },
    {
      id: 2,
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [],
    },
    {
      id: 3,
      selfEmployed: false,
      status: 1,
      place: {
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [],
    },
    {
      id: 4,
      selfEmployed: false,
      status: 1,
      place: {
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [],
    },
    {
      id: 159,
      selfEmployed: false,
      status: 2,
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [
        {
          id: 64,
          viewActivity: {
            id: 3,
            name: "Пекарь",
            detailName: "Пекарь",
            previewText:
              "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
            logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
            traveling: false,
          },
          count: 2,
          dateStart: "2025-08-20T10:00:00.000000Z",
          dateEnd: "2025-08-21T12:00:00.000000Z",
          needFoto: false,
          dateActivity: [],
        },
        {
          id: 65,
          viewActivity: {
            id: 1,
            name: "Продавец",
            detailName: "Продавец",
            previewText:
              "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
            logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
            traveling: false,
          },
          count: 1,
          dateStart: "2025-08-22T10:00:00.000000Z",
          dateEnd: "2025-08-23T12:00:00.000000Z",
          needFoto: true,
          dateActivity: [],
        },
      ],
    },
    {
      id: 160,
      selfEmployed: true,
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
      user: {
        id: 253,
        phone: 72222222222,
        email: "client@gmail.com",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 2,
            name: "client",
          },
        ],
      },
      orderActivities: [],
    },
  ],
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
