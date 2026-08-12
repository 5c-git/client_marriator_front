import type { UserPreview } from "./UserPreview.type";

import { Link } from "react-router";
import Box from "@mui/material/Box";
import { Typography, Avatar } from "@mui/material";

export const UserLine = (props: UserPreview) => (
  <Box
    key={props.user.id}
    sx={(theme) => ({
      display: "flex",
      columnGap: "12px",
      alignItems: "center",
      textDecoration: "none",
      color: theme.vars.palette["Black"],
    })}
    component={props.to ? Link : "div"}
    to={props.to}
  >
    {props.user.logo ? (
      <Avatar src={props.user.logo} sx={{ width: "30px", height: "30px" }} />
    ) : null}

    <Box>
      <Typography component="p" variant="Reg_14">
        {props.user.name}
      </Typography>

      {props.user.address && props.user.address.length > 0 ? (
        <Typography component="p" variant="Reg_12">
          {props.user.address[0]}
        </Typography>
      ) : null}
    </Box>
  </Box>
);
