import { redirect, useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/billing-add";

import { BillingAddView } from "./_views/BillingAddView";

import { billingContainer } from "../billing.module";
import { billingTokens } from "../billing.tokens";
import { withLocale } from "~/shared/withLocale";
import { BillingFormValues } from "../billing.service";

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
  const submit = useSubmit();

  return (
    <BillingAddView
      data={loaderData}
      onBack={() => {
        navigate(withLocale("/profile/my-profile/billing"));
      }}
      onSubmit={(values: BillingFormValues) => {
        submit(JSON.stringify(values), {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
