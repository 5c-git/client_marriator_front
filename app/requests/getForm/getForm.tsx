import { http, delay, HttpResponse } from "msw";

import {
  GetFormInputsSuccess,
  getFormInputsSuccessSchema,
} from "./getForm.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getFormKeys = ["getForm"];

export const getForm = async (
  accessToken: string,
  step: number,
): Promise<GetFormInputsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_FORM);

    url.searchParams.append("step", step.toString());

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = getFormInputsSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(
        `Данные запроса getForm, шаг - ${step} не валидны схеме`,
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
export const mockStep4ResponseSuccess = {
  "result": {
      "formData": [
          {
              "inputType": "text",
              "name": "X2CSwnQZntQEdPc1Xq5lgeLahytrna",
              "value": "",
              "disabled": false,
              "validation": "default",
              "placeholder": "Фамилия*"
          },
          {
              "inputType": "text",
              "name": "QsZI3i3WLzO5rNO2ZJjXBtx9nJBosd",
              "value": "",
              "disabled": false,
              "validation": "default",
              "placeholder": "Имя*",
              "pregValue": "/^[а-яА-ЯёЁ-]{1,140}$/u",
              "pregText": "Разрешены только буквы русского алфавита (заглавные и строчные) и дефис. Максимальная длина - 140 символов. Цифры и специальные символы запрещены."
          },
          {
              "inputType": "checkbox",
              "name": "qfyZsDpYNPdRGxZFdPrbNPZhR5oHI5",
              "value": false,
              "label": "Есть отчество",
              "disabled": false,
              "validation": "none"
          },
          {
              "inputType": "select",
              "name": "PuGyZOcha8UkkMywTQw2Wa4DcLlD5m",
              "value": "",
              "disabled": false,
              "options": [
                  {
                      "value": "directory_age_QEHdyudK0aqJLIri74Q1yBvKVQ2TPB",
                      "label": "16",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_5A3mDbMYbHpYDBaWSKW3Zx75JPgjZc",
                      "label": "17",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_ocVO5J9l420eOrfNn4fTRJGlcQPTVj",
                      "label": "18",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_7ee1n5WzxlUVeK7jW2Rgk8O1W8L8Sb",
                      "label": "19",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_pc5AOqbqVueQNGN5rwclZouQc7gbm2",
                      "label": "20",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_zUaUL7IWXpcIR9oo7FSo5nUKh002KU",
                      "label": "21",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_eKBTF8af3a3vdGXDXt3PxHsgMO4EhD",
                      "label": "22",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_VCqnRS8pQKP99qMF31ymstnaNqemwj",
                      "label": "23",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_7Zrj5DB7350Y0FxVjUE8m4SVmsswLT",
                      "label": "24",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_22zkC6sl4qo0ITOKopxhBwwm0FiDcD",
                      "label": "25",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_jNnm2raFfQQ2c0DEWn0jOaXc2afZoT",
                      "label": "26",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_dobJSzuU94Ta9RitXi4MV2Y7sxhI3G",
                      "label": "27",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_WKEjM9OSoYDngcJoalG68SqoRI0mpS",
                      "label": "28",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_tHAR0mbV2B8sd3bOKIGU75JavZqQ8l",
                      "label": "29",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_IrlSYHmEbfGXS8eHxrqzFvcqaO9Hsj",
                      "label": "30",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_38r3ILvjQQjRZmSnXD6gAgYUUcDQgK",
                      "label": "32",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_uOBGEiC7Hlgy77eH5ZfDRExc3f0cMv",
                      "label": "33",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_Z1bXhDwVKTnl3fqTZPzopcWPQsFVUN",
                      "label": "34",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_UZ0kpzJSqLDaVaBKP3AojOrAtOUxwB",
                      "label": "35",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_iHBJ0gGFzYsHMveQzoqKEvvjVXeJaN",
                      "label": "36",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_awhIrA5X2IlQYAuwAuNPlNE6CrpAfJ",
                      "label": "37",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_otzcgoRBajPkxCqtxHzrHRgvnwbWC1",
                      "label": "38",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_jXbuY5DvEHZ038KTdwgfAFfj7PwA3Q",
                      "label": "39",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_ytv24VWHYLFjIhoEzfdKrcZhUNUak4",
                      "label": "40",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_3OGcJSGt9FwPFKU6NPhQl3JQNFAKqX",
                      "label": "41",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_2NHHNyKPJ7D6V3UbHsVeNZ0zyEwmy6",
                      "label": "42",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_xdTomyLLMmxDLsin3t1lhVFUgiZdoN",
                      "label": "43",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_uQe7hbhyLFoRXv84aZBHegi3OxXPBW",
                      "label": "44",
                      "disabled": false
                  },
                  {
                      "value": "directory_age_Eo6CoI1Uie9QhC53udG9aD3ZNrz029",
                      "label": "45",
                      "disabled": false
                  }
              ],
              "validation": "default",
              "placeholder": "Возраст (полных лет) *"
          },
          {
              "inputType": "select",
              "name": "unC20BLqzsZbEEGWlnT663EkueUBUi",
              "value": "",
              "disabled": false,
              "options": [
                  {
                      "value": "female_gender",
                      "label": "Женский",
                      "disabled": false
                  },
                  {
                      "value": "male_gender",
                      "label": "Мужской",
                      "disabled": false
                  }
              ],
              "validation": "default",
              "placeholder": "Пол*"
          },
          {
              "inputType": "select",
              "name": "pnIXSuSWPMsx1T5IVWU7x9SNBZ7Ss4",
              "value": "",
              "disabled": false,
              "options": [
                  {
                      "value": "mess-Telegram",
                      "label": "Telegram",
                      "disabled": false
                  },
                  {
                      "value": "mess-Viber",
                      "label": "Viber",
                      "disabled": false
                  },
                  {
                      "value": "mess-WhatsApp",
                      "label": "WhatsApp",
                      "disabled": false
                  },
                  {
                      "value": "mess-not",
                      "label": "Я-не-пользуюсь",
                      "disabled": false
                  }
              ],
              "validation": "default",
              "heading": "Выбери мессенджер:*",
              "placeholder": "",
              "dividerBottom": true
          },
          {
              "inputType": "text",
              "name": "GrG3qV8FOL21rUJsTb5neTgbJcfUQG",
              "value": "",
              "disabled": false,
              "validation": "none",
              "heading": "Модель телефона",
              "placeholder": "",
              "helperInfo": {
                  "text": "Модель телефона"
              },
              "default": "iphone"
          },
          {
              "inputType": "text",
              "name": "5acj54AD6sAKKnitfT6npuXuEKmkur",
              "value": "",
              "disabled": false,
              "validation": "none",
              "placeholder": "IMEI"
          },
          {
              "inputType": "text",
              "name": "WJWEOeCGKJMKHNrlDbat5QfuEXXo4a",
              "value": "",
              "disabled": false,
              "validation": "none",
              "placeholder": "Код супервайзера",
              "helperInfo": {
                  "text": "При регистрации с помощью супервайзера введите его уникальный код"
              }
          }
      ],
      "step": 4,
      "type": "needRequired"
  },
  "status": "success"
};


export const mockResponseError = {};

export const getFormMockResponse = http.get(
  `${import.meta.env.VITE_GET_FORM}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const step = url.searchParams.get("step");

    if (step === "4") {
      await delay(2000);
      return HttpResponse.json(mockStep4ResponseSuccess);
    } else if (step === "2") {
      // await delay(2000);
      // return HttpResponse.json(mockStep2ResponseSuccess);
    }

    // const scenario = "step1";
    // const scenario = "error";

    // if (scenario === "success") {
    //   await delay(2000);
    //   return HttpResponse.json(mockStep1ResponseSuccess);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  },
);
