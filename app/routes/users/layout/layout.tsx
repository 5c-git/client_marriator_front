import { useNavigation, Link, useLocation, Outlet } from "react-router";
import type { Route } from "./+types/layout";

import { useTranslation } from "react-i18next";
import { t, loadNamespaces } from "i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

export async function clientLoader() {
  await loadNamespaces("moderationLayout");

  return {
    tabsMap: {
      manager: [
        <Tab
          label={t("tabs.client", { ns: "moderationLayout" })}
          to={withLocale("/users")}
          value={withLocale("/users")}
          component={Link}
          key="clients"
        />,
        <Tab
          label={t("tabs.manager", { ns: "moderationLayout" })}
          to={withLocale("/users/managers")}
          value={withLocale("/users/managers")}
          component={Link}
          key="managers"
        />,
        <Tab
          label={t("tabs.supervisor", { ns: "moderationLayout" })}
          to={withLocale("/users/supervisors")}
          value={withLocale("/users/supervisors")}
          component={Link}
          key="supervisors"
        />,
      ],
      supervisor: [
        <Tab
          label={t("tabs.client", { ns: "moderationLayout" })}
          to={withLocale("/users")}
          value={withLocale("/users")}
          component={Link}
          key="clients"
        />,
      ],
      client: [],
      specialist: [],
    },
  };
}

export default function ModerationLayout({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("moderationLayout");
  const navigation = useNavigation();
  const location = useLocation();
  const userRole = useStore.getState().userRole;

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

      {/* <Tabs value={location.pathname}>
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
      </Tabs> */}

      {loaderData.tabsMap[userRole].length > 0 ? (
        <Tabs
          value={location.pathname}
          sx={(theme) => ({
            width: "100%",
            zIndex: 1,
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          {loaderData.tabsMap[userRole]}
        </Tabs>
      ) : null}

      <Outlet />
    </>
  );
}
