import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { OrderService } from "./order.serivce";
import { orderPrivateTokens } from "./order.private-tokens";
import { orderTokens } from "./order.tokens";

import { getOrder } from "~/api/_personal/getOrder/getOrder";
import { postDeleteOrderActivity } from "~/api/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postConvertTask } from "~/api/_personal/postConvertTask/postConvertTask";
import { postAcceptOrder } from "~/api/_personal/postAcceptOrder/postAcceptOrder";
import { postSendOrder } from "~/api/_personal/postSendOrder/postSendOrder";
import { getSupervisorsForTask } from "~/api/_personal/getSupervisorsForTask/getSupervisorsForTask";
import { postCreateBidFromOrder } from "~/api/_personal/postCreateBidFromOrder/postCreateBidFromOrder";
import { postCreateSearchFromOrder } from "~/api/_personal/postCreateSearchFromOrder/postCreateSearchFromOrder";
import { postUpdateSearch } from "~/api/_personal/postUpdateSearch/postUpdateSearch";
import { getPlaceForBid } from "~/api/_personal/getPlaceForBid/getPlaceForBid";

export const orderContainer = new Container().extend(appContainer);

orderContainer
  .bind(orderPrivateTokens.getOrder)
  .toConstant((accessToken, orderId) => getOrder(accessToken, orderId));

orderContainer
  .bind(orderPrivateTokens.deleteOrderActivity)
  .toConstant((accessToken, orderId, orderActivityId) =>
    postDeleteOrderActivity(accessToken, orderId, orderActivityId),
  );

orderContainer
  .bind(orderPrivateTokens.convertTask)
  .toConstant((accessToken, orderId, responsibleId) =>
    postConvertTask(accessToken, orderId, responsibleId),
  );

orderContainer
  .bind(orderPrivateTokens.acceptOrder)
  .toConstant((accessToken, orderId) => postAcceptOrder(accessToken, orderId));

orderContainer
  .bind(orderPrivateTokens.sendOrder)
  .toConstant((accessToken, orderId) => postSendOrder(accessToken, orderId));

orderContainer
  .bind(orderPrivateTokens.getSupervisorsForTask)
  .toConstant((accessToken, taskId) =>
    getSupervisorsForTask(accessToken, taskId),
  );

orderContainer
  .bind(orderPrivateTokens.createBidFromOrder)
  .toConstant((accessToken, orderId, orderActivityId) =>
    postCreateBidFromOrder(accessToken, orderId, orderActivityId),
  );

orderContainer
  .bind(orderPrivateTokens.createSearchFromOrder)
  .toConstant((accessToken, orderId, orderActivityId) =>
    postCreateSearchFromOrder(accessToken, orderId, orderActivityId),
  );

orderContainer
  .bind(orderPrivateTokens.updateSearch)
  .toConstant((accessToken, searchId, payload) =>
    postUpdateSearch(accessToken, searchId, payload),
  );

orderContainer
  .bind(orderPrivateTokens.getPlaceForBid)
  .toConstant((accessToken) => getPlaceForBid(accessToken));

orderContainer
  .bind(orderTokens.orderService)
  .toInstance(OrderService)
  .inSingletonScope();
