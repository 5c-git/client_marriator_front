import { token } from "brandi";

import type { GetRequisitesDataSuccess } from "~/api/_personal/getRequisitesData/getRequisitesDataSuccess.schema";

export type FetchRequisitesDataCached = (
  accessToken: string,
) => Promise<GetRequisitesDataSuccess>;

export const billingPrivateTokens = {
  fetchRequisitesDataCached: token<FetchRequisitesDataCached>(
    "billing-private:fetchRequisitesDataCached",
  ),
};
