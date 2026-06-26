import { token } from "brandi";

import type { GetOrdersSuccess } from "~/api/_personal/getOrders/getOrdersSuccess.schema";
import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";
import type { PostCancelOrderSuccess } from "~/api/_personal/postCancelOrder/postCancelOrderSuccess.schema";
import type { PostRepeatOrderSuccess } from "~/api/_personal/postRepeatOrder/postRepeatOrderSuccess.schema";

export type GetOrders = (accessToken: string) => Promise<GetOrdersSuccess>;
export type GetUserInfo = (accessToken: string) => Promise<GetUserInfoSuccess>;
export type CancelOrder = (
  accessToken: string,
  orderId: string,
) => Promise<PostCancelOrderSuccess>;
export type RepeatOrder = (
  accessToken: string,
  orderId: string,
) => Promise<PostRepeatOrderSuccess>;

export const ordersPrivateTokens = {
  getOrders: token<GetOrders>("orders-private:getOrders"),
  getUserInfo: token<GetUserInfo>("orders-private:getUserInfo"),
  cancelOrder: token<CancelOrder>("orders-private:cancelOrder"),
  repeatOrder: token<RepeatOrder>("orders-private:repeatOrder"),
};
