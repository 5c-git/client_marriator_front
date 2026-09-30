import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router";

type DashboardItemProps = {
  icon: ReactNode;
  label: string;
  to: string;
  key: string;
  showDetails: boolean;
  count?: number;
  notification?: boolean;
  disabled?: boolean;
};

export function DashboardItem(props: DashboardItemProps) {
  return (
    <NavLink
      viewTransition
      to={props.to}
      style={({ isActive }) => ({
        color: isActive
          ? "var(--mui-palette-Corp_1)"
          : "var(--mui-palette-Grey_2)",
        background: isActive
          ? "linear-gradient(135deg, rgb(248, 230, 243), rgb(239, 231, 250))"
          : "transparent",

        width: "100%",
        height: "unset",
        display: "flex",
        alignItems: "center",
        transition: "0.3s",
        borderRadius: "11px",
        padding: "10px 12px",
        gap: "10px",
        textDecoration: "none",
        ...(props.disabled
          ? {
              opacity: 0.3,
              pointerEvents: "none",
              cursor: "not-allowed",
            }
          : null),
      })}
    >
      {props.icon}

      {props.showDetails ? (
        <>
          {" "}
          <Typography variant="Bold_14">{props.label}</Typography>
          {props.count ? (
            <Typography
              variant="Bold_12"
              sx={(theme) => ({
                marginLeft: "auto",
                padding: "2px 6px",
                backgroundColor: theme.vars.palette["Corp_1"],
                color: theme.vars.palette["White"],
                borderRadius: "20px",
              })}
            >
              {props.count}
            </Typography>
          ) : null}
          {props.notification ? (
            <Box
              sx={(theme) => ({
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: theme.vars.palette["Red"],
              })}
            ></Box>
          ) : null}
        </>
      ) : null}
    </NavLink>
  );
}
