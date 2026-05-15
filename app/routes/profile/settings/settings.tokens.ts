import { token } from "brandi";

import type { SettingsService } from "./settings.service";

export const settingsTokens = {
    settingsService: token<SettingsService>("settings:SettingsService"),
  };