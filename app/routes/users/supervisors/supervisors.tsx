import { Link } from "react-router";
import type { Route } from "./+types/supervisors";

import { Box, Avatar, Typography } from "@mui/material";

import { withLocale } from "~/shared/withLocale";

import { UsersMobileView } from "~/shared/views/UsersMobileView/UsersMobileView";

import { supervisorsContainer } from "./supervisors.module";
import { supervisorsTokens } from "./supervisors.tokens";

export async function clientLoader() {
  return await supervisorsContainer
    .get(supervisorsTokens.supervisorsService)
    .getSupervisorsMobileModeData();
}

export default function Supervisors({ loaderData }: Route.ComponentProps) {
  return (
    <UsersMobileView
      translation="supervisors"
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
          to={withLocale(`/users/supervisor/${user.id}`)}
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
