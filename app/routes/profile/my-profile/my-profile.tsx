
import type { Route } from "./+types/my-profile";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { withLocale } from "~/shared/withLocale";

import { MyProfileView } from "./_views/MyProfileView";
import { myProfileContainer } from "./my-profile.module";
import { myProfileTokens } from "./my-profile.tokens";

export async function clientLoader() {
  return await myProfileContainer
    .get(myProfileTokens.myProfileService)
    .loadMyProfile();
}

export default function MyProfile({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("MyProfileView");
  const navigate = useNavigate();

  const sections = [{
      "name": t(`myProfile.listItem_base`),
      "value": withLocale("/profile/my-profile/profile-meta"),
      "hasNotification": false
    },
    {
      "name": t(`myProfile.user_activities`),
      "value": withLocale("/profile/my-profile/user-activities?step=1"),
      "hasNotification": false
    },
    {
      "name": t(`myProfile.billing`),
      "value": withLocale("/profile/my-profile/billing"),
      "hasNotification": false
    },
    {
      "name": t(`myProfile.work-radius`),
      "value": withLocale("/profile/my-profile/work-radius"),
      "hasNotification": false
    },
    ...loaderData.sections.map((item) => ({
      "name": item.name,
      "value": withLocale(`/profile/my-profile/profile-edit?section=${item.value}`),
      "hasNotification": item.hasNotification
    }))
  ]

  return (
      <MyProfileView
        translation="myProfile"
        data={{sections, hasSectionsWithNotifications: loaderData.hasSectionsWithNotifications}}
        onBack={() => {
          navigate(withLocale("/profile"));
        }}
      />
  );
}
