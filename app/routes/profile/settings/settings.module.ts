import { DependencyModule, Container } from "brandi";

import { SettingsService } from "./settings.service";
import { settingsTokens } from "./settings.tokens";

import { useStore } from "~/store/store";
import { getUserSettings } from "~/api/_personal/getUserSettings/getUserSettings";
import { postSetUserSettings } from "~/api/_personal/postSetUserSettings/postSetUserSettings";

export const settingsContainer = new Container();

settingsContainer
  .bind(settingsTokens.getAccessToken)
  .toConstant(() => useStore.getState().accessToken);

settingsContainer
  .bind(settingsTokens.fetchUserSettings)
  .toConstant((accessToken) => getUserSettings(accessToken));

settingsContainer
  .bind(settingsTokens.saveNotificationsToggle)
  .toConstant((accessToken, toggleNewState) =>
    postSetUserSettings(accessToken, toggleNewState),
  );

settingsContainer
  .bind(settingsTokens.settingsService)
  .toInstance(SettingsService)
  .inSingletonScope();