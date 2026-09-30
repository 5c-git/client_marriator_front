import { token } from "brandi";

import type { MyProfileService } from "./my-profile.service";

export const myProfileTokens = {
  myProfileService: token<MyProfileService>("my-profile:MyProfileService"),
};
