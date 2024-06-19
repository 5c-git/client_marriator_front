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

const validateSuccess = ajv.compile(schemaSuccess);

export const getRegStep1Keys = ["getRegStep1"];

type RegStep1 = {
  inputs: Inputs;
};

export const getRegStep1 = async (): Promise<RegStep1> => {
  const url = new URL(import.meta.env.VITE_REG_STEP_1);

  const request = await fetch(url);
  const response = await request.json();

  let data: RegStep1;

  if (validateSuccess(response)) {
    data = response as RegStep1;
  } else {
    throw new Response("Данные запроса getRegStep1 не валидны схеме");
  }

  return data;
};

// MOCKS
export const mockResponseSuccess = {
  inputs: [
    {
      inputType: "photoCheckbox",
      name: "direction",
      value: [],
      validation: "default",
      heading: "Выбери чем хочешь заниматься",
      dividerTop: true,
      options: [
        {
          value: "stock",
          label: "Склад",
          img: "/client_marriator_front/mockImg/step1-1.jpg",
          disabled: false,
        },
        {
          value: "shop",
          label: "Магазин",
          img: "/client_marriator_front/mockImg/step1-2.jpg",
          disabled: false,
        },
        {
          value: "production",
          label: "Производство",
          img: "/client_marriator_front/mockImg/step1-3.jpg",
          disabled: false,
        },
        {
          value: "delivery",
          label: "Доставка",
          img: "/client_marriator_front/mockImg/step1-4.jpg",
          disabled: false,
        },
        {
          value: "public-catering",
          label: "Общепит",
          img: "/client_marriator_front/mockImg/step1-5.jpg",
          disabled: false,
        },
        {
          value: "agriculture",
          label: "Сельское хозяйство",
          img: "/client_marriator_front/mockImg/step1-6.jpg",
          disabled: false,
        },
        {
          value: "housing-and-cleaning",
          label: "ЖКХ",
          img: "/client_marriator_front/mockImg/step1-7.jpg",
          disabled: false,
        },
        {
          value: "marketing",
          label: "Маркетинг",
          img: "/client_marriator_front/mockImg/step1-8.jpg",
          disabled: false,
        },
        {
          value: "call-center",
          label: "Колл-центр",
          img: "/client_marriator_front/mockImg/step1-9.jpg",
          disabled: false,
        },
        {
          value: "leisure",
          label: "Досуг",
          img: "/client_marriator_front/mockImg/step1-10.jpg",
          disabled: false,
        },
        {
          value: "backoffice",
          label: "Бэкофис",
          img: "/client_marriator_front/mockImg/step1-11.jpg",
          disabled: false,
        },
        {
          value: "security",
          label: "Безопасность",
          img: "/client_marriator_front/mockImg/step1-12.jpg",
          disabled: false,
        },
        {
          value: "advertising",
          label: "Реклама",
          img: "/client_marriator_front/mockImg/step1-13.jpg",
          disabled: false,
        },
      ],
    },
  ],
};

export const mockResponseError = {
  inputs: [],
};

export const getRegStep1MockResponse = http.get(
  `${import.meta.env.VITE_REG_STEP_1}`,
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
