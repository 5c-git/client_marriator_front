import type { Route } from "./+types/managers";

import { Loader } from "~/shared/ui/Loader/Loader";
import { useAppHooks } from "~/shared/hooks/app.hooks";

import { ManagersView } from "./_views/ManagersView";
import { managersContainer } from "./managers.module";
import { managersTokens } from "./managers.tokens";

export async function clientLoader() {
  return await managersContainer
    .get(managersTokens.managersService)
    .getManagersMobileModeData();
}

export default function Managers({ loaderData }: Route.ComponentProps) {
  const { isLoading } = useAppHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}
      <ManagersView users={loaderData.users} />
    </>
  );
}
