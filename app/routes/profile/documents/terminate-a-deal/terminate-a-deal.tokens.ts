import { token } from "brandi";

import { TerminateADealService } from "./terminate-a-deal.service";

export const terminateADealTokens = {
  terminateADealService: token<TerminateADealService>(
    "documents:TerminateADealService",
  ),
};

