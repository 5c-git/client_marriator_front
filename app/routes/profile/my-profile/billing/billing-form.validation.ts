import { z } from "zod";
import type { TFunction } from "i18next";

export function createBillingFormSchema(t: TFunction) {
  return z
    .object({
      confidant: z.boolean(),
      fio: z
        .string({ error: t("text", { ns: "constructorFields" }) })
        .trim()
        .min(1, { error: t("text", { ns: "constructorFields" }) }),
      bik: z
        .string({ error: t("autocomplete", { ns: "constructorFields" }) })
        .trim()
        .min(1, { error: t("autocomplete", { ns: "constructorFields" }) }),
      account: z
        .string({ error: t("account", { ns: "constructorFields" }) })
        .length(20, {
          error: t("account_wrongValue", { ns: "constructorFields" }),
        }),
      card: z
        .string({ error: t("card", { ns: "constructorFields" }) })
        .refine(
          (value) => {
            const arr = `${value}`
              .split("")
              .reverse()
              .map((x) => Number.parseInt(x));
            const lastDigit = arr.shift();
            let sum = arr.reduce(
              (acc, val, i) =>
                i % 2 !== 0
                  ? acc + val
                  : acc + ((val *= 2) > 9 ? val - 9 : val),
              0,
            );
            // @ts-expect-error value is always present
            sum += lastDigit;
            return sum % 10 === 0;
          },
          {
            error: t("card_wrongValue", { ns: "constructorFields" }),
          },
        ),
      payWithCard: z
        .string()
        .trim()
        .min(1, { error: t("radio", { ns: "constructorFields" }) }),
      cardDue: z.string().nullable(),
    })
    .superRefine((values, context) => {
      const bik = values.bik;
      if (bik) {
        const bikRs = bik.slice(-3) + values.account;
        let checksum = 0;
        const coefficients = [
          7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1,
        ];
        for (const i in coefficients) {
          checksum += coefficients[i] * (Number(bikRs[i]) % 10);
        }
        if (checksum % 10 !== 0) {
          context.addIssue({
            code: "custom",
            message: t("account_wrongAccount", { ns: "constructorFields" }),
            input: values.account,
            path: ["account"],
          });
        }
      }
    });
}
