/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import * as Yup from "yup";
import {
  Controller,
  Control,
  UseFormSetValue,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";

import { t } from "i18next";

import { phoneRegExp, emailRegExp } from "../validators";

import { StyledSelect } from "../ui/StyledSelect/StyledSelect";
import { StyledSelectMultiple } from "../ui/StyledSelectMultiple/StyledSelectMultiple";
import { StyledCheckbox } from "../ui/StyledCheckbox/StyledCheckbox";
import { StyledCheckboxMultiple } from "../ui/StyledCheckboxMultiple/StyledCheckboxMultiple";
import { StyledRadioButton } from "../ui/StyledRadioButton/StyledRadioButton";
import { StyledFileInput } from "../ui/StyledFileInput/StyledFileInput";
import { StyledPhotoCheckbox } from "../ui/StyledPhotoCheckbox/StyledPhotoCheckbox";
import { StyledTextField } from "../ui/StyledTextField/StyledTextField";
import { StyledPhotoInput } from "../ui/StyledPhotoInput/StyledPhotoInput";
import { StyledPhoneField } from "../ui/StyledPhoneField/StyledPhoneField";
import { StyledDateField } from "../ui/StyledDateField/StyledDateField";
import { StyledCardField } from "../ui/StyledCardField/StyledCardField";
import { StyledMonthField } from "../ui/StyledMonthField/StyledMonthField";
import { StyledEmailField } from "../ui/StyledEmailField/StyledEmailField";
import { StyledAccountField } from "../ui/StyledAccountField/StyledAccountField";
import { StyledInnField } from "../ui/StyledInnField/StyledInnField";
import { StyledSnilsField } from "../ui/StyledSnilsField/StyledSnilsField";
import { StyledSmsField } from "../ui/StyledSmsField/StyledSmsField";
import { StyledAutocomplete } from "../ui/StyledAutocomplete/StyledAutocomplete";

const inputMap = {
  text: StyledTextField,
  select: StyledSelect,
  selectMultiple: StyledSelectMultiple,
  radio: StyledRadioButton,
  checkbox: StyledCheckbox,
  checkboxMultiple: StyledCheckboxMultiple,
  photoCheckbox: StyledPhotoCheckbox,
  file: StyledFileInput,
  photo: StyledPhotoInput,
  phone: StyledPhoneField,
  date: StyledDateField,
  card: StyledCardField,
  month: StyledMonthField,
  email: StyledEmailField,
  account: StyledAccountField,
  inn: StyledInnField,
  snils: StyledSnilsField,
  sms: StyledSmsField,
  autocomplete: StyledAutocomplete,
};

const validationMap: {
  // [key: string]: {
  //   [key: string]:
  //     | Yup.ISchema<unknown>
  //     | ((value: string, error: string) => Yup.ISchema<unknown>);
  // };
  [key: string]: {
    [key: string]: Yup.ISchema<unknown>;
  };
} = {
  text: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("text", { ns: "constructor" })),

    // wrongValue: (value: string, error: string) =>
    //   Yup.string().test(
    //     "wrong",
    //     error,
    //     (currentValue) => currentValue !== value,
    //   ),
  },
  phone: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .matches(phoneRegExp, t("phone_wrongValue", { ns: "constructor" }))
      .required(t("phone", { ns: "constructor" })),
  },
  select: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("select", { ns: "constructor" })),
  },
  selectMultiple: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, t("selectMultiple", { ns: "constructor" })),
  },
  radio: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("radio", { ns: "constructor" })),
  },
  checkbox: {
    none: Yup.boolean(),
    checked: Yup.boolean().oneOf(
      [true],
      t("checkbox_checked", { ns: "constructor" })
    ),
    unchecked: Yup.boolean().oneOf(
      [false],
      t("checkbox_unchecked", { ns: "constructor" })
    ),
  },
  checkboxMultiple: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, t("checkboxMultiple", { ns: "constructor" })),
  },
  photoCheckbox: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, t("photoCheckbox", { ns: "constructor" })),
  },
  file: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("file", { ns: "constructor" })),
  },
  photo: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("photo", { ns: "constructor" })),
  },
  date: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("date", { ns: "constructor" })),
    "16years": Yup.string().required(t("data", { ns: "constructor" })),
  },
  card: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .test(
        "is-card",
        () => t("card_wrongValue", { ns: "constructor" }),
        (value) => {
          // accept only digits, dashes or spaces
          // if (/[^0-9-\s]+/.test(value)) return false;

          const arr = `${value}`
            .split("")
            .reverse()
            .map((x) => Number.parseInt(x));
          const lastDigit = arr.shift();
          let sum = arr.reduce(
            (acc, val, i) =>
              i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
            0
          );
          sum += lastDigit;
          return sum % 10 === 0;
        }
      )
      .required(t("card", { ns: "constructor" })),
  },
  month: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("month", { ns: "constructor" })),
  },
  email: {
    // none: Yup.string()
    //   .default("")
    //   .email(t("Constructor.email", { context: "wrongVaue" }))
    //   .notRequired(),
    default: Yup.string()
      .default("")
      // .email(t("Constructor.email", { context: "wrongVaue" }))
      .matches(emailRegExp, t("email_wrongValue", { ns: "constructor" }))
      .required(t("email", { ns: "constructor" })),
  },
  account: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .default("")
      .length(20, t("account_wrongValue", { ns: "constructor" }))
      .required(t("account", { ns: "constructor" })),
  },
  inn: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .default("")
      .length(12, t("inn_wrongValue", { ns: "constructor" }))
      .required(t("inn", { ns: "constructor" }))
      .test(
        "is-inn",
        () => t("inn_wrongInn", { ns: "constructor" }),
        (value) => {
          const checkDigit = function (inn: string, coefficients) {
            let n = 0;
            for (const i in coefficients) {
              n += coefficients[i] * inn[i];
            }
            return parseInt((n % 11) % 10);
          };

          const n10 = checkDigit(value, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
          const n11 = checkDigit(value, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          const n12 = checkDigit(value, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);

          switch (value.length) {
            case 10:
              if (n10 === parseInt(value[9])) {
                return true;
              }
              break;
            case 12:
              if (n11 === parseInt(value[10]) && n12 === parseInt(value[11])) {
                return true;
              }
              break;
          }

          return false;
        }
      ),
  },
  snils: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .default("")
      .length(11, t("snils_wrongSnils", { ns: "constructor" }))
      .required(t("snils", { ns: "constructor" }))
      .test(
        "is-snils",
        () => t("snils_wrongSnils", { ns: "constructor" }),
        (value) => {
          let sum = 0;
          for (let i = 0; i < 9; i++) {
            sum += parseInt(value[i]) * (9 - i);
          }
          let checkDigit = 0;
          if (sum < 100) {
            checkDigit = sum;
          } else if (sum > 101) {
            checkDigit = parseInt(sum % 101);
            if (checkDigit === 100) {
              checkDigit = 0;
            }
          }
          if (checkDigit === parseInt(value.slice(-2))) {
            return true;
          } else {
            return false;
          }
        }
      ),
  },
  sms: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .default("")
      .length(4, t("sms_wrongValue", { ns: "constructor" }))
      .required(t("sms", { ns: "constructor" })),
  },
  autocomplete: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("autocomplete", { ns: "constructor" })),
  },
};

