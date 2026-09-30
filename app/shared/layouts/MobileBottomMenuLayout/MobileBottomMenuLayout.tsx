import { Outlet } from "react-router";
import type { Route } from "./+types/MobileBottomMenuLayout";

import Stack from "@mui/material/Stack";
import { Menu } from "~/shared/ui/Menu/Menu";

import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";
import { UsersIcon } from "~/shared/ui/Menu/icons/UsersIcon";

import { appContainer } from "~/shared/container/container";
import { appTokens } from "~/shared/container/container.tokens";

const linksMap = {
  admin: [
    {
      to: "/moderation/clients",
      notification: false,
      disabled: false,
      icon: <UsersIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/profile",
      notification: false,
      disabled: false,
      icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
    },
  ],
  manager: [
    {
      to: "/",
      notification: false,
      disabled: false,
      icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/moderation/clients",
      notification: false,
      disabled: false,
      icon: <UsersIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/profile",
      notification: false,
      disabled: false,
      icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
    },
  ],
  supervisor: [
    {
      to: "/",
      notification: false,
      disabled: false,
      icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/moderation/clients",
      notification: false,
      disabled: false,
      icon: <UsersIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/profile",
      notification: false,
      disabled: false,
      icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
    },
  ],
  client: [
    {
      to: "/",
      notification: false,
      disabled: false,
      icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/wallet",
      notification: false,
      disabled: true,
      icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/profile",
      notification: false,
      disabled: false,
      icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
    },
  ],
  specialist: [
    {
      to: "/",
      notification: false,
      disabled: false,
      icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/wallet",
      notification: false,
      disabled: true,
      icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/profile",
      notification: false,
      disabled: false,
      icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
    },
  ],
};

export async function clientLoader() {
  const appSerivce = appContainer.get(appTokens.appService);
  const userRole = appSerivce.getUserRole();

  return linksMap[userRole];
}

export default function MobileBottomMenuLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <Stack
      sx={{
        height: "100dvh",
        position: "relative",
        overflow: "auto",
        paddingBottom: "54px",
      }}
    >
      <Outlet />

      <Menu
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          zIndex: 1001,
        }}
        links={loaderData}
      />
    </Stack>
  );
}
