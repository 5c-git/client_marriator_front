import { token } from "brandi";

import type { UserActivitiesService } from "./user-activities.service";

export const userActivitiesTokens = {
  userActivitiesService: token<UserActivitiesService>(
    "user-activities:UserActivitiesService",
  ),
};
