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
  result: {
    formData: [
      {
        inputType: "select",
        name: "nalogstatus",
        value: "",
        disabled: false,
        options: [
          {
            value: "nalogstatus_samozanyatyj",
            label: "Самозанятый",
            disabled: false,
          },
          {
            value: "nalogstatus_fiz_lico",
            label: "Физическое лицо",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Налоговый статус",
        helperInfo: {
          link: {
            path: "https://lknpd.nalog.ru/auth/login",
            text: "Стань самозанятым",
            type: "external",
          },
        },
      },
      {
        inputType: "select",
        name: "gov",
        value: "",
        disabled: false,
        options: [
          {
            value: "57313171-02e4-11e5-93a5-10bf48d7f390",
            label: "АБХАЗИЯ",
            disabled: false,
          },
          {
            value: "f78a8892-01be-11db-9853-000423ba5914",
            label: "АЗЕРБАЙДЖАН",
            disabled: false,
          },
          {
            value: "0724a7b5-01c7-11db-9853-000423ba5914",
            label: "АРМЕНИЯ",
            disabled: false,
          },
          {
            value: "ceac2a2b-3729-11e8-bfc4-10bf48d7f390",
            label: "АФГАНИСТАН",
            disabled: false,
          },
          {
            value: "0724a7c7-01c7-11db-9853-000423ba5914",
            label: "БЕЛАРУСЬ",
            disabled: false,
          },
          {
            value: "42463204-236a-11ef-8627-6cb3110f7042",
            label: "БУРКИНА-ФАСО",
            disabled: false,
          },
          {
            value: "a871ff35-c0e0-11ee-8622-6cb3110f7042",
            label: "БУРУНДИ",
            disabled: false,
          },
          {
            value: "dab5d2ad-f708-11e9-bd52-10bf48d7f390",
            label: "ВЕНГРИЯ",
            disabled: false,
          },
          {
            value: "e37b4e48-04cf-11df-a0a2-005056c00008",
            label: "ГЕРМАНИЯ",
            disabled: false,
          },
          {
            value: "3c060fc4-4de7-11e3-9400-10bf48d7f390",
            label: "ГРУЗИЯ",
            disabled: false,
          },
          {
            value: "0a72df7e-4eaa-11e8-8c95-10bf48d7f390",
            label: "ЕГИПЕТ",
            disabled: false,
          },
          {
            value: "dddeda3e-587b-11e1-a6c8-005056c00008",
            label: "ИТАЛИЯ",
            disabled: false,
          },
          {
            value: "59044bf4-01cc-11db-9853-000423ba5914",
            label: "КАЗАХСТАН",
            disabled: false,
          },
          {
            value: "75d4f234-b0ec-11ed-8616-6cb3110f7042",
            label: "КАМЕРУН",
            disabled: false,
          },
          {
            value: "efeaef7a-2266-11dd-a83d-000423ba5914",
            label: "КАНАДА",
            disabled: false,
          },
          {
            value: "b5abdfe0-98a9-11e8-84a2-10bf48d7f390",
            label: "КИПР",
            disabled: false,
          },
          {
            value: "59044bfa-01cc-11db-9853-000423ba5914",
            label: "КИРГИЗИЯ",
            disabled: false,
          },
          {
            value: "fd66ff17-0c1e-11ed-860d-6cb3110f7042",
            label: "КИТАЙ",
            disabled: false,
          },
          {
            value: "145af002-02a6-11ed-860d-6cb3110f7042",
            label: "КУБА",
            disabled: false,
          },
          {
            value: "1356bcf9-533e-11e3-9400-10bf48d7f390",
            label: "ЛАТВИЯ",
            disabled: false,
          },
          {
            value: "9d9b937a-002b-11ec-85fc-6cb3110f7042",
            label: "ЛИВИЯ",
            disabled: false,
          },
          {
            value: "1356bcfa-533e-11e3-9400-10bf48d7f390",
            label: "ЛИТВА",
            disabled: false,
          },
          {
            value: "90a946b6-2da1-11eb-85e8-6cb3110f7042",
            label: "ЛЮКСЕМБУРГ",
            disabled: false,
          },
          {
            value: "300667bd-12ee-43ff-814d-527fd46aa53b",
            label: "Лицо без гражданства",
            disabled: false,
          },
          {
            value: "60f60184-c090-11e8-a8b6-10bf48d7f390",
            label: "МАРОККО",
            disabled: false,
          },
          {
            value: "bc7b3cc9-01cc-11db-9853-000423ba5914",
            label: "МОЛДОВА",
            disabled: false,
          },
          {
            value: "0871e53f-5ce0-11e0-9ef3-005056c00008",
            label: "МОЛДОВА, РЕСПУБЛИКА",
            disabled: false,
          },
          {
            value: "ad4e7246-76d5-11ed-8612-6cb3110f7042",
            label: "МОНГОЛИЯ",
            disabled: false,
          },
          {
            value: "bc7b3ce3-01cc-11db-9853-000423ba5914",
            label: "ПАНАМА",
            disabled: false,
          },
          {
            value: "24ff4468-f6a0-11e7-8c84-10bf48d7f390",
            label: "ПОЛЬША",
            disabled: false,
          },
          {
            value: "982d33e2-bee6-453a-992e-11d13fa66fa7",
            label: "РОССИЯ",
            disabled: false,
          },
          {
            value: "c8b63bb6-3030-11e0-aeae-005056c00008",
            label: "СЕРБИЯ",
            disabled: false,
          },
          {
            value: "49a5e744-31af-11df-a504-005056c00008",
            label: "СОЕДИНЕННОЕ КОРОЛЕВСТВО",
            disabled: false,
          },
          {
            value: "e55a02e4-2cc5-11e3-808f-10bf48d7f390",
            label: "СОЕДИНЕННЫЕ ШТАТЫ",
            disabled: false,
          },
          {
            value: "1c256fef-01cd-11db-9853-000423ba5914",
            label: "ТАДЖИКИСТАН",
            disabled: false,
          },
          {
            value: "348b088b-a817-11e7-85d1-10bf48d7f390",
            label: "ТУНИС",
            disabled: false,
          },
          {
            value: "1c256ff8-01cd-11db-9853-000423ba5914",
            label: "ТУРКМЕНИЯ",
            disabled: false,
          },
          {
            value: "f73533a1-8d4f-11e7-b98b-10bf48d7f390",
            label: "ТУРЦИЯ",
            disabled: false,
          },
          {
            value: "1c257005-01cd-11db-9853-000423ba5914",
            label: "УЗБЕКИСТАН",
            disabled: false,
          },
          {
            value: "1c256ffc-01cd-11db-9853-000423ba5914",
            label: "УКРАИНА",
            disabled: false,
          },
          {
            value: "c8903727-0c28-11e0-adab-005056c00008",
            label: "ФИНЛЯНДИЯ",
            disabled: false,
          },
          {
            value: "48398b72-6864-11e7-b49c-10bf48d7f390",
            label: "ЦЕНТРАЛЬНО-АФРИКАНСКАЯ РЕСПУБЛИКА",
            disabled: false,
          },
          {
            value: "73894e5d-324a-11e6-af35-10bf48d7f390",
            label: "ШВЕЦИЯ",
            disabled: false,
          },
          {
            value: "68345565-39d6-11ef-8628-6cb3110f7042",
            label: "ШРИ-ЛАНКА",
            disabled: false,
          },
          {
            value: "1356bcfb-533e-11e3-9400-10bf48d7f390",
            label: "ЭСТОНИЯ",
            disabled: false,
          },
          {
            value: "48398b71-6864-11e7-b49c-10bf48d7f390",
            label: "ЮЖНАЯ АФРИКА",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "Гражданство",
      },
      {
        inputType: "photoCheckbox",
        name: "testitem",
        value: [],
        disabled: false,
        options: [
          {
            value: "c0e077b8-d11d-11eb-85fa-6cb3110f7042",
            label: "Безопасность",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/30-img/z_5e8d118137.jpg",
          },
          {
            value: "a8346d0f-0bda-11ec-85fe-6cb3110f7042",
            label: "Бэк-офис",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/29-img/11.jpg",
          },
          {
            value: "9d503afd-d10f-11eb-85fa-6cb3110f7042",
            label: "Доставка",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/28-img/15622126154157.jpg",
          },
          {
            value: "dfe7f4b4-a9c2-11e1-9eea-000c29a5f546",
            label: "Досуг",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/27-img/i (1).webp",
          },
          {
            value: "4ecbfcda-6ab2-11ed-8612-6cb3110f7042",
            label: "ЖКХ",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/26-img/predlagaetsya-uzhestochit-sankcii-za-narushenie-normativov-obespecheniya-naseleniya-1200.jpg",
          },
          {
            value: "5585f06d-e45e-11e6-86d3-10bf48d7f390",
            label: "Колл-центр",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/25-img/i (2).webp",
          },
          {
            value: "5585f06e-e45e-11e6-86d3-10bf48d7f390",
            label: "Магазин",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "5585f06f-e45e-11e6-86d3-10bf48d7f390",
            label: "Маркетинг",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "5585f070-e45e-11e6-86d3-10bf48d7f390",
            label: "Общепит",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "d051cc13-6aa8-11ed-8612-6cb3110f7042",
            label: "Производство",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "5585f071-e45e-11e6-86d3-10bf48d7f390",
            label: "Рекрутинг",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "1a240505-6aab-11ed-8612-6cb3110f7042",
            label: "Сельское хозяйство",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "e058f2e2-e46a-11e6-86d3-10bf48d7f390",
            label: "Склад",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities1",
            label: "Строитель",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities_A5Yhhd0VS3hXFEdkXxjTTZZh7LxZoi",
            label: "Супервайзер",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/31-img/23_1b02308d175731c3464fa7cce1870164.jpg",
            text: "Супервайзер",
            details: {
              text: "Супервайзер",
              details: "Супервайзер",
              img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/31-imgDetail/predlagaetsya-uzhestochit-sankcii-za-narushenie-normativov-obespecheniya-naseleniya-1200.jpg",
            },
          },
          {
            value: "dfbcea8e-0bd9-11ec-85fe-6cb3110f7042",
            label: "Финансы",
            disabled: false,
            img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
        ],
        validation: "default",
        heading: "Выбери чем хочешь заниматься",
        dividerTop: true,
        dividerBottom: true,
      },
    ],
    step: 1,
    type: "needRequired",
  },
  status: "success",
};
export const mockStep4ResponseSuccess = {
  result: {
    formData: [
      {
        inputType: "text",
        name: "X2CSwnQZntQEdPc1Xq5lgeLahytrna",
        value: "",
        disabled: false,
        validation: "default",
        placeholder: "\u0424\u0430\u043c\u0438\u043b\u0438\u044f*",
        pregValue:
          "L14oPz0uezEsMTQwfSQpW9CwLdGP0JAt0K\/RkdCBLV0rKD86IFvQsC3Rj9CQLdCv0ZHQgS1dKykqID8kLw==",
        pregText:
          "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0431\u0443\u043a\u0432\u044b \u0440\u0443\u0441\u0441\u043a\u043e\u0433\u043e \u0430\u043b\u0444\u0430\u0432\u0438\u0442\u0430 (\u0437\u0430\u0433\u043b\u0430\u0432\u043d\u044b\u0435 \u0438 \u0441\u0442\u0440\u043e\u0447\u043d\u044b\u0435) \u0438 \u0434\u0435\u0444\u0438\u0441. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043b\u0438\u043d\u0430 - 140 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432. \u0426\u0438\u0444\u0440\u044b \u0438 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u0441\u0438\u043c\u0432\u043e\u043b\u044b \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u044b.",
      },
      {
        inputType: "text",
        name: "QsZI3i3WLzO5rNO2ZJjXBtx9nJBosd",
        value: "",
        disabled: false,
        validation: "default",
        placeholder: "\u0418\u043c\u044f*",
        pregValue:
          "L14oPz0uezEsMTQwfSQpW9CwLdGP0JAt0K\/RkdCBLV0rKD86IFvQsC3Rj9CQLdCv0ZHQgS1dKykqID8kLw==",
        pregText:
          "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0431\u0443\u043a\u0432\u044b \u0440\u0443\u0441\u0441\u043a\u043e\u0433\u043e \u0430\u043b\u0444\u0430\u0432\u0438\u0442\u0430 (\u0437\u0430\u0433\u043b\u0430\u0432\u043d\u044b\u0435 \u0438 \u0441\u0442\u0440\u043e\u0447\u043d\u044b\u0435) \u0438 \u0434\u0435\u0444\u0438\u0441. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043b\u0438\u043d\u0430 - 140 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432. \u0426\u0438\u0444\u0440\u044b \u0438 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u0441\u0438\u043c\u0432\u043e\u043b\u044b \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u044b.",
      },
      {
        inputType: "checkbox",
        name: "qfyZsDpYNPdRGxZFdPrbNPZhR5oHI5",
        value: false,
        label:
          "\u0415\u0441\u0442\u044c \u043e\u0442\u0447\u0435\u0441\u0442\u0432\u043e",
        disabled: false,
        validation: "none",
      },
      {
        inputType: "select",
        name: "PuGyZOcha8UkkMywTQw2Wa4DcLlD5m",
        value: "",
        disabled: false,
        options: [
          {
            value: "directory_age_QEHdyudK0aqJLIri74Q1yBvKVQ2TPB",
            label: "16",
            disabled: false,
          },
          {
            value: "directory_age_5A3mDbMYbHpYDBaWSKW3Zx75JPgjZc",
            label: "17",
            disabled: false,
          },
          {
            value: "directory_age_ocVO5J9l420eOrfNn4fTRJGlcQPTVj",
            label: "18",
            disabled: false,
          },
          {
            value: "directory_age_7ee1n5WzxlUVeK7jW2Rgk8O1W8L8Sb",
            label: "19",
            disabled: false,
          },
          {
            value: "directory_age_pc5AOqbqVueQNGN5rwclZouQc7gbm2",
            label: "20",
            disabled: false,
          },
          {
            value: "directory_age_zUaUL7IWXpcIR9oo7FSo5nUKh002KU",
            label: "21",
            disabled: false,
          },
          {
            value: "directory_age_eKBTF8af3a3vdGXDXt3PxHsgMO4EhD",
            label: "22",
            disabled: false,
          },
          {
            value: "directory_age_VCqnRS8pQKP99qMF31ymstnaNqemwj",
            label: "23",
            disabled: false,
          },
          {
            value: "directory_age_7Zrj5DB7350Y0FxVjUE8m4SVmsswLT",
            label: "24",
            disabled: false,
          },
          {
            value: "directory_age_22zkC6sl4qo0ITOKopxhBwwm0FiDcD",
            label: "25",
            disabled: false,
          },
          {
            value: "directory_age_jNnm2raFfQQ2c0DEWn0jOaXc2afZoT",
            label: "26",
            disabled: false,
          },
          {
            value: "directory_age_dobJSzuU94Ta9RitXi4MV2Y7sxhI3G",
            label: "27",
            disabled: false,
          },
          {
            value: "directory_age_WKEjM9OSoYDngcJoalG68SqoRI0mpS",
            label: "28",
            disabled: false,
          },
          {
            value: "directory_age_tHAR0mbV2B8sd3bOKIGU75JavZqQ8l",
            label: "29",
            disabled: false,
          },
          {
            value: "directory_age_IrlSYHmEbfGXS8eHxrqzFvcqaO9Hsj",
            label: "30",
            disabled: false,
          },
          {
            value: "directory_age_38r3ILvjQQjRZmSnXD6gAgYUUcDQgK",
            label: "32",
            disabled: false,
          },
          {
            value: "directory_age_uOBGEiC7Hlgy77eH5ZfDRExc3f0cMv",
            label: "33",
            disabled: false,
          },
          {
            value: "directory_age_Z1bXhDwVKTnl3fqTZPzopcWPQsFVUN",
            label: "34",
            disabled: false,
          },
          {
            value: "directory_age_UZ0kpzJSqLDaVaBKP3AojOrAtOUxwB",
            label: "35",
            disabled: false,
          },
          {
            value: "directory_age_iHBJ0gGFzYsHMveQzoqKEvvjVXeJaN",
            label: "36",
            disabled: false,
          },
          {
            value: "directory_age_awhIrA5X2IlQYAuwAuNPlNE6CrpAfJ",
            label: "37",
            disabled: false,
          },
          {
            value: "directory_age_otzcgoRBajPkxCqtxHzrHRgvnwbWC1",
            label: "38",
            disabled: false,
          },
          {
            value: "directory_age_jXbuY5DvEHZ038KTdwgfAFfj7PwA3Q",
            label: "39",
            disabled: false,
          },
          {
            value: "directory_age_ytv24VWHYLFjIhoEzfdKrcZhUNUak4",
            label: "40",
            disabled: false,
          },
          {
            value: "directory_age_3OGcJSGt9FwPFKU6NPhQl3JQNFAKqX",
            label: "41",
            disabled: false,
          },
          {
            value: "directory_age_2NHHNyKPJ7D6V3UbHsVeNZ0zyEwmy6",
            label: "42",
            disabled: false,
          },
          {
            value: "directory_age_xdTomyLLMmxDLsin3t1lhVFUgiZdoN",
            label: "43",
            disabled: false,
          },
          {
            value: "directory_age_uQe7hbhyLFoRXv84aZBHegi3OxXPBW",
            label: "44",
            disabled: false,
          },
          {
            value: "directory_age_Eo6CoI1Uie9QhC53udG9aD3ZNrz029",
            label: "45",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder:
          "\u0412\u043e\u0437\u0440\u0430\u0441\u0442 (\u043f\u043e\u043b\u043d\u044b\u0445 \u043b\u0435\u0442) *",
      },
      {
        inputType: "select",
        name: "unC20BLqzsZbEEGWlnT663EkueUBUi",
        value: "",
        disabled: false,
        options: [
          {
            value: "female_gender",
            label: "\u0416\u0435\u043d\u0441\u043a\u0438\u0439",
            disabled: false,
          },
          {
            value: "male_gender",
            label: "\u041c\u0443\u0436\u0441\u043a\u043e\u0439",
            disabled: false,
          },
        ],
        validation: "default",
        placeholder: "\u041f\u043e\u043b*",
      },
      {
        inputType: "select",
        name: "pnIXSuSWPMsx1T5IVWU7x9SNBZ7Ss4",
        value: "",
        disabled: false,
        options: [
          {
            value: "mess-WhatsApp",
            label: "WhatsApp",
            disabled: false,
          },
          {
            value: "mess-Telegram",
            label: "Telegram",
            disabled: false,
          },
          {
            value: "mess-Viber",
            label: "Viber",
            disabled: false,
          },
          {
            value: "mess-not",
            label:
              "\u042f-\u043d\u0435-\u043f\u043e\u043b\u044c\u0437\u0443\u044e\u0441\u044c",
            disabled: false,
          },
        ],
        validation: "default",
        heading:
          "\u0412\u044b\u0431\u0435\u0440\u0438 \u043c\u0435\u0441\u0441\u0435\u043d\u0434\u0436\u0435\u0440:*",
        placeholder: "",
        dividerBottom: true,
      },
      {
        inputType: "autocomplete",
        name: "GrG3qV8FOL21rUJsTb5neTgbJcfUQG",
        value: "c841842f-c0b2-507b-8922-1df7374c0c4d",
        placeholder: "",
        disabled: false,
        options: [
          {
            value: "ddc06da7-2c44-5c1f-b5ce-4219c0410d2b",
            label: "Digma Digma Vox S506",
            disabled: false,
          },
          {
            value: "68da0edf-d9c2-57d3-ad2c-eb3f408f897e",
            label: "Digma Digma Citi Z1",
            disabled: false,
          },
          {
            value: "5656d85f-4944-5c06-8d9c-50aac1436198",
            label: "Digma Digma Linx Fest",
            disabled: false,
          },
          {
            value: "1fc396d4-3a38-5691-bc22-acf4df237671",
            label: "Digma Digma Vox P10 5G",
            disabled: false,
          },
          {
            value: "22ff34d3-30ce-5278-9f17-bfbfea9ec051",
            label: "Digma Digma Citi Z25 5G",
            disabled: false,
          },
          {
            value: "b52b0c04-c465-5fda-bab0-f3c72d7edf8c",
            label: "CAT CAT S53",
            disabled: false,
          },
          {
            value: "4af8a8d7-34ef-5c98-b6b0-9dd6cf06c36d",
            label: "CAT CAT S75",
            disabled: false,
          },
          {
            value: "03373b80-8604-5a20-95ec-bd1cbda7ff7b",
            label: "Ulefone Ulefone Note 18",
            disabled: false,
          },
          {
            value: "c4bfb72b-0644-5e4d-aa61-55d8c1cd6278",
            label: "Ulefone Ulefone Armor 26",
            disabled: false,
          },
          {
            value: "55d50fce-2b6e-5cf2-b9ae-887128363633",
            label: "Doogee Doogee S100",
            disabled: false,
          },
          {
            value: "8988b237-296d-5f0b-8f57-7c2cdf1a73c2",
            label: "Doogee Doogee V Max",
            disabled: false,
          },
          {
            value: "da49f84b-3f4d-5090-ad37-f5b4a6ac38c8",
            label: "Oukitel Oukitel C37",
            disabled: false,
          },
          {
            value: "fa8042a8-bc3d-5e98-870d-ad18b17689cd",
            label: "Oukitel Oukitel WP30",
            disabled: false,
          },
          {
            value: "0fe37f80-6b01-5c82-8ee8-3b01336d3535",
            label: "Blackview Blackview A55 Pro",
            disabled: false,
          },
          {
            value: "0d50737f-c689-5653-a81e-8b75835cb29d",
            label: "Blackview Blackview BV9200",
            disabled: false,
          },
          {
            value: "dbb15536-e204-5bb6-b15f-ad73c9f4bf49",
            label: "Nothing Nothing CMF Phone 2 Pro",
            disabled: false,
          },
          {
            value: "2ca1ef43-3128-502d-8dd1-205b964a9a0a",
            label: "Nothing Nothing Phone (1)",
            disabled: false,
          },
          {
            value: "b109dee0-01f9-568e-b781-2d4751add182",
            label: "Nothing Nothing Phone (2)",
            disabled: false,
          },
          {
            value: "dcfef346-d8a0-55bb-80f8-af7e012863d3",
            label: "Nothing Nothing Phone (2a) Plus",
            disabled: false,
          },
          {
            value: "c422fd29-b7fd-599f-a842-fa3bb9be5c0f",
            label: "Nothing Nothing Phone (3)",
            disabled: false,
          },
          {
            value: "045b0f2f-ff81-556a-b5e8-c60c140e5579",
            label: "Motorola Motorola ThinkPhone",
            disabled: false,
          },
          {
            value: "f8d21fcb-db4d-53e4-bfe8-c62759adbb71",
            label: "Motorola Motorola Moto G05",
            disabled: false,
          },
          {
            value: "f8d68869-6f02-5756-b070-a13a1667711e",
            label: "Motorola Motorola Moto G24",
            disabled: false,
          },
          {
            value: "5921771c-54fc-5f9c-af21-59499c7e8e5c",
            label: "Motorola Motorola Moto G54",
            disabled: false,
          },
          {
            value: "39296674-37c5-53d6-ad0a-70fa22c44631",
            label: "Motorola Motorola Moto G85",
            disabled: false,
          },
          {
            value: "97658364-9e26-59d0-a83e-08b7471a0643",
            label: "Motorola Motorola Razr 50",
            disabled: false,
          },
          {
            value: "b2003040-f45e-573a-8bb9-f7f401a9029e",
            label: "Motorola Motorola Razr 60 Ultra",
            disabled: false,
          },
          {
            value: "6df0705e-21f8-5dca-91d4-15803aa4e4bb",
            label: "Motorola Motorola Edge 30",
            disabled: false,
          },
          {
            value: "eac79a3e-c3db-513e-b6d8-be19e2563f35",
            label: "Motorola Motorola Edge 40",
            disabled: false,
          },
          {
            value: "c98addd5-5820-572d-8c36-844a8085d8c9",
            label: "Motorola Motorola Edge 50",
            disabled: false,
          },
          {
            value: "077fcb19-a29a-5be3-ab87-00a625c79a92",
            label: "Motorola Motorola Edge 60 Pro",
            disabled: false,
          },
          {
            value: "08d3f074-35d3-53b0-a52d-0eb4ec7eba33",
            label: "Sony Sony Xperia 10 V",
            disabled: false,
          },
          {
            value: "b38fc239-37ce-505d-9ae6-a23caac7f7c8",
            label: "Sony Sony Xperia 10 VI",
            disabled: false,
          },
          {
            value: "7e6de18a-96e1-5112-92ae-7f4fe1617663",
            label: "Sony Sony Xperia 5 VI",
            disabled: false,
          },
          {
            value: "8d39149a-e29c-598b-88cc-6ac6c20a5831",
            label: "Sony Sony Xperia 1 VI",
            disabled: false,
          },
          {
            value: "dc9be168-05a6-57ad-aec3-89830530ad0a",
            label: "Sony Sony Xperia 1 VII",
            disabled: false,
          },
          {
            value: "85e69473-18b8-5b3c-9078-144a9102c9a3",
            label: "Google Google Pixel Fold 2",
            disabled: false,
          },
          {
            value: "37a8f64a-8bfa-568d-b505-a26a02da7f11",
            label: "Google Google Pixel 8",
            disabled: false,
          },
          {
            value: "021cbf86-3cac-5be7-8e0e-4176bf95f929",
            label: "Google Google Pixel 8a",
            disabled: false,
          },
          {
            value: "0275a085-cd2f-580d-88fa-bd1058a16e54",
            label: "Google Google Pixel 9",
            disabled: false,
          },
          {
            value: "842d701d-057e-5be3-9e87-51f0dd6c7528",
            label: "Google Google Pixel 9a",
            disabled: false,
          },
          {
            value: "47ce2b3b-2183-5a14-860f-d3baf69027c5",
            label: "Google Google Pixel 10",
            disabled: false,
          },
          {
            value: "93b53691-4f42-5d0c-9c7a-afb7fb50fbfb",
            label: "Google Google Pixel 10 Pro",
            disabled: false,
          },
          {
            value: "5daf5fc4-8f0a-5e8b-82ac-c09d33ee2147",
            label: "Google Google Pixel 10 Pro XL",
            disabled: false,
          },
          {
            value: "520445f2-73c7-5452-b4b0-3db039fa6209",
            label: "TCL TCL Ion X",
            disabled: false,
          },
          {
            value: "93023d16-19ac-586f-a911-303f5e7550b7",
            label: "TCL TCL 40 NXTPAPER",
            disabled: false,
          },
          {
            value: "08b55fef-47a3-58c4-9f41-b06538b572a4",
            label: "TCL TCL 50 NXTPAPER",
            disabled: false,
          },
          {
            value: "4633eb65-fc9f-5109-8899-955a60380788",
            label: "TCL TCL 50 SE",
            disabled: false,
          },
          {
            value: "f111a1f0-804b-53a2-b984-17f9470858a4",
            label: "TCL TCL 60 XE",
            disabled: false,
          },
          {
            value: "221c31fb-57ef-5693-a1a5-87cc5685ce4e",
            label: "Meizu Meizu Note 15",
            disabled: false,
          },
          {
            value: "aba0648a-0b40-5806-a94e-04962b8d501d",
            label: "Meizu Meizu Note 16",
            disabled: false,
          },
          {
            value: "a9bbe51e-0f23-5d59-b732-4a8f72b998c2",
            label: "Meizu Meizu 20",
            disabled: false,
          },
          {
            value: "e1ea2951-fefd-54d4-be54-724479546b3c",
            label: "Meizu Meizu 20 Pro",
            disabled: false,
          },
          {
            value: "638d104f-9660-5a81-93df-33b9a50bd6d2",
            label: "Meizu Meizu 21 Note",
            disabled: false,
          },
          {
            value: "c3c52b30-d3e7-502a-a063-f2e0895ffbe5",
            label: "Meizu Meizu 21",
            disabled: false,
          },
          {
            value: "b0d70718-0a32-5f8d-aadc-0d9aef85287b",
            label: "itel itel Vision 3",
            disabled: false,
          },
          {
            value: "eb1b6492-7c6e-59db-9dba-fb5d157c7124",
            label: "itel itel S23",
            disabled: false,
          },
          {
            value: "1a45b486-ac40-5410-b016-e714881107c8",
            label: "itel itel S25",
            disabled: false,
          },
          {
            value: "5f7a681b-2f6b-57cd-842b-d27414b5281c",
            label: "itel itel P55",
            disabled: false,
          },
          {
            value: "e16bd036-7445-542d-ba05-2bc5007b8e0a",
            label: "itel itel A05",
            disabled: false,
          },
          {
            value: "a84fa0f3-a438-58e3-97dc-6b39fffbe10a",
            label: "itel itel A50",
            disabled: false,
          },
          {
            value: "3600b92d-a74f-58f6-91a9-b9ac1f8af053",
            label: "itel itel A60",
            disabled: false,
          },
          {
            value: "ffa7174c-ec82-5edb-ad3a-526b5db549b4",
            label: "itel itel A70",
            disabled: false,
          },
          {
            value: "545d4c1f-1f1f-595b-bf08-0e8dfd07736d",
            label: "itel itel A80",
            disabled: false,
          },
          {
            value: "282e575c-9cbc-568f-a95c-15a38f606cec",
            label: "Tecno Tecno Phantom V Flip2",
            disabled: false,
          },
          {
            value: "bc4add94-5ac7-556f-8d0e-4e40c2180738",
            label: "Tecno Tecno Pop 9",
            disabled: false,
          },
          {
            value: "24e6a912-94f9-55c8-9bd6-f60dab56c094",
            label: "Tecno Tecno Pova 5",
            disabled: false,
          },
          {
            value: "d0d98608-a6dd-57a4-94fc-8ac4a08eaff3",
            label: "Tecno Tecno Pova 6",
            disabled: false,
          },
          {
            value: "ed374ab6-47fc-5c0d-9962-251e9c690554",
            label: "Tecno Tecno Spark 10",
            disabled: false,
          },
          {
            value: "e68d7dc8-dd74-5e18-ad0d-73e8e723764f",
            label: "Tecno Tecno Spark 20",
            disabled: false,
          },
          {
            value: "81862024-c1d3-592c-88ee-7a5c64028832",
            label: "Tecno Tecno Spark 20 Pro",
            disabled: false,
          },
          {
            value: "664aa964-eb65-527a-8ae3-a95612373b6f",
            label: "Tecno Tecno Spark 30",
            disabled: false,
          },
          {
            value: "4462b832-07c1-5780-a408-7bc1d8ff33d9",
            label: "Tecno Tecno Camon 19",
            disabled: false,
          },
          {
            value: "c006119d-e9b5-51be-9712-f7b2a9f0eb62",
            label: "Tecno Tecno Camon 30",
            disabled: false,
          },
          {
            value: "8d1a5f12-97d1-591a-b8bc-12923357209f",
            label: "Tecno Tecno Camon 50",
            disabled: false,
          },
          {
            value: "4823a1d0-c4b5-5e62-ad34-2f40afed0a28",
            label: "Tecno Tecno Camon 40",
            disabled: false,
          },
          {
            value: "bfdd7fe6-dd36-50f3-b252-e64fc67e31e2",
            label: "Tecno Tecno Camon 40 Pro",
            disabled: false,
          },
          {
            value: "4ad38d48-5511-5830-bb19-d99dac9aec5e",
            label: "Infinix Infinix Smart 8",
            disabled: false,
          },
          {
            value: "397ebb59-d77f-5a73-ba82-d76f7e1d787c",
            label: "Infinix Infinix Smart 9",
            disabled: false,
          },
          {
            value: "d95006a1-8a57-5348-891d-4635b5f7918c",
            label: "Infinix Infinix GT 20 Pro",
            disabled: false,
          },
          {
            value: "20b2eb8a-49f7-589a-91e2-c1648051695f",
            label: "Infinix Infinix Zero 30",
            disabled: false,
          },
          {
            value: "da042f76-02c8-51ee-acae-6e65faa48492",
            label: "Infinix Infinix Zero 40",
            disabled: false,
          },
          {
            value: "64b88808-b967-5c50-9d4c-c61bc2160064",
            label: "Infinix Infinix Hot 40i",
            disabled: false,
          },
          {
            value: "132c08e9-9291-57d9-9177-ac02cb112e51",
            label: "Infinix Infinix Hot 50",
            disabled: false,
          },
          {
            value: "afa69dde-cc16-5b82-8747-913e1e5de81f",
            label: "Infinix Infinix Hot 60 Pro",
            disabled: false,
          },
          {
            value: "e99d6801-2a8b-5b3b-b6d9-d25312c05482",
            label: "Infinix Infinix Note 12",
            disabled: false,
          },
          {
            value: "54ae0115-584f-50fb-894f-ad65a5f5b7cc",
            label: "Infinix Infinix Note 30",
            disabled: false,
          },
          {
            value: "4355f29e-ecee-5459-94b2-ee2467d7e4bc",
            label: "Infinix Infinix Note 40 Pro",
            disabled: false,
          },
          {
            value: "c2d6c06e-b3b2-59fc-b9ed-b903f61e679a",
            label: "Infinix Infinix Note 60",
            disabled: false,
          },
          {
            value: "317ff227-de16-5b54-986f-ce2b76d56f0b",
            label: "Infinix Infinix Note 60 Pro",
            disabled: false,
          },
          {
            value: "3148b7c9-3b4f-5033-90e0-286246e8d7ab",
            label: "RedMagic RedMagic 9S Pro",
            disabled: false,
          },
          {
            value: "ea6d8391-6768-5f24-8a28-a8745b5a906a",
            label: "RedMagic RedMagic 10 Air",
            disabled: false,
          },
          {
            value: "2abb3604-d975-596d-9d0c-c6653cf92199",
            label: "RedMagic RedMagic 10 Pro",
            disabled: false,
          },
          {
            value: "1d15b405-df4f-5890-9fb5-8a4974c4dba6",
            label: "Nubia Nubia Focus 2",
            disabled: false,
          },
          {
            value: "41345af9-3a78-5208-87ec-2be47cdb1da9",
            label: "Nubia Nubia Flip2",
            disabled: false,
          },
          {
            value: "5f9990b8-a0f5-5de6-a48c-7ef6e2faabbd",
            label: "Nubia Nubia Z60 Ultra",
            disabled: false,
          },
          {
            value: "c332e89c-74f2-5d8a-95df-3046e066bba7",
            label: "Nubia Nubia Z70 Ultra",
            disabled: false,
          },
          {
            value: "a51694e7-55e3-59ac-b040-0a580b754d97",
            label: "ZTE ZTE Axon 60",
            disabled: false,
          },
          {
            value: "22036144-1a72-5e67-8b42-78ac8a8f79fc",
            label: "ZTE ZTE Blade A75",
            disabled: false,
          },
          {
            value: "322f7f7f-ef25-5201-8b9e-78f78788a71e",
            label: "ZTE ZTE Blade V60",
            disabled: false,
          },
          {
            value: "c2e630c9-0237-5463-a9b2-637fd60db260",
            label: "OnePlus OnePlus Nord 3",
            disabled: false,
          },
          {
            value: "9bbba465-ff14-5cfe-a327-311ec4b5b487",
            label: "OnePlus OnePlus Nord 4",
            disabled: false,
          },
          {
            value: "929b45d2-3f59-5d68-b66a-79d34cd78769",
            label: "OnePlus OnePlus Nord CE5",
            disabled: false,
          },
          {
            value: "05c41cf0-6081-59f4-93b3-009a54bbce7f",
            label: "OnePlus OnePlus Nord 5",
            disabled: false,
          },
          {
            value: "bcea42ad-443b-5350-881e-85e3f71fec84",
            label: "OnePlus OnePlus Ace 5",
            disabled: false,
          },
          {
            value: "059a2f47-7045-58c4-98fb-de39bd612a4a",
            label: "OnePlus OnePlus Open",
            disabled: false,
          },
          {
            value: "61572bee-fab3-5c31-bf92-95af33748746",
            label: "OnePlus OnePlus 9",
            disabled: false,
          },
          {
            value: "04568089-dd34-5a2c-817f-adac35af1231",
            label: "OnePlus OnePlus 10T",
            disabled: false,
          },
          {
            value: "29807997-a937-5ebc-b8cb-88d420819bf7",
            label: "OnePlus OnePlus 11",
            disabled: false,
          },
          {
            value: "3f3a9092-60e8-565b-aaa1-90c1ef5dabc1",
            label: "OnePlus OnePlus 12",
            disabled: false,
          },
          {
            value: "3c683487-8640-55d4-adba-778289edeea6",
            label: "OnePlus OnePlus 13R",
            disabled: false,
          },
          {
            value: "fc27f204-2d73-50cd-a8b1-d497936e43d9",
            label: "OnePlus OnePlus 13",
            disabled: false,
          },
          {
            value: "fdfa4fc4-4baf-5dd8-a279-d6bb1ab1e53e",
            label: "realme realme C55",
            disabled: false,
          },
          {
            value: "6f2932c6-f0f6-596c-a6aa-20a22671505c",
            label: "realme realme C67",
            disabled: false,
          },
          {
            value: "60e37a51-c9f0-553f-836d-2e1e72a7097c",
            label: "realme realme C75",
            disabled: false,
          },
          {
            value: "9b392e30-01b6-539a-aad4-af109bb74ce9",
            label: "realme realme Note 70",
            disabled: false,
          },
          {
            value: "361bd7b3-7be9-5257-a8ad-ddb6bef3eeb6",
            label: "realme realme Narzo 60",
            disabled: false,
          },
          {
            value: "dcd28716-adbf-5716-a4b4-473718249467",
            label: "realme realme Narzo 70",
            disabled: false,
          },
          {
            value: "c49fac15-510c-5feb-bc3f-87e2e233fb18",
            label: "realme realme 11 Pro+",
            disabled: false,
          },
          {
            value: "f3fe116f-ffc9-5b54-826b-5b0f91b4c332",
            label: "realme realme 12 Pro+",
            disabled: false,
          },
          {
            value: "cf2f07e0-01db-5f3e-aaa6-e6d094e87160",
            label: "realme realme 13+",
            disabled: false,
          },
          {
            value: "88e21c9c-b16a-5bd4-bac4-1ea78c85639e",
            label: "realme realme 14 Pro",
            disabled: false,
          },
          {
            value: "e37af474-34fc-5f0e-957d-63c79e6c559f",
            label: "realme realme 14 Pro+",
            disabled: false,
          },
          {
            value: "289c2e8d-7af8-5c71-b082-df9bc04db55c",
            label: "realme realme 16",
            disabled: false,
          },
          {
            value: "94bc5e69-ecc7-5c87-aa90-f99930f9986e",
            label: "realme realme 16 Pro",
            disabled: false,
          },
          {
            value: "879a7c96-2d5f-580f-9d97-a928fce66f73",
            label: "realme realme 16 Pro+",
            disabled: false,
          },
          {
            value: "a6c3b46d-71c3-5fe2-ba5c-af0f90355d89",
            label: "realme realme GT6",
            disabled: false,
          },
          {
            value: "2c030040-5bdd-506a-a331-a4b316f6d5c2",
            label: "realme realme GT7",
            disabled: false,
          },
          {
            value: "69c4fab3-9bed-5ace-af51-864c810928a4",
            label: "realme realme GT7 Pro",
            disabled: false,
          },
          {
            value: "f1efd92d-986b-5e70-b89e-b2d46ad26c8f",
            label: "iQOO iQOO Z9",
            disabled: false,
          },
          {
            value: "a95d6a9b-36a4-5cdb-8750-071ea7459587",
            label: "iQOO iQOO Neo9 Pro",
            disabled: false,
          },
          {
            value: "80f6eb3c-5083-57b3-bd9f-39848be1e944",
            label: "iQOO iQOO 12",
            disabled: false,
          },
          {
            value: "4bb37e75-811a-5518-865c-60d52356376f",
            label: "iQOO iQOO 13",
            disabled: false,
          },
          {
            value: "4f106914-bd56-5b4b-9bd2-2e8c974c94d6",
            label: "vivo vivo Y17s",
            disabled: false,
          },
          {
            value: "73e73865-5c91-54d6-9fb2-f8953d9e25ca",
            label: "vivo vivo Y19",
            disabled: false,
          },
          {
            value: "5d1b9dd6-f54f-5384-bbc4-d67ac5160ab6",
            label: "vivo vivo Y28",
            disabled: false,
          },
          {
            value: "d2804818-aa0b-5cf7-a862-68d97ca7c72f",
            label: "vivo vivo Y36",
            disabled: false,
          },
          {
            value: "1d6dc686-60bb-5d9d-a7b6-e7911ea39e37",
            label: "vivo vivo Y100",
            disabled: false,
          },
          {
            value: "5dcffdbd-747d-5a42-a54a-29d32e12018e",
            label: "vivo vivo V29",
            disabled: false,
          },
          {
            value: "0955a044-a1e7-583c-8a6f-c6188cf71951",
            label: "vivo vivo V40",
            disabled: false,
          },
          {
            value: "7f170f29-f0e2-51fa-9629-5c5d1dd282e8",
            label: "vivo vivo X90 Pro",
            disabled: false,
          },
          {
            value: "ee7671d6-0e32-53e4-80e8-e1c6951ff5e9",
            label: "vivo vivo X100 Pro",
            disabled: false,
          },
          {
            value: "b61c064e-2cf1-55b8-9787-32520d50797a",
            label: "vivo vivo X200",
            disabled: false,
          },
          {
            value: "2b327935-193e-5ad1-92c6-cff7249b5e9c",
            label: "vivo vivo X200 Pro",
            disabled: false,
          },
          {
            value: "4944df3e-f541-5259-9a9d-7c9f05a12e60",
            label: "OPPO OPPO A18",
            disabled: false,
          },
          {
            value: "28fbb03b-170f-5f5d-8977-ae27b71587e9",
            label: "OPPO OPPO A79",
            disabled: false,
          },
          {
            value: "88bef20a-9707-52a2-8110-7e808b0c505d",
            label: "OPPO OPPO A5 Pro",
            disabled: false,
          },
          {
            value: "279fb1ed-ff38-5257-9c75-d866418ece1e",
            label: "OPPO OPPO A3 Pro",
            disabled: false,
          },
          {
            value: "6fff295f-9cf0-5608-b523-5bbfbd6da6f8",
            label: "OPPO OPPO Reno10 Pro+",
            disabled: false,
          },
          {
            value: "3c350a92-ad96-54f0-9e08-f43c6cc7774a",
            label: "OPPO OPPO Reno11",
            disabled: false,
          },
          {
            value: "ff89e7d8-8dad-5bcb-bf13-e920b4372d76",
            label: "OPPO OPPO Reno12",
            disabled: false,
          },
          {
            value: "0c08c6b9-d6d5-5c54-9d9e-9c133488446c",
            label: "OPPO OPPO Reno12 Pro",
            disabled: false,
          },
          {
            value: "e3fdefdd-807f-5045-9b18-c8cf430f2872",
            label: "OPPO OPPO Reno13",
            disabled: false,
          },
          {
            value: "b41df845-6865-58ad-a08d-01c378ba5d7d",
            label: "OPPO OPPO Reno13 Pro",
            disabled: false,
          },
          {
            value: "c8c56a5b-328e-5291-a584-61eae64fd81d",
            label: "OPPO OPPO Find N5",
            disabled: false,
          },
          {
            value: "ef05a1f0-9a7a-5f59-9d24-b222ad34dfa8",
            label: "OPPO OPPO Find X8",
            disabled: false,
          },
          {
            value: "fd7d738d-8610-5dd8-938f-d71afb34a4df",
            label: "OPPO OPPO Find X8 Pro",
            disabled: false,
          },
          {
            value: "0bf41eb7-e0c6-5beb-ac95-2edd23362327",
            label: "Huawei Huawei Enjoy 70",
            disabled: false,
          },
          {
            value: "6c40eb1d-a2e8-585d-a0ec-d3a94bf8b1c8",
            label: "Huawei Huawei Y6a",
            disabled: false,
          },
          {
            value: "ddd85d1e-c104-5bdf-b8a1-29dda6b5c00b",
            label: "Huawei Huawei Nova 12",
            disabled: false,
          },
          {
            value: "0a9fa344-6718-5a47-ae4a-5915fa83b2bb",
            label: "Huawei Huawei Nova 13",
            disabled: false,
          },
          {
            value: "df8988c2-08ac-5f37-9ec5-6a93d5711988",
            label: "Huawei Huawei Nova 14i",
            disabled: false,
          },
          {
            value: "ab4a7dfc-bd51-5eb9-bec4-279762b79181",
            label: "Huawei Huawei Nova 14",
            disabled: false,
          },
          {
            value: "87eaedfc-8865-5768-ac3e-116d6e64f5a9",
            label: "Huawei Huawei Nova 14 Pro",
            disabled: false,
          },
          {
            value: "67376fe0-a1dc-5d5d-bb45-d338467d3819",
            label: "Huawei Huawei Nova 15",
            disabled: false,
          },
          {
            value: "35f321f8-6837-566b-a22a-c8ff2052a2a1",
            label: "Huawei Huawei Nova 15 Pro",
            disabled: false,
          },
          {
            value: "c96268e6-32c5-5408-9780-60ae3ba8a7c5",
            label: "Huawei Huawei P60 Pro",
            disabled: false,
          },
          {
            value: "50b4317b-75f9-5caf-aed0-2a8cd95c55fb",
            label: "Huawei Huawei Mate X6",
            disabled: false,
          },
          {
            value: "e5b073d6-a353-59a3-99b0-c7684dc140d8",
            label: "Huawei Huawei Mate 50 Pro",
            disabled: false,
          },
          {
            value: "03a64a8d-8bca-5484-aa81-128a1a0dc62f",
            label: "Huawei Huawei Mate 60 Pro",
            disabled: false,
          },
          {
            value: "9b1c1398-b890-5bdc-a7e0-07a57173f748",
            label: "Huawei Huawei Mate 70 Pro",
            disabled: false,
          },
          {
            value: "57481774-cb3c-5bfb-bf54-b054b14d32e9",
            label: "Huawei Huawei Mate 80 Pro",
            disabled: false,
          },
          {
            value: "a8bce1ce-3610-59b8-845b-60e8d1662276",
            label: "Huawei Huawei Pura 70 Pro",
            disabled: false,
          },
          {
            value: "5c49af55-ea70-5488-8fe8-afa763558818",
            label: "Huawei Huawei Pura 70 Ultra",
            disabled: false,
          },
          {
            value: "b20a80ce-eece-5d58-9640-ec3ddd06a6d6",
            label: "Huawei Huawei Pura 80",
            disabled: false,
          },
          {
            value: "cb244be0-9cad-5451-8fed-ebc71b615e6e",
            label: "Huawei Huawei Pura 80 Pro",
            disabled: false,
          },
          {
            value: "c79146cc-d5df-5dd3-b38e-2deb5badf37a",
            label: "Huawei Huawei Pura 80 Ultra",
            disabled: false,
          },
          {
            value: "c1e55b14-2414-52e0-99ba-bdc4a38c939d",
            label: "Honor Honor Play 60",
            disabled: false,
          },
          {
            value: "7e8d91c7-3aff-5ac0-9b3b-0721b7b1d5fe",
            label: "Honor Honor X50",
            disabled: false,
          },
          {
            value: "ec447201-9ad0-5d8a-8218-e903f75ecea0",
            label: "Honor Honor X6c",
            disabled: false,
          },
          {
            value: "dc7b815d-d58c-53eb-8c4b-d064a169ed76",
            label: "Honor Honor X7c",
            disabled: false,
          },
          {
            value: "6170c915-4a8a-576c-843b-67f91026e480",
            label: "Honor Honor X8c",
            disabled: false,
          },
          {
            value: "bd8fb41c-588a-5fe8-9b2a-883c28474117",
            label: "Honor Honor X9b",
            disabled: false,
          },
          {
            value: "456c87ba-8de5-529d-9e53-698fb464802e",
            label: "Honor Honor X9c",
            disabled: false,
          },
          {
            value: "17af726d-06ca-5cee-85a0-b72a4b96b377",
            label: "Honor Honor 90 Lite",
            disabled: false,
          },
          {
            value: "14087762-7d95-5f50-b690-50b7592cf34f",
            label: "Honor Honor 90",
            disabled: false,
          },
          {
            value: "a7a1ea85-4b13-524f-89af-f6575762b2ef",
            label: "Honor Honor 200",
            disabled: false,
          },
          {
            value: "bb5aa9cf-2aba-5f1e-b6c8-1208ccbe3923",
            label: "Honor Honor 200 Pro",
            disabled: false,
          },
          {
            value: "b458deb6-9048-5036-99c5-3b2563e03fcb",
            label: "Honor Honor 300",
            disabled: false,
          },
          {
            value: "1ae1931a-06e3-5833-b3b4-411692f689e9",
            label: "Honor Honor 300 Pro",
            disabled: false,
          },
          {
            value: "5bcbfd91-ed29-5316-a381-8a117c9a05a6",
            label: "Honor Honor 400",
            disabled: false,
          },
          {
            value: "bd5ea106-f27f-58f3-ba00-1e3c30d8a6fa",
            label: "Honor Honor 400 Pro",
            disabled: false,
          },
          {
            value: "22f5cdec-1f70-5ec7-b985-bbd7cbb0e8b2",
            label: "Honor Honor Magic5 Pro",
            disabled: false,
          },
          {
            value: "c00fb817-b56f-5662-9556-e539dd4f31c1",
            label: "Honor Honor Magic V2",
            disabled: false,
          },
          {
            value: "5a9806b7-cdf2-5a21-9bee-ae0901b568f2",
            label: "Honor Honor Magic V3",
            disabled: false,
          },
          {
            value: "8e015886-573e-5add-9884-c5ee0a20815c",
            label: "Honor Honor Magic6 Pro",
            disabled: false,
          },
          {
            value: "59fe47c6-9320-5f84-b9f6-6bd1f21efac2",
            label: "Honor Honor Magic7",
            disabled: false,
          },
          {
            value: "d76b9848-705b-508a-bdb1-6dd1e60fe817",
            label: "Honor Honor Magic7 Pro",
            disabled: false,
          },
          {
            value: "b3ae6ae1-ca97-52fe-b1a8-cb27dc6499f2",
            label: "POCO POCO C65",
            disabled: false,
          },
          {
            value: "cccd5bea-4a2d-532f-9359-649d530512c8",
            label: "POCO POCO C85",
            disabled: false,
          },
          {
            value: "e2ad90c6-c6d2-57e4-88c1-bfce41dee67a",
            label: "POCO POCO M6 Pro",
            disabled: false,
          },
          {
            value: "393e98ec-f856-578e-b363-d89cba775066",
            label: "POCO POCO M7",
            disabled: false,
          },
          {
            value: "079309b4-6bef-5e0e-8e70-74d8046300f6",
            label: "POCO POCO M7 Pro",
            disabled: false,
          },
          {
            value: "e84e132e-52e6-5382-a091-338ce33dbb22",
            label: "POCO POCO X5 Pro",
            disabled: false,
          },
          {
            value: "c4005269-b2c8-5c82-a102-8a0be4d9236a",
            label: "POCO POCO X6 Pro",
            disabled: false,
          },
          {
            value: "7538fc08-e1bf-563b-876a-c514234d9ff9",
            label: "POCO POCO X7",
            disabled: false,
          },
          {
            value: "dad6f0ab-32ec-51c8-8254-c60f478546ef",
            label: "POCO POCO X7 Pro",
            disabled: false,
          },
          {
            value: "fec436f7-7abf-560b-81a7-f1a4ce5b8a49",
            label: "POCO POCO F5 Pro",
            disabled: false,
          },
          {
            value: "7547ef1e-2d99-533c-9977-a4b37a2b0eef",
            label: "POCO POCO F6 Pro",
            disabled: false,
          },
          {
            value: "8966dbba-e75e-5195-87cd-b638f984bc2f",
            label: "POCO POCO F7",
            disabled: false,
          },
          {
            value: "ab5c861f-e1eb-5e9b-911a-674ad1b337b1",
            label: "POCO POCO F7 Pro",
            disabled: false,
          },
          {
            value: "45dc3b7e-09d1-5934-b046-6ed403f503db",
            label: "POCO POCO F7 Ultra",
            disabled: false,
          },
          {
            value: "60f22935-983c-58af-85b4-efb52b88104c",
            label: "Redmi Redmi K70",
            disabled: false,
          },
          {
            value: "515b99af-df0f-577b-8fbc-495f15145453",
            label: "Redmi Redmi K80 Pro",
            disabled: false,
          },
          {
            value: "071e8180-4c0f-5259-9354-68bf911d2ad5",
            label: "Redmi Redmi K80",
            disabled: false,
          },
          {
            value: "e03ccb4a-1222-5376-b220-82a929253a71",
            label: "Redmi Redmi Turbo 4",
            disabled: false,
          },
          {
            value: "96b28d76-1938-5d38-bad8-5c79aea50fa2",
            label: "Redmi Redmi A3",
            disabled: false,
          },
          {
            value: "dd63a562-cd2d-5a1f-8058-f84e31b3a039",
            label: "Redmi Redmi A5",
            disabled: false,
          },
          {
            value: "fac0313d-f0e1-53b9-b7ef-0bd6853e2b4a",
            label: "Redmi Redmi 12C",
            disabled: false,
          },
          {
            value: "15471a08-298c-55cd-abba-4d9b9ee59fda",
            label: "Redmi Redmi 12",
            disabled: false,
          },
          {
            value: "7d2628a2-5133-5efa-a058-59da9606e89d",
            label: "Redmi Redmi 13C",
            disabled: false,
          },
          {
            value: "289929f1-01f0-5029-8acf-d88cf2cea862",
            label: "Redmi Redmi 14C",
            disabled: false,
          },
          {
            value: "13b43516-6660-5ad2-ae61-f8c9a1789aef",
            label: "Redmi Redmi 15C",
            disabled: false,
          },
          {
            value: "b3d84484-7b25-5201-bd7f-34e0902400af",
            label: "Redmi Redmi 15",
            disabled: false,
          },
          {
            value: "075e16ab-b8f4-5c02-a18f-d95dc707b16a",
            label: "Redmi Redmi Note 12",
            disabled: false,
          },
          {
            value: "7fbac794-35e1-5917-8641-b6e85da4e54a",
            label: "Redmi Redmi Note 13",
            disabled: false,
          },
          {
            value: "49a7deb9-5db4-57cd-8233-a5126b4bc58a",
            label: "Redmi Redmi Note 13 Pro",
            disabled: false,
          },
          {
            value: "f0c3c0dd-f4ce-5825-a566-40fccaf1e542",
            label: "Redmi Redmi Note 13 Pro+",
            disabled: false,
          },
          {
            value: "0e0f7ca0-c18d-5917-bc01-eefa33097b21",
            label: "Redmi Redmi Note 14S",
            disabled: false,
          },
          {
            value: "33e53311-e356-5606-b554-7abedf0625f1",
            label: "Redmi Redmi Note 14",
            disabled: false,
          },
          {
            value: "51c15a5a-ed1a-5942-9213-ece89e3e61fa",
            label: "Redmi Redmi Note 14 Pro",
            disabled: false,
          },
          {
            value: "fdd3eaea-6b36-566b-9af7-23e6ffab9076",
            label: "Redmi Redmi Note 14 Pro+",
            disabled: false,
          },
          {
            value: "40d5a20d-ddc4-5fef-ac7f-1d5ac305ff25",
            label: "Xiaomi Xiaomi Mix Flip",
            disabled: false,
          },
          {
            value: "b86a528e-9c9c-5a31-93ce-9d089893d88d",
            label: "Xiaomi Xiaomi Mix Fold 4",
            disabled: false,
          },
          {
            value: "259ec442-2bb4-5008-ae0f-23f0f13a7d79",
            label: "Xiaomi Xiaomi Civi 3",
            disabled: false,
          },
          {
            value: "734befef-06c4-518e-8dce-76fdbcb2ad68",
            label: "Xiaomi Xiaomi Civi 4 Pro",
            disabled: false,
          },
          {
            value: "607f8714-3cb9-5a6b-a653-3428ed5ad427",
            label: "Xiaomi Xiaomi 11T Pro",
            disabled: false,
          },
          {
            value: "5f498e0a-f4a0-51f6-8102-46fce9259269",
            label: "Xiaomi Xiaomi 12",
            disabled: false,
          },
          {
            value: "bc0d5dac-e28f-5420-91d2-c03e49ec11a3",
            label: "Xiaomi Xiaomi 12T Pro",
            disabled: false,
          },
          {
            value: "08f59d19-1d72-5900-9437-4fc491d6c503",
            label: "Xiaomi Xiaomi 13",
            disabled: false,
          },
          {
            value: "9a1c61a6-bb36-5335-ba47-fdea2db10a4f",
            label: "Xiaomi Xiaomi 13T",
            disabled: false,
          },
          {
            value: "b8ba63d3-d554-5215-b3d3-b57b602df772",
            label: "Xiaomi Xiaomi 13T Pro",
            disabled: false,
          },
          {
            value: "c5cbd24c-4841-5f4e-9cfd-18f41b9db2dd",
            label: "Xiaomi Xiaomi 14",
            disabled: false,
          },
          {
            value: "87373c0a-daf9-57eb-941a-6302400bf0de",
            label: "Xiaomi Xiaomi 14T",
            disabled: false,
          },
          {
            value: "0157dc90-0524-594f-8d65-fb8a7a358254",
            label: "Xiaomi Xiaomi 14T Pro",
            disabled: false,
          },
          {
            value: "488c2367-55ca-534b-873c-66018d94eb14",
            label: "Xiaomi Xiaomi 14 Ultra",
            disabled: false,
          },
          {
            value: "a82efab0-0346-538b-a760-107c5c42a844",
            label: "Xiaomi Xiaomi 15",
            disabled: false,
          },
          {
            value: "28aa0510-6055-5e11-ac10-91d1a86263a1",
            label: "Xiaomi Xiaomi 15 Pro",
            disabled: false,
          },
          {
            value: "de8e7781-d057-53cb-8689-f49fbfa08cd0",
            label: "Xiaomi Xiaomi 15 Ultra",
            disabled: false,
          },
          {
            value: "9934ae02-259d-51cc-a785-0c92c046bb29",
            label: "Samsung Galaxy XCover6 Pro",
            disabled: false,
          },
          {
            value: "2572398b-38e7-55d3-8cd1-76d87c3c28f6",
            label: "Samsung Galaxy XCover7",
            disabled: false,
          },
          {
            value: "533c093c-be73-59a2-933a-fe72032726a9",
            label: "Samsung Galaxy M15",
            disabled: false,
          },
          {
            value: "32f22d20-e489-528d-9479-11f2181ccc28",
            label: "Samsung Galaxy M16",
            disabled: false,
          },
          {
            value: "a98839dd-f4a3-5ead-99b7-fd4192e57bc9",
            label: "Samsung Galaxy M35",
            disabled: false,
          },
          {
            value: "08e9155e-58e3-50bd-bc82-359786442b34",
            label: "Samsung Galaxy M36",
            disabled: false,
          },
          {
            value: "fc2577c8-5b73-584f-904d-d81600b9130e",
            label: "Samsung Galaxy M55",
            disabled: false,
          },
          {
            value: "3d9da470-3f42-5538-a73c-9046b1e1f1ce",
            label: "Samsung Galaxy M56",
            disabled: false,
          },
          {
            value: "29dae714-7c03-5754-a4eb-90eb1564d0af",
            label: "Samsung Galaxy A06",
            disabled: false,
          },
          {
            value: "1a878ebf-d377-54da-87cb-fc02c30e5c20",
            label: "Samsung Galaxy A15",
            disabled: false,
          },
          {
            value: "eabc6514-3695-5f31-9160-0e804c77d514",
            label: "Samsung Galaxy A16",
            disabled: false,
          },
          {
            value: "7fed7583-52eb-52b3-a0e4-546698213c38",
            label: "Samsung Galaxy A25",
            disabled: false,
          },
          {
            value: "782c85bf-db8b-521e-84e7-0d54972a26bd",
            label: "Samsung Galaxy A26",
            disabled: false,
          },
          {
            value: "fb6690c7-135f-54d3-b934-8330aad36693",
            label: "Samsung Galaxy A35",
            disabled: false,
          },
          {
            value: "bed0dab0-a14f-5f62-85b1-d18a9e3460c8",
            label: "Samsung Galaxy A36",
            disabled: false,
          },
          {
            value: "16555272-15ac-54ee-b4d1-146c42c60fd4",
            label: "Samsung Galaxy A55",
            disabled: false,
          },
          {
            value: "f200abf9-f841-594d-ade3-efb546a0484d",
            label: "Samsung Galaxy A56",
            disabled: false,
          },
          {
            value: "103cd7e9-468b-5f37-bd46-e2025528bb52",
            label: "Samsung Galaxy Z Flip5",
            disabled: false,
          },
          {
            value: "7ae58a8d-81bf-5d48-b373-83553bea3b97",
            label: "Samsung Galaxy Z Fold5",
            disabled: false,
          },
          {
            value: "bd4ceae3-190b-5476-888a-d56f8c3cf310",
            label: "Samsung Galaxy Z Flip6",
            disabled: false,
          },
          {
            value: "742931fe-faa8-5833-b254-eed377a02ce7",
            label: "Samsung Galaxy Z Fold6",
            disabled: false,
          },
          {
            value: "17b891eb-7446-536b-ae62-d44ad792e090",
            label: "Samsung Galaxy Z Flip7 FE",
            disabled: false,
          },
          {
            value: "3cc0cdd3-f51f-577c-99fc-1508fbcfaadb",
            label: "Samsung Galaxy Z Flip7",
            disabled: false,
          },
          {
            value: "150d5f05-0226-548f-8047-23e8ddb21567",
            label: "Samsung Galaxy Z Fold7",
            disabled: false,
          },
          {
            value: "622fb774-9c73-551c-a897-4c73adbebdb8",
            label: "Samsung Galaxy S24 FE",
            disabled: false,
          },
          {
            value: "623dac34-bbd7-5490-8097-fccec19395c9",
            label: "Samsung Galaxy S24",
            disabled: false,
          },
          {
            value: "758bdfaa-8897-5532-91a5-2f9dece19b7b",
            label: "Samsung Galaxy S24+",
            disabled: false,
          },
          {
            value: "a33f624f-3d80-5cbe-b7e0-e51f3d041d4c",
            label: "Samsung Galaxy S24 Ultra",
            disabled: false,
          },
          {
            value: "5e02196f-ac8d-5425-96dd-4dacf420cfcb",
            label: "Samsung Galaxy S25 Edge",
            disabled: false,
          },
          {
            value: "d2a3af7b-9b0a-5317-ace6-d1cca8bddcb5",
            label: "Samsung Galaxy S25",
            disabled: false,
          },
          {
            value: "70aaeb1e-b893-5cf6-920a-c693826f7ec9",
            label: "Samsung Galaxy S25+",
            disabled: false,
          },
          {
            value: "0f4ec6ec-5347-5b06-9c16-ba7ad499c6c9",
            label: "Samsung Galaxy S25 Ultra",
            disabled: false,
          },
          {
            value: "8c92cd1f-269e-5481-b792-cd40b128a676",
            label: "Samsung Galaxy S26",
            disabled: false,
          },
          {
            value: "80a273a0-b177-51ac-a8d9-c34c07012d61",
            label: "Samsung Galaxy S26+",
            disabled: false,
          },
          {
            value: "62e18ac3-f70a-5c5b-8fe8-8833a4aceef4",
            label: "Samsung Galaxy S26 Ultra",
            disabled: false,
          },
          {
            value: "f31a5c45-d30b-52ec-908b-0bd441dfe348",
            label: "Apple iPhone SE",
            disabled: false,
          },
          {
            value: "5afd816d-4227-5b8f-9163-78d6cd6b83fb",
            label: "Apple iPhone 13",
            disabled: false,
          },
          {
            value: "d1ab92e1-a266-5e0b-bcbd-63d9b47baed8",
            label: "Apple iPhone 14",
            disabled: false,
          },
          {
            value: "3f3eddf7-823a-5eba-84a0-6c3e2949aeff",
            label: "Apple iPhone 14 Plus",
            disabled: false,
          },
          {
            value: "6f62d98f-7b6a-522b-8f42-80e6794e6c37",
            label: "Apple iPhone 15",
            disabled: false,
          },
          {
            value: "285498dc-f7a9-5f82-b783-fe0a90911367",
            label: "Apple iPhone 15 Plus",
            disabled: false,
          },
          {
            value: "02059f8e-2b99-5ebd-aa5a-95892afb9228",
            label: "Apple iPhone 15 Pro",
            disabled: false,
          },
          {
            value: "867eb59c-c96a-56fd-9f1a-da0068415ebf",
            label: "Apple iPhone 15 Pro Max",
            disabled: false,
          },
          {
            value: "a8b20155-5800-5bde-a4a0-3c63401fd549",
            label: "Apple iPhone 16e",
            disabled: false,
          },
          {
            value: "bad2f751-d941-5bf5-9dd9-1711efbcbaec",
            label: "Apple iPhone 16",
            disabled: false,
          },
          {
            value: "4f88ba8e-f2eb-55e8-b69a-afa2c9d76c78",
            label: "Apple iPhone 16 Plus",
            disabled: false,
          },
          {
            value: "61511d1a-aa64-5cee-b39b-3848ce0d2cb0",
            label: "Apple iPhone 16 Pro",
            disabled: false,
          },
          {
            value: "80905857-9644-5cdd-a055-3795d4880ed3",
            label: "Apple iPhone 16 Pro Max",
            disabled: false,
          },
          {
            value: "426cffdb-644b-558f-8a72-9813f344af6c",
            label: "Apple iPhone 17",
            disabled: false,
          },
          {
            value: "c841842f-c0b2-507b-8922-1df7374c0c4d",
            label: "Apple iPhone Air",
            disabled: false,
          },
          {
            value: "1a5eb34e-23c6-59f4-9654-4a4ec84f1b9d",
            label: "Apple iPhone 17 Pro",
            disabled: false,
          },
          {
            value: "7d41fc7b-7582-5a5c-87cf-5f0c5d5d94a9",
            label: "Apple iPhone 17 Pro Max",
            disabled: false,
          },
        ],
        validation: "default",
        heading:
          "\u041c\u043e\u0434\u0435\u043b\u044c \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",
      },
      {
        inputType: "text",
        name: "5acj54AD6sAKKnitfT6npuXuEKmkur",
        value: "002369745612359",
        disabled: false,
        validation: "none",
        placeholder: "IMEI",
        dividerBottom: true,
        pregValue: "L15bMC05XXsxNX0kLw==",
        pregText:
          "\u0414\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b. \u0414\u043b\u0438\u043d\u0430 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u0441\u0442\u0440\u043e\u0433\u043e 15 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432",
      },
      {
        inputType: "autocomplete",
        name: "Mn42nj1NXX9JLOcBrrm4dEI7sYBFmq",
        value: "",
        placeholder: "",
        disabled: false,
        options: [
          {
            value: "df27be2a-cf72-5d3c-9186-3cc5801d3fe5",
            label: "Chrysler Pacifica",
            disabled: false,
          },
          {
            value: "1d7fd326-d260-597f-b148-f38c8092fed0",
            label: "GMC Sierra",
            disabled: false,
          },
          {
            value: "d2a10dfc-4cde-5c31-afc1-3e1b17d958e2",
            label: "GMC Yukon",
            disabled: false,
          },
          {
            value: "a02dee8a-3825-5198-82ab-251e452991a1",
            label: "Jeep Compass",
            disabled: false,
          },
          {
            value: "f6683b78-ab01-5569-be88-6af749e38ebc",
            label: "Jeep Wrangler",
            disabled: false,
          },
          {
            value: "c1ca5ef9-9909-50a6-acb4-cfb4d9c26e05",
            label: "Jeep Grand Cherokee",
            disabled: false,
          },
          {
            value: "26c40345-6abf-5936-b0b8-9b8c7927d02c",
            label: "Chevrolet Corvette",
            disabled: false,
          },
          {
            value: "1637ffb9-8ad4-5c0e-a923-b1ee83f97cc2",
            label: "Chevrolet Camaro",
            disabled: false,
          },
          {
            value: "163edf88-2363-5b43-8adb-9398532d0bd2",
            label: "Chevrolet Tahoe",
            disabled: false,
          },
          {
            value: "8a52f774-b342-5447-a598-092ec4df2655",
            label: "Cadillac CT5",
            disabled: false,
          },
          {
            value: "58e2c108-72ed-5f52-ba02-3cda7a99eb44",
            label: "Cadillac XT6",
            disabled: false,
          },
          {
            value: "2484f338-65ea-5b0f-85de-e71e79af2c7c",
            label: "Cadillac XT5",
            disabled: false,
          },
          {
            value: "5ea61c60-1f5a-5995-8b73-adb7b31f90b2",
            label: "Cadillac Escalade",
            disabled: false,
          },
          {
            value: "7c9b1265-2a44-5689-9452-0640d41bd8f4",
            label: "Ford Ranger",
            disabled: false,
          },
          {
            value: "080addc3-088a-557d-87b4-7ac371d46961",
            label: "Ford Bronco",
            disabled: false,
          },
          {
            value: "41503e57-2244-5139-8997-e86a7ebe0fae",
            label: "Ford F-150",
            disabled: false,
          },
          {
            value: "3caf9c77-b7d6-589f-9989-75f520aeb791",
            label: "Ford Mustang",
            disabled: false,
          },
          {
            value: "96455f7f-2ba2-58a3-ad5b-9923bb8deb55",
            label: "Ford Explorer",
            disabled: false,
          },
          {
            value: "ef6e1f39-903e-50d3-bade-b6edfc1518cf",
            label: "Tesla Model X",
            disabled: false,
          },
          {
            value: "9f270be6-0f05-5393-8a02-4d877407bd8d",
            label: "Tesla Model S",
            disabled: false,
          },
          {
            value: "d88f6f6e-639e-5802-8b9a-1f23cf482fbc",
            label: "Tesla Model Y",
            disabled: false,
          },
          {
            value: "1db25d20-d2ff-561a-876c-51a1f2aa1de4",
            label: "Tesla Model 3",
            disabled: false,
          },
          {
            value: "6c3f782e-54ea-54f8-a275-757a8967279b",
            label: "Opel Mokka",
            disabled: false,
          },
          {
            value: "0e01486a-490c-5dde-87e2-8fae151d64e5",
            label: "Opel Corsa",
            disabled: false,
          },
          {
            value: "fc38c79a-8cc1-5b47-97ab-fe4f332aacc7",
            label: "Opel Astra",
            disabled: false,
          },
          {
            value: "9d6b6845-418e-54c8-bad0-ef38c5fcd03b",
            label: "Fiat Panda",
            disabled: false,
          },
          {
            value: "e77ad024-1bb4-5c33-b435-82019db1fc35",
            label: "Fiat Tipo",
            disabled: false,
          },
          {
            value: "31a48902-ab57-5d1f-95ea-ce73843152d8",
            label: "Fiat 500",
            disabled: false,
          },
          {
            value: "1c3965a6-567e-5fca-890d-1210db9f0819",
            label: "Renault Sandero",
            disabled: false,
          },
          {
            value: "ad075cb3-3975-5f00-8bd0-7ae4eafa9e72",
            label: "Renault Logan",
            disabled: false,
          },
          {
            value: "f308e64e-654f-55c6-8e06-ab9ee1a4d17f",
            label: "Renault Arkana",
            disabled: false,
          },
          {
            value: "ff39f088-ac53-583b-9750-70ace07b3f5a",
            label: "Renault Duster",
            disabled: false,
          },
          {
            value: "37f5c7cb-6312-5666-a299-ece466573bb2",
            label: "Citroen Berlingo",
            disabled: false,
          },
          {
            value: "30541822-7548-5e0f-be57-8a8019a99e73",
            label: "Citroen C4",
            disabled: false,
          },
          {
            value: "4f2954b6-2571-533b-9e82-735e5f56e8ef",
            label: "Citroen C5 Aircross",
            disabled: false,
          },
          {
            value: "f33905ac-4ff7-5a37-9bc3-76f069ff7ed6",
            label: "Peugeot 2008",
            disabled: false,
          },
          {
            value: "61930616-72d2-543a-93f6-c394b1d32c71",
            label: "Peugeot 5008",
            disabled: false,
          },
          {
            value: "c86e7927-f6b6-5534-a925-65620426f836",
            label: "Peugeot 3008",
            disabled: false,
          },
          {
            value: "3d8122fc-b75b-57c8-98a0-d85a39012d44",
            label: "Peugeot 408",
            disabled: false,
          },
          {
            value: "6a252550-4b0b-5dca-b783-ae61bf4a4659",
            label: "Rolls-Royce Spectre",
            disabled: false,
          },
          {
            value: "afca9981-a2ee-5b74-8855-f5064da5a7c2",
            label: "Rolls-Royce Cullinan",
            disabled: false,
          },
          {
            value: "d53ccebf-6993-562e-ad19-a971b5aae1ee",
            label: "Rolls-Royce Phantom",
            disabled: false,
          },
          {
            value: "144a0f44-5874-59ad-abe5-4bdce6a184b4",
            label: "Rolls-Royce Ghost",
            disabled: false,
          },
          {
            value: "f65b4ce5-7175-544b-a440-a25dd5acff86",
            label: "Bentley Flying Spur",
            disabled: false,
          },
          {
            value: "8c556674-3fac-53e2-b56b-b940f56c2f3d",
            label: "Bentley Bentayga",
            disabled: false,
          },
          {
            value: "45246834-d13b-528f-b0ff-e7117f50356d",
            label: "Bentley Continental GT",
            disabled: false,
          },
          {
            value: "4a8e7613-2609-52b3-bf78-efc95f385b8b",
            label: "Mini Clubman",
            disabled: false,
          },
          {
            value: "121cd19e-deae-5a36-81d5-71c3cbe1c95a",
            label: "Mini Countryman",
            disabled: false,
          },
          {
            value: "4f28c567-f3c8-5198-b52d-ac7ee08b2eba",
            label: "Mini Cooper",
            disabled: false,
          },
          {
            value: "faf7ff57-6562-5f39-813f-e8fe9d1822d8",
            label: "Jaguar I-Pace",
            disabled: false,
          },
          {
            value: "47bdc3b7-674c-5805-b049-3c63938eae87",
            label: "Jaguar E-Pace",
            disabled: false,
          },
          {
            value: "37039e9d-f317-579f-b60f-65b74d2eb27c",
            label: "Jaguar XF",
            disabled: false,
          },
          {
            value: "30bc1148-8a6b-5fd3-9881-ce7a95d5f0a0",
            label: "Jaguar F-Pace",
            disabled: false,
          },
          {
            value: "6ec459d3-3035-523d-a199-914027658799",
            label: "Land Rover Evoque",
            disabled: false,
          },
          {
            value: "533a5fb4-8f95-50b5-8b62-f9f776afce3c",
            label: "Land Rover Defender",
            disabled: false,
          },
          {
            value: "ab4c26d5-bffe-51b4-be2c-55af152e36bf",
            label: "Land Rover Discovery",
            disabled: false,
          },
          {
            value: "a9c5e2c0-5579-520f-b17b-54afd56a4283",
            label: "Land Rover Range Rover Velar",
            disabled: false,
          },
          {
            value: "534a2628-d1b8-5e00-b78b-cd926559ce50",
            label: "Land Rover Range Rover Sport",
            disabled: false,
          },
          {
            value: "6d65a6c9-c5fb-5b76-a9b7-8c04cc3106aa",
            label: "Land Rover Range Rover",
            disabled: false,
          },
          {
            value: "cd9d0f56-84f0-5b27-b5c5-e100001acaf6",
            label: "Volvo S90",
            disabled: false,
          },
          {
            value: "943e270f-2dbc-5b02-899b-55656b6ed891",
            label: "Volvo S60",
            disabled: false,
          },
          {
            value: "f97c4b2f-1319-5525-8740-23be8431c40c",
            label: "Volvo XC90",
            disabled: false,
          },
          {
            value: "8b42a79e-0b89-5954-9dc3-9453ee15481c",
            label: "Volvo XC60",
            disabled: false,
          },
          {
            value: "a1f16c26-c92b-54e8-ac61-d79e47dc4b69",
            label: "Volvo XC40",
            disabled: false,
          },
          {
            value: "95bb78b4-16bb-58b0-b007-bd68a5d049d4",
            label: "Porsche Taycan",
            disabled: false,
          },
          {
            value: "be2f507d-2e67-52e5-8f00-d98afd406a4a",
            label: "Porsche Panamera",
            disabled: false,
          },
          {
            value: "32569d7a-3771-5734-b306-ca5173e8c798",
            label: "Porsche Macan",
            disabled: false,
          },
          {
            value: "88a704dc-f0f1-5357-aad2-a8d05bbf7157",
            label: "Porsche Cayenne",
            disabled: false,
          },
          {
            value: "ffd810c9-f414-5e64-953b-f71a24eff355",
            label: "Porsche 911",
            disabled: false,
          },
          {
            value: "37b4c571-f637-5411-ad61-b8b8e7adb02d",
            label: "Skoda Superb",
            disabled: false,
          },
          {
            value: "7057427d-6edd-5f22-8e9b-5839565df00d",
            label: "Skoda Rapid",
            disabled: false,
          },
          {
            value: "255e7e51-9cc6-5ed0-90fe-2f2e202997cc",
            label: "Skoda Karoq",
            disabled: false,
          },
          {
            value: "60055977-db3d-533d-b487-35421c4d71b1",
            label: "Skoda Kodiaq",
            disabled: false,
          },
          {
            value: "1f2c8651-d862-5a54-99af-7cd815aed548",
            label: "Skoda Octavia",
            disabled: false,
          },
          {
            value: "583fd182-9c44-5ba4-888f-d5499a4c879f",
            label: "Volkswagen Teramont",
            disabled: false,
          },
          {
            value: "c282f829-b9c7-5d06-a085-cea7f5937605",
            label: "Volkswagen Golf",
            disabled: false,
          },
          {
            value: "8754c00d-a56f-53c5-8b4a-3d7c8eed49c5",
            label: "Volkswagen Passat",
            disabled: false,
          },
          {
            value: "5e04f08a-4ef1-58fa-bdb9-80d9c4a7aa5c",
            label: "Volkswagen Touareg",
            disabled: false,
          },
          {
            value: "ea900503-bead-54ad-9530-30fcbb230d98",
            label: "Volkswagen Tiguan",
            disabled: false,
          },
          {
            value: "e0a414be-5f66-52a8-9c5f-5660dec56857",
            label: "Volkswagen Jetta",
            disabled: false,
          },
          {
            value: "5b582734-8665-5c04-bc92-b6214c5f4d49",
            label: "Volkswagen Polo",
            disabled: false,
          },
          {
            value: "42c1b91a-c4e1-5df0-bc7c-07c7d00ca3e4",
            label: "Audi e-tron GT",
            disabled: false,
          },
          {
            value: "4a57d9c4-881a-5fe4-a219-3bc1e2f8806c",
            label: "Audi Q8",
            disabled: false,
          },
          {
            value: "436abb4e-0612-5758-89be-c80ce5508094",
            label: "Audi Q7",
            disabled: false,
          },
          {
            value: "8019a5c9-c954-5675-a308-1554260a962e",
            label: "Audi Q5",
            disabled: false,
          },
          {
            value: "fa3b423c-9368-5842-a6d7-c584fecb45f1",
            label: "Audi Q3",
            disabled: false,
          },
          {
            value: "fa29a9ae-0a04-5cb3-9590-952a0e4156a1",
            label: "Audi A8",
            disabled: false,
          },
          {
            value: "d56d1e26-11a4-5c15-a81e-b5e786665cfb",
            label: "Audi A6",
            disabled: false,
          },
          {
            value: "2dcb3736-93be-57ca-878e-dae5d49aa885",
            label: "Audi A4",
            disabled: false,
          },
          {
            value: "d621c718-a53d-5d53-84d3-21c780cd63c3",
            label: "Audi A3",
            disabled: false,
          },
          {
            value: "adb994d4-676a-5c5f-9b06-bb71d11c7c9e",
            label: "Mercedes-Benz EQS",
            disabled: false,
          },
          {
            value: "492befcb-3523-5011-8012-4ebdd7b31ef4",
            label: "Mercedes-Benz EQE",
            disabled: false,
          },
          {
            value: "b81ea1e7-91b6-569d-9b61-391470ce86f3",
            label: "Mercedes-Benz G-Class",
            disabled: false,
          },
          {
            value: "c7d0dd5f-cfce-5fee-89df-0faddf86a9c9",
            label: "Mercedes-Benz GLS",
            disabled: false,
          },
          {
            value: "b1ab0fdf-292a-58ce-822a-521595a02492",
            label: "Mercedes-Benz GLE",
            disabled: false,
          },
          {
            value: "0c655bae-d2c7-5ab6-b4e4-4e28e7992d70",
            label: "Mercedes-Benz GLC",
            disabled: false,
          },
          {
            value: "08e611a1-2f7a-5545-a4f8-f50a3d4b31d1",
            label: "Mercedes-Benz GLA",
            disabled: false,
          },
          {
            value: "2e45dba0-917f-57f8-8ea7-170112198baa",
            label: "Mercedes-Benz S-Class",
            disabled: false,
          },
          {
            value: "2d8839f6-7d61-5bbc-8c6b-4abb59b0e380",
            label: "Mercedes-Benz E-Class",
            disabled: false,
          },
          {
            value: "96979c16-14bb-503a-9d46-2c1121b996d9",
            label: "Mercedes-Benz C-Class",
            disabled: false,
          },
          {
            value: "0d399016-a413-573d-94c4-f55ddf8ad853",
            label: "BMW iX",
            disabled: false,
          },
          {
            value: "96a40709-f04b-574f-8acf-19f48abb5e38",
            label: "BMW i4",
            disabled: false,
          },
          {
            value: "802e060a-3925-5ab7-a33e-b0993c870d30",
            label: "BMW X7",
            disabled: false,
          },
          {
            value: "67bb71ee-dd7a-5207-bd45-0eac13117a78",
            label: "BMW X6",
            disabled: false,
          },
          {
            value: "2db2ebae-5cae-55b1-a681-93f4da575689",
            label: "BMW X5",
            disabled: false,
          },
          {
            value: "2b95b2b3-f93b-54b7-8ce9-dc49bab952fc",
            label: "BMW X3",
            disabled: false,
          },
          {
            value: "0dcb7239-4408-5160-979f-0d950ca98d47",
            label: "BMW X1",
            disabled: false,
          },
          {
            value: "d1c2fbeb-5d90-5fde-abff-2700daa95c76",
            label: "BMW 7 Series",
            disabled: false,
          },
          {
            value: "209404ac-64ed-57f0-bac2-aa5a3cb81a3a",
            label: "BMW 5 Series",
            disabled: false,
          },
          {
            value: "d5c4d06b-d84b-533f-a763-ea8cdd1898ed",
            label: "BMW 3 Series",
            disabled: false,
          },
          {
            value: "ecd12492-0f63-52f4-8f28-10defde146d3",
            label: "Infiniti Q50",
            disabled: false,
          },
          {
            value: "3b451d39-de68-5f3d-adf1-54d150aeb2e1",
            label: "Infiniti QX80",
            disabled: false,
          },
          {
            value: "5d6e5a10-3572-52f8-ad05-fda10ff6e1d7",
            label: "Infiniti QX60",
            disabled: false,
          },
          {
            value: "fd679dc3-90e0-5ce3-9da6-9f532e023c32",
            label: "Lexus LM",
            disabled: false,
          },
          {
            value: "f6dd6b75-638f-5e4b-befc-b1bec21a3aff",
            label: "Lexus GX",
            disabled: false,
          },
          {
            value: "ea35d983-a707-5be4-bac1-d43d616693c8",
            label: "Lexus LX",
            disabled: false,
          },
          {
            value: "23de4aae-7cf5-5223-aea4-7bc583786fcd",
            label: "Lexus ES",
            disabled: false,
          },
          {
            value: "925c7eaa-398c-50ae-a05a-0cc1e1bd1737",
            label: "Lexus NX",
            disabled: false,
          },
          {
            value: "3a58865d-f91a-50be-922d-ba188dd402d1",
            label: "Lexus RX",
            disabled: false,
          },
          {
            value: "ef864967-1d22-5c6b-a6d9-63e4e3b6e8df",
            label: "Subaru Impreza",
            disabled: false,
          },
          {
            value: "22eb3ceb-fe1e-503b-8306-eed92c678f77",
            label: "Subaru Crosstrek",
            disabled: false,
          },
          {
            value: "ba616b6a-3907-5ed1-bd7a-2eefdca90f2f",
            label: "Subaru Outback",
            disabled: false,
          },
          {
            value: "cad69ad9-a6ab-57cd-b586-3d5c1173e199",
            label: "Subaru Forester",
            disabled: false,
          },
          {
            value: "08d4aa1a-531a-51c3-b7a3-c9f0240c42bb",
            label: "Suzuki Swift",
            disabled: false,
          },
          {
            value: "a9fed1a8-b307-529b-8daf-b8bfbd6eac81",
            label: "Suzuki SX4",
            disabled: false,
          },
          {
            value: "41436bd7-f9d9-53d3-86eb-0fa07fce3e31",
            label: "Suzuki Jimny",
            disabled: false,
          },
          {
            value: "96a52626-46da-5836-bc53-bd78a2775359",
            label: "Suzuki Vitara",
            disabled: false,
          },
          {
            value: "247dfff9-faad-5684-b6e9-25092a279b66",
            label: "Mitsubishi Xpander",
            disabled: false,
          },
          {
            value: "95ffadb0-95c1-5f36-8e66-e66c5de5a7ce",
            label: "Mitsubishi L200",
            disabled: false,
          },
          {
            value: "39920234-9b82-57ba-9e7e-8326679fee68",
            label: "Mitsubishi ASX",
            disabled: false,
          },
          {
            value: "65fbfc1e-576c-50fb-8010-6efed9f2fb7f",
            label: "Mitsubishi Pajero Sport",
            disabled: false,
          },
          {
            value: "c43e37d0-0d91-5697-95f3-08dff791c4e0",
            label: "Mitsubishi Outlander",
            disabled: false,
          },
          {
            value: "287cba55-aa31-51ec-875d-f3f8d4b34eba",
            label: "Mazda CX-9",
            disabled: false,
          },
          {
            value: "5f0df554-61dd-5c33-9928-6ae656f40656",
            label: "Mazda CX-30",
            disabled: false,
          },
          {
            value: "4a5b1f89-7ee8-5080-95ed-58117f8903f0",
            label: "Mazda Mazda6",
            disabled: false,
          },
          {
            value: "c1004756-ed2d-5ca9-a274-9e2f16c6851d",
            label: "Mazda Mazda3",
            disabled: false,
          },
          {
            value: "ced64e38-eb78-5c2a-b819-2585afe036bb",
            label: "Mazda CX-60",
            disabled: false,
          },
          {
            value: "a01419fa-ffb3-59bc-bfe0-7f98d6419b63",
            label: "Mazda CX-5",
            disabled: false,
          },
          {
            value: "cc12e93c-a3b3-5160-97ca-bc205e9f19ac",
            label: "Nissan Sentra",
            disabled: false,
          },
          {
            value: "f318bdce-d526-5c30-8bb8-6aa4772539ff",
            label: "Nissan Terra",
            disabled: false,
          },
          {
            value: "4b012546-8281-5a63-89a4-c56093d53715",
            label: "Nissan Patrol",
            disabled: false,
          },
          {
            value: "49e0cd60-4b26-5da2-936a-b44b433247cb",
            label: "Nissan Murano",
            disabled: false,
          },
          {
            value: "deef8ec9-8276-54ab-8850-3342ed2255ef",
            label: "Nissan Qashqai",
            disabled: false,
          },
          {
            value: "15df07e1-d32a-5a17-b124-a0a3525b3dbc",
            label: "Nissan X-Trail",
            disabled: false,
          },
          {
            value: "6c19ee7f-e4ec-5d59-9fe0-bdeb8a457d27",
            label: "Honda ZR-V",
            disabled: false,
          },
          {
            value: "93202a10-4f0e-55c6-b63b-0a10dd9fb136",
            label: "Honda HR-V",
            disabled: false,
          },
          {
            value: "95401da8-96b2-53c3-be3a-b0c8265be4f9",
            label: "Honda Pilot",
            disabled: false,
          },
          {
            value: "cd34dbe8-af3d-5c34-a45d-de14ee4e1779",
            label: "Honda Accord",
            disabled: false,
          },
          {
            value: "c961c281-41d5-55ab-be58-5f6de3d54220",
            label: "Honda Civic",
            disabled: false,
          },
          {
            value: "b72c7cec-b9ff-596d-abd2-da6c72b58b33",
            label: "Honda CR-V",
            disabled: false,
          },
          {
            value: "4c2cf010-5d58-5a53-ad93-bccc15f2692e",
            label: "Toyota Crown",
            disabled: false,
          },
          {
            value: "bf18a728-8988-57c6-81f6-de27ef8986c9",
            label: "Toyota Alphard",
            disabled: false,
          },
          {
            value: "4e64c6a2-0bae-5883-a961-9723fcc94643",
            label: "Toyota Hilux",
            disabled: false,
          },
          {
            value: "5be3257b-828b-5555-84a0-5f923d2abf92",
            label: "Toyota Highlander",
            disabled: false,
          },
          {
            value: "febcdd36-7401-575c-830f-3e292b0eadef",
            label: "Toyota Land Cruiser 300",
            disabled: false,
          },
          {
            value: "bc515304-ebe6-5628-8760-2b30578f1d37",
            label: "Toyota Land Cruiser Prado",
            disabled: false,
          },
          {
            value: "3790f553-df1d-5714-9362-315ce6f44ba8",
            label: "Toyota RAV4",
            disabled: false,
          },
          {
            value: "70b088fc-928b-59b3-98c3-938adfef3e20",
            label: "Toyota Corolla",
            disabled: false,
          },
          {
            value: "f4eeceb2-06b9-5abd-bec3-e985f2abf5a1",
            label: "Toyota Camry",
            disabled: false,
          },
          {
            value: "70687b70-772c-593e-8dcc-f64280859912",
            label: "KGM Actyon",
            disabled: false,
          },
          {
            value: "c6e14cbd-c633-5aa9-94fe-aae621ed4b9e",
            label: "KGM Tivoli",
            disabled: false,
          },
          {
            value: "137e34a9-f17c-55ce-80b9-d3c338be9f03",
            label: "KGM Musso",
            disabled: false,
          },
          {
            value: "c0f4d905-5c2c-5b0a-8b81-137f7df60619",
            label: "KGM Korando",
            disabled: false,
          },
          {
            value: "b8b127f5-2578-5984-a6a6-411df782a10a",
            label: "KGM Rexton",
            disabled: false,
          },
          {
            value: "f1a251ae-4215-5c2e-843f-e8d87db10284",
            label: "KGM Torres",
            disabled: false,
          },
          {
            value: "727936bd-0785-5293-81e3-faa67793e302",
            label: "Genesis GV80",
            disabled: false,
          },
          {
            value: "795e34a4-0f05-516e-8c78-547cfc0adbcb",
            label: "Genesis GV70",
            disabled: false,
          },
          {
            value: "d4d9098a-bed1-5efd-9325-0e76b624be1c",
            label: "Genesis GV60",
            disabled: false,
          },
          {
            value: "9dbfa798-f2fb-51f2-b62b-6712079ce92f",
            label: "Genesis G90",
            disabled: false,
          },
          {
            value: "64bfceff-3a8f-56e2-b8d6-8b3e0e72fc5e",
            label: "Genesis G80",
            disabled: false,
          },
          {
            value: "c6887637-0a89-581c-b946-975361f35333",
            label: "Genesis G70",
            disabled: false,
          },
          {
            value: "f6e17913-e36e-5074-ae83-ff5b4183f3e1",
            label: "Hyundai Ioniq 5",
            disabled: false,
          },
          {
            value: "c79d9ea6-e0ff-5154-a36c-9d797b710727",
            label: "Hyundai Staria",
            disabled: false,
          },
          {
            value: "0652ad19-b3fb-56e9-b969-8445b74c41a0",
            label: "Hyundai Palisade",
            disabled: false,
          },
          {
            value: "531ae9c9-0e2e-5aec-a449-367bb67f4034",
            label: "Hyundai Santa Fe",
            disabled: false,
          },
          {
            value: "d2832d84-ae27-5442-85c7-ed3ba9e8b589",
            label: "Hyundai Tucson",
            disabled: false,
          },
          {
            value: "05005a67-c5ff-56b9-85d5-de1feb019323",
            label: "Hyundai Creta",
            disabled: false,
          },
          {
            value: "4794f620-1451-53d1-905d-e86a76352e9f",
            label: "Hyundai Sonata",
            disabled: false,
          },
          {
            value: "8317d695-46c6-5dcd-bd2d-9dd6eea1fa97",
            label: "Hyundai Elantra",
            disabled: false,
          },
          {
            value: "b09ebc22-d238-5956-b083-5b937a125620",
            label: "Hyundai Accent",
            disabled: false,
          },
          {
            value: "ba1b8836-19ab-55d9-97ac-630cfb81b5a5",
            label: "Hyundai Solaris",
            disabled: false,
          },
          {
            value: "91a241de-127a-51e9-a8e9-a581ce2aeca6",
            label: "Kia Mohave",
            disabled: false,
          },
          {
            value: "0ced30fc-4d06-5379-844b-d014621dbb7f",
            label: "Kia EV6",
            disabled: false,
          },
          {
            value: "8bf8dd6c-fed7-52c5-921a-edd0a47138e1",
            label: "Kia Carnival",
            disabled: false,
          },
          {
            value: "e1635d53-77c2-5a9a-ad22-34ec69a958aa",
            label: "Kia K8",
            disabled: false,
          },
          {
            value: "ac887014-4f92-5279-ac5f-5ee0657ba045",
            label: "Kia Ceed",
            disabled: false,
          },
          {
            value: "a5717000-412a-5552-a364-e20568cf7192",
            label: "Kia Soul",
            disabled: false,
          },
          {
            value: "7c82459c-fd2b-50d3-b318-c86e4248d44c",
            label: "Kia Seltos",
            disabled: false,
          },
          {
            value: "c25e2ef0-7dd9-5a70-95f2-67e69363805b",
            label: "Kia Sorento",
            disabled: false,
          },
          {
            value: "60ab9d72-fe28-583b-8e61-b4863ed75fce",
            label: "Kia Sportage",
            disabled: false,
          },
          {
            value: "47b047a4-81c4-52d2-8193-83451093ad76",
            label: "Kia Optima",
            disabled: false,
          },
          {
            value: "9e2d7d93-b8d3-5fc7-b652-0e710c79cd8d",
            label: "Kia K5",
            disabled: false,
          },
          {
            value: "3fd4b1da-140f-5217-8f3e-a7bcbda15736",
            label: "Kia Rio X",
            disabled: false,
          },
          {
            value: "2285956e-15ac-595b-a980-b8a2ab11252d",
            label: "Kia Rio",
            disabled: false,
          },
          {
            value: "b02c3c75-0379-55aa-a53c-4b9f75ddfaf4",
            label: "BYD Seagull",
            disabled: false,
          },
          {
            value: "ce3c5072-8533-52dc-8045-5992aa6014f2",
            label: "BYD Qin Plus",
            disabled: false,
          },
          {
            value: "7f5a96d7-785e-560f-ab2c-81fe1c1e1f8a",
            label: "BYD Destroyer 05",
            disabled: false,
          },
          {
            value: "b1f54162-9384-5cd8-82fb-2082ed75e507",
            label: "BYD Sealion 07",
            disabled: false,
          },
          {
            value: "bb790a00-f5bb-5957-82e9-e60d970ac088",
            label: "BYD Sealion 06",
            disabled: false,
          },
          {
            value: "4504b7af-e2d9-5504-a278-1f9f2e67505f",
            label: "BYD Sealion 05",
            disabled: false,
          },
          {
            value: "9a1d4f3c-87eb-5409-9c03-b8fe7b1b0cfc",
            label: "BYD Frigate 07",
            disabled: false,
          },
          {
            value: "50cee7b6-5b24-57f4-8a3e-e9fd3772a987",
            label: "BYD Dolphin",
            disabled: false,
          },
          {
            value: "ea64e97d-938d-57d1-9140-a244fd6a94f8",
            label: "BYD Atto 3",
            disabled: false,
          },
          {
            value: "2865b095-802b-56d0-af0b-a6529c180780",
            label: "BYD Tang",
            disabled: false,
          },
          {
            value: "65839f91-b5fa-5e70-9f1f-ef27718b86e1",
            label: "BYD Han",
            disabled: false,
          },
          {
            value: "ec194c4b-1bb0-5fa2-8ff6-47d256205784",
            label: "BYD Seal U",
            disabled: false,
          },
          {
            value: "408f5ebe-56c4-54e3-b2dc-1a44a72bb97c",
            label: "BYD Seal",
            disabled: false,
          },
          {
            value: "9600b814-2d6c-50e5-92de-1d2d1b482801",
            label: "BYD Song L",
            disabled: false,
          },
          {
            value: "20305576-3596-5a84-b0e2-e73fd090a979",
            label: "BYD Song Pro",
            disabled: false,
          },
          {
            value: "f8a737c1-28ba-58ba-af32-401be7a29f1b",
            label: "BYD Song Plus",
            disabled: false,
          },
          {
            value: "dbfc8969-dd82-5b8c-a4f9-addeea252281",
            label: "Li Auto MEGA",
            disabled: false,
          },
          {
            value: "826ff427-e954-5298-97cc-549822f281ca",
            label: "Li Auto L9",
            disabled: false,
          },
          {
            value: "cacb2332-49dc-5251-8b28-b059aa8649b2",
            label: "Li Auto L8",
            disabled: false,
          },
          {
            value: "ddf829ab-6947-5a8d-8954-5cf8fd1e3d40",
            label: "Li Auto L7",
            disabled: false,
          },
          {
            value: "e2caaf8e-9e35-5226-a8db-097840d9e501",
            label: "Li Auto L6",
            disabled: false,
          },
          {
            value: "4961c9cd-7ffc-52a8-9497-7bb6e5dcd8cd",
            label: "Xpeng X9",
            disabled: false,
          },
          {
            value: "99357c01-425d-5369-9a99-fdb9fbd07449",
            label: "Xpeng P7",
            disabled: false,
          },
          {
            value: "58cf24ec-e52a-5661-939d-690e35386e36",
            label: "Xpeng G9",
            disabled: false,
          },
          {
            value: "3bf8267c-d99e-5bc2-8b43-0c274acae2c2",
            label: "Xpeng G6",
            disabled: false,
          },
          {
            value: "39d34fff-bf46-5cc0-9d0e-676e71ed55da",
            label: "SWM Landian",
            disabled: false,
          },
          {
            value: "1999189e-a736-5066-9b02-05272c7cfa2d",
            label: "SWM G05",
            disabled: false,
          },
          {
            value: "2e710c50-6cd0-5f95-a6cb-95846f2c59ee",
            label: "SWM G01",
            disabled: false,
          },
          {
            value: "07ae1eee-d20e-5766-a141-aa416e5cdc09",
            label: "Skywell ET5X",
            disabled: false,
          },
          {
            value: "62242e88-7453-525a-872f-05dca1221fb8",
            label: "Skywell ET5",
            disabled: false,
          },
          {
            value: "50ce46ab-80ba-59b4-97e8-665e3a1836ac",
            label: "Kaiyi Kunlun",
            disabled: false,
          },
          {
            value: "ecfff2ee-c585-5a90-a320-4d51cb0129d8",
            label: "Kaiyi X7",
            disabled: false,
          },
          {
            value: "a13f9cd2-f87e-524f-9611-bb8c106d51ef",
            label: "Kaiyi X3",
            disabled: false,
          },
          {
            value: "344e7dda-2634-55f8-a5ce-962bb570dcf6",
            label: "BAIC BJ60",
            disabled: false,
          },
          {
            value: "c15c4f53-a4be-518e-99a0-ada502d39823",
            label: "BAIC BJ40",
            disabled: false,
          },
          {
            value: "17ed76c3-0cb4-5ab6-b6e6-8c0bac51f72d",
            label: "BAIC U5 Plus",
            disabled: false,
          },
          {
            value: "8bde0d45-9f57-5eed-a8d7-810235212be8",
            label: "BAIC X7",
            disabled: false,
          },
          {
            value: "e9a3f227-2039-5352-9e43-c4898cbf63f3",
            label: "BAIC X55",
            disabled: false,
          },
          {
            value: "83e362ca-64fc-5eb2-b1c6-f20f46a85b51",
            label: "Hongqi HQ9",
            disabled: false,
          },
          {
            value: "e866c133-ddbf-5ae6-8796-781d8337b2e1",
            label: "Hongqi E-HS9",
            disabled: false,
          },
          {
            value: "c9f4c7b5-6367-5971-aa3b-05cdb8b4b5e8",
            label: "Hongqi HS7",
            disabled: false,
          },
          {
            value: "954be157-341e-597f-80f5-26d0a0e73246",
            label: "Hongqi HS5",
            disabled: false,
          },
          {
            value: "b43e11e3-5597-5b4d-b6b5-9849c0c349b5",
            label: "Hongqi H9",
            disabled: false,
          },
          {
            value: "bb12a021-e2b6-53e3-aea5-41de3346121d",
            label: "Hongqi H5",
            disabled: false,
          },
          {
            value: "666415ea-c46e-5688-8bfa-149ac3743805",
            label: "Bestune B70",
            disabled: false,
          },
          {
            value: "4e9fc15a-c0d3-5243-ac47-7b7001bcdfe8",
            label: "Bestune T99",
            disabled: false,
          },
          {
            value: "85b097ad-81e6-5261-89e7-89a19e3dad6e",
            label: "Bestune T77",
            disabled: false,
          },
          {
            value: "6b0b11da-9d3e-56aa-ab50-beb739d7039f",
            label: "Dongfeng M-Hero 1",
            disabled: false,
          },
          {
            value: "a41b0912-2c86-52d2-ae9e-a92c729219fa",
            label: "Dongfeng Nammi 01",
            disabled: false,
          },
          {
            value: "63ee9ce2-5ddf-5445-80c3-b1f5b1bb0fb1",
            label: "Dongfeng Box",
            disabled: false,
          },
          {
            value: "9a89d54b-307a-57c3-bde3-893a54e25f9f",
            label: "Dongfeng Rich 6",
            disabled: false,
          },
          {
            value: "d605c7e2-2a26-59b1-b4c8-57aed1a4b7e6",
            label: "Dongfeng Fengon 500",
            disabled: false,
          },
          {
            value: "3d471ae4-e411-5ba2-8c2c-a825420aec1c",
            label: "Dongfeng AX7",
            disabled: false,
          },
          {
            value: "aa5a6cde-c9b0-5acb-bbb4-69e60e39fdef",
            label: "GAC Emzoom",
            disabled: false,
          },
          {
            value: "401bb415-6172-5cb6-b655-770c7808e191",
            label: "GAC Emkoo",
            disabled: false,
          },
          {
            value: "35ac42f9-bf65-5a63-b187-8b57d107b1b8",
            label: "GAC GS8",
            disabled: false,
          },
          {
            value: "349c232f-db6e-580f-ab5e-6a804030e895",
            label: "GAC GS4 Plus",
            disabled: false,
          },
          {
            value: "fc879f87-b0c5-5a5c-bfa4-c3a40fc2ceeb",
            label: "GAC GS3",
            disabled: false,
          },
          {
            value: "acbf1ed0-8916-54f6-9aaa-11171901c7b7",
            label: "Aion RT",
            disabled: false,
          },
          {
            value: "677c9e6c-e638-5516-b597-7204973a0497",
            label: "Aion S",
            disabled: false,
          },
          {
            value: "52d7ebee-9840-5245-a13a-97ee0729506c",
            label: "Aion V",
            disabled: false,
          },
          {
            value: "69e690a0-0103-52e3-be59-3d328fbaae89",
            label: "Aion Y Plus",
            disabled: false,
          },
          {
            value: "1d7a7728-fcb6-5705-bb9c-da18a5906050",
            label: "Zeekr MIX",
            disabled: false,
          },
          {
            value: "624db30f-0646-5e3e-b296-dd200d3d789b",
            label: "Zeekr X",
            disabled: false,
          },
          {
            value: "074e0d8f-06e8-5950-aeb8-457e4aa7032f",
            label: "Zeekr 009",
            disabled: false,
          },
          {
            value: "6840aac2-9c30-5d20-954c-e4750f9d1313",
            label: "Zeekr 007",
            disabled: false,
          },
          {
            value: "6dc9f4dd-34b6-5903-8fe6-c652637868f8",
            label: "Zeekr 001",
            disabled: false,
          },
          {
            value: "3b960390-8441-59df-8d3f-f9bdec03433b",
            label: "Voyah Dream",
            disabled: false,
          },
          {
            value: "3db4ef05-4a0b-5a8e-a29d-442baa91c5be",
            label: "Voyah Passion",
            disabled: false,
          },
          {
            value: "493f164d-8ae3-5cb7-8923-596422759152",
            label: "Voyah Courage",
            disabled: false,
          },
          {
            value: "074f01c3-36fb-5f54-8f1d-fb4e2a8ea216",
            label: "Voyah Free",
            disabled: false,
          },
          {
            value: "9fdc5c93-5e60-550d-9ac7-9ff76593fc6d",
            label: "Livan 9",
            disabled: false,
          },
          {
            value: "0640827e-de61-5ee3-8d19-bc0e782e5ca6",
            label: "Livan S6",
            disabled: false,
          },
          {
            value: "342a25b0-01d6-54c0-98a0-6bdb86950131",
            label: "Livan 8",
            disabled: false,
          },
          {
            value: "0ebbd188-eace-522a-9d1f-78d38565f656",
            label: "Livan X6",
            disabled: false,
          },
          {
            value: "92c644d9-5d97-5426-a645-1a5db892afc6",
            label: "Livan X3 Pro",
            disabled: false,
          },
          {
            value: "853fbe04-d88f-57a0-9fb4-ba696538ade4",
            label: "Jetour T1",
            disabled: false,
          },
          {
            value: "19b675a7-1445-5ff5-a250-a61df47c4f30",
            label: "Jetour X95",
            disabled: false,
          },
          {
            value: "a073f072-86bf-5235-b893-f0f4694084d5",
            label: "Jetour T2",
            disabled: false,
          },
          {
            value: "21cfff0b-c9e7-597b-9d0b-e34bd1e84cb5",
            label: "Jetour X90 Plus",
            disabled: false,
          },
          {
            value: "cc717898-f6f0-5544-b18a-11e8e1308c0f",
            label: "Jetour X70 Plus",
            disabled: false,
          },
          {
            value: "e4ed72d7-9e40-5692-8826-0659dd8a131f",
            label: "Jetour Dashing",
            disabled: false,
          },
          {
            value: "394f20f2-4c99-5551-872c-95c0175914de",
            label: "Jetour X50",
            disabled: false,
          },
          {
            value: "6624c1e2-7f14-5e21-baba-31247fc9cf8d",
            label: "JAC Sunray",
            disabled: false,
          },
          {
            value: "f7d582d2-2ee2-532e-a2af-63a4f0cdad39",
            label: "JAC T9",
            disabled: false,
          },
          {
            value: "7c970264-fc3e-5c75-b269-117b25bb9d2b",
            label: "JAC T6",
            disabled: false,
          },
          {
            value: "711a9eda-a7db-5627-96c9-e709889ab6cb",
            label: "JAC JS8",
            disabled: false,
          },
          {
            value: "808459b5-2803-5a3d-a529-f7dbcdeaf1a1",
            label: "JAC JS6",
            disabled: false,
          },
          {
            value: "435fe065-2c82-5c65-83a8-c231891977c9",
            label: "JAC JS4",
            disabled: false,
          },
          {
            value: "de001145-1a5d-5f62-9feb-f85fe7699931",
            label: "JAC JS3",
            disabled: false,
          },
          {
            value: "e3877197-75a0-589d-8ea4-6eef64fa8025",
            label: "GWM Cannon Alpha",
            disabled: false,
          },
          {
            value: "003ef9a2-e39b-5047-9db9-228ba80104bb",
            label: "GWM Poer",
            disabled: false,
          },
          {
            value: "be210da3-9d76-5728-b717-c6930b16d0eb",
            label: "Tank 700",
            disabled: false,
          },
          {
            value: "9075b6d3-26ae-5ae9-aaf9-6a721dacbe9e",
            label: "Tank 500",
            disabled: false,
          },
          {
            value: "d7bc6c3d-5d20-569c-970e-68bdb3508475",
            label: "Tank 400",
            disabled: false,
          },
          {
            value: "95e7235b-f95b-5a1c-93e3-1d4017bc6391",
            label: "Tank 300",
            disabled: false,
          },
          {
            value: "604e4ef5-3797-581d-8b5a-6d25569a0d03",
            label: "Deepal E07",
            disabled: false,
          },
          {
            value: "0291099e-db58-5560-8ff2-0eed75712266",
            label: "Deepal S09",
            disabled: false,
          },
          {
            value: "c2e8b486-0f78-52b1-b5a5-79b1134e83e6",
            label: "Deepal S07",
            disabled: false,
          },
          {
            value: "22c458e8-c5fb-53cd-b420-89fdca3187e0",
            label: "Deepal S05",
            disabled: false,
          },
          {
            value: "469f5ed3-fd74-5991-bd17-19040b0ace1d",
            label: "Deepal G318",
            disabled: false,
          },
          {
            value: "6537f375-aa09-5c84-8f0b-d648e3c1f011",
            label: "Changan Hunter",
            disabled: false,
          },
          {
            value: "3dd5b1b1-1a1a-5979-94c1-09d23da755a2",
            label: "Changan UNI-V",
            disabled: false,
          },
          {
            value: "27fb00e8-d4f4-58c2-a34c-28d2d9911338",
            label: "Changan UNI-K",
            disabled: false,
          },
          {
            value: "a717024e-0476-522f-b8a8-ff582e02ddd2",
            label: "Changan Alsvin",
            disabled: false,
          },
          {
            value: "99e61303-bc96-59cd-bf2f-a50f9b5540e9",
            label: "Changan Eado Plus",
            disabled: false,
          },
          {
            value: "1688d91d-1ff0-55de-aaf4-68b09b1b56e4",
            label: "Changan CS95",
            disabled: false,
          },
          {
            value: "e88668d4-522b-5078-8594-4c249e7da7e3",
            label: "Changan CS85 Coupe",
            disabled: false,
          },
          {
            value: "3e9a024f-60f5-55a5-8686-01c9b476e995",
            label: "Changan CS75 Plus",
            disabled: false,
          },
          {
            value: "edbe9efa-9bc2-50c1-9846-6409d0593e39",
            label: "Changan CS55 Plus",
            disabled: false,
          },
          {
            value: "3446db75-010b-5f49-95a1-8f6145601f9d",
            label: "Changan CS35 Plus",
            disabled: false,
          },
          {
            value: "f3d3b901-c958-5b82-b97e-2e631c10773f",
            label: "Geely Geometry C",
            disabled: false,
          },
          {
            value: "700d4398-b6ea-51b5-be27-22b0ef02a7c9",
            label: "Geely EX5 EM-i",
            disabled: false,
          },
          {
            value: "507a4074-a5e0-592c-8098-119d8b5417f0",
            label: "Geely Okavango",
            disabled: false,
          },
          {
            value: "901fe141-c0b4-5d67-a772-3dc200338f0d",
            label: "Geely Preface",
            disabled: false,
          },
          {
            value: "b2a08df9-34b9-5767-813b-b762689dafa9",
            label: "Geely Emgrand",
            disabled: false,
          },
          {
            value: "cc52d1aa-cd61-5125-950c-751e6a2f0dbb",
            label: "Geely Tugella",
            disabled: false,
          },
          {
            value: "ab64d840-a5f7-556d-a7a8-65336481a153",
            label: "Geely Monjaro",
            disabled: false,
          },
          {
            value: "f0d26faa-73c8-5ce4-93e5-02fda800ff45",
            label: "Geely Atlas Pro",
            disabled: false,
          },
          {
            value: "ffad4017-c2a8-5ebf-801a-83acefdf78d0",
            label: "Geely Atlas",
            disabled: false,
          },
          {
            value: "2a60eb40-8203-587d-8f90-dd1c57bfea39",
            label: "Geely Cityray",
            disabled: false,
          },
          {
            value: "abc0ae3a-5e3b-5952-aa1d-44e76ab7b20f",
            label: "Geely Coolray",
            disabled: false,
          },
          {
            value: "3167999d-73f5-55ff-9b62-f217f4ca61e2",
            label: "Jaecoo J8",
            disabled: false,
          },
          {
            value: "1e603ae1-7e5b-5136-b921-07435cd55b8e",
            label: "Jaecoo J7",
            disabled: false,
          },
          {
            value: "bd86e5df-49f1-55fb-a0b7-c2a01c967813",
            label: "Jaecoo J6",
            disabled: false,
          },
          {
            value: "249ab044-c6e1-59b7-a0d0-eb79ed4e50bd",
            label: "Omoda C9",
            disabled: false,
          },
          {
            value: "64e2d050-c02d-5e8a-8cbe-a744a95efead",
            label: "Omoda C8",
            disabled: false,
          },
          {
            value: "b08d3709-8f36-52b2-a349-79fd926e5cd7",
            label: "Omoda C7",
            disabled: false,
          },
          {
            value: "4929ebaa-67e0-5316-9c94-d2f9d3c9ff95",
            label: "Omoda C5",
            disabled: false,
          },
          {
            value: "175fd66b-7bbd-5bbd-810c-8a875b7ee17e",
            label: "Exeed Exlantix ET",
            disabled: false,
          },
          {
            value: "d1b4afa5-2ca2-52cb-876a-5e80b1f1ba7a",
            label: "Exeed LX",
            disabled: false,
          },
          {
            value: "0ae04ef2-7803-5edf-9478-7c4052ae84ff",
            label: "Exeed RX",
            disabled: false,
          },
          {
            value: "82ae1277-1576-53b0-ba2d-fdfdfa504ed1",
            label: "Exeed TXL",
            disabled: false,
          },
          {
            value: "c6f9e509-9929-5311-83a9-0669fc9669be",
            label: "Exeed VX",
            disabled: false,
          },
          {
            value: "b5e6337a-52d3-5464-8c7b-6cfc1f842002",
            label: "Chery Fulwin T9",
            disabled: false,
          },
          {
            value: "bee6b078-9387-5c91-8fbf-b95337b1adb3",
            label: "Chery Arrizo 8",
            disabled: false,
          },
          {
            value: "4b5b45aa-395b-585f-b923-bf4b5b2fd726",
            label: "Chery Arrizo 6 Pro",
            disabled: false,
          },
          {
            value: "793fd623-7c86-5eb1-ae97-97a434e4ba8d",
            label: "Chery Arrizo 5",
            disabled: false,
          },
          {
            value: "f0dd1af7-207e-5c2c-ba1f-158e3855b6c9",
            label: "Chery Tiggo 9X",
            disabled: false,
          },
          {
            value: "80adc475-051e-57d0-808e-cbd4bf41045b",
            label: "Chery Tiggo 9",
            disabled: false,
          },
          {
            value: "b4c80bfd-736e-5420-84b9-480858877c1d",
            label: "Chery Tiggo 8 Pro Max",
            disabled: false,
          },
          {
            value: "d63adea4-19dc-5bdb-bd5d-edee0eefbc9a",
            label: "Chery Tiggo 8 Pro",
            disabled: false,
          },
          {
            value: "3c3baef5-29dd-5b34-a948-592ca530a8e0",
            label: "Chery Tiggo 8",
            disabled: false,
          },
          {
            value: "dd68ba34-1944-5e6b-929f-f3e6c0838ad3",
            label: "Chery Tiggo 7 Pro Max",
            disabled: false,
          },
          {
            value: "7d49fa69-aee1-5ad5-be93-ff5c1bc75e95",
            label: "Chery Tiggo 7 Pro",
            disabled: false,
          },
          {
            value: "76c176ac-9fb5-5abf-a314-9375dffdf546",
            label: "Chery Tiggo 7L",
            disabled: false,
          },
          {
            value: "21b05876-d2ec-5170-b6ea-1521df7c7665",
            label: "Chery Tiggo 4 Pro",
            disabled: false,
          },
          {
            value: "ff074257-3244-5172-a0fa-10d730e0c7f9",
            label: "Chery Tiggo 4",
            disabled: false,
          },
          {
            value: "7ea8197f-0a89-507d-874f-5c46a94c64e1",
            label: "Chery Tiggo 2 Pro",
            disabled: false,
          },
          {
            value: "ea116c71-32ab-53a5-9b98-557bb2880015",
            label: "Haval Big Dog",
            disabled: false,
          },
          {
            value: "4f818682-593d-5f36-b9fb-42109457b095",
            label: "Haval H9",
            disabled: false,
          },
          {
            value: "7a437906-0ca0-5e0b-9892-2f2c9958d8a6",
            label: "Haval H7",
            disabled: false,
          },
          {
            value: "e898cf3e-aaa1-5b38-a009-c5238c76f812",
            label: "Haval H6 GT",
            disabled: false,
          },
          {
            value: "8ac94be8-ca97-5992-80c0-3108ee9809e8",
            label: "Haval H6",
            disabled: false,
          },
          {
            value: "8a276617-357f-5f76-8cb1-7fbe8d518c92",
            label: "Haval H5",
            disabled: false,
          },
          {
            value: "ef189b5c-9670-530e-a0e9-1ad1959cf290",
            label: "Haval Dargo X",
            disabled: false,
          },
          {
            value: "c64d0c01-999c-5820-81c8-a74fcaf86225",
            label: "Haval Dargo",
            disabled: false,
          },
          {
            value: "14e1d47d-7710-5469-b2c6-260329402087",
            label: "Haval F7x",
            disabled: false,
          },
          {
            value: "2d28c53d-115a-5af5-80e3-50bc78790ec6",
            label: "Haval F7",
            disabled: false,
          },
          {
            value: "9fee66b7-6207-59fc-a3e4-2fdeb4ab6492",
            label: "Haval M6",
            disabled: false,
          },
          {
            value: "dcd1b8b2-c199-5640-86d4-d863fc4c07e8",
            label: "Haval Jolion Pro",
            disabled: false,
          },
          {
            value: "6b6b6189-b6bc-50f5-9d6a-b941c4c6aaae",
            label: "Haval Jolion",
            disabled: false,
          },
          {
            value: "046b7ba3-c9dc-5a1a-aeb5-3f0a89913b44",
            label: "Eonix Z50",
            disabled: false,
          },
          {
            value: "f6272734-894e-5564-a23c-bf807d113766",
            label: "Knewstar T1988",
            disabled: false,
          },
          {
            value: "f1e61d29-9e60-5119-87e7-e91c0f229830",
            label: "Knewstar T1968",
            disabled: false,
          },
          {
            value: "0e944383-8084-5a8a-9993-9c77ad56ddc1",
            label: "Xcite X-Cross 8",
            disabled: false,
          },
          {
            value: "22345eca-fb06-5b3d-b97b-47c7d8b39c9c",
            label: "Xcite X-Cross 7",
            disabled: false,
          },
          {
            value: "5c144f75-9d5f-52c6-a490-aeddeeba87ba",
            label: "Belgee S50",
            disabled: false,
          },
          {
            value: "e325332b-94b3-5b4b-ac3f-0a5874279243",
            label: "Belgee X70",
            disabled: false,
          },
          {
            value: "67660b93-8718-540d-956a-1a6fbf6f3260",
            label: "Belgee X50",
            disabled: false,
          },
          {
            value: "07e19f8c-2e7a-56c3-aa52-11b3c35278da",
            label: "Solaris KRX",
            disabled: false,
          },
          {
            value: "cfe105be-b159-5551-b9ff-8b8b361df558",
            label: "Solaris KRS",
            disabled: false,
          },
          {
            value: "536a1f88-da01-5e0a-9401-495647cdc18f",
            label: "Sollers Atlant",
            disabled: false,
          },
          {
            value: "7b9e82f7-b621-58ee-bb41-b0164c97a716",
            label: "Sollers Argo",
            disabled: false,
          },
          {
            value: "69cde881-458a-552c-b3a3-9e84bebba291",
            label: "Tenet T9",
            disabled: false,
          },
          {
            value: "4faae997-b21a-5612-bf4b-f4103ac5cef3",
            label: "Tenet T8",
            disabled: false,
          },
          {
            value: "59603b20-d734-53e7-9e90-df1b01dd94cf",
            label: "Tenet T7",
            disabled: false,
          },
          {
            value: "dcd78fd6-459f-5fe6-9d97-61990d141ca4",
            label: "Amberauto A5",
            disabled: false,
          },
          {
            value: "545dbab7-a81b-5c16-8ed3-4b5e89e77137",
            label: "Evolute i-Joy",
            disabled: false,
          },
          {
            value: "ed3ce504-6565-596d-9a2f-e58782bcd066",
            label: "Evolute i-Sky",
            disabled: false,
          },
          {
            value: "7f668178-7f5b-524f-a01d-9bc90b437e60",
            label: "Evolute i-Space",
            disabled: false,
          },
          {
            value: "c2e104f5-8f71-5f22-bdd7-ea8c111632d0",
            label: "Evolute i-Pro",
            disabled: false,
          },
          {
            value: "77f83337-fdbc-502b-80bc-f43d4cf65d24",
            label: "Aurus Komendant",
            disabled: false,
          },
          {
            value: "18b51730-2469-5e79-8541-26fe91e8e23f",
            label: "Aurus Senat",
            disabled: false,
          },
          {
            value: "a381ca9a-b8c1-54d6-9668-0552089e8a42",
            label: "GAZ Valday Next",
            disabled: false,
          },
          {
            value: "b0716c17-66c0-574e-9b5f-019a94067247",
            label: "GAZ Gazelle Business",
            disabled: false,
          },
          {
            value: "82d72c9b-20df-5980-974c-0554273d7b4a",
            label: "GAZ Gazelle Next",
            disabled: false,
          },
          {
            value: "e92337fc-7214-5e28-b775-d65401ee6688",
            label: "GAZ Sobol NN",
            disabled: false,
          },
          {
            value: "8421d58e-7937-5d1a-b194-9fe78ab4497b",
            label: "Moskvich 8",
            disabled: false,
          },
          {
            value: "9d83d22b-695a-5e6b-93a6-1ea1ba56ba0f",
            label: "Moskvich 6",
            disabled: false,
          },
          {
            value: "03e9344b-1172-5e37-bc39-c6e8a55e3936",
            label: "Moskvich 3e",
            disabled: false,
          },
          {
            value: "1188e6f9-03cf-5f02-86c3-b8d5615a8e9c",
            label: "Moskvich 3",
            disabled: false,
          },
          {
            value: "f068f909-32e6-57b8-b1f3-315ef79aca93",
            label: "UAZ 2206",
            disabled: false,
          },
          {
            value: "b273ebe6-89b4-5d2c-b625-e18c389791ab",
            label: "UAZ 3909",
            disabled: false,
          },
          {
            value: "c21e65d6-5f45-584c-a661-0e663ebe8bc6",
            label: "UAZ Profi",
            disabled: false,
          },
          {
            value: "790257fe-2e96-53cc-8437-330226b45d88",
            label: "UAZ Pickup",
            disabled: false,
          },
          {
            value: "d8faafcd-544d-5b84-8730-0ae506f15cbd",
            label: "UAZ Hunter",
            disabled: false,
          },
          {
            value: "a04f4e4c-dc9e-5345-88c5-87869bc88749",
            label: "UAZ Patriot Pickup",
            disabled: false,
          },
          {
            value: "0dd0471a-4c0e-5a52-a1aa-c1956bc052e0",
            label: "UAZ Patriot",
            disabled: false,
          },
          {
            value: "d478a99e-1098-5242-9cc3-cbf0b640de0e",
            label: "Lada Aura",
            disabled: false,
          },
          {
            value: "09a6c510-8ce5-5218-891f-7a3cf492a888",
            label: "Lada Niva Travel",
            disabled: false,
          },
          {
            value: "55b232d3-ce97-5541-952d-1ce63f164145",
            label: "Lada Niva Legend Bronto",
            disabled: false,
          },
          {
            value: "31ffd47e-3d46-5ccb-91b9-2b1436c88c0e",
            label: "Lada Niva Legend",
            disabled: false,
          },
          {
            value: "335218c6-9c48-56ee-b489-7b3946795e5b",
            label: "Lada Largus \u0424\u0443\u0440\u0433\u043e\u043d",
            disabled: false,
          },
          {
            value: "56e3a8cd-2c42-54b4-83eb-d8d6a4b6b96e",
            label: "Lada Largus Cross",
            disabled: false,
          },
          {
            value: "43e9a70a-fef1-559b-8b57-1cce13a68754",
            label: "Lada Largus",
            disabled: false,
          },
          {
            value: "42f371db-0d91-5ea8-9a37-4e30c7f313ba",
            label: "Lada Iskra SW Cross",
            disabled: false,
          },
          {
            value: "3d163766-a70f-5316-972b-7a96ee4d9725",
            label: "Lada Iskra SW",
            disabled: false,
          },
          {
            value: "f83e7fe9-ff42-5957-af32-38337a521eb0",
            label: "Lada Iskra",
            disabled: false,
          },
          {
            value: "13b17bba-127b-5504-8de8-a437eaa5f9ba",
            label: "Lada Vesta Sport",
            disabled: false,
          },
          {
            value: "5c9486d7-ec9a-53af-bfe2-6ea8dad8d0ef",
            label: "Lada Vesta SW Cross",
            disabled: false,
          },
          {
            value: "d10f64ec-196f-5de2-9cf3-088e89462f41",
            label: "Lada Vesta SW",
            disabled: false,
          },
          {
            value: "d5e6bf9a-155c-5b1f-ad21-9bcd25901471",
            label: "Lada Vesta",
            disabled: false,
          },
          {
            value: "75cd5223-f719-5bb5-8535-4f6801e588ee",
            label: "Lada Granta Sport",
            disabled: false,
          },
          {
            value: "805d74cc-7dcc-5792-bdc5-8fe8c8ad1ea3",
            label: "Lada Granta Cross",
            disabled: false,
          },
          {
            value: "8955ae0a-c9b1-5af0-858f-329b07409207",
            label: "Lada Granta",
            disabled: false,
          },
        ],
        validation: "default",
        heading:
          "\u041c\u0430\u0440\u043a\u0430 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044f",
      },
      {
        inputType: "text",
        name: "WJWEOeCGKJMKHNrlDbat5QfuEXXo4a",
        value: "",
        disabled: false,
        validation: "none",
        placeholder:
          "\u041a\u043e\u0434 \u0441\u0443\u043f\u0435\u0440\u0432\u0430\u0439\u0437\u0435\u0440\u0430",
        helperInfo: {
          text: "\u041f\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u0441\u0443\u043f\u0435\u0440\u0432\u0430\u0439\u0437\u0435\u0440\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0435\u0433\u043e \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u043a\u043e\u0434",
        },
        pregValue: "L15bXjw+IicoKVwvXFwmXXswLDE0MH0kLw==",
        pregText:
          "\u0417\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u044b \u0441\u0438\u043c\u0432\u043e\u043b\u044b: < > \" ' ( ) \/ \\ &",
      },
    ],
    step: 4,
    type: "needRequired",
  },
  status: "success",
};

export const mockResponseError = {};

export const getFormMockResponse = http.get(
  `${import.meta.env.VITE_GET_FORM}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const step = url.searchParams.get("step");

    return HttpResponse.json(mockStep4ResponseSuccess);

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
