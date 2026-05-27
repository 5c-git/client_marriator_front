import { redirect } from "react-router";
import type { Route } from "./+types/client";

import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { clientContainer } from "./client.module";
import { clientTokens } from "./client.tokens";
import { useClientHooks } from "./client.hooks";
import { ClientView } from "./_views/ClientView";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await clientContainer
    .get(clientTokens.clientService)
    .getClientData(Number(params.user));
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = (await request.json()) as any;
  const result = await clientContainer
    .get(clientTokens.clientService)
    .handleAction(payload);

  if (result.kind === "redirect") {
    throw redirect(withLocale(result.to));
  }
}

export default function Client({ loaderData }: Route.ComponentProps) {
  const userRole = useStore.getState().userRole;
  const ui = useClientHooks(loaderData);

  return (
    <ClientView
      loaderData={loaderData}
      userRole={userRole}
      isLoading={ui.isLoading}
      open={ui.open}
      setOpen={ui.setOpen}
      openCounterparty={ui.openCounterparty}
      setOpenCounterparty={ui.setOpenCounterparty}
      form={ui.form}
      onBack={ui.onBack}
      onDecline={ui.onDecline}
      onSubmitConfirm={ui.onSubmitConfirm}
      fetcher={ui.fetcher}
      t={ui.t}
    />
  );
}

