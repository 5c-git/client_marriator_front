import { Outlet } from "react-router";
import type { Route } from "./+types/menuLayout";

import Stack from "@mui/material/Stack";
import { Menu } from "~/shared/ui/Menu/Menu";

import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";
import { UsersIcon } from "~/shared/ui/Menu/icons/UsersIcon";

import { queryClient } from "~/shared/queryClient";
import { useStore } from "~/store/store";
import {
  getUserInfo,
  getUserInfoKeys,
} from "~/requests/_personal/getUserInfo/getUserInfo";

const determineRole = (
  roles: {
    id: number;
    name: "admin" | "manager" | "client" | "recruiter";
  }[]
) => {
  let role: "admin" | "manager" | "client" | "recruiter" | "specialist" =
    "specialist";

  const rolePoints = {
    admin: 10,
    manager: 8,
    client: 6,
    recruiter: 4,
    specialist: 2,
  };

  let currentPoints = 2;

  roles.forEach((item) => {
    if (rolePoints[item.name] > currentPoints) {
      currentPoints = rolePoints[item.name];
      role = item.name;
    }
  });

  return role;
};

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
    const data = await queryClient.fetchQuery({
      queryKey: [getUserInfoKeys[0]],
      queryFn: () => getUserInfo(accessToken),
      staleTime: 60000,
    });

    const currentRole = determineRole(data.result.userData.roles);

    return linksMap[currentRole];
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
