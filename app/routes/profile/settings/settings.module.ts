import { DependencyModule } from "brandi";

import { SettingsService } from "./settings.service";
import { settingsTokens } from "./settings.tokens";

import { useStore } from "~/store/store";
import { getUserSettings } from "~/requests/_personal/getUserSettings/getUserSettings";
import { postSetUserSettings } from "~/requests/_personal/postSetUserSettings/postSetUserSettings";

export const settingsModule = new DependencyModule();

settingsModule
  .bind(settingsTokens.getAccessToken)
  .toConstant(() => useStore.getState().accessToken);

settingsModule
  .bind(settingsTokens.fetchUserSettings)
  .toConstant((accessToken) => getUserSettings(accessToken));

settingsModule
  .bind(settingsTokens.saveNotificationsToggle)
  .toConstant((accessToken, toggleNewState) =>
    postSetUserSettings(accessToken, toggleNewState),
  );

settingsModule
  .bind(settingsTokens.settingsService)
  .toInstance(SettingsService)
  .inSingletonScope();