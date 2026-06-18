import { Link } from "react-router";
import type { Route } from "./+types/managers";

import { withLocale } from "~/shared/withLocale";

import { Avatar, Box, Typography } from "@mui/material";

import { UsersMobileView } from "~/shared/views/UsersMobileView/UsersMobileView";

import { managersContainer } from "./managers.module";
import { managersTokens } from "./managers.tokens";

export async function clientLoader() {
  return await managersContainer
    .get(managersTokens.managersService)
    .getManagersMobileModeData();
}

export default function Managers({ loaderData }: Route.ComponentProps) {
  return (
    <UsersMobileView
      translation="managers"
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
          to={withLocale(`/users/manager/${user.id}`)}
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
  );
}
