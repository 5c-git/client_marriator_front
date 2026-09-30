import { token } from "brandi";

import { SignADealService } from "./sign-a-deal.service";

export const signADealTokens = {
  signADealService: token<SignADealService>("documents:SignADealService"),
};

