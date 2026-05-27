import { Link, Outlet } from "react-router";
import { useTranslation } from "react-i18next";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { withLocale } from "~/shared/withLocale";

import type { UsersLayoutTabConfig } from "../layout.service";

type UsersLayoutViewProps = {
  tabs: UsersLayoutTabConfig[];
  pathname: string;
};

export function UsersLayoutView({ tabs, pathname }: UsersLayoutViewProps) {
  const { t } = useTranslation("UsersLayoutView");

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

      {tabs.length > 0 ? (
        <Tabs
          value={pathname}
          sx={(theme) => ({
            width: "100%",
            zIndex: 1,
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          {tabs.map((tab) => (
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
