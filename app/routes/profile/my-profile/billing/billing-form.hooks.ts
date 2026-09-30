import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { createBillingFormSchema } from "./billing-form.validation";
import type { BillingFormValues } from "./billing.service";

type BillingFormNamespace =
  | "m_profile_myProfile_billing_billingAdd"
  | "m_profile_myProfile_billing_billingEdit";

export function useBillingRequisiteForm(
  translation: BillingFormNamespace,
  defaultValues: BillingFormValues,
) {
  const { t } = useTranslation(translation);
  const validationSchema = useMemo(() => createBillingFormSchema(t), [t]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  return {
    control,
    handleSubmit,
    reset,
    errors,
  };
}
