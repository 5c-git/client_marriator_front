import { token } from "brandi";

import type { TasksService } from "./tasks.service";

export const tasksTokens = {
  tasksService: token<TasksService>("TasksService"),
};
