import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";
import { activityPrivateTokens } from "./activity.private-tokens";
import { activityTokens } from "./activity.tokens";
import { ACTIVITY_TAGS } from "./activity.tags";

import { postCreateTaskActivityPayload } from "~/api/_personal/postCreateTaskActivity/postCreateTaskActivity";
import { postCreateOrderActivityPayload } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { postUpdateTaskActivityPayload } from "~/api/_personal/postUpdateTaskActivity/postUpdateTaskActivity";
import { postUpdateOrderActivityPayload } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivity";

import { getSettingsFromKey } from "~/api/_settings/getSettingsFromKey/getSettingsFromKey";

import { getTask } from "~/api/_personal/getTask/getTask";
import { getViewActivitiesForTask } from "~/api/_personal/getViewActivitiesForTask/getViewActivitiesForTask";
import { getPlaceForTask } from "~/api/_personal/getPlaceForTask/getPlaceForTask";
import { postCreateTaskActivity } from "~/api/_personal/postCreateTaskActivity/postCreateTaskActivity";
import { postUpdateTaskActivity } from "~/api/_personal/postUpdateTaskActivity/postUpdateTaskActivity";

import { getOrder } from "~/api/_personal/getOrder/getOrder";
import { getViewActivitiesForOrder } from "~/api/_personal/getViewActivitiesForOrder/getViewActivitiesForOrder";
import { getPlaceForOrder } from "~/api/_personal/getPlaceForOrder/getPlaceForOrder";
import { postCreateOrderActivity } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { postUpdateOrderActivity } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivity";
import { ActivityService } from "./activity.service";

export const activityContainer = new Container().extend(appContainer);

activityContainer
  .bind(activityPrivateTokens.getSetting)
  .toConstant((accessToken, setting) =>
    getSettingsFromKey(accessToken, setting),
  );

activityContainer
  .when(ACTIVITY_TAGS.order)
  .bind(activityPrivateTokens.getEntity)
  .toConstant((accessToken, entityId) => getOrder(accessToken, entityId));
activityContainer
  .when(ACTIVITY_TAGS.task)
  .bind(activityPrivateTokens.getEntity)
  .toConstant((accessToken, entityId) => getTask(accessToken, entityId));

activityContainer
  .when(ACTIVITY_TAGS.order)
  .bind(activityPrivateTokens.getViewActivitiesForEntity)
  .toConstant((accessToken, entityId) =>
    getViewActivitiesForOrder(accessToken, entityId),
  );
activityContainer
  .when(ACTIVITY_TAGS.task)
  .bind(activityPrivateTokens.getViewActivitiesForEntity)
  .toConstant((accessToken, entityId) =>
    getViewActivitiesForTask(accessToken, entityId),
  );

activityContainer
  .when(ACTIVITY_TAGS.order)
  .bind(activityPrivateTokens.getPlaceForEntity)
  .toConstant((accessToken, orderId) => getPlaceForOrder(accessToken, orderId));
activityContainer
  .when(ACTIVITY_TAGS.task)
  .bind(activityPrivateTokens.getPlaceForEntity)
  .toConstant((accessToken) => getPlaceForTask(accessToken));

activityContainer
  .when(ACTIVITY_TAGS.order)
  .bind(activityPrivateTokens.createEntityActivity)
  .toConstant((accessToken, payload) =>
    postCreateOrderActivity(
      accessToken,
      payload as postCreateOrderActivityPayload,
    ),
  );
activityContainer
  .when(ACTIVITY_TAGS.task)
  .bind(activityPrivateTokens.createEntityActivity)
  .toConstant((accessToken, payload) =>
    postCreateTaskActivity(
      accessToken,
      payload as postCreateTaskActivityPayload,
    ),
  );

activityContainer
  .when(ACTIVITY_TAGS.order)
  .bind(activityPrivateTokens.updateEntityActivity)
  .toConstant((accessToken, payload) =>
    postUpdateOrderActivity(
      accessToken,
      payload as postUpdateOrderActivityPayload,
    ),
  );
activityContainer
  .when(ACTIVITY_TAGS.task)
  .bind(activityPrivateTokens.updateEntityActivity)
  .toConstant((accessToken, payload) =>
    postUpdateTaskActivity(
      accessToken,
      payload as postUpdateTaskActivityPayload,
    ),
  );

activityContainer
  .when(ACTIVITY_TAGS.order)
  .bind(activityPrivateTokens.getEntityVocabulary)
  .toConstant(() => ({
    entity: "orderId",
    single: "order",
    plural: "orders",
    new: "new-order",
  }));
activityContainer
  .when(ACTIVITY_TAGS.task)
  .bind(activityPrivateTokens.getEntityVocabulary)
  .toConstant(() => ({
    entity: "taskId",
    single: "task",
    plural: "tasks",
    new: "new-task",
  }));

activityContainer
  .bind(activityTokens.ActivityService)
  .toInstance(ActivityService)
  .inTransientScope();
