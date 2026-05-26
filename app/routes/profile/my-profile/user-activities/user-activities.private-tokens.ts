import { token } from "brandi";

import type { GetFormActivitiesSuccess } from "~/api/_personal/getFormActivities/getFormActivities.schema";
import type { PostSaveUserFieldsActivitiesSuccess } from "~/api/_personal/postSaveUserFieldsActivities/postSaveUserFieldsActivitiesSuccess.schema";

export type FetchFormActivities = (
  accessToken: string,
  step: number,
) => Promise<GetFormActivitiesSuccess>;

export type SaveUserFieldsActivities = (
  accessToken: string,
  step: number,
  formData: unknown,
) => Promise<PostSaveUserFieldsActivitiesSuccess>;

export const userActivitiesPrivateTokens = {
  fetchFormActivities: token<FetchFormActivities>(
    "user-activities-private:fetchFormActivities",
  ),
  saveUserFieldsActivities: token<SaveUserFieldsActivities>(
    "user-activities-private:saveUserFieldsActivities",
  ),
};
