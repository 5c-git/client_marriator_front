import type { Route } from "./+types/clients";

import { useStore } from "~/store/store";
import { ClientsView } from "./_views/ClientsView";
import { clientsContainer } from "./clients.module";
import { clientsTokens } from "./clients.tokens";

export async function clientLoader() {
  const userRole = useStore.getState().userRole;
  return await clientsContainer
    .get(clientsTokens.clientsService)
    .getClientsMobileModeData(userRole);
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  return <ClientsView users={loaderData.users} />;
}
