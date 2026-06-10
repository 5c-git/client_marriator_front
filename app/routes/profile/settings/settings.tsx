import type { Route } from "./+types/settings";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { SettingsView } from "./_views/SettingsView";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { settingsContainer } from "./settings.module";
import { settingsTokens } from "./settings.tokens";
import { useSettingsHooks } from "./settings.hooks";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  return await settingsContainer
    .get(settingsTokens.settingsService)
    .getNotificationsToggleData();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { newNotificationValue } = await request.json();

  await settingsContainer
    .get(settingsTokens.settingsService)
    .setNewNotificationsToggle(newNotificationValue);
}

export default function Settings({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("settings");
  const navigate = useNavigate();
  const { submitNotificationValue } = useSettingsHooks();

  return (
    <SettingsView
      translation="settings"
      headerBackAction={() => {
        navigate(withLocale("/profile"));
      }}
      options={[
        <StyledCheckbox
          inputType="checkbox"
          validation="none"
          name="notificationNewBids"
          value={loaderData}
          label={t("notificationNewBids")}
          onImmediateChange={() => {}}
          onChange={() => {
            submitNotificationValue(loaderData);
          }}
        />,
      ]}
    />
  );
}
