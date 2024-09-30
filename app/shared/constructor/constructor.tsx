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

// import { t } from "i18next";

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

import { t } from "i18next";

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
    default: Yup.string().required(t("Constructor.text")),

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
      .matches(phoneRegExp, t("Constructor.phone", { context: "wrongVaue" }))
      .required(t("Constructor.phone")),
  },
  select: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("Constructor.select")),
  },
  selectMultiple: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, t("Constructor.selectMultiple")),
  },
  radio: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("Constructor.radio")),
  },
  checkbox: {
    none: Yup.boolean(),
    checked: Yup.boolean().oneOf([true], t("Constructor.checkbox_checked")),
    unchecked: Yup.boolean().oneOf(
      [false],
      t("Constructor.checkbox_unchecked")
    ),
  },
  checkboxMultiple: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, t("Constructor.checkboxMultiple")),
  },
  photoCheckbox: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, t("Constructor.photoCheckbox")),
  },
  file: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("Constructor.file")),
  },
  photo: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("Constructor.photo")),
  },
  date: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("Constructor.date")),
    "16years": Yup.string().required(t("Constructor.date")),
  },
  card: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .test(
        "is-card",
        () => t("Constructor.card", { context: "wrongVaue" }),
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
      .required(t("Constructor.card")),
  },
  month: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("Constructor.month")),
  },
  email: {
    // none: Yup.string()
    //   .default("")
    //   .email(t("Constructor.email", { context: "wrongVaue" }))
    //   .notRequired(),
    default: Yup.string()
      .default("")
      // .email(t("Constructor.email", { context: "wrongVaue" }))
      .matches(emailRegExp, t("Constructor.email", { context: "wrongVaue" }))
      .required(t("Constructor.email")),
  },
  account: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .default("")
      .length(20, t("Constructor.account", { context: "wrongVaue" }))
      .required(t("Constructor.account")),
  },
  inn: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .default("")
      .length(12, t("Constructor.inn", { context: "wrongVaue" }))
      .required(t("Constructor.inn"))
      .test(
        "is-inn",
        () => t("Constructor.inn", { context: "wrongInn" }),
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
      .length(11, t("Constructor.snils", { context: "wrongVaue" }))
      .required(t("Constructor.snils")),
  },
  sms: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .default("")
      .length(4, t("Constructor.sms", { context: "wrongVaue" }))
      .required(t("Constructor.sms")),
  },
  autocomplete: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required(t("Constructor.autocomplete")),
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
