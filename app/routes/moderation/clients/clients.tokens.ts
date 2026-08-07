import { token } from "brandi";

import type { ClientsService } from "./clients.service";

export const clientsTokens = {
  clientsService: token<ClientsService>("clients:ClientsService"),
};

