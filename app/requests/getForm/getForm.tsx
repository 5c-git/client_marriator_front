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

import getFormSchema from "./getForm.schema.json";
import { GetFormInputsSchema } from "./getForm.type";

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

const validateSuccess = ajv.compile(getFormSchema);

export const getFormKeys = ["getForm"];

export const getForm = async (step: number): Promise<GetFormInputsSchema> => {
  const url = new URL(import.meta.env.VITE_GET_FORM);

  url.searchParams.append("step", step.toString());

  const request = await fetch(url);
  const response = await request.json();

  let data: GetFormInputsSchema;

  if (validateSuccess(response)) {
    data = response as GetFormInputsSchema;
  } else {
    console.log(validateSuccess.errors);
    throw new Response(
      `Данные запроса getForm, шаг - ${step} не валидны схеме`
    );
  }

  return data;
};

// MOCKS
export const mockStep1ResponseSuccess = {
  result: {
    formData: [
      {
        inputType: "photoCheckbox",
        name: "testitem",
        value: [],
        disabled: false,
        options: [
          {
            value: "directory_activities1",
            label: "Строитель",
            disabled: false,
            img: "/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
          {
            value: "directory_activities2",
            label: "Продавец",
            disabled: false,
            img: "/storage/source/directory/activities/2-img/Снимок экрана 2024-03-08 в 22.38.52.png",
          },
        ],
        validation: "default",
        dividerTop: true,
      },
    ],
    step: 1,
    type: "needRequired",
  },
  status: "success",
};

export const mockStep2ResponseSuccess = {
  result: {
    formData: [
      {
        inputType: "select",
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
        inputType: "select",
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
        inputType: "radio",
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
        inputType: "select",
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
        inputType: "select",
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
        inputType: "photoCheckbox",
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
    step: 2,
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

    if (step === "1") {
      await delay(2000);
      return HttpResponse.json(mockStep1ResponseSuccess);
    } else if (step === "2") {
      await delay(2000);
      return HttpResponse.json(mockStep2ResponseSuccess);
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
  }
);
