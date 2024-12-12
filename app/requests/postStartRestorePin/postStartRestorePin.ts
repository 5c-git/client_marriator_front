import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postStartRestorePinSuccess.schema.json";
import responseError from "./postStartRestorePinError.schema.json";

import { PostStartRestorePinSuccess } from "./postStartRestorePinSuccess.type";
import { PostStartRestorePinError } from "./postStartRestorePinError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postStartRestorePinKeys = ["postStartRestorePin"];

export const postStartRestorePin = async (accessToken: string) => {
  try {
    const url = new URL(import.meta.env.VITE_START_RESTORE_PIN);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      // body: JSON.stringify({
      //   phone,
      //   code,
      // }),
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostStartRestorePinSuccess;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostStartRestorePinError;
    } else {
      throw new Response(
        "Данные запроса postStartRestorePin не соответствуют схеме"
      );
    }

    return data;
  } catch (error) {
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
  result: {
    code: {
      status: "success",
      ttl: 120,
      code: 12345,
    },
    token: {
      token_type: "Bearer",
      expires_in: "числовое значение в секундах время жизни access_token",
      access_token: "токен доступа",
      refresh_token: "токен восстановления access_token",
    },
  },
};

export const mockResponseError = {
  result: {
    code: {
      status: "exists",
      ttl: 29,
    },
    token: {
      token_type: "Bearer",
      expires_in: 604800,
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzY0Y2JhZC04Mjc1LTRiYTctODU0OS04ZmY0Yzg4ZDM3YWYiLCJqdGkiOiI4OGJhMTQwOWUyNWM0ZTEwZDVjMGUyYTYyYTA0MjZkY2Q2NGU2ZTRjNWJiM2JkMmVlMDQ3M2FiODE3OTY2OWM2N2ZlMTdkMGJmMTM0YjUyMSIsImlhdCI6MTcyMzE5NjE4OS40NTkyNTMsIm5iZiI6MTcyMzE5NjE4OS40NTkyNTYsImV4cCI6MTcyMzgwMDk4OS40NTM2NTUsInN1YiI6IjIiLCJzY29wZXMiOlsicmVzdG9yZVBpbiJdfQ.Mhrt1alM2Pz1-8kGH2EKb4MjpOv1z4E6ta5QsUCusdkUDCeOouHJC8Vk6EIoBqhSiis9dXK_GJ-UT4J-tr5EWUEu6VfKbiFfJ1m8jk4oApGIYU-HOTrI11dLQAW7-ZWZmM1kqjEiiSmQnJ-dJVNy2myG09gkW6XC4I6mGBbWrOrhE_bG1PNDvVynUkvzHhCLL3tYqo80jNgw9qarZajFeP2PPw20GP-C-2dmVYkW4JmM5n6cJ6ZvdkLTCuTnYIiwly9NP4JZPcz7Y70KdcIXyBVbTLAK_l0v2U7pgHIZ3_sBA9z__6V9GtJlQ_VTs7GvD80v9nw7qWHz9dc4ecCc2Tw5DHwP9K2lh3_UnozbHRibYSTXbuKZ7T7uAcSj8ks5mIxtNlVA4k6jfYiPxvf1dSLkNfUoupd09Wup66GJTkp0RCxKdCkRUIzi8AVXIwlLCzZW2EY4HAFUkYGG-F75F-QoefrGSYljXXZxRRccBa9AHd7hLhmx8cpBPUTNMJcwe_IH0TOATkzziXzYHwEOXd8KEsgO8HXIn2tA95q5uL0wIVXSl1SLUQAF-EpcBgnPAIZFFLeMOvp9U7wgLugQJJQooVuZ-wNP23gBqv4yVoKbO6np9ZhMWdu9MA9BfVrtdWe1_Bekwht-6GB64ScpUJFiwwe3aIxaGOBw2yq52nQ",
      refresh_token:
        "def50200fd223ea7a2c59e58d3f88b2a621f2dc196809dd57050bbb92cc15c470e097d72165dfc5962ec409fb77fc7d5b8ecd78479ce4d147b8a23e5d0297822dde859df7033bcbd39c208b4078424c17f6328044a1eab693708db034abbf6b307d30cee23c458e911ab7cf4cae65b310451c1517243bd5f2e2050d9c7e25b92a69d7e09b89c5742c197eb986d856487a99a7007a4773a40ef35188e41158ef1ebbaf3c3c250f5c1c536f4fa37cd3ff33cc5c1d01fe2f2e00184fc666fbe28f1ecfb4b2389aa963aa658f37a01351d26abba30ecab18bedd89138b0b4812e956dd9ecee2c188f1f677d9a63f4146ab68d2fe36e8ed5cd40bed4c018faac171ab7bdf0f4366c1ce20b8991c654b70a7f3c3ced95de6da1ed8ed1af0416023a874c98ecefd44322828435d0b21c01e67de5ede69bc62f69295ad781a9478fe2e9178b69bc0775445839b66a923905ecefe55f02c5e89bb781a2c1dfbb04fd8fb2e3a7278acff24c8db03b25e5ae4058d96cb55cf74863b14281310c4f6d75a327265582f07093a2ada37a19a1a818bf2aa",
    },
  },
  status: "success",
};

export const postStartRestorePinMockResponse = http.post(
  `${import.meta.env.VITE_START_RESTORE_PIN}`,
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
  }
);
