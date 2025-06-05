// import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postSaveUserImgSuccess.schema.json";
import responseError from "./postSaveUserImgError.schema.json";

import { PostSaveUserImgSuccess } from "./postSaveUserImgSuccess.type";
import { PostSaveUserImgError } from "./postSaveUserImgError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postSendUserImgKeys = ["postSendUserImg"];

export const postSendUserImg = async (
  accessToken: string,
  urlString: string,
  body: FormData,
  onSuccess: (data: PostSaveUserImgSuccess) => void,
  onError: (error: string) => void
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

    if (validateResponseSuccess(response)) {
      const data = response as unknown as PostSaveUserImgSuccess;

      onSuccess(data);
    } else if (validateResponseError(response)) {
      const error = response as unknown as PostSaveUserImgError;

      onError(error.error);
    } else {
      throw new Response(
        "Данные запроса postSendUserImg не соответствуют схеме"
      );
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
