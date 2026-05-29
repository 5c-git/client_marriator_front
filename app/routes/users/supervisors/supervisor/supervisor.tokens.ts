import { token } from "brandi";

import type { SupervisorService } from "./supervisor.service";

export const supervisorTokens = {
  supervisorService: token<SupervisorService>("users-supervisor:SupervisorService"),
};
