import { useCallback } from "react";
import { useSubmit } from "react-router";

import { useBillingRequisiteForm } from "../billing-form.hooks";
import type { BillingFormValues } from "../billing.service";

const defaultValues: BillingFormValues = {
  confidant: false,
  fio: "",
  bik: "",
  account: "",
  card: "",
  payWithCard: "yes",
  cardDue: null,
};

export function useBillingAddHooks() {
  const submit = useSubmit();
  const { control, handleSubmit, reset, errors } =
    useBillingRequisiteForm("billingAdd", defaultValues);

  const submitForm = useCallback(
    (values: BillingFormValues) => {
      submit(JSON.stringify(values), {
        method: "POST",
        encType: "application/json",
      });
    },
    [submit],
  );

  const resetForm = useCallback(() => {
    reset(defaultValues);
  }, [reset]);

  return {
    control,
    handleSubmit,
    errors,
    submitForm,
    resetForm,
  };
}
