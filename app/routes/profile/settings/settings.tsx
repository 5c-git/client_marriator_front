import type { Route } from "./+types/settings";
import { useNavigate, useSubmit } from "react-router";

import { useTranslation } from "react-i18next";

import { SettingsView } from "./_views/SettingsView";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { settingsContainer } from "./settings.module";
import { settingsTokens } from "./settings.tokens";
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
  const { t } = useTranslation("m_profile_settings");
  const navigate = useNavigate();
  const submit = useSubmit();

  return (
    <SettingsView
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
            submit(
              JSON.stringify({
                newNotificationValue: !loaderData,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }}
        />,
      ]}
    />
  );
}
