import { Link, Outlet } from "react-router";
import type { Route } from "./+types/layout";

import { useState } from "react";

import { useTranslation } from "react-i18next";
import i18next, { loadNamespaces } from "i18next";

import { useStore } from "~/store/store";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { withLocale } from "~/shared/withLocale";
import { MapIcon } from "~/shared/icons/MapIcon";
import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";

export async function clientLoader() {
  await loadNamespaces("home");

  return {
    tabsMap: {
      admin: [
        <Tab
          label={i18next.t("tabs.assignment", { ns: "home" })}
          to={withLocale("/assignments")}
          value={withLocale("/assignments")}
          component={Link}
          key={"assignments"}
        />,
        <Tab
          label={i18next.t("tabs.task", { ns: "home" })}
          to={withLocale("/tasks")}
          value={withLocale("/tasks")}
          component={Link}
          key={"tasks"}
        />,
        <Tab
          label={i18next.t("tabs.request", { ns: "home" })}
          to={withLocale("/requests")}
          value={withLocale("/requests")}
          component={Link}
          key={"requests"}
        />,
        <Tab
          label={i18next.t("tabs.mission", { ns: "home" })}
          to={withLocale("/missions")}
          value={withLocale("/missions")}
          component={Link}
          key={"missions"}
        />,
      ],
      supervisor: [
        <Tab
          label={i18next.t("tabs.assignment", { ns: "home" })}
          to={withLocale("/assignments")}
          value={withLocale("/assignments")}
          component={Link}
          key={"assignments"}
        />,
        <Tab
          label={i18next.t("tabs.task", { ns: "home" })}
          to={withLocale("/tasks")}
          value={withLocale("/tasks")}
          component={Link}
          key={"tasks"}
        />,
        <Tab
          label={i18next.t("tabs.request", { ns: "home" })}
          to={withLocale("/requests")}
          value={withLocale("/requests")}
          component={Link}
          key={"requests"}
        />,
        <Tab
          label={i18next.t("tabs.mission", { ns: "home" })}
          to={withLocale("/missions")}
          value={withLocale("/missions")}
          component={Link}
          key={"missions"}
        />,
      ],
      manager: [
        <Tab
          label={i18next.t("tabs.assignment", { ns: "home" })}
          to={withLocale("/assignments")}
          value={withLocale("/assignments")}
          component={Link}
          key={"assignments"}
        />,
        <Tab
          label={i18next.t("tabs.task", { ns: "home" })}
          to={withLocale("/tasks")}
          value={withLocale("/tasks")}
          component={Link}
          key={"tasks"}
        />,
        <Tab
          label={i18next.t("tabs.request", { ns: "home" })}
          to={withLocale("/requests")}
          value={withLocale("/requests")}
          component={Link}
          key={"requests"}
        />,
        <Tab
          label={i18next.t("tabs.mission", { ns: "home" })}
          to={withLocale("/missions")}
          value={withLocale("/missions")}
          component={Link}
          key={"missions"}
        />,
      ],
      client: [
        <Tab
          label={i18next.t("tabs.assignment", { ns: "home" })}
          to={withLocale("/assignments")}
          value={withLocale("/assignments")}
          component={Link}
          key={"assignments"}
          sx={{
            maxWidth: "unset",
          }}
        />,
      ],
      specialist: [
        <Tab
          label={i18next.t("tabs.request", { ns: "home" })}
          to={withLocale("/requests")}
          value={withLocale("/requests")}
          component={Link}
          key={"requests"}
        />,
        <Tab
          label={i18next.t("tabs.mission", { ns: "home" })}
          to={withLocale("/missions")}
          value={withLocale("/missions")}
          component={Link}
          key={"missions"}
        />,
      ],
      recruiter: [],
    },
  };
}

export default function HomeLayout({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("home");
  const userRole = useStore.getState().userRole;

  const [showMap, setShowMap] = useState<boolean>(true);

  return (
    <>
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        buttonAction={{
          text: showMap ? t("headerListAction") : t("headerMapAction"),
          icon: showMap ? (
            <ListIcon
              sx={{
                width: "15px",
                height: "15px",
              }}
            />
          ) : (
            <MapIcon
              sx={{
                width: "15px",
                height: "15px",
              }}
            />
          ),
          action: () => {
            setShowMap(!showMap);
          },
        }}
        style={{
          boxShadow: "none",
        }}
      />

      <Tabs
        value={location.pathname}
        sx={{
          width: "100%",
        }}
      >
        {loaderData.tabsMap[userRole]}
      </Tabs>

      <Outlet context={showMap} />
    </>
  );
}
