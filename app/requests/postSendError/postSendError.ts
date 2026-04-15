// import { http, delay, HttpResponse } from "msw";

// import { postSetUserPinSuccessSchema } from "./postSendErrorSuccess.schema";
// import { postSetUserPinUnauthSchema } from "./postSetUserPinUnauth.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postSendErrorKeys = ["postSendError"];

export const postSendError = async (accessToken: string, requestUrl: string, errorMessage: string ) => {
  try {
    const url = new URL(import.meta.env.VITE_POST_SEND_ERROR);

    const formData = new FormData();

    formData.append("requestUrl", requestUrl);
    formData.append("requestResponse", errorMessage);
    formData.append("requestStatus", -1);
    formData.append("requestBody[bidId]", [-1]);
    formData.append("requestBody[count]", [-1]);
    formData.append("anyData", -1);

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

    // const parsedSuccess = postSetUserPinSuccessSchema.safeParse(response);
    // const parsedError = postSetUserPinUnauthSchema.safeParse(response);

    // if (parsedSuccess.success) {
    //   data = parsedSuccess.data;
    // } else if (parsedError.success) {
    //   data = parsedError.data;
    // } else {
    //   throw new Response(`Данные запроса postSetUserPin не валидны схеме`);
    // }

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
// export const postSendErrorResponseSuccess = {
//   status: "success",
// };

// export const postSendErrorResponseError = {
//   message: "Unauthenticated",
// };

// export const postSendErrorMockResponse = http.post(
//   `${import.meta.env.VITE_POST_SEND_ERROR}`,
//   async () => {
//     // const url = new URL(request.url);
//     // const scenario = url.searchParams.get("scenario");

//     await delay(2000);
//     return HttpResponse.json(postSendErrorResponseSuccess);

//     // if (scenario === "reg") {
//     //   await delay(2000);
//     //   return HttpResponse.json(mockPostSendPhoneResponseRegister);
//     // }
//     // else if (scenario === "auth") {
//     //   // await delay(2000);
//     //   // return HttpResponse.json();
//     // }
//     // else if (scenario === "error") {
//     //   await delay(2000);
//     //   return HttpResponse.json(mockResponseError);
//     // }
//   },
// );
