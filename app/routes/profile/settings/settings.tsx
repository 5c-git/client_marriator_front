import type { Route } from "./+types/settings";

import { useTranslation } from "react-i18next";

import { SettingsView } from "./_views/SettingsView";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import {settingsContainer} from "./settings.module";
import { settingsTokens } from "./settings.tokens";
import { useSettingsHooks } from "./settings.hooks";
import { useAppHooks } from "~/shared/hooks/app.hooks";

export async function clientLoader() {

  return await settingsContainer.get(settingsTokens.settingsService).getNotificationsToggleData();
}
  
export async function clientAction({ request }: Route.ClientActionArgs) {
  
    const { newNotificationValue } = await request.json();

    await settingsContainer.get(settingsTokens.settingsService).setNewNotificationsToggle(newNotificationValue);
}

export default function Settings({loaderData}: Route.ComponentProps) {
  const { t } = useTranslation("settings");
  const { navigateTo, isLoading } = useAppHooks();
  const { submitNotificationValue } = useSettingsHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <SettingsView
        translation="settings"
        headerBackAction={() => {navigateTo("/profile")}}
        options={[<StyledCheckbox
          inputType="checkbox"
          validation="none"
          name="notificationNewBids"
          value={loaderData}
          label={t("notificationNewBids")}
          onImmediateChange={() => {}}
          onChange={() => {submitNotificationValue(loaderData)}}
        />]}
      />
    </>
  );
}
