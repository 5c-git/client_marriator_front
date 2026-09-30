import { token } from "brandi";

import type { ProfileMetaService } from "./profile-meta.service";

export const profileMetaTokens = {
  profileMetaService: token<ProfileMetaService>(
    "profile-meta:ProfileMetaService",
  ),
};
