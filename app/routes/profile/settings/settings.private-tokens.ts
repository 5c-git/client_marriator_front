import { token } from "brandi";

import type { GetUserSettingsSuccess } from "~/api/_personal/getUserSettings/getUserSettingsSuccess.schema";
import type { PostSetUserSettingsSuccess } from "~/api/_personal/postSetUserSettings/postSetUserSettingsSuccess.schema";

export type FetchUserSettings = (
  accessToken: string,
) => Promise<GetUserSettingsSuccess>;

export type SaveNotificationsToggle = (
  accessToken: string,
  toggleNewState: boolean,
) => Promise<PostSetUserSettingsSuccess>;

export const settingsPrivateTokens = {
  fetchUserSettings: token<FetchUserSettings>("settings-private:fetchUserSettings"),
  saveNotificationsToggle: token<SaveNotificationsToggle>(
    "settings-private:saveNotificationsToggle",
  )
};