import { token } from "brandi";

import { postCreateTaskActivityPayload } from "~/api/_personal/postCreateTaskActivity/postCreateTaskActivity";
import { postCreateOrderActivityPayload } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { postUpdateTaskActivityPayload } from "~/api/_personal/postUpdateTaskActivity/postUpdateTaskActivity";
import { postUpdateOrderActivityPayload } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivity";

import type { GetTaskSuccess } from "~/api/_personal/getTask/getTaskSuccess.schema";
import type { GetOrderSuccess } from "~/api/_personal/getOrder/getOrderSuccess.schema";
import type { GetViewActivitiesForTaskSuccess } from "~/api/_personal/getViewActivitiesForTask/getViewActivitiesForTaskSuccess.schema";
import type { GetViewActivitiesForOrderSuccess } from "~/api/_personal/getViewActivitiesForOrder/getViewActivitiesForOrderSuccess.schema";
import type { GetPlaceForTaskSuccess } from "~/api/_personal/getPlaceForTask/getPlaceForTaskSuccess.schema";
import type { GetPlaceForOrderSuccess } from "~/api/_personal/getPlaceForOrder/getPlaceForOrderSuccess.schema";
import type { GetSettingsFromKeySuccess } from "~/api/_settings/getSettingsFromKey/getSettingsFromKeySuccess.schema";
import type { Setting } from "~/api/_settings/getSettingsFromKey/getSettingsFromKeySuccess.schema";

import type { PostCreateTaskActivitySuccess } from "~/api/_personal/postCreateTaskActivity/postCreateTaskActivitySuccess.schema";
import type { PostCreateOrderActivitySuccess } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivitySuccess.schema";
import type { PostUpdateTaskActivitySuccess } from "~/api/_personal/postUpdateTaskActivity/postUpdateTaskActivitySuccess.schema";
import type { PostUpdateOrderActivitySuccess } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivitySuccess.schema";

export type GetEntity = (
  accessToken: string,
  entityId: string,
) => Promise<GetOrderSuccess | GetTaskSuccess>;

export type GetViewActivitiesForEntity = (
  accessToken: string,
  entityId: string,
) => Promise<GetViewActivitiesForOrderSuccess>;

export type GetPlaceForEntity = (
  accessToken: string,
  entityId: string,
) => Promise<GetPlaceForOrderSuccess>;

export type GetSetting = (
  accessToken: string,
  setting: Setting,
) => Promise<GetSettingsFromKeySuccess>;

export type CreateEntityActivity = (
  accessToken: string,
  payload: postCreateTaskActivityPayload | postCreateOrderActivityPayload,
) => Promise<PostCreateOrderActivitySuccess>;

export type UpdateEntityActivity = (
  accessToken: string,
  payload: postUpdateTaskActivityPayload | postUpdateOrderActivityPayload,
) => Promise<PostUpdateOrderActivitySuccess>;

export type GetEntityVocabulary = () => {
  entity: string;
  single: string;
  plural: string;
  new: string;
};

export const activityPrivateTokens = {
  getEntity: token<GetEntity>("activity-private:getEntity"),
  getViewActivitiesForEntity: token<GetViewActivitiesForEntity>(
    "activity-private:getViewActivitiesForEntity",
  ),
  getPlaceForEntity: token<GetPlaceForEntity>(
    "activity-private:getPlaceForEntity",
  ),
  getSetting: token<GetSetting>("activity-private:getSetting"),
  createEntityActivity: token<CreateEntityActivity>(
    "activity-private:createEntityActivity",
  ),
  updateEntityActivity: token<UpdateEntityActivity>(
    "activity-private:updateEntityActivity",
  ),
  getEntityVocabulary: token<GetEntityVocabulary>(
    "activity-private:getEntityVocabulary",
  ),
};
