import { z } from "zod";
import type { TFunction } from "i18next";

import { emailRegExp } from "~/shared/validators";

export function createProfileMetaFormSchema(t: TFunction) {
  return z.object({
    metaPhoto: z
      .string()
      .trim()
      .min(1, { error: t("photo", { ns: "constructorFields" }) }),
    metaPhone: z
      .string()
      .trim()
      .min(1, { error: t("phone", { ns: "constructorFields" }) }),
    metaEmail: z
      .string({ error: t("email", { ns: "constructorFields" }) })
      .regex(emailRegExp, {
        error: t("email_wrongValue", { ns: "constructorFields" }),
      }),
  });
}
