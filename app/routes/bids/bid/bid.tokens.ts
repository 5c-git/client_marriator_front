import { token } from "brandi";

import type { BidService } from "./bid.service";

export const bidTokens = {
  bidService: token<BidService>("bid:bidService"),
};
