import {injected} from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type { FetchUserSettings, SaveNotificationsToggle } from "./settings.private-tokens";

import { settingsPrivateTokens } from "./settings.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

export class SettingsService {
    constructor(
        private readonly appService: AppService,
        private readonly fetchSettings: FetchUserSettings,
        private readonly saveToggle: SaveNotificationsToggle) {}


    async getNotificationsToggleData() {
        const data = await this.fetchSettings(this.appService.getToken());
        return Boolean(data.data.notificationNewBids);
    }

    async setNewNotificationsToggle(value: boolean) {
        return await this.saveToggle(this.appService.getToken(), value);
    }
}



injected(
    SettingsService,
    appTokens.appService,
    settingsPrivateTokens.fetchUserSettings,
    settingsPrivateTokens.saveNotificationsToggle,
  );