import { token } from "brandi";

import type { ConfirmPersonalEmailService } from "./confirm-personal-email.service";

export const confirmPersonalEmailTokens = {
  confirmPersonalEmailService: token<ConfirmPersonalEmailService>(
    "confirm-personal-email:ConfirmPersonalEmailService",
  ),
};
