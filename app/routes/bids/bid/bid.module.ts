import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { bidPrivateTokens } from "./bid.private-tokens";
import { bidTokens } from "./bid.tokens";
import { BidService } from "./bid.service";

import { getBid } from "~/api/_personal/getBid/getBid";
import { getPlaceForBid } from "~/api/_personal/getPlaceForBid/getPlaceForBid";
import { getRadiusSelect } from "~/api/_personal/getRadiusSelect/getRadiusSelect";
import { postUpdateBid } from "~/api/_personal/postUpdateBid/postUpdateBid";
import { postCancelBid } from "~/api/_personal/postCancelBid/postCancelBid";
import { getSettingsFromKey } from "~/api/_settings/getSettingsFromKey/getSettingsFromKey";

export const bidContainer = new Container().extend(appContainer);

bidContainer
  .bind(bidPrivateTokens.getBid)
  .toConstant((accessToken, bidId) => getBid(accessToken, bidId));
bidContainer
  .bind(bidPrivateTokens.getPlaceForBid)
  .toConstant((accessToken) => getPlaceForBid(accessToken));
bidContainer
  .bind(bidPrivateTokens.getRadiusSelect)
  .toConstant((accessToken) => getRadiusSelect(accessToken));
bidContainer
  .bind(bidPrivateTokens.updateBid)
  .toConstant((accessToken, payload) => postUpdateBid(accessToken, payload));
bidContainer
  .bind(bidPrivateTokens.cancelBid)
  .toConstant((accessToken, bidId) => postCancelBid(accessToken, bidId));
bidContainer
  .bind(bidPrivateTokens.getSetting)
  .toConstant((accessToken, setting) =>
    getSettingsFromKey(accessToken, setting),
  );

bidContainer
  .bind(bidTokens.bidService)
  .toInstance(BidService)
  .inSingletonScope();
