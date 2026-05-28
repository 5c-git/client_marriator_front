import { redirect } from "react-router";
import type { Route } from "./+types/manager";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { managerContainer } from "~/routes/users/managers/manager/manager.module";
import { managerTokens } from "~/routes/users/managers/manager/manager.tokens";
import type { ManagerActionPayload } from "~/routes/users/managers/manager/manager.service";
import { useManagerHooks } from "./manager.hooks";
import { ManagerView } from "./_views/ManagerView";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await managerContainer
    .get(managerTokens.managerService)
    .getManagerData(Number(params.user));
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = (await request.json()) as ManagerActionPayload;
  const result = await managerContainer
    .get(managerTokens.managerService)
    .handleAction(payload);

  if (result.kind === "redirect") {
    throw redirect(withLocale(result.to));
  }
}

export default function Manager({ loaderData }: Route.ComponentProps) {
  const userRole = useStore.getState().userRole;
  const ui = useManagerHooks(loaderData);

  return (
    <ManagerView
      loaderData={loaderData}
      userRole={userRole}
      isLoading={ui.isLoading}
      open={ui.open}
      setOpen={ui.setOpen}
      openCounterparty={ui.openCounterparty}
      setOpenCounterparty={ui.setOpenCounterparty}
      searchSupervisors={ui.searchSupervisors}
      setSearchSupervisors={ui.setSearchSupervisors}
      selectedSupervisors={ui.selectedSupervisors}
      setSelectedSupervisors={ui.setSelectedSupervisors}
      form={ui.form}
      supervisorForm={ui.supervisorForm}
      onBack={ui.onBack}
      onDecline={ui.onDecline}
      onSubmitConfirm={ui.onSubmitConfirm}
      fetcher={ui.fetcher}
      t={ui.t}
    />
  );
}
