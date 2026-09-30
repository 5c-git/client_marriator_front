import { useNavigate } from "react-router";
import type { Route } from "./+types/billing";

import { BillingView } from "./_views/BillingView";

import { billingContainer } from "./billing.module";
import { billingTokens } from "./billing.tokens";
import { withLocale } from "~/shared/withLocale";

import type { BillingItem } from "./billing.service";

export async function clientLoader() {
  return await billingContainer.get(billingTokens.billingService).loadBilling();
}

export default function Billing({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <BillingView
      data={loaderData}
      onBack={() => {
        navigate(withLocale("/profile/my-profile"));
      }}
      onAdd={() => {
        navigate(withLocale("/profile/my-profile/billing/billing-add"));
      }}
      onEdit={(index: number, item: BillingItem) => {
        navigate(withLocale("/profile/my-profile/billing/billing-edit"), {
          state: {
            dataId: index,
            ...item,
          },
        });
      }}
    />
  );
}
