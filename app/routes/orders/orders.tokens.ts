import { token } from "brandi";

import type { OrdersService } from "./orders.service";

export const ordersTokens = {
  ordersService: token<OrdersService>("OrdersService"),
};
