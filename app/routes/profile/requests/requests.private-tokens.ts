import { token } from "brandi";

import { GetCounterpartyForOrderSuccess } from "~/api/_personal/getCounterpartyForOrder/getCounterpartyForOrder.schema";
import { PostSetCounterpartyForOrderSuccess } from "~/api/_personal/postSetCounterpartyForOrder/postSetCounterpartyForOrder.schema";

export type FetchUserRequests = (
  accessToken: string,
) => Promise<GetCounterpartyForOrderSuccess>;

export type SaveSelectedRequests = (
  accessToken: string,
  counterparties: number[],
) => Promise<PostSetCounterpartyForOrderSuccess>;

export const requestsPrivateTokens = {
  fetchUserRequests: token<FetchUserRequests>(
    "requests-private:fetchUserRequests",
  ),
  saveSelectedRequests: token<SaveSelectedRequests>(
    "settings-private:saveSelectedRequests",
  ),
};
