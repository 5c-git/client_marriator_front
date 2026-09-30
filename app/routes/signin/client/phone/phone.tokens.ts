import { token } from "brandi";

import type { PhoneService } from "./phone.service";

export const phoneTokens = {
  phoneService: token<PhoneService>("client-phone:PhoneService"),
};
