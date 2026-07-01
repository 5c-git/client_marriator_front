import { token } from "brandi";

import type { SpecialistsService } from "./specialists.service";

export const specialistsTokens = {
  specialistsService: token<SpecialistsService>(
    "specialists:SpecialistsService",
  ),
};
