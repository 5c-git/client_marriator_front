import { token } from "brandi";

import type { GetOrderSuccess } from "~/api/_personal/getOrder/getOrderSuccess.schema";
import type { PostDeleteOrderActivitySuccess } from "~/api/_personal/postDeleteOrderActivity/postDeleteOrderActivitySuccess.schema";

import type { PostConvertTaskSuccess } from "~/api/_personal/postConvertTask/postConvertTaskSuccess.schema";
import type { PostAcceptOrderSuccess } from "~/api/_personal/postAcceptOrder/postAcceptOrderSuccess.schema";
import type { PostSendOrderSuccess } from "~/api/_personal/postSendOrder/postSendOrderSuccess.schema";
import type { GetSupervisorsForTaskSuccess } from "~/api/_personal/getSupervisorsForTask/getSupervisorsForTaskSuccess.schema";
import type { PostCreateBidFromOrderSuccess } from "~/api/_personal/postCreateBidFromOrder/postCreateBidFromOrderSuccess.schema";
import type { PostCreateSearchFromOrderSuccess } from "~/api/_personal/postCreateSearchFromOrder/postCreateSearchFromOrderSuccess.schema";
import type { PostSearchSuccess } from "~/api/_personal/postUpdateSearch/postUpdateSearchSuccess.schema";
import type { GetPlaceForBidSuccess } from "~/api/_personal/getPlaceForBid/getPlaceForBidSuccess.schema";
import { PostUpdateSearchPayload } from "~/api/_personal/postUpdateSearch/postUpdateSearch";

export type GetOrder = (
  accessToken: string,
  orderId: string,
) => Promise<GetOrderSuccess>;

export type DeleteOrderActivity = (
  accessToken: string,
  orderId: string,
  orderActivityId: string,
) => Promise<PostDeleteOrderActivitySuccess>;

export type ConvertTask = (
  accessToken: string,
  orderId: string,
  responsibleId: string,
) => Promise<PostConvertTaskSuccess>;

export type AcceptOrder = (
  accessToken: string,
  orderId: string,
) => Promise<PostAcceptOrderSuccess>;

export type SendOrder = (
  accessToken: string,
  orderId: string,
) => Promise<PostSendOrderSuccess>;

export type GetSupervisorsForTask = (
  accessToken: string,
  orderId: string,
) => Promise<GetSupervisorsForTaskSuccess>;

export type CreateBidFromOrder = (
  accessToken: string,
  orderId: string,
  orderActivityId: string,
) => Promise<PostCreateBidFromOrderSuccess>;

export type CreateSearchFromOrder = (
  accessToken: string,
  orderId: string,
  orderActivityId: string,
) => Promise<PostCreateSearchFromOrderSuccess>;

export type UpdateSearch = (
  accessToken: string,
  searchId: string,
  payload: PostUpdateSearchPayload,
) => Promise<PostSearchSuccess>;

export type GetPlaceForBid = (
  accessToken: string,
) => Promise<GetPlaceForBidSuccess>;

export const orderPrivateTokens = {
  getOrder: token<GetOrder>("order-private:getOrder"),
  deleteOrderActivity: token<DeleteOrderActivity>(
    "order-private:deleteOrderActivity",
  ),
  convertTask: token<ConvertTask>("order-private:convertTask"),
  acceptOrder: token<AcceptOrder>("order-private:acceptOrder"),
  sendOrder: token<SendOrder>("order-private:sendOrder"),
  getSupervisorsForTask: token<GetSupervisorsForTask>(
    "order-private:getSupervisorsForTask",
  ),
  createBidFromOrder: token<CreateBidFromOrder>(
    "order-private:createBidFromOrder",
  ),
  createSearchFromOrder: token<CreateSearchFromOrder>(
    "order-private:createSearchFromOrder",
  ),
  updateSearch: token<UpdateSearch>("order-private:updateSearch"),
  getPlaceForBid: token<GetPlaceForBid>("order-private:getPlaceForBid"),
};
