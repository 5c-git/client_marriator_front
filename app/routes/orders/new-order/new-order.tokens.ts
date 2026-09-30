import { token } from "brandi";

import type { NewOrderService } from "./new-order.service";

export const newOrderTokens = {
  newOrderService: token<NewOrderService>("NewOrderService"),
};
