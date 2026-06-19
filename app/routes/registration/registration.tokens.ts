import { token } from "brandi";

import type { RegistrationService } from "./registration.service";

export const registrationTokens = {
  registrationService: token<RegistrationService>(
    "registration:RegistrationService",
  ),
};
