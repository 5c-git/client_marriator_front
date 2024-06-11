import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import textSchema from "../../shared/ui/StyledTextField/StyledTextField.schema.json";
import selectSchema from "../../shared/ui/StyledSelect/StyledSelect.schema.json";
import radioSchema from "../../shared/ui/StyledRadioButton/StyledRadioButton.schema.json";
import checkboxMultipleSchema from "../../shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.schema.json";
import photoCheckboxSchema from "../../shared/ui/StyledPhotoCheckbox/StyledPhotoCheckbox.schema.json";
import checkboxSchema from "../../shared/ui/StyledCheckbox/StyledCheckbox.schema.json";
import fileSchema from "../../shared/ui/StyledFileInput/StyledFileInput.schema.json";
import photoSchema from "../../shared/ui/StyledPhotoInput/StyledPhotoInput.schema.json";
import phoneSchema from "../../shared/ui/StyledPhoneField/StyledPhoneField.schema.json";
import dateSchema from "../../shared/ui/StyledDateField/StyledDateField.schema.json";
import cardSchema from "../../shared/ui/StyledCardField/StyledCardField.schema.json";
import monthSchema from "../../shared/ui/StyledMonthField/StyledMonthField.schema.json";
import emailSchema from "../../shared/ui/StyledEmailField/StyledEmailField.schema.json";
import accountSchema from "../../shared/ui/StyledAccountField/StyledAccountField.schema.json";
import innSchema from "../../shared/ui/StyledInnField/StyledInnField.schema.json";
import snilsSchema from "../../shared/ui/StyledSnilsField/StyledSnilsField.schema.json";
import smsSchema from "../../shared/ui/StyledSmsField/StyledSmsField.schema.json";

import schemaSuccess from "./success.schema.json";

import { Inputs } from "~/shared/constructor/inputs";

const ajv = new Ajv();
addFormats(ajv);

ajv.addSchema(textSchema);
ajv.addSchema(selectSchema);
ajv.addSchema(radioSchema);
ajv.addSchema(checkboxMultipleSchema);
ajv.addSchema(photoCheckboxSchema);
ajv.addSchema(checkboxSchema);
ajv.addSchema(fileSchema);
ajv.addSchema(photoSchema);
ajv.addSchema(phoneSchema);
ajv.addSchema(dateSchema);
ajv.addSchema(cardSchema);
ajv.addSchema(monthSchema);
ajv.addSchema(emailSchema);
ajv.addSchema(accountSchema);
ajv.addSchema(innSchema);
ajv.addSchema(snilsSchema);
ajv.addSchema(smsSchema);

const validateSuccess = ajv.compile(schemaSuccess);

export const getRegStep2Keys = ["getRegStep2"];

type RegStep2 = {
  inputs: Inputs;
};

export const getRegStep2 = async (): Promise<RegStep2> => {
  const url = new URL(import.meta.env.VITE_REG_STEP_2);

  const request = await fetch(url);
  const response = await request.json();

  let data: RegStep2;

  if (validateSuccess(response)) {
    data = response as RegStep2;
  } else {
    console.log(validateSuccess.errors);
    throw new Response("Данные запроса getRegStep2 не валидны схеме");
  }

  return data;
};

