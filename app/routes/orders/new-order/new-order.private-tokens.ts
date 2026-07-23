import { token } from "brandi";

import type { GetOrderSuccess } from "~/api/_personal/getOrder/getOrderSuccess.schema";
import type { GetPlaceForOrderSuccess } from "~/api/_personal/getPlaceForOrder/getPlaceForOrderSuccess.schema";
import type { GetProjectsForOrderSuccess } from "~/api/_personal/getProjectsForOrder/getProjectsForOrderSuccess.schema";
import type { PostDeleteOrderActivitySuccess } from "~/api/_personal/postDeleteOrderActivity/postDeleteOrderActivitySuccess.schema";

import type { PostCreateOrderSuccess } from "~/api/_personal/postCreateOrder/postCreateOrderSuccess.schema";
import type { PostUpdateOrderSuccess } from "~/api/_personal/postUpdateOrder/postUpdateOrderSuccess.schema";
import type { PostCancelOrderSuccess } from "~/api/_personal/postCancelOrder/postCancelOrderSuccess.schema";
import type { PostSendOrderSuccess } from "~/api/_personal/postSendOrder/postSendOrderSuccess.schema";

export type GetOrder = (
  accessToken: string,
  orderId: string,
) => Promise<GetOrderSuccess>;

export type GetPlaceForOrder = (
  accessToken: string,
  orderId: string,
) => Promise<GetPlaceForOrderSuccess>;

export type GetProjectsForOrder = (
  accessToken: string,
  orderId: string,
) => Promise<GetProjectsForOrderSuccess>;

export type DeleteActivity = (
  accessToken: string,
  orderId: string,
  orderActivityId: string,
) => Promise<PostDeleteOrderActivitySuccess>;

export type CreateOrder = (
  accessToken: string,
  selfEmployed: boolean,
  placeId?: number,
  projectId?: number,
) => Promise<PostCreateOrderSuccess>;

export type UpdateOrder = (
  accessToken: string,
  {
    selfEmployed,
    orderId,
    projectId,
    placeId,
  }: {
    selfEmployed: boolean;
    orderId?: number;
    projectId?: number;
    placeId?: number;
  },
) => Promise<PostUpdateOrderSuccess>;

export type CancelOrder = (
  accessToken: string,
  orderId: string,
) => Promise<PostCancelOrderSuccess>;

export type SaveOrder = (
  accessToken: string,
  orderId: string,
) => Promise<PostSendOrderSuccess>;

export const newOrderPrivateTokens = {
  getOrder: token<GetOrder>("new-order-private:getOrder"),
  getPlaceForOrder: token<GetPlaceForOrder>(
    "new-order-private:getPlaceForOrder",
  ),
  getProjectsForOrder: token<GetProjectsForOrder>(
    "new-order-private:getProjectsForOrder",
  ),
  deleteActivity: token<DeleteActivity>("new-order-private:deleteActivity"),
  createOrder: token<CreateOrder>("new-order-private:createOrder"),
  updateOrder: token<UpdateOrder>("new-order-private:updateOrder"),
  cancelOrder: token<CancelOrder>("new-order-private:cancelOrder"),
  saveOrder: token<SaveOrder>("new-order-private:SaveOrder"),
};
