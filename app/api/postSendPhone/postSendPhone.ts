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
      code: 1111,
      ttl: 120,
    },
  },
  status: "success",
};

export const mockPOstSendPhoneResponseModeration = {
  result: {
    type: "moderation",
    token: {
      token_type: "Bearer",
      expires_in: 604800,
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzY0Y2JhZC04Mjc1LTRiYTctODU0OS04ZmY0Yzg4ZDM3YWYiLCJqdGkiOiJhYmIzMWRiYTUwMGI0NTNkZDYzYzQzNDU3N2M3YmQ4MDk5NzY3MjJmNzYxMjc0NTk5MjZmMzc1M2Q4MGM4ZTY2Y2NiZTU3OGZiNTc0NmU4MSIsImlhdCI6MTc3MTUwNTQ3Ni4wMzg2NzUsIm5iZiI6MTc3MTUwNTQ3Ni4wMzg2NzcsImV4cCI6MTc3MjExMDI3Ni4wMzIyMzUsInN1YiI6IjY0MiIsInNjb3BlcyI6WyJjaGVja1BpbiJdfQ.bZVqzAKtBuwzoUrCzDQT1mE1xkuLcP0yGuShx2q7xBp6G34D5mtZrtrZZrbQ002F8lki3e_tfLsm1zhzVHPqNQQEtOUtw4ra8bUmNLP2DT4AE5pdiy8wrCWHdPa0KtR1uD0xy67oIMCooZWzPUWGTnDeF2n-LHKLH_VHu1j3TFiog-ooe7Nc-WD6lw53S4x7EmmtLpHuOSCc23sruhx5qlfPY3RoTKvCAp2HqyS5Rdk3FevH8frj-WGqrpeEXydRtjkSNdEejw8Ri35BNmhpsiV8C-ISsBsx5xE0FJIvR_NMLk7B90aSUCApTnO6w271BEav1nHCcpY0NFEAMS03H25JgyfxR0R9YlWqxzwhMP_FcE_ZFiSNDjKAhYPIXk4JAxQMg46lDuHx8nSBoH9RgrPkgb94u8EWen_AkIbINUoAeiVg8siAzXWgW_igO6vjMsVAYd58dcR6gicXsA5uonDluXqk8cqIi9RecMWAO9PoYApSZTw3hyBF8x_pg8fklFuVBmiHi9cHWSW49vqVo0fl8lSoNFt2iUWzLhLhEowWRqeL5_0am9zE4fRoXKTMDQaln8fcmQnlO--W9H4DPzxPWgP9GlT7ckfPTLIwXoeJ2Ca-YrU4nHIm6wUAVbTGxVS_1Y1j7-vshmpASVeTI3OBpxYf_VgutiHs79nwg4U",
      refresh_token:
        "def50200d611083697305b07f3da19d0731b91178955e8e1251c19d34ff92b45460ab8b4edf78a983db05b989e230a8d692b9ac3c0bb75f4fad07d18ac5e1fc404110f3b63a0902045563e825f885c68ad5bab2b8a8f0074297e73eb4f4c1dae46b99cbbc16e9f77f175a81cc4ca10d0fd27ffe8243c4194d669c92cc1855a81e08ac1f927b2c770fcb2d65a8ff743376540c24a0f08b71a6eae7cd848896f1387bc6d6d973b798c86706e2c3e37685b67761956d44dbeb05f72a0d09007eb7f395e44699beda9fc23587e60c7868d4d9288a404493e3ea1e0ceec4786b62cc93391862abebfa884771c87a5f4a42beb46a543b0234a8511c27de4570e26a05c62600128cce0412e37a7c47bbefb90eaf515d326ad4d7f802e3cd269db3299e5aedd61dbf533c28edc98e3387b8ec5ccdf905c64754fe5eb99a374da69f09ec2403100b018d8118e2ab2a2ebccd6a7488f8ccefa4df5b1fce6ec0e0c437fc3b3187823f15998842c4349a78d23704c087e82e2e378b563559ab477276d999f57fb35b2d1859cc5262f81f7db809d20b9",
    },
  },
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
    }
    // else if (scenario === "auth") {
    //   await delay(2000);
    //   return HttpResponse.json(mockPostSendPhoneResponseAuth);
    // } else if (scenario === "timer") {
    //   await delay(2000);
    //   return HttpResponse.json(mockPostSendPhoneResponseErrorTimer);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  },
);
