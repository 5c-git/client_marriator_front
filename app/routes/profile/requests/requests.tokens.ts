import { token } from "brandi";

import type { RequestsService } from "./requests.service";

export const requestsTokens = {
  requestsService: token<RequestsService>("requests:RequestsService"),
};
