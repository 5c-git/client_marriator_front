import { token } from "brandi";

import type { ClientService } from "./client.service";

export const clientTokens = {
  clientService: token<ClientService>("users-client:ClientService"),
};

