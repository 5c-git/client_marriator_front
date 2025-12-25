import { http, delay, HttpResponse } from "msw";

import {
  postConfirmUserRegisterSuccessSchema,
  PostConfirmUserRegisterSuccess,
} from "./postConfirmUserRegisterSuccess.schema";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postConfirmUserRegisterKeys = ["postConfirmUserRegister"];

export const postConfirmUserRegister = async (
  accessToken: string,
  userId: string,
  confirm: string,
  fields?: { fields: { [key: string]: unknown } },
) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_CONFIRM_USER_REGISTER);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("confirm", confirm);

    if (fields) {
      for (const [key, value] of Object.entries(fields.fields)) {
        console.log(typeof value);
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as Blob);
        }
      }
    }

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

    const parsed = postConfirmUserRegisterSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса postConfirmUserRegister не валидны схеме`,
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
  data: {
    success: true,
  },
};
export const mockResponseError = {};

export const postConfirmUserRegisterMockResponse = http.post(
  `${import.meta.env.VITE_POST_CONFIRM_USER_REGISTER}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
