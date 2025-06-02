import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import responseSuccess from "./postCheckCodeSuccess.schema.json";
import responseError from "./postCheckCodeError.schema.json";

import { PostCheckCodeSuccessSchema } from "./postCheckCodeSuccess.type";
import { PostCheckCodeErrorSchema } from "./postCheckCodeError.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateResponseSuccess = ajv.compile(responseSuccess);
const validateResponseError = ajv.compile(responseError);

export const postCheckCodeKeys = ["postCheckCode"];

export const postCheckCode = async (phone: string, code: string) => {
  try {
    const url = new URL(import.meta.env.VITE_CHECK_CODE);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

    if (validateResponseSuccess(response)) {
      data = response as unknown as PostCheckCodeSuccessSchema;
    } else if (validateResponseError(response)) {
      data = response as unknown as PostCheckCodeErrorSchema;
    } else {
      throw new Response("Данные запроса postCheckCode не соответствуют схеме");
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

export const mockPostCheckCodeResponseToken = {
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 604800,
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzY0Y2JhZC04Mjc1LTRiYTctODU0OS04ZmY0Yzg4ZDM3YWYiLCJqdGkiOiJjZDM3YzYwNTBiMDkwZDNhZDA1OGYzMzAxMmU5MmEzZmNiNjcyYmQ5ODRkOTAyM2Q1MTQwOTA0MmM4MTg1MDM2Nzk3MTE2YTQ5ODhmN2NkYSIsImlhdCI6MTczMDMzNDk2OC4zMzU0MzYsIm5iZiI6MTczMDMzNDk2OC4zMzU0MzksImV4cCI6MTczMDkzOTc2OC4zMjgzODYsInN1YiI6IjE5NyIsInNjb3BlcyI6WyJyZWdpc3RlciJdfQ.Lm-V-iWhcYD1rTdi7UoTdYNRxraZXIdfClse39rOkYDFEysVY856QryPmcS6Q9DKyhrBxS7DUDBEKIN6o4zttdcq0hadCfCeUksVQANK2FZM_f79wxajbko2TDgeFu1BNzVQnAXVISDJZm2nRMI3ZjvZrcN1Cmo68_88KG-5bTteI41wrEepWw9EiE9-UtUVWdtEE1Kah-_KqCXglu1wXvCKmVXbOjnYBuVvRFnFg9tcm7J35RO1-aJ3IV4SmhTH-khYWkMf062s9uikaMODR2wL5dlgHGO566aLIGSPj_DZ_zbSrTp6KRODB79tpFNCr77Vcl1q_7BgmTyhJ1X9hRDPJ2g6Xefee9R3UfkkQJckyVjJGQrqvUfrYxJwL3638fQu1g_kAxkPCDplkt9OVIp649euHLXj1qy9Jwt_i7AjvnYJaf7ON0t7uaeVrGGedEiNLAtW69b4M9uJO6R3Vm7qY7ergqu4YJobUNhhBxm_3TGhNCqZas69jl22uH0F3ydA7O3S33_lJ2v55QyBXk8nwe5JNFCGCy1s4PnP6ipU9_TzQqu86Blg7ei4JhNirWQ2elNYCYeMKehBkaP2x2cGcKL8RZ63WBJE_X4dAqjIWqg5xV2gK1wK1QVrYj4VBSf8mD2wDn9oI8_P0OF2E9Ix-xf_JDJ3UhCdxJciQic",
      refresh_token:
        "def50200001314e96f0f5d5c499f06cf6f35fffd9dd30fe28b373ac2fc1e854f48dc7b64a34087afb896b81eb520517734ea0e1399786d4a5527ac60e5642eaa82966ccab80fa31c0abbaba6c3f7f6c7871a9618cb3ab89cfbaa9b61f276872f1bd5d906a728148cec13cd909b36a67d0d13abc69608ee1b272198edb364915d6fbcb68d1faeb48af1281b87e49ad9d68a7e259302c11b3884e50eaf8546a223c62927bb5c277402036fa8869a2dd9823ff4606d672990b0a20c5c7168d03343f78500f28d82c2c0c7e65cb11de5d43eff8eb95fd8608cedf02a6f2f8f42f8df49210ae639468bf549381f66a2a8918234832fb1382700975ddda6f0c4476c0ee5e6a2341f8cd46bb4e377c627a9c78ade797f815ad6534c76f0996572dba03d8568a7148af81da0af9cb16d2d6620daa99a49ee9f2bd7ab626185093363ea2832e2ab42f72549e51589bca966e9ae27bcedae8dd6810bf64cf29bb569f8f4dbf770737fdb98e9240b1841802919f12e7b3bc9db5c257be94cc5a0eb5fd798682269022e68e1139ba2d25f25a41b1f04",
    },
  },
  status: "success",
};

export const mockPostCheckCodeResponseError = {
  result: {
    code: {
      status: "notExists",
    },
  },
  status: "error",
};

export const mockPostCheckCodeMockResponse = http.post(
  `${import.meta.env.VITE_CHECK_CODE}`,
  async () => {
    // const url = new URL(request.url);
    // const scenario = url.searchParams.get("scenario");

    await delay(2000);
    return HttpResponse.json(mockPostCheckCodeResponseToken);

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
