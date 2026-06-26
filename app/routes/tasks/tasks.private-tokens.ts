import { token } from "brandi";

import type { GetTasksSuccess } from "~/api/_personal/getTasks/getTasksSuccess.schema";
import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";
import type { PostCancelTaskSuccess } from "~/api/_personal/postCancelTask/postCancelTaskSuccess.schema";
import type { PostRepeatTaskSuccess } from "~/api/_personal/postRepeatTask/postRepeatTaskSuccess.schema";

export type GetTasks = (accessToken: string) => Promise<GetTasksSuccess>;
export type GetUserInfo = (accessToken: string) => Promise<GetUserInfoSuccess>;
export type CancelTask = (
  accessToken: string,
  taskId: string,
) => Promise<PostCancelTaskSuccess>;
export type RepeatTask = (
  accessToken: string,
  taskId: string,
) => Promise<PostRepeatTaskSuccess>;

export const tasksPrivateTokens = {
  getTasks: token<GetTasks>("tasks-private:getTasks"),
  getUserInfo: token<GetUserInfo>("tasks-private:getUserInfo"),
  cancelTask: token<CancelTask>("tasks-private:cancelTask"),
  repeatTask: token<RepeatTask>("tasks-private:repeatTask"),
};
