import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { ordersPrivateTokens } from "./orders.private-tokens";
import { ordersTokens } from "./orders.tokens";

export const ordersContainer = new Container().extend(appContainer);

import { getOrders } from "~/api/_personal/getOrders/getOrders";
import { getUserInfo } from "~/api/_personal/getUserInfo/getUserInfo";
import { postRepeatOrder } from "~/api/_personal/postRepeatOrder/postRepeatOrder";
import { postCancelOrder } from "~/api/_personal/postCancelOrder/postCancelOrder";
import { OrdersService } from "./orders.service";

ordersContainer
  .bind(ordersPrivateTokens.getOrders)
  .toConstant((accessToken) => getOrders(accessToken));

ordersContainer
  .bind(ordersPrivateTokens.getUserInfo)
  .toConstant((accessToken) => getUserInfo(accessToken));

ordersContainer
  .bind(ordersPrivateTokens.repeatOrder)
  .toConstant((accessToken, orderId) => postRepeatOrder(accessToken, orderId));

ordersContainer
  .bind(ordersPrivateTokens.cancelOrder)
  .toConstant((accessToken, orderId) => postCancelOrder(accessToken, orderId));

ordersContainer
  .bind(ordersTokens.ordersService)
  .toInstance(OrdersService)
  .inSingletonScope();
