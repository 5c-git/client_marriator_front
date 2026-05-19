import { useNavigate } from "react-router";
import type { Route } from "./+types/billing";

import { BillingView } from "./_views/BillingView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { billingContainer } from "./billing.module";
import { billingTokens } from "./billing.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import { withLocale } from "~/shared/withLocale";

import type { BillingItem } from "./billing.service";

export async function clientLoader() {
  return await billingContainer.get(billingTokens.billingService).loadBilling();
}

export default function Billing({ loaderData }: Route.ComponentProps) {
  const { isLoading, navigateTo } = useAppHooks();
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <BillingView
        translation="billing"
        data={loaderData}
        onBack={() => {
          navigateTo("/profile/my-profile");
        }}
        onAdd={() => {
          navigateTo("/profile/my-profile/billing/billing-add");
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
    </>
  );
}
