import { token } from "brandi";

import type { GetBidsSuccess } from "~/api/_personal/getBids/getBidsSuccess.schema";

export type GetBids = (
  accessToken: string,
  status?: string | undefined,
  sort?: string | undefined,
) => Promise<GetBidsSuccess>;

export const bidsPrivateTokens = {
  getBids: token<GetBids>("bids-private:getBids"),
};
