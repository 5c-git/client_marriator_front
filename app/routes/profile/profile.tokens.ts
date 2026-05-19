import { token } from "brandi";

import type { ProfileService } from "./profile.service";

export const profileTokens = {
  profileService: token<ProfileService>("profile:ProfileService"),
};
