import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// import successSchema from "./getBidsSuccess.schema.json";
import { GetBidsSuccess } from "./getBidsSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

// const validateSuccess = ajv.compile(successSchema);

export const getBidsKeys = ["getBids"];

export const getBids = async (
  accessToken: string,
  status?: string,
  sort?: string
): Promise<GetBidsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_BIDS);

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

    // let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    // if (validateSuccess(response)) {
    //   data = response as unknown as GetBidsSuccess;
    // } else {
    //   console.log(validateSuccess.errors);
    //   throw new Response(`Данные запроса getBids не валидны схеме`);
    // }

    const data = response as unknown as GetBidsSuccess;

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
      selfEmployed: false,
      status: 1,
    },
    {
      id: 2,
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
      selfEmployed: false,
      status: 1,
    },
    {
      id: 3,
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
      selfEmployed: false,
      status: 1,
    },
    {
      id: 4,
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
      selfEmployed: false,
      status: 4,
    },
    {
      id: 5,
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
      selfEmployed: false,
      status: 4,
    },
    {
      id: 6,
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
      selfEmployed: false,
      status: 4,
    },
    {
      id: 7,
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
      selfEmployed: false,
      status: 1,
    },
  ],
};

export const mockResponseSuccessEmpty = {
  data: [],
};

export const mockResponseError = {};

export const getBidsMockResponse = http.get(
  `${import.meta.env.VITE_GET_BIDS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
