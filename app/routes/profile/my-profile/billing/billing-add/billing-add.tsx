import { redirect } from "react-router";
import type { Route } from "./+types/billing-add";

import { BillingAddView } from "./_views/BillingAddView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { billingContainer } from "../billing.module";
import { billingTokens } from "../billing.tokens";
import { useBillingAddHooks } from "./billing-add.hooks";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  return await billingContainer.get(billingTokens.billingService).loadBikOptions();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();

  await billingContainer
    .get(billingTokens.billingService)
    .saveRequisite(fields, -1);

  throw redirect(withLocale("/profile/my-profile/billing"));
}

export default function BillingAdd({ loaderData }: Route.ComponentProps) {
  const { isLoading, navigateTo } = useAppHooks();
  const { control, handleSubmit, errors, submitForm, resetForm } =
    useBillingAddHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <BillingAddView
        loaderData={loaderData}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onBack={() => {
          navigateTo("/profile/my-profile/billing");
        }}
        onSubmit={submitForm}
        onResetForm={resetForm}
      />
    </>
  );
}
