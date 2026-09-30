import { token } from "brandi";

import type { NewTaskService } from "./new-task.service";

export const newTaskNewTokens = {
  NewTaskService: token<NewTaskService>("NewTaskService"),
};
