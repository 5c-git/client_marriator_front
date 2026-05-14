import {injected} from "brandi";

import type {GetAccessToken, FetchUserSettings, SaveNotificationsToggle} from "./settings.tokens";

import { settingsTokens } from "./settings.tokens";

export class SettingsService {
    constructor(
        private readonly getAccessToken: GetAccessToken,
        private readonly fetchSettings: FetchUserSettings,
        private readonly saveToggle: SaveNotificationsToggle) {}

    private getToken(): string {
        const token = this.getAccessToken();
        if (!token) {
            throw new Error("Токен авторизации не обнаружен!");
        }
        return token;
    };

    async getNotificationsToggleData() {
        const data = await this.fetchSettings(this.getToken());
        return Boolean(data.data.notificationNewBids);
    }

    async setNewNotificationsToggle(value: boolean) {
        return await this.saveToggle(this.getToken(), value);
    }
}

injected(
    SettingsService,
    settingsTokens.getAccessToken,
    settingsTokens.fetchUserSettings,
    settingsTokens.saveNotificationsToggle,
  );