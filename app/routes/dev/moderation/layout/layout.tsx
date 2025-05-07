import {
  useNavigation,
  useNavigate,
  Link,
  useLocation,
  Outlet,
} from "react-router";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

export default function ModerationLayout() {
  const { t } = useTranslation("moderationLayout");
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        style={{
          boxShadow: "none",
        }}
      />

      <Tabs value={location.pathname} sx={{}}>
        <Tab
          label={t("tabs.client")}
          to={withLocale("/dev/moderation/moderation-1")}
          value={withLocale("/dev/moderation/moderation-1")}
          component={Link}
        />
        <Tab
          label={t("tabs.manager")}
          to={withLocale("/dev/moderation/moderation-2")}
          value={withLocale("/dev/moderation/moderation-2")}
          component={Link}
        />
        <Tab
          label={t("tabs.supervisor")}
          to={withLocale("/dev/moderation/moderation-3")}
          value={withLocale("/dev/moderation/moderation-3")}
          component={Link}
        />
        <Tab
          label={t("tabs.recrut")}
          to={withLocale("/dev/moderation/moderation-4")}
          value={withLocale("/dev/moderation/moderation-4")}
          component={Link}
        />
      </Tabs>

      <Outlet />
    </>
  );
}
