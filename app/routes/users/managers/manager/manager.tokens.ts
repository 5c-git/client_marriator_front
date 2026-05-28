import { token } from "brandi";

import type { ManagerService } from "./manager.service";

export const managerTokens = {
  managerService: token<ManagerService>("users-manager:ManagerService"),
};
