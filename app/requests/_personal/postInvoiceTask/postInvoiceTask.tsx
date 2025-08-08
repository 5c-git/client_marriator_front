import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import postInvoiceTaskSuccess from "./postInvoiceTaskSuccess.schema.json";
import { PostInvoiceTaskSuccess } from "./postInvoiceTaskSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(postInvoiceTaskSuccess);

export const postInvoiceTaskKeys = ["postInvoiceTask"];

export const postInvoiceTask = async (
  accessToken: string,
  supervisors: string[]
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_INVOICE_TASK);

    const formData = new FormData();

    supervisors.forEach((supervisor, index) => {
      formData.append(`supervisorIds[${index}]`, supervisor);
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
      data = response as unknown as PostInvoiceTaskSuccess;
    } else {
      throw new Response(`Данные запроса postInvoiceTask не валидны схеме`);
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
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postInvoiceTaskMockResponse = http.post(
  `${import.meta.env.VITE_POST_INVOICE_TASK}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
