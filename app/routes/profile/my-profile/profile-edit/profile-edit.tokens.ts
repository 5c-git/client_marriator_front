import { token } from "brandi";

import type { ProfileEditService } from "./profile-edit.service";

export const profileEditTokens = {
  profileEditService: token<ProfileEditService>(
    "profile-edit:ProfileEditService",
  ),
};
