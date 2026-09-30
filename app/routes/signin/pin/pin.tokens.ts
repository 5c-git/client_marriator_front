import { token } from "brandi";

import { PinService } from "./pin.service";

export const pinTokens = {
  pinService: token<PinService>("pin:PinService"),
};