// MOCKS
export const mockResponseSuccess = {
  inputs: [
    {
      inputtype: "select",
      name: "tax-status",
      value: "",
      placeholder: "Налоговый статус",
      validation: "default",
      options: [
        {
          value: "person",
          label: "Физическое лицо",
          disabled: false,
        },
        {
          value: "yura",
          label: "Юридическое лицо",
          disabled: false,
        },
      ],
      helperInfo: {
        link: {
          text: "Стань самозанятым",
          type: "external",
          path: "https://www.google.co.uk/",
        },
      },
    },
    {
      inputtype: "select",
      name: "citizenship",
      value: "",
      placeholder: "Гржданство",
      validation: "default",
      options: [
        {
          value: "russia",
          label: "Российская Федерация",
          disabled: false,
        },
        {
          value: "belarus",
          label: "Беларусь",
          disabled: false,
        },
        {
          value: "china",
          label: "Китай",
          disabled: false,
        },
      ],
    },
    {
      inputtype: "radio",
      name: "status",
      value: "",
      placeholder: "Гржданство",
      validation: "default",
      options: [
        {
          value: "vnzh",
          label: "ВНЖ",
          disabled: false,
        },
        {
          value: "rvp",
          label: "РВП",
          disabled: false,
        },
      ],
    },
    {
      inputtype: "select",
      name: "region",
      value: "",
      placeholder: "Выбери регион",
      validation: "default",
      options: [
        {
          value: "moscow",
          label: "Москва",
          disabled: false,
        },
        {
          value: "vladimir",
          label: "Владимир",
          disabled: false,
        },
        {
          value: "nizhniy",
          label: "Нижний Новгород",
          disabled: false,
        },
      ],
    },
    {
      inputtype: "select",
      name: "territory",
      value: "",
      placeholder: "Территория поиска предложений",
      validation: "default",
      options: [
        {
          value: "moscow",
          label: "Москва и область",
          disabled: false,
        },
        {
          value: "vladimir",
          label: "Владимир и область",
          disabled: false,
        },
        {
          value: "nizhniy",
          label: "Нижний Новгород и область",
          disabled: false,
        },
      ],
    },
    {
      inputtype: "photoCheckbox",
      name: "activity",
      value: [],
      validation: "default",
      heading: "Выбери вид деятельности:",
      dividerTop: true,
      options: [
        {
          value: "stock",
          label: "Склад",
          img: "/client_marriator_front/mockImg/step1-1.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "shop",
          label: "Магазин",
          img: "/client_marriator_front/mockImg/step1-2.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "production",
          label: "Производство",
          img: "/client_marriator_front/mockImg/step1-3.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "delivery",
          label: "Доставка",
          img: "/client_marriator_front/mockImg/step1-4.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "public-catering",
          label: "Общепит",
          img: "/client_marriator_front/mockImg/step1-5.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "agriculture",
          label: "Сельское хозяйство",
          img: "/client_marriator_front/mockImg/step1-6.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "housing-and-cleaning",
          label: "ЖКХ",
          img: "/client_marriator_front/mockImg/step1-7.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "marketing",
          label: "Маркетинг",
          img: "/client_marriator_front/mockImg/step1-8.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "call-center",
          label: "Колл-центр",
          img: "/client_marriator_front/mockImg/step1-9.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "leisure",
          label: "Досуг",
          img: "/client_marriator_front/mockImg/step1-10.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "backoffice",
          label: "Бэкофис",
          img: "/client_marriator_front/mockImg/step1-11.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "security",
          label: "Безопасность",
          img: "/client_marriator_front/mockImg/step1-12.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
        {
          value: "advertising",
          label: "Реклама",
          img: "/client_marriator_front/mockImg/step1-13.jpg",
          disabled: false,
          text: "Краткое описание только в две строки",
          details: {
            text: "Название деятельности",
            details:
              "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
            link: {
              text: "Пройти тест",
              type: "external",
              path: "https://www.google.com/",
            },
            img: "/client_marriator_front/mockImg/step1-1.jpg",
          },
        },
      ],
    },
  ],
};

export const mockResponseError = {
  inputs: [],
};

export const getRegStep2MockResponse = http.get(
  `${import.meta.env.VITE_REG_STEP_2}`,
  async () => {
    const scenario = "success";
    // const scenario = "error";

    if (scenario === "success") {
      await delay(2000);
      return HttpResponse.json(mockResponseSuccess);
    } else if (scenario === "error") {
      await delay(2000);
      return HttpResponse.json(mockResponseError);
    }
  }
);
