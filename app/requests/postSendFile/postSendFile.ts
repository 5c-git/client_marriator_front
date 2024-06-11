// import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postSendFileResponseSuccess.schema.json";
import responseError from "./postSendFileResponseError.schema.json";

import { SendFileResponseSuccess } from "./postSendFileResponseSuccess";
import { SendFileResponseError } from "./postSendFileResponseError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postSendFileKeys = ["postSendFile"];

export const postSendFile = async (
  urlString: string,
  body: FormData,
  onSuccess: (data: SendFileResponseSuccess) => void,
  onError: (error: string) => void
) => {
  const url = new URL(urlString);

  const request = await fetch(url, {
    method: "POST",
    body: body,
  });
  const response = await request.json();

  if (validateResponseSuccess(response)) {
    const data = response as SendFileResponseSuccess;

    onSuccess(data);
  } else if (validateResponseError(response)) {
    const error = response as SendFileResponseError;

    onError(error.error);
  } else {
    throw new Response("Данные запроса postSendFile не соответствуют схеме");
  }
};
