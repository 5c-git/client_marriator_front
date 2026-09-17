import { token } from "brandi";

import type { GetBidsSuccess } from "~/api/_personal/getBids/getBidsSuccess.schema";
import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";

export type GetBids = (
  accessToken: string,
  status?: string | undefined,
  sort?: string | undefined,
) => Promise<GetBidsSuccess>;
export type GetUserInfo = (accessToken: string) => Promise<GetDataSuccess>;

export const bidsPrivateTokens = {
  getBids: token<GetBids>("bids-private:getBids"),
  getUserInfo: token<GetUserInfo>("bids-private:getUserInfo"),
};
