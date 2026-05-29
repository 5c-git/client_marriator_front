import { Link } from "react-router";

import type { UsersMobileViewInterface } from "~/shared/views/UsersMobileView/UsersMobileViewInterface";

import { withLocale } from "~/shared/withLocale";
import { UsersMobileView } from "~/shared/views/UsersMobileView/UsersMobileView";

import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";

type SupervisorsViewProps = {
  users: UsersMobileViewInterface["users"];
};

export function SupervisorsView(props: SupervisorsViewProps) {
  return (
    <UsersMobileView
      translation="supervisors"
      users={props.users}
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
