import { Outlet } from "react-router";

import Stack from "@mui/material/Stack";
import { Menu } from "~/shared/ui/Menu/Menu";

import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";
import { ProfileIcon } from "~/shared/ui/Menu/icons/ProfileIcon";


export default function MenuOutlet() {
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
        links={[

            {
                to: "/signin/phone",
                notification: false,
                disabled: false,
                icon: <ProfileIcon sx={{ width: "30px", height: "30px" }} />,
            },
            {
              to: "/signin/jobs",
              notification: false,
              disabled: false,
              icon: <ListIcon sx={{ width: "30px", height: "30px" }} />,
          }
        ]}
      />
    </Stack>
  );
}
