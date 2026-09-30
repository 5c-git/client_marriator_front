import { Link } from "react-router";

import { Divider, ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { BulletIcon } from "~/shared/icons/BulletIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type MyProfileLinkItemProps = {
    label: string;
    to: string | { pathname: string; search?: string };
    showBullet?: boolean;
  };
  
  export function MyProfileLinkItem(props: MyProfileLinkItemProps) {
    return (
      <ListItem
        disableGutters
        disablePadding
        sx={{
          display: "block",
          paddingRight: "16px",
          paddingLeft: "16px",
        }}
      >
        <ListItemButton
          component={Link}
          viewTransition
          to={props.to}
          sx={{
            display: "flex",
            padding: "16px 0px",
            columnGap: "12px",
          }}
        >
          <Typography
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            })}
            component="p"
            variant="Reg_16"
          >
            {props.label}{" "}
          </Typography>
  
          {props.showBullet ? (
            <BulletIcon
              sx={(theme) => ({
                width: "6px",
                height: "6px",
                color: theme.vars.palette["Red"],
              })}
            />
          ) : null}
  
          <ListItemIcon
            sx={{
              minWidth: "unset",
              marginLeft: "auto",
            }}
          >
            <ArrowForwardIosIcon
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            />
          </ListItemIcon>
        </ListItemButton>
        <Divider
          sx={(theme) => ({
            backgroundColor: theme.vars.palette["Grey_4"],
          })}
        />
      </ListItem>
    );
  }