import { Outlet } from "@remix-run/react";

import { Stack } from "@mui/material";
import { Menu } from "~/shared/ui/Menu/Menu";

import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";

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
            match: "index",
            notification: false,
            disabled: true,
            icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
          },
          {
            to: "/wallet",
            match: "/wallet",
            notification: false,
            disabled: true,
            icon: <WalletIcon sx={{ width: "30px", height: "30px" }} />,
          },
          {
            to: "/profile",
            match: "profile",
            notification: false,
            disabled: false,
            icon: (
              // <Avatar
              //   src="https://mui.com/static/images/avatar/3.jpg"
              //   sx={{
              //     width: 30,
              //     height: 30,
              //     border: "1px solid",
              //     borderColor: "inherit",
              //   }}
              // />
              <ProfileIcon sx={{ width: "30px", height: "30px" }} />
            ),
          },
        ]}
      />
    </Stack>
  );
}
