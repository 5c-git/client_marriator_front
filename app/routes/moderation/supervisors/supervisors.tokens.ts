import { token } from "brandi";

import type { SupervisorsService } from "./supervisors.service";

export const supervisorsTokens = {
  supervisorsService: token<SupervisorsService>("supervisors:SupervisorsService"),
};
