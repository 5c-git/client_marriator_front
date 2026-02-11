import { http, delay, HttpResponse } from "msw";

import { postSendPhoneSuccessSchema } from "./postSendPhoneSuccess.schema";
import { postSendPhoneErrorSchema } from "./postSendPhoneError.schema";
import { postSendPhoneErrorTimerSchema } from "./postSendPhoneErrorTimer.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSendPhoneKeys = ["postSendPhone"];

export const postSendPhone = async (phone: string) => {
  try {
    const url = new URL(import.meta.env.VITE_SEND_PHONE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
      }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsedSuccess = postSendPhoneSuccessSchema.safeParse(response);
    const parsedError = postSendPhoneErrorSchema.safeParse(response);
    const parsedErrorTimer = postSendPhoneErrorTimerSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      throw new Response("Поле телефон обязательно для заполнения");
    } else if (parsedErrorTimer.success) {
      data = parsedErrorTimer.data;
    } else {
      throw new Response(`Данные запроса postSendPhone не валидны схеме`);
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
export const mockPostSendPhoneResponseRegister = {
  result: {
    type: "register",
    code: {
      status: "success",
      code: 7642,
      ttl: 120,
    },
  },
  status: "success",
};

export const mockPostSendPhoneResponseAuth = {
  result: {
    type: "auth",
    code: {
      status: "success",
      code: 1111,
      ttl: 120,
    },
  },
  status: "success",
};

export const mockPostSendPhoneResponseExists = {
  result: {
    type: "register",
    code: {
      status: "exists",
      ttl: 89,
    },
  },
  status: "success",
};

export const mockPostSendPhoneResponseErrorTimer = {
  result: {
    type: "auth",
    code: {
      status: "exists",
      ttl: 43,
    },
  },
  status: "error",
};

export const mockPostSendPhoneResponseError = {
  result: {
    type: "register",
    code: {
      status: "errorSend",
    },
  },
  status: "success",
};

export const mockResponseError = {
  status: "error",
  error: "Поле телефон обязательна для заполнения",
};

export const postSendPhoneMockResponse = http.post(
  `${import.meta.env.VITE_SEND_PHONE}`,
  async ({ request }) => {
    const url = new URL(`${request.url}?scenario=auth`);
    const scenario = url.searchParams.get("scenario");

    if (scenario === "reg") {
      await delay(2000);
      return HttpResponse.json(mockPostSendPhoneResponseRegister);
    } else if (scenario === "auth") {
      await delay(2000);
      return HttpResponse.json(mockPostSendPhoneResponseAuth);
    } else if (scenario === "timer") {
      await delay(2000);
      return HttpResponse.json(mockPostSendPhoneResponseErrorTimer);
    } else if (scenario === "error") {
      await delay(2000);
      return HttpResponse.json(mockResponseError);
    }
  },
);
