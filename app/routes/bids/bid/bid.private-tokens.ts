import { token } from "brandi";

import type { GetBidSuccess } from "~/api/_personal/getBid/getBidSuccess.schema";
import type { GetPlaceForBidSuccess } from "~/api/_personal/getPlaceForBid/getPlaceForBidSuccess.schema";
import type { GetRadiusSelectSuccess } from "~/api/_personal/getRadiusSelect/getRadiusSelectSuccess.schema";
import type { PostUpdateBidSuccess } from "~/api/_personal/postUpdateBid/postUpdateBidSuccess.schema";
import type { PostCancelBidSucces } from "~/api/_personal/postCancelBid/postCancelBidSuccess.schema";
import type {
  GetSettingsFromKeySuccess,
  Setting,
} from "~/api/_settings/getSettingsFromKey/getSettingsFromKeySuccess.schema";

import { postUpdateBidPayload } from "~/api/_personal/postUpdateBid/postUpdateBid";

export type GetBid = (
  accessToken: string,
  bidId: string,
) => Promise<GetBidSuccess>;
export type GetPlaceForBid = (
  accessToken: string,
) => Promise<GetPlaceForBidSuccess>;
export type GetRadiusSelect = (
  accessToken: string,
) => Promise<GetRadiusSelectSuccess>;
export type UpdateBid = (
  accessToken: string,
  payload: postUpdateBidPayload,
) => Promise<PostUpdateBidSuccess>;
export type CancelBid = (
  accessToken: string,
  bidId: string,
) => Promise<PostCancelBidSucces>;
export type GetSetting = (
  accessToken: string,
  setting: Setting,
) => Promise<GetSettingsFromKeySuccess>;

export const bidPrivateTokens = {
  getBid: token<GetBid>("bid-private:getBid"),
  getPlaceForBid: token<GetPlaceForBid>("bid-private:getPlaceForBid"),
  getRadiusSelect: token<GetRadiusSelect>("bid-private:getRadiusSelect"),
  updateBid: token<UpdateBid>("bid-private:updateBid"),
  cancelBid: token<CancelBid>("bid-private:cancelBid"),
  getSetting: token<GetSetting>("bid-private:getSetting"),
};
