import { token } from "brandi";

import type { ManagersService } from "./managers.service";

export const managersTokens = {
  managersService: token<ManagersService>("managers:ManagersService"),
};
