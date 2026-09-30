import { token } from "brandi";

import type { SpecialistService } from "./specialist.service";

export const specialistTokens = {
  specialistService: token<SpecialistService>("specialist:SpecialistService"),
};
