import { token } from "brandi";

import type { AppService } from "./container.service";

export const appTokens = {
    appService: token<AppService>("appService"),
  };

  