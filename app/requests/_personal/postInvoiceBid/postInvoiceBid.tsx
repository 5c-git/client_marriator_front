import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import successSchema from "./postInvoiceBidSuccess.schema.json";
import { PostInvoiceBidSuccess } from "./postInvoiceBidSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(successSchema);

export const postInvoiceBidKeys = ["postInvoiceBid"];

export const postInvoiceBid = async (
  accessToken: string,
  bidId: string,
  specialistIds: string[]
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_INVOICE_BID);

    const formData = new FormData();

    formData.append("bidId", bidId);

    specialistIds.forEach((specialist, index) => {
      formData.append(`specialistIds[${index}]`, specialist);
    });

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

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostInvoiceBidSuccess;
    } else {
      throw new Response(`Данные запроса postInvoiceBid не валидны схеме`);
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
export const mockResponseSuccess: PostInvoiceBidSuccess = {
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postInvoiceBidMockResponse = http.post(
  `${import.meta.env.VITE_POST_INVOICE_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
