import { Outlet } from "react-router";

import { Stack } from "@mui/material";
import { Menu } from "~/shared/ui/Menu/Menu";

import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";

import { queryClient } from "~/root";
import { useStore } from "~/store/store";
import {
  getUserInfo,
  getUserInfoKeys,
} from "~/requests/getUserInfo/getUserInfo";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await queryClient.fetchQuery({
      queryKey: [getUserInfoKeys[0]],
      queryFn: () => getUserInfo(accessToken),
      staleTime: 60000,
    });

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function MenuLayout() {
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
        styles={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          zIndex: 1,
        }}
        links={[
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
        ]}
      />
    </Stack>
  );
}
