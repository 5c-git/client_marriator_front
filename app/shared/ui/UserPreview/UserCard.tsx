import type { UserPreview } from "./UserPreview.type";

import { Link } from "react-router";
import Box from "@mui/material/Box";
import { Avatar, Divider, Typography } from "@mui/material";

import { statusCodeMap } from "~/shared/usersStatusCodeMap";

export const UserCard = (props: UserPreview) => (
  <Box
    key={props.user.id}
    component={props.to ? Link : "div"}
    to={props.to}
    sx={{
      borderRadius: "6px",
      textDecoration: "none",
      padding: "10px 14px",
      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
      borderLeft: `3px solid ${statusCodeMap[props.user.status as keyof typeof statusCodeMap].color}`,
      ...(props.isActive
        ? {
            borderTop: `1px solid var(--mui-palette-Corp_1)`,
            borderRight: `1px solid var(--mui-palette-Corp_1)`,
            borderBottom: `1px solid var(--mui-palette-Corp_1)`,
          }
        : {}),
    }}
  >
    <Box
      sx={(theme) => ({
        display: "flex",
        columnGap: "12px",
        alignItems: "center",
        textDecoration: "none",
        color: theme.vars.palette["Black"],
      })}
    >
      {props.user.logo ? (
        <Avatar src={props.user.logo} sx={{ width: "30px", height: "30px" }} />
      ) : null}

      <Box>
        <Typography component="p" variant="Reg_14">
          {props.user.name}
        </Typography>

        <Typography
          component="p"
          variant="Reg_12"
          sx={(theme) => ({
            color: theme.vars.palette["Grey_1"],
          })}
        >
          {props.user.phone}
        </Typography>
      </Box>
    </Box>

    {props.user.address && props.user.address.length > 0 ? (
      <>
        <Divider
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <Box
          sx={{
            display: "grid",
            rowGap: "6px",
          }}
        >
          {props.user.address.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "6px",
              }}
            >
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.vars.palette["Corp_1"],
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                })}
              ></Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </>
    ) : null}
  </Box>
);
