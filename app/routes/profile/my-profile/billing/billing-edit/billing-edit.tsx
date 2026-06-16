import { redirect, useLocation, useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/billing-edit";

import { BillingEditView } from "./_views/BillingEditView";

import { billingContainer } from "../billing.module";
import { billingTokens } from "../billing.tokens";
import { withLocale } from "~/shared/withLocale";
import { BillingEditInfo } from "../billing.service";

export const BILLING_EDIT_ACTIONS = {
  saveChanges: "saveChanges",
  delete: "delete",
} as const;

export async function clientLoader() {
  return await billingContainer
    .get(billingTokens.billingService)
    .loadBikOptions();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, dataId, ...fields } = await request.json();
  const billingService = billingContainer.get(billingTokens.billingService);

  if (_action === BILLING_EDIT_ACTIONS.saveChanges) {
    await billingService.saveRequisite(fields, dataId);
  } else if (_action === BILLING_EDIT_ACTIONS.delete) {
    await billingService.deleteRequisite(dataId);
  }

  throw redirect(withLocale("/profile/my-profile/billing"));
}

export default function BillingEdit({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const submit = useSubmit();
  const passedBillingInfo = location.state as BillingEditInfo;

  const bikMatch = loaderData.bikOptions.find(
    (item) => item.value === passedBillingInfo.bik,
  );

  const defaultValues = {
    confidant: passedBillingInfo.confidant,
    fio: passedBillingInfo.fio,
    bik: bikMatch ? bikMatch.value : "",
    account: passedBillingInfo.account,
    card: passedBillingInfo.card,
    payWithCard: passedBillingInfo.payWithCard,
    cardDue: passedBillingInfo.cardDue,
  };

  return (
    <BillingEditView
      data={loaderData}
      defaultValues={defaultValues}
      onBack={() => {
        navigate(withLocale("/profile/my-profile/billing"));
      }}
      onConfirmLeave={() => {
        navigate(withLocale("/profile/my-profile/billing"));
      }}
      onSave={(values) => {
        submit(
          JSON.stringify({
            _action: BILLING_EDIT_ACTIONS.saveChanges,
            dataId: passedBillingInfo.dataId,
            ...values,
          }),
          {
            method: "POST",
            encType: "application/json",
          },
        );
      }}
      onDelete={() => {
        submit(
          JSON.stringify({
            _action: BILLING_EDIT_ACTIONS.delete,
            dataId: passedBillingInfo.dataId,
          }),
          {
            method: "POST",
            encType: "application/json",
          },
        );
      }}
    />
  );
}
