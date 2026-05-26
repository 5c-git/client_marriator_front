import { token } from "brandi";

import type { ConfirmPersonalPhoneService } from "./confirm-personal-phone.service";

export const confirmPersonalPhoneTokens = {
  confirmPersonalPhoneService: token<ConfirmPersonalPhoneService>(
    "confirm-personal-phone:ConfirmPersonalPhoneService",
  ),
};
