import { http, delay, HttpResponse } from "msw";

import { postCheckCodeSuccessSchema } from "./postCheckCodeSuccess.schema";
import { postCheckCodeErrorSchema } from "./postCheckCodeError.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

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

    const parsedSuccess = postCheckCodeSuccessSchema.safeParse(response);
    const parsedError = postCheckCodeErrorSchema.safeParse(response);

    if (parsedSuccess.success) {
      data = parsedSuccess.data;
    } else if (parsedError.success) {
      data = parsedError.data;
    } else {
      throw new Response(`Данные запроса postCheckCode не валидны схеме`);
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
  "result": {
      "token": {
          "token_type": "Bearer",
          "expires_in": 10800,
          "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzY0Y2JhZC04Mjc1LTRiYTctODU0OS04ZmY0Yzg4ZDM3YWYiLCJqdGkiOiJjZWQ1MTlmMWY1NDVlNWJlYjFlNWM0NzVhYzZiY2MwM2ViMWQ5NjExNzY0YWY0MTU1Zjk2NDExNGUxM2M0NGIwNGJmOWE2MjljMGJmMGVkOCIsImlhdCI6MTc3NTEyNDM1Ny44MDcwODEsIm5iZiI6MTc3NTEyNDM1Ny44MDcwODUsImV4cCI6MTc3NTEzNTE1Ny43MzA1MSwic3ViIjoiNzIwIiwic2NvcGVzIjpbInJlZ2lzdGVyIl19.YSe5Oc_Mm1yH7MZ5jXT0ZsUHBl1LBxTZkQ1mzZDJWqLfT3fIy6ijQZFelCNCBGvMnUwer6gveHvcMe_VnWzk6R_IWMmoqqXmZj4_VNQiNNe-F37fS4GnA8zdFz_arzm7pei-xlWbu8C_D7CRpYBhPVlEcCRnfvTuCHvcW9ZleqzWZ6FIHftVnTmbZnZVD0ZcZ7Sq_P_YSf-XRUFs1XlDWIOaNhBLzSYa19PPlqwlRxoz0NWbWu715cf9crAGvz-VAjdMH33RMQzuJoaseDzlwbkYtdEtf-honX6MIUcAENlDAoMXJ_raMydVAbsDIJpsvgCiSpwfzBe3Fi0DY9eb96bB9fM96drQySZd84mjZOFimNJoaU2Dl3jyo8edbUzf-w-eh-5zjRouOWIZww_VWVzUxBET-1zTOlzbOLvYFjrlfOT5QKutLwaDNyx4jWf2N67zLQIancyw6y4AjZG8bA8cxOyTWvVaVN03x8CLIjBfh5NURYGSt5U8CRiYjDmL7Euxn_LvFe7WwGhHDbboEfS9axdi8DtyAone6oWWTGtHiHxwcLxIENxkY3dK-hUsHxcRp_NwbQoIV9uXDfcAaKhDOEbjzyFrpD3ULp1IS7LtvTATaMiIDFyP70BtdWGYk58rasGxY6yqnoaeqZejUCDeULFZh-AonbIl-FqkzTE",
          "refresh_token": "def502004b1e5eeaccf290fc9b1da621b063c0a97a5e54a66b2049dd4368df19f13dff79a77689bc7c6e55a9d065b94a9bb52fbd749d4277b8b6ca06d74190125b0050cbc1f497e606bcf53f11d5dff0bafe1564d1587cf510d6a6e3080add39bb864cf472f3254adc7663cf84a479b3e48526099a90c578cb6e9b0d6bae09c142d54f130f2cef1257a71090432370e23c3804270acaa30c48bf41d9eb266e59d83d2c9055d7bba839e58eb266f409310f062996b8cb267e98298601945aba228ff22b386e2cc5b33d476fb094aab8f49fe8cac63d2c2e70bc22bb4fa9f68a457282ca03c6097e45ed288eaa586da06724ce36394185aeeb842b40a708ae354aad2eb4a0f306df9c7170da8803a0896f7fd2f1bf66966713f37227043b1270d48ac9d808edc6a131f1620d39b4bb2aab7e8cdee01ac313d15290ffa64bd9ebb40e7cc4369ed4e89b44c08ded643a7571e6ad3077ecf94753cc1e569f27d32bc28c81323ee62f4d8b7c6b9d18866de49b773930165d5fb58282e614fb7570f9a80a0a9b0bd37092979b6eed8f0b6ae412"
      }
  },
  "status": "success"
}

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
  },
);
