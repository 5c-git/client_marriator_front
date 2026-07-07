import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { bidsPrivateTokens } from "./bids.private-tokens";
import { bidsTokens } from "./bids.tokens";

export const bidsContainer = new Container().extend(appContainer);
import { BidsService } from "./bids.service";

import { getBids } from "~/api/_personal/getBids/getBids";
import { getUserInfo } from "~/api/_personal/getUserInfo/getUserInfo";

bidsContainer
  .bind(bidsPrivateTokens.getBids)
  .toConstant((accessToken) => getBids(accessToken));

bidsContainer
  .bind(bidsPrivateTokens.getUserInfo)
  .toConstant((accessToken) => getUserInfo(accessToken));

bidsContainer
  .bind(bidsTokens.bidsService)
  .toInstance(BidsService)
  .inSingletonScope();
