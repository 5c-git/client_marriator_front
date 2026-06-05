import { Link } from "react-router";

import { Typography, ListItem, ListItemButton, Divider } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";

import { BulletIcon } from "~/shared/icons/BulletIcon";

type ProfileMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  to?: string;
  showBullet?: boolean;
  onClick?: () => void;
};

export function ProfileMenuItem(props: ProfileMenuItemProps) {

  const content = (
    <>
      <ListItemIcon sx={(theme) => ({
          minWidth: "24px",
          color: theme.vars.palette["Grey_2"],
          })}>{props.icon}</ListItemIcon>
      <Typography sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          columnGap: "12px",
          color: theme.vars.palette["Black"],
        })} 
        component="p" 
        variant="Reg_16">
        {props.label}{" "}
        {props.showBullet ? (
          <BulletIcon
            sx={(theme) => ({
              width: "6px",
              height: "6px",
              color: theme.vars.palette["Red"],
            })}
          />
        ) : null}
      </Typography>
    </>
  );

  return (
    <ListItem disableGutters disablePadding sx={{
      display: "block",
      paddingRight: "16px",
      paddingLeft: "16px",
    }}>
      {props.to ? (
        <ListItemButton
          component={Link}
          viewTransition
          to={props.to}
          sx={{
            padding: "16px 0px",
            columnGap: "12px",
          }}
        >
          {content}
        </ListItemButton>
      ) : (
        <ListItemButton onClick={props.onClick} sx={{
          padding: "16px 0px",
          columnGap: "12px",
        }}>
          {content}
        </ListItemButton>
      )}
      {props.to ? <Divider sx={(theme) => ({backgroundColor: theme.vars.palette["Grey_4"]})} /> : null}
    </ListItem>
  );
}