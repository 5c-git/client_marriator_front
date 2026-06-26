import { token } from "brandi";

import { ActivityService } from "./activity.service";

export const activityTokens = {
  ActivityService: token<ActivityService>("ActivityService"),
};
