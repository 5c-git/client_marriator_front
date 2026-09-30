import { token } from "brandi";

import type { OrderService } from "./order.serivce";

export const orderTokens = {
  orderService: token<OrderService>("OrderService"),
};
