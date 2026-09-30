import { Container } from "brandi";



import { getDocumentTerminate } from "~/api/_personal/_documents/getDocumentTerminate/getDocumentTerminate";
import { postSetTerminate } from "~/api/_personal/_documents/postSetTerminate/postSetTerminate";

import { TerminateADealService } from "./terminate-a-deal.service";
import { terminateADealPrivateTokens } from "./terminate-a-deal.private-tokens";
import { terminateADealTokens } from "./terminate-a-deal.tokens";

import { appContainer } from "~/shared/container/container";

export const terminateADealContainer = new Container().extend(appContainer);

terminateADealContainer
  .bind(terminateADealPrivateTokens.getDocumentTerminate)
  .toConstant(getDocumentTerminate);
terminateADealContainer
  .bind(terminateADealPrivateTokens.postSetTerminate)
  .toConstant(postSetTerminate);

terminateADealContainer
  .bind(terminateADealTokens.terminateADealService)
  .toInstance(TerminateADealService)
  .inSingletonScope();

