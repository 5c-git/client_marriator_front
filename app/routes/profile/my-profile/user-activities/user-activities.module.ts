import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { UserActivitiesService } from "./user-activities.service";
import { userActivitiesPrivateTokens } from "./user-activities.private-tokens";
import { userActivitiesTokens } from "./user-activities.tokens";

import { getFormActivities } from "~/api/_personal/getFormActivities/getFormActivities";
import { postSaveUserFieldsActivities } from "~/api/_personal/postSaveUserFieldsActivities/postSaveUserFieldsActivities";

export const userActivitiesContainer = new Container().extend(appContainer);

userActivitiesContainer
  .bind(userActivitiesPrivateTokens.fetchFormActivities)
  .toConstant((accessToken, step) => getFormActivities(accessToken, step));

userActivitiesContainer
  .bind(userActivitiesPrivateTokens.saveUserFieldsActivities)
  .toConstant((accessToken, step, formData) =>
    postSaveUserFieldsActivities(accessToken, step, formData),
  );

userActivitiesContainer
  .bind(userActivitiesTokens.userActivitiesService)
  .toInstance(UserActivitiesService)
  .inSingletonScope();
