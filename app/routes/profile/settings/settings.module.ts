import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { SettingsService } from "./settings.service";
import { settingsPrivateTokens } from "./settings.private-tokens";
import { settingsTokens } from "./settings.tokens";

import { getUserSettings } from "~/api/_personal/getUserSettings/getUserSettings";
import { postSetUserSettings } from "~/api/_personal/postSetUserSettings/postSetUserSettings";

export const settingsContainer = new Container().extend(appContainer);


settingsContainer
  .bind(settingsPrivateTokens.fetchUserSettings)
  .toConstant((accessToken) => getUserSettings(accessToken));

settingsContainer
  .bind(settingsPrivateTokens.saveNotificationsToggle)
  .toConstant((accessToken, toggleNewState) =>
    postSetUserSettings(accessToken, toggleNewState),
  );

settingsContainer
  .bind(settingsTokens.settingsService)
  .toInstance(SettingsService)
  .inSingletonScope();