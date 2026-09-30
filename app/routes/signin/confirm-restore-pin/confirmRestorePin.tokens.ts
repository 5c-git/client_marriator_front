import { token } from "brandi";

import type {ConfirmRestorePinService} from "./confirmRestorePin.service";

export const confirmRestorePinTokens = {
  confirmRestorePinService: token<ConfirmRestorePinService>(
    "confirmRestorePin:ConfirmRestorePinService",
  ),
};
