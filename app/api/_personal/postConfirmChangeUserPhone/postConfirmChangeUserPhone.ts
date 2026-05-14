import { http, delay, HttpResponse } from "msw";

import { postConfirmChangeUserPhoneSuccessSchema } from "./postConfirmChangeUserPhoneSuccess.schema";
import { postConfirmChangeUserPhoneErrorSchema } from "./postConfirmChangeUserPhoneError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postConfirmChangeUserPhoneKeys = ["postConfirmChangeUserPhone"];

export const postConfirmChangeUserPhone = async (
  accessToken: string,
  phone: string,
  code: string,
) => {
  try {
    const url = new URL(import.meta.env.VITE_CONFIRM_CHANGE_USER_PHONE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        phone,
        code,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsedSuccess =
      postConfirmChangeUserPhoneSuccessSchema.safeParse(response);
    const parsedError =
      postConfirmChangeUserPhoneErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(
        `Данные запроса postConfirmChangeUserPhone не валидны схеме`,
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
  status: "success",
};

export const mockResponseError = {
  status: "error",
  result: {
    code: {
      status: "error",
    },
  },
};

export const postConfirmChangeUserPhoneMockResponse = http.post(
  `${import.meta.env.VITE_CONFIRM_CHANGE_USER_PHONE}`,
  async () => {
    // const url = new URL(request.url);
    // const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);

    // if (scenario === "reg") {
    //   await delay(2000);
    //   return HttpResponse.json(mockPostSendPhoneResponseRegister);
    // }
    // else if (scenario === "auth") {
    //   // await delay(2000);
    //   // return HttpResponse.json();
    // }
    // else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  },
);
