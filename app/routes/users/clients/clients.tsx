import type { Route } from "./+types/clients";

import { useStore } from "~/store/store";

import { Loader } from "~/shared/ui/Loader/Loader";

import { ClientsView } from "./_views/ClientsView";
import { clientsContainer } from "./clients.module";
import { clientsTokens } from "./clients.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";

export async function clientLoader() {
  const userRole = useStore.getState().userRole;
  return await clientsContainer
    .get(clientsTokens.clientsService)
    .getClientsMobileModeData(userRole);
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  const { isLoading } = useAppHooks();

  return <>
  {isLoading ? <Loader /> : null}
  <ClientsView users={loaderData.users} />
</>
}
