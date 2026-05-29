import type { Route } from "./+types/supervisors";

import { Loader } from "~/shared/ui/Loader/Loader";
import { useAppHooks } from "~/shared/hooks/app.hooks";

import { SupervisorsView } from "./_views/SupervisorsView";
import { supervisorsContainer } from "./supervisors.module";
import { supervisorsTokens } from "./supervisors.tokens";

export async function clientLoader() {
  return await supervisorsContainer
    .get(supervisorsTokens.supervisorsService)
    .getSupervisorsMobileModeData();
}

export default function Supervisors({ loaderData }: Route.ComponentProps) {
  const { isLoading } = useAppHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}
      <SupervisorsView users={loaderData.users} />
    </>
  );
}
