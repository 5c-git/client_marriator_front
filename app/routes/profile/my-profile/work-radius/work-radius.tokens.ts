import { token } from "brandi";

import type { WorkRadiusService } from "./work-radius.service";

export const workRadiusTokens = {
  workRadiusService: token<WorkRadiusService>("work-radius:WorkRadiusService"),
};
