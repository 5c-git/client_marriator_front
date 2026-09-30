import { token } from "brandi";

import type { GetTaskSuccess } from "~/api/_personal/getTask/getTaskSuccess.schema";
import type { GetPlaceForBidSuccess } from "~/api/_personal/getPlaceForBid/getPlaceForBidSuccess.schema";
import type { GetSupervisorsForTaskSuccess } from "~/api/_personal/getSupervisorsForTask/getSupervisorsForTaskSuccess.schema";

import type { PostDeleteTaskActivitySuccess } from "~/api/_personal/postDeleteTaskActivity/postDeleteTaskActivitySuccess.schema";
import type { PostCreateBidFromTaskSuccess } from "~/api/_personal/postCreateBidFromTask/postCreateBidFromTaskSuccess.schema";
import type { PostInstructTaskSuccess } from "~/api/_personal/postInstructTask/postInstructTaskSuccess.schema";
import type { PostInvoiceTaskSuccess } from "~/api/_personal/postInvoiceTask/postInvoiceTaskSuccess.schema";
import type { PostAcceptTaskSuccess } from "~/api/_personal/postAcceptTask/postAcceptTaskSuccess.schema";
import type { PostCreateSearchFromTaskSuccess } from "~/api/_personal/postCreateSearchFromTask/postCreateSearchFromTaskSuccess.schema";
import type { PostSearchSuccess } from "~/api/_personal/postUpdateSearch/postUpdateSearchSuccess.schema";
import { PostUpdateSearchPayload } from "~/api/_personal/postUpdateSearch/postUpdateSearch";
import { State } from "~/store/store";

export type GetTask = (
  accessToken: string,
  taskId: string,
) => Promise<GetTaskSuccess>;
export type GetPlaceForBid = (
  accessToken: string,
) => Promise<GetPlaceForBidSuccess>;
export type GetSupervisorsForTask = (
  accessToken: string,
  taskId: string,
) => Promise<GetSupervisorsForTaskSuccess>;

export type DeleteTaskActivity = (
  accessToken: string,
  taskId: string,
  taskActivityId: string,
) => Promise<PostDeleteTaskActivitySuccess>;
export type CreateBidFromTask = (
  accessToken: string,
  taskId: string,
  taskActivityId: string,
) => Promise<PostCreateBidFromTaskSuccess>;
export type InstructTask = (
  accessToken: string,
  taskId: string,
  supervisorId: string,
) => Promise<PostInstructTaskSuccess>;
export type InvoiceTask = (
  accessToken: string,
  taskId: string,
  supervisors: string[],
) => Promise<PostInvoiceTaskSuccess>;
export type AcceptTask = (
  accessToken: string,
  taskId: string,
) => Promise<PostAcceptTaskSuccess>;
export type MakeSearchRequest = (
  accessToken: string,
  taskId: string,
  taskActivityId: string,
) => Promise<PostCreateSearchFromTaskSuccess>;
export type UpdateSearchRequest = (
  accessToken: string,
  searchId: string,
  payload: PostUpdateSearchPayload,
) => Promise<PostSearchSuccess>;

export type GetUserId = () => State["userId"];

export const taskPrivateTokens = {
  getTask: token<GetTask>("task-private:getTasks"),
  getPlaceForBid: token<GetPlaceForBid>("task-private:getPlaceForBid"),
  getSupervisorsForTask: token<GetSupervisorsForTask>(
    "task-private:getSupervisorsForTask",
  ),

  deleteTaskActivity: token<DeleteTaskActivity>(
    "task-private:deleteTaskActivity",
  ),
  createBidFromTask: token<CreateBidFromTask>("task-private:createBidFromTask"),
  instructTask: token<InstructTask>("task-private:instructTask"),
  invoiceTask: token<InvoiceTask>("task-private:invoiceTask"),
  acceptTask: token<AcceptTask>("task-private:acceptTask"),
  makeSearchRequest: token<MakeSearchRequest>("task-private:makeSearchRequest"),
  updateSearchRequest: token<UpdateSearchRequest>(
    "task-private:updateSearchRequest",
  ),
  getUserId: token<GetUserId>("task-private:getUserId"),
};
