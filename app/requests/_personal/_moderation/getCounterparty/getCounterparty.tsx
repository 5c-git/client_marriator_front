import { http, delay, HttpResponse } from "msw";

import {
  getCounterpartySuccessSchema,
  GetCounterpartySuccess,
} from "./getCounterpartySuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getCounterpartyKeys = ["getCounterparty"];

export const getCounterparty = async (
  accessToken: string
): Promise<GetCounterpartySuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_COUNTERPARTY);

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

    const parsed = getCounterpartySuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getCounterparty не валидны схеме`);
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
export const mockResponseSuccess: GetCounterpartySuccess = {
  data: [
    {
      id: 1,
      name: "амвамавма",
      ogrn: "вмвмвм",
      legal_address: "вмвмвмв",
      legal_email: "мвмвм",
    },
    {
      id: 2,
      name: "высысыс",
      ogrn: "ысысысы",
      legal_address: "сысысы",
      legal_email: "сысысысыс",
    },
    {
      id: 3,
      name: "аиип",
      ogrn: "34534534",
      legal_address: "вппк",
      legal_email: "миапиапи",
    },
    {
      id: 4,
      name: "vdfvdfv",
      ogrn: "243244",
      legal_address: "svsdvsds",
      legal_email: "vsvsdvs",
    },
  ],
};

export const mockResponseError = {};

export const getCounterpartyMockResponse = http.get(
  `${import.meta.env.VITE_GET_PROJECT}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
