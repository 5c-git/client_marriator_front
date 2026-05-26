import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { createBillingFormSchema } from "./billing-form.validation";
import type { BillingFormValues } from "./billing.service";

type BillingFormNamespace = "billingAdd" | "billingEdit";

export function useBillingRequisiteForm(
  namespace: BillingFormNamespace,
  defaultValues: BillingFormValues,
) {
  const { t } = useTranslation(namespace);
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
