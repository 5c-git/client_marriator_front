import { Container } from "brandi";

import { useStore } from "~/store/store";

import { getDocumentConclude } from "~/api/_personal/_documents/getDocumentConclude/getDocumentConclude";
import { postSetConclude } from "~/api/_personal/_documents/postSetConclude/postSetConclude";

import { SignADealService } from "./sign-a-deal.service";
import { signADealPrivateTokens } from "./sign-a-deal.private-tokens";
import { signADealTokens } from "./sign-a-deal.tokens";

export const signADealContainer = new Container();

signADealContainer
  .bind(signADealPrivateTokens.getAccessToken)
  .toConstant(() => useStore.getState().accessToken);
signADealContainer
  .bind(signADealPrivateTokens.getDocumentConclude)
  .toConstant(getDocumentConclude);
signADealContainer
  .bind(signADealPrivateTokens.postSetConclude)
  .toConstant(postSetConclude);

signADealContainer
  .bind(signADealTokens.signADealService)
  .toInstance(SignADealService)
  .inSingletonScope();

