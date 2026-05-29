import { redirect } from "react-router";
import type { Route } from "./+types/supervisor";

import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { supervisorContainer } from "./supervisor.module";
import { supervisorTokens } from "./supervisor.tokens";
import type { SupervisorActionPayload } from "./supervisor.service";
import { useSupervisorHooks } from "./supervisor.hooks";
import { SupervisorView } from "./_views/SupervisorView";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await supervisorContainer
    .get(supervisorTokens.supervisorService)
    .getSupervisorData(Number(params.user));
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = (await request.json()) as SupervisorActionPayload;
  const result = await supervisorContainer
    .get(supervisorTokens.supervisorService)
    .handleAction(payload);

  if (result.kind === "redirect") {
    throw redirect(withLocale(result.to));
  }
}

export default function Supervisor({ loaderData }: Route.ComponentProps) {
  const userRole = useStore.getState().userRole;
  const ui = useSupervisorHooks(loaderData);

  return (
    <SupervisorView
      loaderData={loaderData}
      userRole={userRole}
      isLoading={ui.isLoading}
      open={ui.open}
      setOpen={ui.setOpen}
      openCounterparty={ui.openCounterparty}
      setOpenCounterparty={ui.setOpenCounterparty}
      searchManagers={ui.searchManagers}
      setSearchManagers={ui.setSearchManagers}
      selectedManagers={ui.selectedManagers}
      setSelectedManagers={ui.setSelectedManagers}
      form={ui.form}
      managerForm={ui.managerForm}
      onBack={ui.onBack}
      onDecline={ui.onDecline}
      onSubmitConfirm={ui.onSubmitConfirm}
      fetcher={ui.fetcher}
      t={ui.t}
    />
  );
}
