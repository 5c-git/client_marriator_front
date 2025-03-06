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
import autocompleteSchema from "../../shared/ui/StyledAutocomplete/StyledAutocomplete.schema.json";
import selectMultipleSchema from "../../shared/ui/StyledSelectMultiple/StyledSelectMultiple.schema.json";

import getFormSchema from "./getForm.schema.json";
import { GetFormInputsSchema } from "./getForm.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

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
ajv.addSchema(autocompleteSchema);
ajv.addSchema(selectMultipleSchema);

const validateSuccess = ajv.compile(getFormSchema);

export const getFormKeys = ["getForm"];

export const getForm = async (
  accessToken: string,
  step: number
): Promise<GetFormInputsSchema> => {
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

    if (validateSuccess(response)) {
      data = response as GetFormInputsSchema;
    } else {
      throw new Response(
        `Данные запроса getForm, шаг - ${step} не валидны схеме`
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
        inputType: "checkbox",
        name: "nalogstatus",
        value: false,
        label: "Налоговый статус",
        disabled: false,
        validation: "checked",
      },
      {
        inputType: "checkbox",
        name: "gov",
        value: false,
        label: "Гражданство",
        disabled: false,
        validation: "checked",
      },
      {
        inputType: "text",
        name: "vnj_vrp",
        value: "",
        disabled: false,
        validation: "none",
        placeholder: "",
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
