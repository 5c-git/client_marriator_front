import type { Route } from "./+types/ModerationMobileLayout";

import { Outlet, useLocation, Link } from "react-router";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Tab, Tabs } from "@mui/material";
import { withLocale } from "~/shared/withLocale";

import { appContainer } from "~/shared/container/container";
import { appTokens } from "~/shared/container/container.tokens";
import { useTranslation } from "react-i18next";

const linksMap = {
  admin: [
    {
      labelKey: "tabs.client",
      path: "/moderation/clients",
      key: "clients",
    },
    {
      labelKey: "tabs.manager",
      path: "/moderation/managers",
      key: "managers",
    },
    {
      labelKey: "tabs.supervisor",
      path: "/moderation/supervisors",
      key: "supervisors",
    },
  ],
  manager: [
    {
      labelKey: "tabs.client",
      path: "/moderation/clients",
      key: "clients",
    },
    {
      labelKey: "tabs.supervisor",
      path: "/moderation/supervisors",
      key: "supervisors",
    },
  ],
  supervisor: [
    {
      labelKey: "tabs.client",
      path: "/moderation/clients",
      key: "clients",
    },
  ],
  client: [],
  specialist: [],
} as const;

export async function clientLoader() {
  const appSerivce = appContainer.get(appTokens.appService);
  const userRole = appSerivce.getUserRole();

  return linksMap[userRole];
}

export default function ModerationMobileLayout({
  loaderData,
}: Route.ComponentProps) {
  const location = useLocation();
  const { t } = useTranslation("m_layout_moderation");

  return (
    <>
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        style={{
          boxShadow: "none",
        }}
      />

      {loaderData.length > 0 ? (
        <Tabs
          value={location.pathname}
          sx={(theme) => ({
            width: "100%",
            zIndex: 1,
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          {loaderData.map((tab) => (
            <Tab
              key={tab.key}
              label={t(tab.labelKey)}
              to={withLocale(tab.path)}
              value={withLocale(tab.path)}
              component={Link}
            />
          ))}
        </Tabs>
      ) : null}

      <Outlet />
    </>
  );
}
