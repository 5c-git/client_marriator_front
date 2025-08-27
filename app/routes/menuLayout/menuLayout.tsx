import { Outlet } from "react-router";
import type { Route } from "./+types/menuLayout";

import Stack from "@mui/material/Stack";
import { Menu } from "~/shared/ui/Menu/Menu";

import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";
import { UsersIcon } from "~/shared/ui/Menu/icons/UsersIcon";

import { useStore } from "~/store/store";

const linksMap = {
  admin: [
    {
      to: "/",
      notification: false,
      disabled: false,
      icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
    },
    {
      to: "/users",
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
      to: "/users",
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
      to: "/users",
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
  recruiter: [
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
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const userRole = useStore.getState().userRole;

    return linksMap[userRole];
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function MenuLayout({ loaderData }: Route.ComponentProps) {
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
          zIndex: 1,
        }}
        links={loaderData}
      />
    </Stack>
  );
}
