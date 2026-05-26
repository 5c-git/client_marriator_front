import { redirect } from "react-router";
import type { Route } from "./+types/billing-edit";

import { BillingEditView } from "./_views/BillingEditView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { billingContainer } from "../billing.module";
import { billingTokens } from "../billing.tokens";
import { useBillingEditHooks } from "./billing-edit.hooks";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  return await billingContainer.get(billingTokens.billingService).loadBikOptions();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, dataId, ...fields } = await request.json();
  const billingService = billingContainer.get(billingTokens.billingService);

  if (_action === "saveChanges") {
    await billingService.saveRequisite(fields, dataId);
  } else if (_action === "delete") {
    await billingService.deleteRequisite(dataId);
  }

  throw redirect(withLocale("/profile/my-profile/billing"));
}

export default function BillingEdit({ loaderData }: Route.ComponentProps) {
  const { isLoading, navigateTo } = useAppHooks();
  const { control, handleSubmit, errors, saveChanges, deleteRequisite } =
    useBillingEditHooks(loaderData);

  return (
    <>
      {isLoading ? <Loader /> : null}

      <BillingEditView
        loaderData={loaderData}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onBack={() => {
          navigateTo("/profile/my-profile/billing");
        }}
        onConfirmLeave={() => {
          navigateTo("/profile/my-profile/billing");
        }}
        onSave={saveChanges}
        onDelete={deleteRequisite}
      />
    </>
  );
}
