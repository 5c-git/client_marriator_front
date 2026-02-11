// import { http, delay, HttpResponse } from "msw";

import {
  postSendFileSuccessSchema,
  PostSendFileSuccess,
} from "./postSendFileSuccess.schema";
import { postSendFileErrorSchema } from "./postSendFileError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSendFileKeys = ["postSendFile"];

export const postSendFile = async (
  accessToken: string,
  urlString: string,
  body: FormData,
  onSuccess: (data: PostSendFileSuccess) => void,
  onError: (error: string) => void,
) => {
  try {
    const url = new URL(urlString);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    });

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const response = await request.json();

    let data;

    const parsedSuccess = postSendFileSuccessSchema.safeParse(response);
    const parsedError = postSendFileErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
      onSuccess(data);
    } else if (parsedError.success) {
      data = parsedError.data;
      onError(data.error);
    } else {
      throw new Response(`Данные запроса postSendFile не валидны схеме`);
    }
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
