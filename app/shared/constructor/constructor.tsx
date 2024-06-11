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

import { phoneRegExp } from "../validators";

import { StyledSelect } from "../ui/StyledSelect/StyledSelect";
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

const inputMap = {
  text: StyledTextField,
  select: StyledSelect,
  radio: StyledRadioButton,
  checkbox: StyledCheckbox,
  checkboxMultiple: StyledCheckboxMultiple,
  photoCheckbox: StyledPhotoCheckbox,
  file: StyledFileInput,
  photo: StyledPhotoInput,
  phone: StyledPhoneField,
  date: StyledDateField,
  card: StyledCardField,
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
    default: Yup.string().required("Обязатльное поле"),
    email: Yup.string()
      .default("")
      .email("Укажите корректный e-mail")
      .notRequired(),
    emailReq: Yup.string()
      .default("")
      .email("Укажите корректный e-mail")
      .required("Обязатльное поле"),
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
      .matches(phoneRegExp, "Укажите корректный номер телефона")
      .required("Обязатльное поле"),
  },
  select: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required("Обязатльное поле"),
  },
  radio: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required("Обязатльное поле"),
  },
  checkbox: {
    none: Yup.boolean(),
    checked: Yup.boolean().oneOf([true], "Поле должно быть отмечено"),
    unchecked: Yup.boolean().oneOf([false], "Поле не должно быть отмечено"),
  },
  checkboxMultiple: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, "Обязатльное полe"),
  },
  photoCheckbox: {
    none: Yup.array().notRequired(),
    default: Yup.array().min(1, "Обязатльное полe"),
  },
  file: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required("Обязатльное поле"),
  },
  photo: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required("Обязатльное поле"),
  },
  date: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string().required("Обязатльное поле"),
  },
  card: {
    none: Yup.string().default("").notRequired(),
    default: Yup.string()
      .test(
        "is-card",
        () => "Некорректны номер",
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
      .required("Обязатльное поле"),
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
    inputtype: string;
    name: string;
    // value: string;
    // error: string;
    validation: string;
  }[]
) => {
  const validationSchema: Yup.ObjectShape = {};

  items.forEach((item) => {
    validationSchema[item.name] =
      validationMap[item.inputtype][item.validation];

    // if (item.validation === "wrongValue") {
    //   validationSchema[item.name] = validationMap[item.inputtype][
    //     item.validation
    //   ](item.value, item.error);
    // } else {
    //   validationSchema[item.name] =
    //     validationMap[item.inputtype][item.validation];
    // }
  });

  return validationSchema;
};

export const generateInputsMarkup = (
  items: { inputtype: string; name: string; error?: string }[],
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
  onImmediateChange: () => void
) =>
  items.map((item, index: number) => {
    // приходится делать отдельную проверку, так как в данном случае необходимо програмно установить значение в поле
    if (item.inputtype === "file") {
      return (
        <StyledFileInput
          key={index}
          error={errors[item.name]?.message}
          onChange={setValue}
          triggerValidation={trigger}
          onImmediateChange={onImmediateChange}
          inputStyles={{
            paddingRight: "16px",
            paddingLeft: "16px",
          }}
          {...item}
        />
      );
      // приходится делать отдельную проверку, так как в данном случае необходимо програмно установить значение в поле
    } else if (item.inputtype === "photo") {
      return (
        <StyledPhotoInput
          key={index}
          error={errors[item.name]?.message}
          onChange={setValue}
          triggerValidation={trigger}
          onImmediateChange={onImmediateChange}
          {...item}
        />
      );
    } else {
      const Input = inputMap[item.inputtype as keyof typeof inputMap];

      return (
        <Controller
          key={index}
          name={item.name}
          control={control}
          render={({ field }) => (
            <Input
              {...item}
              error={errors[item.name]?.message}
              onImmediateChange={onImmediateChange}
              inputStyles={{
                paddingRight: "16px",
                paddingLeft: "16px",
              }}
              {...field}
            />
          )}
        />
      );
    }
  });
