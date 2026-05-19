import { Container } from "brandi";

import {
  getRequisitesData,
  getRequisitesDataKeys,
} from "~/api/_personal/getRequisitesData/getRequisitesData";
import { queryClient } from "~/shared/queryClient";

import { appContainer } from "~/shared/container/container";

import { BillingService } from "./billing.service";
import { billingPrivateTokens } from "./billing.private-tokens";
import { billingTokens } from "./billing.tokens";

export const billingContainer = new Container().extend(appContainer);

billingContainer
  .bind(billingPrivateTokens.fetchRequisitesDataCached)
  .toConstant((accessToken) =>
    queryClient.fetchQuery({
      queryKey: [getRequisitesDataKeys[0]],
      queryFn: () => getRequisitesData(accessToken),
      staleTime: 60000,
    }),
  );

billingContainer
  .bind(billingTokens.billingService)
  .toInstance(BillingService)
  .inSingletonScope();
