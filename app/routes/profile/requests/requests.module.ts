import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { RequestsService } from "./requests.service";
import { requestsPrivateTokens } from "./requests.private-tokens";
import { requestsTokens } from "./requests.tokens";

import { getCounterpartyForOrder } from "~/api/_personal/getCounterpartyForOrder/getCounterpartyForOrder";
import { postSetCounterpartyForOrder } from "~/api/_personal/postSetCounterpartyForOrder/postSetCounterpartyForOrder";

export const requestsContainer = new Container().extend(appContainer);

requestsContainer
  .bind(requestsPrivateTokens.fetchUserRequests)
  .toConstant((accessToken) => getCounterpartyForOrder(accessToken));

requestsContainer
  .bind(requestsPrivateTokens.saveSelectedRequests)
  .toConstant((accessToken, counterparties) =>
    postSetCounterpartyForOrder(accessToken, counterparties),
  );

requestsContainer
  .bind(requestsTokens.requestsService)
  .toInstance(RequestsService)
  .inSingletonScope();
