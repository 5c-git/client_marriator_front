import {
  redirect,
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

      <Tabs value={location.pathname}>
        <Tab
          label={t("tabs.client")}
          to={withLocale("/users")}
          value={withLocale("/users")}
          component={Link}
        />
        <Tab
          label={t("tabs.manager")}
          to={withLocale("/users/managers")}
          value={withLocale("/users/managers")}
          component={Link}
        />
        <Tab
          label={t("tabs.supervisor")}
          to={withLocale("/users/supervisors")}
          value={withLocale("/users/supervisors")}
          component={Link}
        />
        <Tab
          label={t("tabs.recrut")}
          to={withLocale("/users/recruiters")}
          value={withLocale("/users/recruiters")}
          component={Link}
        />
      </Tabs>

      <Outlet />
    </>
  );
}
