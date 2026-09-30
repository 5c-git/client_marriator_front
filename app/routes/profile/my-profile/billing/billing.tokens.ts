import { token } from "brandi";

import type { BillingService } from "./billing.service";

export const billingTokens = {
  billingService: token<BillingService>("billing:BillingService"),
};
