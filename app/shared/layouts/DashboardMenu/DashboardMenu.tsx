import { Outlet } from "react-router";
import type { Route } from "./+types/DashboardMenu";

import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { withLocale } from "~/shared/withLocale";
import { t, loadNamespaces } from "i18next";

import {
  Box,
  Divider,
  IconButton,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { StyledDrawer } from "./DashboardMenu.styled";
import { DashboardItem } from "./_components/DashboardItem";

import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import { OrderIcon } from "./icons/OrderIcon";
import { TaskIcon } from "./icons/TaskIcon";
import { BidIcon } from "./icons/BidIcon";
import { JobIcon } from "./icons/JobIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";

import { appContainer } from "~/shared/container/container";
import { appTokens } from "~/shared/container/container.tokens";
import { UsersIcon } from "~/shared/ui/Menu/icons/UsersIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";

export async function clientLoader() {
  await loadNamespaces("m_layout_home");

  const appSerivce = appContainer.get(appTokens.appService);
  const userRole = appSerivce.getUserRole();

  return {
    userRole,
    entitiesMenu: {
      admin: [],
      manager: [
        {
          icon: <OrderIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.order", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/orders"),
          key: "orders",
        },
        {
          icon: <TaskIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.task", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/tasks"),
          key: "tasks",
        },
        {
          icon: <BidIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.bid", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/bids"),
          key: "bids",
        },
        {
          icon: <JobIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.job", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/jobs"),
          key: "jobs",
        },
      ],
      supervisor: [
        {
          icon: <OrderIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.order", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/orders"),
          key: "orders",
        },
        {
          icon: <TaskIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.task", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/tasks"),
          key: "tasks",
        },
        {
          icon: <BidIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.bid", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/bids"),
          key: "bids",
        },
        {
          icon: <JobIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.job", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/jobs"),
          key: "jobs",
        },
      ],
      client: [
        {
          icon: <OrderIcon style={{ width: "18px", height: "18px" }} />,
          label: t("tabs.order", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/orders"),
          key: "orders",
        },
      ],
      specialist: [],
    },
    menu: {
      admin: [
        {
          icon: <UsersIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.moderation", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/users"),
          key: "Moderation",
        },
        {
          icon: <ProfileIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.profile", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/profile"),
          key: "Profile",
        },
      ],
      manager: [
        {
          icon: <UsersIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.moderation", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/users"),
          key: "Moderation",
        },
        {
          icon: <ProfileIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.profile", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/profile"),
          key: "Profile",
        },
      ],
      supervisor: [
        {
          icon: <UsersIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.moderation", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/users"),
          key: "Moderation",
        },
        {
          icon: <ProfileIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.profile", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/profile"),
          key: "Profile",
        },
      ],
      client: [
        {
          icon: <WalletIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.wallet", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/wallet"),
          key: "Wallet",
          disabled: true,
        },
        {
          icon: <ProfileIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.profile", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/profile"),
          key: "Profile",
        },
      ],
      specialist: [
        {
          icon: <WalletIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.wallet", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/wallet"),
          key: "Wallet",
          disabled: true,
        },
        {
          icon: <ProfileIcon style={{ width: "18px", height: "18px" }} />,
          label: t("menu.profile", { ns: "m_layout_home" }),
          to: withLocale("/dashboard/profile"),
          key: "Profile",
        },
      ],
    },
  };
}

export default function DashboardMenu({ loaderData }: Route.ComponentProps) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent" open={open}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "20px 14px",
          }}
          style={{
            flexDirection: open ? "row" : "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography
              variant="Bold_18"
              sx={(theme) => ({
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, rgb(200, 25, 140), rgb(122, 46, 168))",
                color: theme.vars.palette.White,
                display: "flex",
                flex: "0 0 auto",
                justifyContent: "center",
                alignItems: "center",
              })}
            >
              M
            </Typography>
            {open ? (
              <Typography
                variant="Bold_18"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                Marriator
              </Typography>
            ) : null}
          </Box>
          <IconButton
            style={{
              marginLeft: open ? "auto" : "unset",
            }}
            onClick={() => {
              setOpen((prevState) => !prevState);
            }}
          >
            <ViewSidebarRoundedIcon
              sx={(theme) => ({
                transform: "scaleX(-1)",
                color: theme.vars.palette.Corp_1,
              })}
            />
          </IconButton>
        </Box>
        <Divider />

        {loaderData.entitiesMenu[loaderData["userRole"]].length > 0 ? (
          <>
            <BottomNavigation
              sx={{
                justifyContent: "flex-start",
                flexDirection: "column",
                height: "unset",
                padding: "10px",
              }}
            >
              {loaderData.entitiesMenu[loaderData["userRole"]].map(
                (
                  item: Omit<
                    ComponentPropsWithoutRef<typeof DashboardItem>,
                    "showDetails"
                  >,
                ) => (
                  <BottomNavigationAction
                    key={item.key}
                    component={() => (
                      <DashboardItem
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        to={item.to}
                        showDetails={open}
                        {...(item.count ? { count: item.count } : {})}
                        {...(item.notification
                          ? { notification: item.notification }
                          : {})}
                        {...(item.disabled ? { disabled: item.disabled } : {})}
                      />
                    )}
                  />
                ),
              )}
            </BottomNavigation>
            <Divider />
          </>
        ) : null}

        {loaderData.menu[loaderData["userRole"]].length > 0 ? (
          <>
            <BottomNavigation
              sx={{
                justifyContent: "flex-start",
                flexDirection: "column",
                height: "unset",
                padding: "10px",
              }}
            >
              {loaderData.menu[loaderData["userRole"]].map(
                (
                  item: Omit<
                    ComponentPropsWithoutRef<typeof DashboardItem>,
                    "showDetails"
                  >,
                ) => (
                  <BottomNavigationAction
                    key={item.key}
                    component={() => (
                      <DashboardItem
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        to={item.to}
                        showDetails={open}
                        {...(item.count ? { count: item.count } : {})}
                        {...(item.notification
                          ? { notification: item.notification }
                          : {})}
                        {...(item.disabled ? { disabled: item.disabled } : {})}
                      />
                    )}
                  />
                ),
              )}
            </BottomNavigation>
            <Divider />
          </>
        ) : null}
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
