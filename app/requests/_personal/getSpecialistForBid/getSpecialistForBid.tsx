import { http, delay, HttpResponse } from "msw";

import {
  getSpecialistForBidSuccessSchema,
  GetSpecialistForBidSuccess,
} from "./getSpecialistForBidSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getSpecialistForBidKeys = ["getSpecialistForBid"];

export const getSpecialistForBid = async (
  accessToken: string,
  bidId: string,
): Promise<GetSpecialistForBidSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_SPECIALIST_FOR_BID);

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

    const parsed = getSpecialistForBidSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getSpecialistForBid не валидны схеме`);
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
export const mockResponseSuccess: GetSpecialistForBidSuccess = {
  data: [
    {
      id: 406,
      phone: 79881234455,
      email: "test121@mail.ru",
      logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
      roles: [
        {
          id: 5,
          name: "specialist",
        },
      ],
      radius: "22",
      name: "ТЕСТЕР СПЕЦИАЛИСТ",
      age: "27",
      country: "РОССИЯ",
      viewActivities:
        "Курьер  (Физическое лицо), Пекарь (Физическое лицо), Продавец  (Физическое лицо)",
    },
  ],
};

export const mockResponseError = {};

export const getSpecialistForBidMockResponse = http.get(
  `${import.meta.env.VITE_GET_SPECIALIST_FOR_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
