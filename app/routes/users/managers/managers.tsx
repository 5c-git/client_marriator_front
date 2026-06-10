import type { Route } from "./+types/managers";

import { ManagersView } from "./_views/ManagersView";
import { managersContainer } from "./managers.module";
import { managersTokens } from "./managers.tokens";

export async function clientLoader() {
  return await managersContainer
    .get(managersTokens.managersService)
    .getManagersMobileModeData();
}

export default function Managers({ loaderData }: Route.ComponentProps) {
  return <ManagersView users={loaderData.users} />;
}
