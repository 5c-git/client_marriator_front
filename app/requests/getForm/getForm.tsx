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
export const mockStep1ResponseSuccess = {
    "result": {
        "formData": [
            {
                "inputType": "select",
                "name": "nalogstatus",
                "value": "",
                "disabled": false,
                "options": [
                    {
                        "value": "nalogstatus_samozanyatyj",
                        "label": "Самозанятый",
                        "disabled": false
                    },
                    {
                        "value": "nalogstatus_fiz_lico",
                        "label": "Физическое лицо",
                        "disabled": false
                    }
                ],
                "validation": "default",
                "placeholder": "Налоговый статус",
                "helperInfo": {
                    "link": {
                        "path": "https://lknpd.nalog.ru/auth/login",
                        "text": "Стань самозанятым",
                        "type": "external"
                    }
                }
            },
            {
                "inputType": "select",
                "name": "gov",
                "value": "",
                "disabled": false,
                "options": [
                    {
                        "value": "57313171-02e4-11e5-93a5-10bf48d7f390",
                        "label": "АБХАЗИЯ",
                        "disabled": false
                    },
                    {
                        "value": "f78a8892-01be-11db-9853-000423ba5914",
                        "label": "АЗЕРБАЙДЖАН",
                        "disabled": false
                    },
                    {
                        "value": "0724a7b5-01c7-11db-9853-000423ba5914",
                        "label": "АРМЕНИЯ",
                        "disabled": false
                    },
                    {
                        "value": "ceac2a2b-3729-11e8-bfc4-10bf48d7f390",
                        "label": "АФГАНИСТАН",
                        "disabled": false
                    },
                    {
                        "value": "0724a7c7-01c7-11db-9853-000423ba5914",
                        "label": "БЕЛАРУСЬ",
                        "disabled": false
                    },
                    {
                        "value": "42463204-236a-11ef-8627-6cb3110f7042",
                        "label": "БУРКИНА-ФАСО",
                        "disabled": false
                    },
                    {
                        "value": "a871ff35-c0e0-11ee-8622-6cb3110f7042",
                        "label": "БУРУНДИ",
                        "disabled": false
                    },
                    {
                        "value": "dab5d2ad-f708-11e9-bd52-10bf48d7f390",
                        "label": "ВЕНГРИЯ",
                        "disabled": false
                    },
                    {
                        "value": "e37b4e48-04cf-11df-a0a2-005056c00008",
                        "label": "ГЕРМАНИЯ",
                        "disabled": false
                    },
                    {
                        "value": "3c060fc4-4de7-11e3-9400-10bf48d7f390",
                        "label": "ГРУЗИЯ",
                        "disabled": false
                    },
                    {
                        "value": "0a72df7e-4eaa-11e8-8c95-10bf48d7f390",
                        "label": "ЕГИПЕТ",
                        "disabled": false
                    },
                    {
                        "value": "dddeda3e-587b-11e1-a6c8-005056c00008",
                        "label": "ИТАЛИЯ",
                        "disabled": false
                    },
                    {
                        "value": "59044bf4-01cc-11db-9853-000423ba5914",
                        "label": "КАЗАХСТАН",
                        "disabled": false
                    },
                    {
                        "value": "75d4f234-b0ec-11ed-8616-6cb3110f7042",
                        "label": "КАМЕРУН",
                        "disabled": false
                    },
                    {
                        "value": "efeaef7a-2266-11dd-a83d-000423ba5914",
                        "label": "КАНАДА",
                        "disabled": false
                    },
                    {
                        "value": "b5abdfe0-98a9-11e8-84a2-10bf48d7f390",
                        "label": "КИПР",
                        "disabled": false
                    },
                    {
                        "value": "59044bfa-01cc-11db-9853-000423ba5914",
                        "label": "КИРГИЗИЯ",
                        "disabled": false
                    },
                    {
                        "value": "fd66ff17-0c1e-11ed-860d-6cb3110f7042",
                        "label": "КИТАЙ",
                        "disabled": false
                    },
                    {
                        "value": "145af002-02a6-11ed-860d-6cb3110f7042",
                        "label": "КУБА",
                        "disabled": false
                    },
                    {
                        "value": "1356bcf9-533e-11e3-9400-10bf48d7f390",
                        "label": "ЛАТВИЯ",
                        "disabled": false
                    },
                    {
                        "value": "9d9b937a-002b-11ec-85fc-6cb3110f7042",
                        "label": "ЛИВИЯ",
                        "disabled": false
                    },
                    {
                        "value": "1356bcfa-533e-11e3-9400-10bf48d7f390",
                        "label": "ЛИТВА",
                        "disabled": false
                    },
                    {
                        "value": "90a946b6-2da1-11eb-85e8-6cb3110f7042",
                        "label": "ЛЮКСЕМБУРГ",
                        "disabled": false
                    },
                    {
                        "value": "300667bd-12ee-43ff-814d-527fd46aa53b",
                        "label": "Лицо без гражданства",
                        "disabled": false
                    },
                    {
                        "value": "60f60184-c090-11e8-a8b6-10bf48d7f390",
                        "label": "МАРОККО",
                        "disabled": false
                    },
                    {
                        "value": "bc7b3cc9-01cc-11db-9853-000423ba5914",
                        "label": "МОЛДОВА",
                        "disabled": false
                    },
                    {
                        "value": "0871e53f-5ce0-11e0-9ef3-005056c00008",
                        "label": "МОЛДОВА, РЕСПУБЛИКА",
                        "disabled": false
                    },
                    {
                        "value": "ad4e7246-76d5-11ed-8612-6cb3110f7042",
                        "label": "МОНГОЛИЯ",
                        "disabled": false
                    },
                    {
                        "value": "bc7b3ce3-01cc-11db-9853-000423ba5914",
                        "label": "ПАНАМА",
                        "disabled": false
                    },
                    {
                        "value": "24ff4468-f6a0-11e7-8c84-10bf48d7f390",
                        "label": "ПОЛЬША",
                        "disabled": false
                    },
                    {
                        "value": "982d33e2-bee6-453a-992e-11d13fa66fa7",
                        "label": "РОССИЯ",
                        "disabled": false
                    },
                    {
                        "value": "c8b63bb6-3030-11e0-aeae-005056c00008",
                        "label": "СЕРБИЯ",
                        "disabled": false
                    },
                    {
                        "value": "49a5e744-31af-11df-a504-005056c00008",
                        "label": "СОЕДИНЕННОЕ КОРОЛЕВСТВО",
                        "disabled": false
                    },
                    {
                        "value": "e55a02e4-2cc5-11e3-808f-10bf48d7f390",
                        "label": "СОЕДИНЕННЫЕ ШТАТЫ",
                        "disabled": false
                    },
                    {
                        "value": "1c256fef-01cd-11db-9853-000423ba5914",
                        "label": "ТАДЖИКИСТАН",
                        "disabled": false
                    },
                    {
                        "value": "348b088b-a817-11e7-85d1-10bf48d7f390",
                        "label": "ТУНИС",
                        "disabled": false
                    },
                    {
                        "value": "1c256ff8-01cd-11db-9853-000423ba5914",
                        "label": "ТУРКМЕНИЯ",
                        "disabled": false
                    },
                    {
                        "value": "f73533a1-8d4f-11e7-b98b-10bf48d7f390",
                        "label": "ТУРЦИЯ",
                        "disabled": false
                    },
                    {
                        "value": "1c257005-01cd-11db-9853-000423ba5914",
                        "label": "УЗБЕКИСТАН",
                        "disabled": false
                    },
                    {
                        "value": "1c256ffc-01cd-11db-9853-000423ba5914",
                        "label": "УКРАИНА",
                        "disabled": false
                    },
                    {
                        "value": "c8903727-0c28-11e0-adab-005056c00008",
                        "label": "ФИНЛЯНДИЯ",
                        "disabled": false
                    },
                    {
                        "value": "48398b72-6864-11e7-b49c-10bf48d7f390",
                        "label": "ЦЕНТРАЛЬНО-АФРИКАНСКАЯ РЕСПУБЛИКА",
                        "disabled": false
                    },
                    {
                        "value": "73894e5d-324a-11e6-af35-10bf48d7f390",
                        "label": "ШВЕЦИЯ",
                        "disabled": false
                    },
                    {
                        "value": "68345565-39d6-11ef-8628-6cb3110f7042",
                        "label": "ШРИ-ЛАНКА",
                        "disabled": false
                    },
                    {
                        "value": "1356bcfb-533e-11e3-9400-10bf48d7f390",
                        "label": "ЭСТОНИЯ",
                        "disabled": false
                    },
                    {
                        "value": "48398b71-6864-11e7-b49c-10bf48d7f390",
                        "label": "ЮЖНАЯ АФРИКА",
                        "disabled": false
                    }
                ],
                "validation": "default",
                "placeholder": "Гражданство"
            },
            {
                "inputType": "photoCheckbox",
                "name": "testitem",
                "value": [],
                "disabled": false,
                "options": [
                    {
                        "value": "c0e077b8-d11d-11eb-85fa-6cb3110f7042",
                        "label": "Безопасность",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/30-img/z_5e8d118137.jpg"
                    },
                    {
                        "value": "a8346d0f-0bda-11ec-85fe-6cb3110f7042",
                        "label": "Бэк-офис",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/29-img/11.jpg"
                    },
                    {
                        "value": "9d503afd-d10f-11eb-85fa-6cb3110f7042",
                        "label": "Доставка",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/28-img/15622126154157.jpg"
                    },
                    {
                        "value": "dfe7f4b4-a9c2-11e1-9eea-000c29a5f546",
                        "label": "Досуг",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/27-img/i (1).webp"
                    },
                    {
                        "value": "4ecbfcda-6ab2-11ed-8612-6cb3110f7042",
                        "label": "ЖКХ",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/26-img/predlagaetsya-uzhestochit-sankcii-za-narushenie-normativov-obespecheniya-naseleniya-1200.jpg"
                    },
                    {
                        "value": "5585f06d-e45e-11e6-86d3-10bf48d7f390",
                        "label": "Колл-центр",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/25-img/i (2).webp"
                    },
                    {
                        "value": "5585f06e-e45e-11e6-86d3-10bf48d7f390",
                        "label": "Магазин",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "5585f06f-e45e-11e6-86d3-10bf48d7f390",
                        "label": "Маркетинг",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "5585f070-e45e-11e6-86d3-10bf48d7f390",
                        "label": "Общепит",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "d051cc13-6aa8-11ed-8612-6cb3110f7042",
                        "label": "Производство",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "5585f071-e45e-11e6-86d3-10bf48d7f390",
                        "label": "Рекрутинг",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "1a240505-6aab-11ed-8612-6cb3110f7042",
                        "label": "Сельское хозяйство",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "e058f2e2-e46a-11e6-86d3-10bf48d7f390",
                        "label": "Склад",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "directory_activities1",
                        "label": "Строитель",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    },
                    {
                        "value": "directory_activities_A5Yhhd0VS3hXFEdkXxjTTZZh7LxZoi",
                        "label": "Супервайзер",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/31-img/23_1b02308d175731c3464fa7cce1870164.jpg",
                        "text": "Супервайзер",
                        "details": {
                            "text": "Супервайзер",
                            "details": "Супервайзер",
                            "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/31-imgDetail/predlagaetsya-uzhestochit-sankcii-za-narushenie-normativov-obespecheniya-naseleniya-1200.jpg"
                        }
                    },
                    {
                        "value": "dfbcea8e-0bd9-11ec-85fe-6cb3110f7042",
                        "label": "Финансы",
                        "disabled": false,
                        "img": "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png"
                    }
                ],
                "validation": "default",
                "heading": "Выбери чем хочешь заниматься",
                "dividerTop": true,
                "dividerBottom": true
            }
        ],
        "step": 1,
        "type": "needRequired"
    },
    "status": "success"
};
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
