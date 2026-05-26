import { Container } from "brandi";

import { getBik } from "~/api/_personal/getBik/getBik";
import {
  getRequisitesData,
  getRequisitesDataKeys,
} from "~/api/_personal/getRequisitesData/getRequisitesData";
import { postDeleteRequisite } from "~/api/_personal/postDeleteRequisite/postDeleteRequisite";
import { postSaveRequisitesData } from "~/api/_personal/postSaveRequisitesData/postSaveRequisitesData";
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
  .bind(billingPrivateTokens.fetchBik)
  .toConstant((accessToken) => getBik(accessToken));

billingContainer
  .bind(billingPrivateTokens.saveRequisitesData)
  .toConstant((accessToken, formData, dataId) =>
    postSaveRequisitesData(accessToken, formData, dataId),
  );

billingContainer
  .bind(billingPrivateTokens.deleteRequisite)
  .toConstant((accessToken, dataId) =>
    postDeleteRequisite(accessToken, dataId),
  );

billingContainer
  .bind(billingTokens.billingService)
  .toInstance(BillingService)
  .inSingletonScope();
