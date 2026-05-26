import { useCallback, useMemo } from "react";
import { useLocation, useSubmit } from "react-router";

import { useBillingRequisiteForm } from "../billing-form.hooks";
import type {
  BillingEditInfo,
  BillingFormValues,
  BillingRequisiteLoaderData,
} from "../billing.service";

export function useBillingEditHooks(loaderData: BillingRequisiteLoaderData) {
  const submit = useSubmit();
  const location = useLocation();
  const passedBillingInfo = location.state as BillingEditInfo;

  const defaultValues = useMemo<BillingFormValues>(() => {
    const bikMatch = loaderData.bikOptions.find(
      (item) => item.value === passedBillingInfo.bik,
    );

    return {
      confidant: passedBillingInfo.confidant,
      fio: passedBillingInfo.fio,
      bik: bikMatch ? bikMatch.value : "",
      account: passedBillingInfo.account,
      card: passedBillingInfo.card,
      payWithCard: passedBillingInfo.payWithCard,
      cardDue: passedBillingInfo.cardDue,
    };
  }, [loaderData.bikOptions, passedBillingInfo]);

  const { control, handleSubmit, errors } = useBillingRequisiteForm(
    "billingEdit",
    defaultValues,
  );

  const saveChanges = useCallback(
    (values: BillingFormValues) => {
      submit(
        JSON.stringify({
          _action: "saveChanges",
          dataId: passedBillingInfo.dataId,
          ...values,
        }),
        {
          method: "POST",
          encType: "application/json",
        },
      );
    },
    [submit, passedBillingInfo.dataId],
  );

  const deleteRequisite = useCallback(() => {
    submit(
      JSON.stringify({
        _action: "delete",
        dataId: passedBillingInfo.dataId,
      }),
      {
        method: "POST",
        encType: "application/json",
      },
    );
  }, [submit, passedBillingInfo.dataId]);

  return {
    control,
    handleSubmit,
    errors,
    saveChanges,
    deleteRequisite,
  };
}
