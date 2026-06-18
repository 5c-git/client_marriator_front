import type { Route } from "./+types/clients";
import { Link } from "react-router";

import { Avatar, Box, Typography } from "@mui/material";

import { UsersMobileView } from "~/shared/views/UsersMobileView/UsersMobileView";

import { withLocale } from "~/shared/withLocale";

import { clientsContainer } from "./clients.module";
import { clientsTokens } from "./clients.tokens";

export async function clientLoader() {
  return await clientsContainer
    .get(clientsTokens.clientsService)
    .getClientsMobileModeData();
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  return (
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
  );
}
