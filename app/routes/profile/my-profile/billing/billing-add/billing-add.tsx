import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/billing-add";

import { BillingAddView } from "./_views/BillingAddView";

import { billingContainer } from "../billing.module";
import { billingTokens } from "../billing.tokens";
import { useBillingAddHooks } from "./billing-add.hooks";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  return await billingContainer
    .get(billingTokens.billingService)
    .loadBikOptions();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();

  await billingContainer
    .get(billingTokens.billingService)
    .saveRequisite(fields, -1);

  throw redirect(withLocale("/profile/my-profile/billing"));
}

export default function BillingAdd({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { control, handleSubmit, errors, submitForm, resetForm } =
    useBillingAddHooks();

  return (
    <BillingAddView
      loaderData={loaderData}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onBack={() => {
        navigate(withLocale("/profile/my-profile/billing"));
      }}
      onSubmit={submitForm}
      onResetForm={resetForm}
    />
  );
}