export const generateDefaultValues = (
  items: { name: string; value: unknown }[]
) => {
  const defaultValues: {
    [key: string]: unknown;
  } = {};

  items.forEach((item) => {
    defaultValues[item.name] = item.value;
  });

  return defaultValues;
};

export const generateValidationSchema = (
  items: {
    inputType: string;
    name: string;
    // value: string;
    // error: string;
    validation: string;
  }[]
) => {
  const validationSchema: Yup.ObjectShape = {};

  items.forEach((item) => {
    validationSchema[item.name] =
      validationMap[item.inputType][item.validation];

    // if (item.validation === "wrongValue") {
    //   validationSchema[item.name] = validationMap[item.inputType][
    //     item.validation
    //   ](item.value, item.error);
    // } else {
    //   validationSchema[item.name] =
    //     validationMap[item.inputType][item.validation];
    // }
  });

  return validationSchema;
};

export const generateInputsMarkup = (
  items: { inputType: string; name: string; error?: string }[],
  errors: FieldErrors,
  control: Control<FieldValues>,
  setValue: UseFormSetValue<{
    [x: string]: unknown;
    [x: number]: unknown;
  }>,
  trigger: UseFormTrigger<{
    [x: string]: unknown;
    [x: number]: unknown;
  }>,
  onImmediateChange: () => void,
  token: string
) =>
  items.map((item) => {
    // приходится делать отдельную проверку, так как в данном случае необходимо програмно установить значение в поле
    if (item.inputType === "file") {
      return (
        <Controller
          key={item.name}
          name={item.name}
          control={control}
          render={({ field }) => (
            <StyledFileInput
              {...field}
              error={errors[item.name]?.message}
              onChange={setValue}
              triggerValidation={trigger}
              onImmediateChange={onImmediateChange}
              url={import.meta.env.VITE_SEND_FILE}
              token={token}
              inputStyles={{
                paddingRight: "16px",
                paddingLeft: "16px",
              }}
              {...item}
            />
          )}
        />
      );

      // приходится делать отдельную проверку, так как в данном случае необходимо програмно установить значение в поле
    } else if (item.inputType === "photo") {
      return (
        <Controller
          key={item.name}
          name={item.name}
          control={control}
          defaultValue={item.value}
          render={({ field }) => (
            <StyledPhotoInput
              {...field}
              error={errors[item.name]?.message}
              onChange={setValue}
              triggerValidation={trigger}
              url={import.meta.env.VITE_SEND_PHOTO}
              token={token}
              onImmediateChange={onImmediateChange}
              {...item}
            />
          )}
        />
      );
    } else {
      const Input = inputMap[item.inputType as keyof typeof inputMap];

      return (
        <Controller
          key={item.name}
          name={item.name}
          control={control}
          defaultValue={item.value}
          render={({ field }) => {
            return (
              <Input
                error={errors[item.name]?.message}
                onImmediateChange={onImmediateChange}
                inputStyles={{
                  paddingRight: "16px",
                  paddingLeft: "16px",
                }}
                {...item}
                {...field}
              />
            );
          }}
        />
      );
    }
  });
