import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { newTaskPrivateTokens } from "./new-task.private-tokens";
import { newTaskNewTokens } from "./new-task.tokens";
import { NewTaskService } from "./new-task.service";

export const newTaskContainer = new Container().extend(appContainer);

import { getTask } from "~/api/_personal/getTask/getTask";
import { getPlaceForTask } from "~/api/_personal/getPlaceForTask/getPlaceForTask";
import { getProjectsForTask } from "~/api/_personal/getProjectsForTask/getProjectsForTask";
import { getSupervisorsForTask } from "~/api/_personal/getSupervisorsForTask/getSupervisorsForTask";
import { postCreateTask } from "~/api/_personal/postCreateTask/postCreateTask";
import { postUpdateTask } from "~/api/_personal/postUpdateTask/postUpdateTask";
import { postCancelTask } from "~/api/_personal/postCancelTask/postCancelTask";
import { postInvoiceTask } from "~/api/_personal/postInvoiceTask/postInvoiceTask";
import { postDeleteTaskActivity } from "~/api/_personal/postDeleteTaskActivity/postDeleteTaskActivity";

newTaskContainer
  .bind(newTaskPrivateTokens.getTask)
  .toConstant((accessToken, taskId) => getTask(accessToken, taskId));

newTaskContainer
  .bind(newTaskPrivateTokens.getPlaceForTask)
  .toConstant((accessToken) => getPlaceForTask(accessToken));

newTaskContainer
  .bind(newTaskPrivateTokens.getProjectsForTask)
  .toConstant((accessToken, placeId) =>
    getProjectsForTask(accessToken, placeId),
  );

newTaskContainer
  .bind(newTaskPrivateTokens.getSupervisorsForTask)
  .toConstant((accessToken, taskId) =>
    getSupervisorsForTask(accessToken, taskId),
  );

newTaskContainer
  .bind(newTaskPrivateTokens.createTask)
  .toConstant((accessToken, placeId, projectId, selfEmployed) =>
    postCreateTask(accessToken, placeId, projectId, selfEmployed),
  );

newTaskContainer
  .bind(newTaskPrivateTokens.updateTask)
  .toConstant((accessToken, placeId, taskId, projectId, selfEmployed) =>
    postUpdateTask(accessToken, placeId, taskId, projectId, selfEmployed),
  );

newTaskContainer
  .bind(newTaskPrivateTokens.cancelTask)
  .toConstant((accessToken, taskId) => postCancelTask(accessToken, taskId));

newTaskContainer
  .bind(newTaskPrivateTokens.invoiceTask)
  .toConstant((accessToken, taskId, supervisors) =>
    postInvoiceTask(accessToken, taskId, supervisors),
  );

newTaskContainer
  .bind(newTaskPrivateTokens.deleteTaskActivity)
  .toConstant((accessToken, taskId, taskActivityId) =>
    postDeleteTaskActivity(accessToken, taskId, taskActivityId),
  );

newTaskContainer
  .bind(newTaskNewTokens.NewTaskService)
  .toInstance(NewTaskService)
  .inSingletonScope();
