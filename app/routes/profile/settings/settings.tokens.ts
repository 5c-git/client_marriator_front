import { token } from "brandi";

import type { GetUserSettingsSuccess } from "~/api/_personal/getUserSettings/getUserSettingsSuccess.schema";
import type { PostSetUserSettingsSuccess } from "~/api/_personal/postSetUserSettings/postSetUserSettingsSuccess.schema";

import type { SettingsService } from "./settings.service";

export type GetAccessToken = () => string | null;
export type FetchUserSettings = (
  accessToken: string,
) => Promise<GetUserSettingsSuccess>;
export type SaveNotificationsToggle = (
  accessToken: string,
  toggleNewState: boolean,
) => Promise<PostSetUserSettingsSuccess>;

export const settingsTokens = {
  getAccessToken: token<GetAccessToken>("settings:getAccessToken"),
  fetchUserSettings: token<FetchUserSettings>("settings:fetchUserSettings"),
  saveNotificationsToggle: token<SaveNotificationsToggle>(
    "settings:saveNotificationsToggle",
  ),
  settingsService: token<SettingsService>("settings:SettingsService"),
};