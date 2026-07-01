import { token } from "brandi";

import type { BidsService } from "./bids.service";

export const bidsTokens = {
  bidsService: token<BidsService>("BidsService"),
};
