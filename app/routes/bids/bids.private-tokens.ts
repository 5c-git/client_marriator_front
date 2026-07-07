import { token } from "brandi";

import type { GetBidsSuccess } from "~/api/_personal/getBids/getBidsSuccess.schema";
import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";

export type GetBids = (
  accessToken: string,
  status?: string | undefined,
  sort?: string | undefined,
) => Promise<GetBidsSuccess>;
export type GetUserInfo = (accessToken: string) => Promise<GetUserInfoSuccess>;

export const bidsPrivateTokens = {
  getBids: token<GetBids>("bids-private:getBids"),
  getUserInfo: token<GetUserInfo>("bids-private:getUserInfo"),
};
