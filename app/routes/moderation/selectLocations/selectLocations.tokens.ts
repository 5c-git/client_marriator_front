import { token } from "brandi";

import type { SelectLocationsService } from "./selectLocations.service";

export const selectLocationsTokens = {
  selectLocationsService: token<SelectLocationsService>(
    "users-selectLocations:SelectLocationsService",
  ),
};
