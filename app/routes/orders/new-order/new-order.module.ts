import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { newOrderPrivateTokens } from "./new-order.private-tokens";
import { newOrderTokens } from "./new-order.tokens";
import { NewOrderService } from "./new-order.service";

export const newOrderContainer = new Container().extend(appContainer);

import { getOrder } from "~/api/_personal/getOrder/getOrder";
import { getPlaceForOrder } from "~/api/_personal/getPlaceForOrder/getPlaceForOrder";
import { getProjectsForOrder } from "~/api/_personal/getProjectsForOrder/getProjectsForOrder";
import { postDeleteOrderActivity } from "~/api/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postCreateOrder } from "~/api/_personal/postCreateOrder/postCreateOrder";
import { postUpdateOrder } from "~/api/_personal/postUpdateOrder/postUpdateOrder";
import { postCancelOrder } from "~/api/_personal/postCancelOrder/postCancelOrder";
import { postSendOrder } from "~/api/_personal/postSendOrder/postSendOrder";

newOrderContainer
  .bind(newOrderPrivateTokens.getOrder)
  .toConstant((accessToken, orderId) => getOrder(accessToken, orderId));

newOrderContainer
  .bind(newOrderPrivateTokens.getPlaceForOrder)
  .toConstant((accessToken, orderId) => getPlaceForOrder(accessToken, orderId));

newOrderContainer
  .bind(newOrderPrivateTokens.getProjectsForOrder)
  .toConstant((accessToken, orderId) =>
    getProjectsForOrder(accessToken, orderId),
  );

newOrderContainer
  .bind(newOrderPrivateTokens.deleteActivity)
  .toConstant((accessToken, orderId, orderActivityId) =>
    postDeleteOrderActivity(accessToken, orderId, orderActivityId),
  );

newOrderContainer
  .bind(newOrderPrivateTokens.createOrder)
  .toConstant((accessToken, placeId, projectId, selfEmployed) =>
    postCreateOrder(accessToken, placeId, projectId, selfEmployed),
  );

newOrderContainer
  .bind(newOrderPrivateTokens.updateOrder)
  .toConstant((accessToken, values) => postUpdateOrder(accessToken, values));

newOrderContainer
  .bind(newOrderPrivateTokens.cancelOrder)
  .toConstant((accessToken, orderId) => postCancelOrder(accessToken, orderId));

newOrderContainer
  .bind(newOrderPrivateTokens.saveOrder)
  .toConstant((accessToken, orderId) => postSendOrder(accessToken, orderId));

newOrderContainer
  .bind(newOrderTokens.newOrderService)
  .toInstance(NewOrderService)
  .inSingletonScope();
