import { token } from "brandi";

import type { LocationService } from "./location.service";

export const locationTokens = {
  locationService: token<LocationService>("location:LocationService"),
};
