import { ClientActionFunctionArgs, redirect, Link, Outlet } from "react-router";

import { useState } from "react";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { useStore } from "~/store/store";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { withLocale } from "~/shared/withLocale";
import { MapIcon } from "~/shared/icons/MapIcon";
import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";

const activeLocale = i18next.language;

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);
  if (!currentURL.pathname.endsWith("/")) {
    throw redirect(`/${activeLocale}/`);
  }

  return null;
}

export default function Home() {
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

      <Tabs value={location.pathname}>
        <Tab
          label={t("tabs.assignment")}
          to={withLocale("/")}
          value={withLocale("/")}
          component={Link}
        />
        <Tab
          label={t("tabs.task")}
          to={withLocale("/tasks")}
          value={withLocale("/tasks")}
          component={Link}
        />
        <Tab
          label={t("tabs.request")}
          to={withLocale("/requests")}
          value={withLocale("/requests")}
          component={Link}
          disabled
        />
        <Tab
          label={t("tabs.mission")}
          to={withLocale("/missions")}
          value={withLocale("/missions")}
          component={Link}
          disabled
        />
      </Tabs>

      <Outlet context={showMap} />
    </>
  );
}
