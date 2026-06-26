import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { taskPrivateTokens } from "./task.private-tokens";
import { taskTokens } from "./task.tokens";
import { TaskService } from "./task.service";

import { getTask } from "~/api/_personal/getTask/getTask";
import { getPlaceForBid } from "~/api/_personal/getPlaceForBid/getPlaceForBid";
import { getSupervisorsForTask } from "~/api/_personal/getSupervisorsForTask/getSupervisorsForTask";

import { postDeleteTaskActivity } from "~/api/_personal/postDeleteTaskActivity/postDeleteTaskActivity";
import { postCreateBidFromTask } from "~/api/_personal/postCreateBidFromTask/postCreateBidFromTask";
import { postInstructTask } from "~/api/_personal/postInstructTask/postInstructTask";
import { postInvoiceTask } from "~/api/_personal/postInvoiceTask/postInvoiceTask";
import { postAcceptTask } from "~/api/_personal/postAcceptTask/postAcceptTask";
import { postCreateSearchFromTask } from "~/api/_personal/postCreateSearchFromTask/postCreateSearchFromTask";
import { postUpdateSearch } from "~/api/_personal/postUpdateSearch/postUpdateSearch";
import { useStore } from "~/store/store";

export const taskContainer = new Container().extend(appContainer);

taskContainer
  .bind(taskPrivateTokens.getTask)
  .toConstant((accessToken, taskId) => getTask(accessToken, taskId));

taskContainer
  .bind(taskPrivateTokens.getPlaceForBid)
  .toConstant((accessToken) => getPlaceForBid(accessToken));

taskContainer
  .bind(taskPrivateTokens.getSupervisorsForTask)
  .toConstant((accessToken, taskId) =>
    getSupervisorsForTask(accessToken, taskId),
  );

taskContainer
  .bind(taskPrivateTokens.deleteTaskActivity)
  .toConstant((accessToken, taskId, taskActivityId) =>
    postDeleteTaskActivity(accessToken, taskId, taskActivityId),
  );

taskContainer
  .bind(taskPrivateTokens.createBidFromTask)
  .toConstant((accessToken, taskId, taskActivityId) =>
    postCreateBidFromTask(accessToken, taskId, taskActivityId),
  );

taskContainer
  .bind(taskPrivateTokens.instructTask)
  .toConstant((accessToken, taskId, supervisorId) =>
    postInstructTask(accessToken, taskId, supervisorId),
  );

taskContainer
  .bind(taskPrivateTokens.invoiceTask)
  .toConstant((accessToken, taskId, supervisors) =>
    postInvoiceTask(accessToken, taskId, supervisors),
  );

taskContainer
  .bind(taskPrivateTokens.acceptTask)
  .toConstant((accessToken, taskId) => postAcceptTask(accessToken, taskId));

taskContainer
  .bind(taskPrivateTokens.makeSearchRequest)
  .toConstant((accessToken, taskId, taskActivityId) =>
    postCreateSearchFromTask(accessToken, taskId, taskActivityId),
  );

taskContainer
  .bind(taskPrivateTokens.updateSearchRequest)
  .toConstant((accessToken, searchId, payload) =>
    postUpdateSearch(accessToken, searchId, payload),
  );

taskContainer
  .bind(taskPrivateTokens.getUserId)
  .toConstant(() => useStore.getState().userId);

taskContainer
  .bind(taskTokens.taskService)
  .toInstance(TaskService)
  .inSingletonScope();
