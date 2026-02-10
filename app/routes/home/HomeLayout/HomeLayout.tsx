import { Link, Outlet } from "react-router";
import type { Route } from "./+types/HomeLayout";

import { useTranslation } from "react-i18next";
import { t, loadNamespaces } from "i18next";

import { useStore } from "~/store/store";

import { Tabs, Tab } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { withLocale } from "~/shared/withLocale";
import { MapIcon } from "~/shared/icons/MapIcon";
import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";

export async function clientLoader() {
  await loadNamespaces("HomeLayout");

  return {
    tabsMap: {
      admin: [],
      manager: [
        <Tab
          label={t("tabs.order", { ns: "HomeLayout" })}
          to={withLocale("/orders")}
          value={withLocale("/orders")}
          component={Link}
          key={"orders"}
        />,
        <Tab
          label={t("tabs.task", { ns: "HomeLayout" })}
          to={withLocale("/tasks")}
          value={withLocale("/tasks")}
          component={Link}
          key={"tasks"}
        />,
        <Tab
          label={t("tabs.bid", { ns: "HomeLayout" })}
          to={withLocale("/bids")}
          value={withLocale("/bids")}
          component={Link}
          key={"bids"}
        />,
        <Tab
          label={t("tabs.job", { ns: "HomeLayout" })}
          to={withLocale("/jobs")}
          value={withLocale("/jobs")}
          component={Link}
          key={"jobs"}
        />,
      ],
      supervisor: [
        <Tab
          label={t("tabs.order", { ns: "HomeLayout" })}
          to={withLocale("/orders")}
          value={withLocale("/orders")}
          component={Link}
          key={"orders"}
        />,
        <Tab
          label={t("tabs.task", { ns: "HomeLayout" })}
          to={withLocale("/tasks")}
          value={withLocale("/tasks")}
          component={Link}
          key={"tasks"}
        />,
        <Tab
          label={t("tabs.bid", { ns: "HomeLayout" })}
          to={withLocale("/bids")}
          value={withLocale("/bids")}
          component={Link}
          key={"bids"}
        />,
        <Tab
          label={t("tabs.job", { ns: "HomeLayout" })}
          to={withLocale("/jobs")}
          value={withLocale("/jobs")}
          component={Link}
          key={"jobs"}
        />,
      ],
      client: [
        <Tab
          label={t("tabs.order", { ns: "HomeLayout" })}
          to={withLocale("/orders")}
          value={withLocale("/orders")}
          component={Link}
          key={"orders"}
          sx={{
            maxWidth: "unset",
          }}
        />,
      ],
      specialist: [],
    },
  };
}

export default function HomeLayout({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("HomeLayout");
  const userRole = useStore.getState().userRole;

  const mapView = useStore((state) => state.mapView);
  const setMapView = useStore((state) => state.setMapView);

  return (
    <>
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        buttonAction={{
          text: mapView ? t("headerListAction") : t("headerMapAction"),
          icon: mapView ? (
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
            setMapView(!mapView);
          },
        }}
        style={{
          position: "relative",
          boxShadow: "none",
          zIndex: 1,
        }}
      />

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

      <Outlet context={mapView} />
    </>
  );
}
