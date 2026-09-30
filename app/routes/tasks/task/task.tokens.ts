import { token } from "brandi";

import type { TaskService } from "./task.service";

export const taskTokens = {
  taskService: token<TaskService>("task:taskService"),
};
