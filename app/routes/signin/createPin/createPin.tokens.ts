import { token } from "brandi";

import type { CreatePinService } from "./createPin.service";

export const createPinTokens = {
  createPinService: token<CreatePinService>("createPin:CreatePinService"),
};
