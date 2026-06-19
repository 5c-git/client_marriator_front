/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useRef, useMemo } from "react";

import { debounce } from "../debounce";

import { z } from "zod";
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
import { StyledAutocompleteBic } from "../ui/StyledAutocompleteBic/StyledAutocompleteBic";

const TEXT_FIELD_IMMEDIATE_CHANGE_DEBOUNCE_MS = 15_000;

type ConstructorTextFieldProps = {
  name: string;
  control: Control<FieldValues>;
  errors: FieldErrors;
  onImmediateChange: () => void;
  debounceMs?: number;
  // остальные поля из item: placeholder, heading, validation, …
  [key: string]: unknown;
};

function ConstructorTextField({
  name,
  control,
  errors,
  onImmediateChange,
  debounceMs = TEXT_FIELD_IMMEDIATE_CHANGE_DEBOUNCE_MS,
  ...itemProps
}: ConstructorTextFieldProps) {
  const onImmediateChangeRef = useRef(onImmediateChange);
  onImmediateChangeRef.current = onImmediateChange;

  const debouncedImmediateChange = useMemo(
    () =>
      debounce(() => {
        onImmediateChangeRef.current();
      }, debounceMs),
    [debounceMs],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={itemProps.value}
      render={({ field }) => (
        <StyledTextField
          inputType="text"
          error={errors[name]?.message}
          onImmediateChange={debouncedImmediateChange}
          inputStyle={{
            paddingRight: "16px",
            paddingLeft: "16px",
          }}
          {...itemProps}
          {...field}
        />
      )}
    />
  );
}

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
  bic: StyledAutocompleteBic,
};

const validationMap: Record<string, Record<string, z.ZodSchema<unknown>>> = {
  text: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("text", { ns: "constructorFields" }) }),
  },
  phone: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("phone", { ns: "constructorFields" }) })
      .regex(phoneRegExp, {
        error: t("phone_wrongValue", { ns: "constructorFields" }),
      }),
  },
  select: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("select", { ns: "constructorFields" }) }),
  },
  selectMultiple: {
    none: z.array().optional(),
    default: z
      .array(z.string())
      .min(1, { error: t("selectMultiple", { ns: "constructorFields" }) }),
  },
  radio: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("radio", { ns: "constructorFields" }) }),
  },
  checkbox: {
    none: z.boolean().optional(),
    checked: z.boolean().parse(true, {
      error: t("checkbox_checked", { ns: "constructorFields" }),
    }),
    unchecked: z.boolean().parse(false, {
      error: t("checkbox_unchecked", { ns: "constructorFields" }),
    }),
  },
  checkboxMultiple: {
    none: z.array().optional(),
    default: z
      .array(z.string())
      .min(1, { error: t("checkboxMultiple", { ns: "constructorFields" }) }),
  },
  photoCheckbox: {
    none: z.array().optional(),
    default: z
      .array(z.string())
      .min(1, { error: t("photoCheckbox", { ns: "constructorFields" }) }),
  },
  file: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("file", { ns: "constructorFields" }) }),
  },
  photo: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("photo", { ns: "constructorFields" }) }),
  },
  date: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("date", { ns: "constructorFields" }) }),
    "16years": z
      .string()
      .trim()
      .min(1, { error: t("data", { ns: "constructorFields" }) }),
  },
  card: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("card", { ns: "constructorFields" }) })
      .refine(
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
            0,
          );
          sum += lastDigit;
          return sum % 10 === 0;
        },
        { error: t("card_wrongValue", { ns: "constructorFields" }) },
      ),
  },
  month: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("month", { ns: "constructorFields" }) }),
  },
  email: {
    default: z
      .string({ error: t("email", { ns: "constructorFields" }) })
      .regex(emailRegExp, {
        error: t("email_wrongValue", { ns: "constructorFields" }),
      }),
  },
  inn: {
    none: z.string().default("").optional(),
    default: z
      .string({ error: t("inn", { ns: "constructorFields" }) })
      .length(12, t("inn_wrongValue", { ns: "constructorFields" }))
      .refine(
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
        },
        { error: t("inn_wrongInn", { ns: "constructorFields" }) },
      ),
  },
  snils: {
    none: z.string().default("").optional(),
    default: z
      .string({ error: t("snils", { ns: "constructorFields" }) })
      .length(11, t("snils_wrongSnils", { ns: "constructorFields" }))
      .refine(
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
        },
        { error: t("snils_wrongSnils", { ns: "constructorFields" }) },
      ),
  },
  sms: {
    none: z.string().default("").optional(),
    default: z
      .string({ error: t("sms", { ns: "constructorFields" }) })
      .length(4, t("sms_wrongValue", { ns: "constructorFields" })),
  },
  autocomplete: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("autocomplete", { ns: "constructorFields" }) }),
  },
  bic: {
    none: z.string().default("").optional(),
    default: z
      .string()
      .trim()
      .min(1, { error: t("autocomplete", { ns: "constructorFields" }) }),
  },
  account: {
    none: z.string().default("").optional(),
    default: z
      .string({ error: t("account", { ns: "constructorFields" }) })
      .length(20, t("account_wrongValue", { ns: "constructorFields" })),
  },
};

export const generateDefaultValues = (
  items: { name: string; value: unknown }[],
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
    placeholder?: string;
    // value: string;
    // error: string;
    validation: string;
    pregValue?: string;
    pregText?: string;
  }[],
) => {
  let validationSchema: z.ZodObject<Record<string, z.ZodSchema<unknown>>> =
    z.object({});

  const bikRegExp = new RegExp(`^бик`, "i");

  const bikField = items.find((item) => bikRegExp.test(item.placeholder));

  items.forEach((item) => {
    // account validation requires bik field value, so if there is bik field we add superRefine to validation schema to validate account field
    if (item.inputType === "account" && item.validation === "default") {
      if (bikField) {
        validationSchema.superRefine((values, context) => {
          const bik = values[bikField.name];
          if (bik) {
            // const bikRs = "0" + bik.slice(4, -3) + value;
            const bikRs = bik.slice(-3) + value;
            let checksum = 0;
            const coefficients = [
              7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7,
              1,
            ];
            for (const i in coefficients) {
              checksum += coefficients[i] * (Number(bikRs[i]) % 10);
            }
            if (checksum % 10 !== 0) {
              context.addIssue({
                code: "custom",
                message: t("account_wrongAccount", { ns: "constructorFields" }),
                input: values[item.name],
                path: [item.name],
              });
            }
          }
        });
      }
    } else if (item.pregValue && item.pregText) {
      // const regex = item.pregValue.replace(/[\/\\]/g, '');
      const bytes = Uint8Array.fromBase64(item.pregValue);
      const decoded = new TextDecoder().decode(bytes);

      const regexString = decoded.slice(1, -1);

      const regex = new RegExp(regexString, "u");

      validationSchema = z.object({
        ...validationSchema.shape,
        [item.name]: z.string().regex(regex, { error: item.pregText }),
      });
    } else {
      validationSchema = z.object({
        ...validationSchema.shape,
        [item.name]: validationMap[item.inputType][item.validation],
      });
    }
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
  token: string,
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
              inputStyle={{
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
    } else if (item.inputType === "text") {
      return (
        <ConstructorTextField
          key={item.name}
          name={item.name}
          control={control}
          errors={errors}
          onImmediateChange={onImmediateChange}
          {...item}
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
                inputStyle={{
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
