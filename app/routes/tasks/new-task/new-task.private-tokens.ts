import { token } from "brandi";

import type { GetTaskSuccess } from "~/api/_personal/getTask/getTaskSuccess.schema";
import type { GetPlaceForTaskSuccess } from "~/api/_personal/getPlaceForTask/getPlaceForTaskSuccess.schema";
import type { GetProjectsForTaskSuccess } from "~/api/_personal/getProjectsForTask/getProjectsForTaskSuccess.schema";
import type { GetSupervisorsForTaskSuccess } from "~/api/_personal/getSupervisorsForTask/getSupervisorsForTaskSuccess.schema";
import type { PostCreateTaskSuccess } from "~/api/_personal/postCreateTask/postCreateTaskSuccess.schema";
import type { PostUpdateTaskSuccess } from "~/api/_personal/postUpdateTask/postUpdateTaskSuccess.schema";
import type { PostCancelTaskSuccess } from "~/api/_personal/postCancelTask/postCancelTaskSuccess.schema";
import type { PostInvoiceTaskSuccess } from "~/api/_personal/postInvoiceTask/postInvoiceTaskSuccess.schema";
import type { PostDeleteTaskActivitySuccess } from "~/api/_personal/postDeleteTaskActivity/postDeleteTaskActivitySuccess.schema";

export type GetTask = (
  accessToken: string,
  taskId: string,
) => Promise<GetTaskSuccess>;

export type GetPlaceForTask = (
  accessToken: string,
  taskId: string,
) => Promise<GetPlaceForTaskSuccess>;

export type GetProjectsForTask = (
  accessToken: string,
  taskId: string,
) => Promise<GetProjectsForTaskSuccess>;

export type GetSupervisorsForTask = (
  accessToken: string,
  taskId: string,
) => Promise<GetSupervisorsForTaskSuccess>;

export type CreateTask = (
  accessToken: string,
  selfEmployed: boolean,
  placeId?: number,
  projectId?: number,
) => Promise<PostCreateTaskSuccess>;

export type UpdateTask = (
  accessToken: string,
  {
    selfEmployed,
    taskId,
    projectId,
    placeId,
  }: {
    selfEmployed: boolean;
    taskId?: number;
    projectId?: number;
    placeId?: number;
  },
) => Promise<PostUpdateTaskSuccess>;

export type CancelTask = (
  accessToken: string,
  taskId: string,
) => Promise<PostCancelTaskSuccess>;

export type InvoiceTask = (
  accessToken: string,
  taskId: string,
  supervisors: string[],
) => Promise<PostInvoiceTaskSuccess>;

export type DeleteTaskActivity = (
  accessToken: string,
  taskId: string,
  taskActivityId: string,
) => Promise<PostDeleteTaskActivitySuccess>;

export const newTaskPrivateTokens = {
  getTask: token<GetTask>("new-task-private:getTask"),
  getPlaceForTask: token<GetPlaceForTask>("new-task-private:getPlaceForTask"),
  getProjectsForTask: token<GetProjectsForTask>(
    "new-task-private:getProjectsForTask",
  ),
  getSupervisorsForTask: token<GetSupervisorsForTask>(
    "new-task-private:getSupervisorsForTask",
  ),
  createTask: token<CreateTask>("new-task-private:createTask"),
  updateTask: token<UpdateTask>("new-task-private:updateTask"),
  cancelTask: token<CancelTask>("new-task-private:cancelTask"),
  invoiceTask: token<InvoiceTask>("new-task-private:invoiceTask"),
  deleteTaskActivity: token<DeleteTaskActivity>(
    "new-task-private:deleteTaskActivity",
  ),
};
