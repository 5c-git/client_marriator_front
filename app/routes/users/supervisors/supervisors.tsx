import type { Route } from "./+types/supervisors";

import { SupervisorsView } from "./_views/SupervisorsView";
import { supervisorsContainer } from "./supervisors.module";
import { supervisorsTokens } from "./supervisors.tokens";

export async function clientLoader() {
  return await supervisorsContainer
    .get(supervisorsTokens.supervisorsService)
    .getSupervisorsMobileModeData();
}

export default function Supervisors({ loaderData }: Route.ComponentProps) {
  return <SupervisorsView users={loaderData.users} />;
}
