import { useNavigation, Link } from "react-router";
import type { Route } from "./+types/clients";
import type { UsersMobileViewInterface } from "~/shared/views/UsersMobileView/UsersMobileViewInterface";

import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { UsersMobileView } from "~/shared/views/UsersMobileView/UsersMobileView";

import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getModerationClient } from "~/requests/_personal/_moderation/getModerationClient/getModerationClient";

type MobileModeData = {
  mode: "mobile";
  users: UsersMobileViewInterface["users"];
};

export async function clientLoader() {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (mode === "mobile") {
      const usersData = await getModerationClient(
        accessToken,
        1000000,
        "client",
        null,
        null,
        null,
        null,
      );

      const users: UsersMobileViewInterface["users"] = [];

      usersData.data.forEach((item) => {
        // временно убираем архивный статус, архив доступен только админу
        if (item.confirmRegister !== false && item.finishRegister !== false) {
          users.push({
            id: item.id,
            status: (() => {
              let status = 3;

              if (
                item.confirmRegister === false &&
                item.finishRegister === true
              ) {
                status = 1;
              } else if (
                item.confirmRegister === true &&
                item.finishRegister === true
              ) {
                status = 2;
              } else if (
                item.confirmRegister === false &&
                item.finishRegister === false
              ) {
                status = 3;
              }

              return status;
            })(),
            name: item.name,
            email: item.email,
            phone: item.phone.toString(),
            address: item.place.length > 0 ? item.place[0].name : null,
            logo: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
          });
        }
      });

      data = {
        mode: "mobile",
        users: users,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();

  return loaderData.mode === "mobile" ? (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}{" "}
      <UsersMobileView
        translation="clients"
        users={loaderData.users}
        userSlot={(user) => (
          <Box
            key={user.id}
            sx={(theme) => ({
              display: "flex",
              columnGap: "12px",
              alignItems: "center",
              textDecoration: "none",
              color: theme.vars.palette["Black"],
            })}
            component={Link}
            to={withLocale(`/users/client/${user.id}`)}
          >
            {user.logo ? (
              <Avatar src={user.logo} sx={{ width: "30px", height: "30px" }} />
            ) : null}

            <Box>
              <Typography component="p" variant="Reg_14">
                {user.name}
              </Typography>

              {user.address ? (
                <Typography component="p" variant="Reg_12">
                  {user.address}
                </Typography>
              ) : null}
            </Box>
          </Box>
        )}
      />
    </>
  ) : null;
}
