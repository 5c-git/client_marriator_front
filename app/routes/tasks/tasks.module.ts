import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { tasksPrivateTokens } from "./tasks.private-tokens";
import { tasksTokens } from "./tasks.tokens";

export const tasksContainer = new Container().extend(appContainer);

import { getTasks } from "~/api/_personal/getTasks/getTasks";
import { getData } from "~/api/_personal/getData/getData";
import { postRepeatTask } from "~/api/_personal/postRepeatTask/postRepeatTask";
import { postCancelTask } from "~/api/_personal/postCancelTask/postCancelTask";
import { TasksService } from "./tasks.service";

tasksContainer
  .bind(tasksPrivateTokens.getTasks)
  .toConstant((accessToken) => getTasks(accessToken));

tasksContainer
  .bind(tasksPrivateTokens.getUserInfo)
  .toConstant((accessToken) => getData(accessToken));

tasksContainer
  .bind(tasksPrivateTokens.repeatTask)
  .toConstant((accessToken, taskId) => postRepeatTask(accessToken, taskId));

tasksContainer
  .bind(tasksPrivateTokens.cancelTask)
  .toConstant((accessToken, taskId) => postCancelTask(accessToken, taskId));

tasksContainer
  .bind(tasksTokens.tasksService)
  .toInstance(TasksService)
  .inSingletonScope();
