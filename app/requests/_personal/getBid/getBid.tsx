import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import successSchema from "./getBidSuccess.schema.json";
import { GetBidSuccess } from "./getBidSuccess.type";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(successSchema);

export const getBidKeys = ["getBid"];

export const getBid = async (
  accessToken: string,
  bidId: string
): Promise<GetBidSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_BID);

    url.searchParams.append("bidId", bidId);

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
      data = response as unknown as GetBidSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getBid не валидны схеме`);
    }

    // const data = response as unknown as GetBidsSuccess;

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
    id: 25,
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
    acceptUserId: {
      id: 1,
      phone: 79152142639,
      email: "ilyaDevmarriator@gmail.com",
      logo: "/storage/source/directory/brand/3-logo/about-main-1.jpeg",
    },
    radius: 1,
    price: 1,
    priceResult: 1,
    viewActivity: {
      name: "Продавец",
      detailName: "Продавец",
      previewText:
        "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
      logo: "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
    },
    dateStart: "2025-05-25T09:00:00.000000Z",
    dateEnd: "2025-05-25T18:00:00.000000Z",
    needFoto: true,
    dateActivity: [
      {
        timeStart: "2025-05-25 09:00",
        timeEnd: "2025-05-25 12:00",
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
        timeStart: "2025-05-25 14:00",
        timeEnd: "2025-05-25 18:00",
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
};

export const mockResponseSuccessEmpty = {
  data: [],
};

export const mockResponseError = {};

export const getBidMockResponse = http.get(
  `${import.meta.env.VITE_GET_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
