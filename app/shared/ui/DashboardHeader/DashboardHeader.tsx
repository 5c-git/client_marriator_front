import { Box, Typography, Divider, IconButton } from "@mui/material";

import { CalendarIcon } from "~/shared/icons/CalendarIcon";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

type DashboardHeaderProps = {
  header: string;
  month?: string;
  notification?: {
    action: () => void;
    new: boolean;
  };
};

export function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <>
      <Box
        sx={{
          padding: "21px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <Typography
          variant="Bold_20"
          sx={(theme) => ({ color: theme.vars.palette["Black"], flexGrow: 1 })}
        >
          {props.header}
        </Typography>
        {props.month ? (
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              padding: "10px 12px",
              gap: "6px",
              border: "1px solid",
              borderRadius: "10px",
              borderColor: theme.vars.palette["Grey_2"],
            })}
          >
            <CalendarIcon
              sx={(theme) => ({
                width: "18px",
                height: "18px",
                color: theme.vars.palette["Corp_1"],
              })}
            />
            <Typography
              variant="Bold_12"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.month}
            </Typography>
          </Box>
        ) : null}

        {props.notification ? (
          <IconButton
            sx={(theme) => ({
              width: "38px",
              height: "38px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid",
              borderRadius: "10px",
              borderColor: theme.vars.palette["Grey_2"],
              color: "unset",
            })}
            onClick={props.notification.action}
          >
            <svg
              data-dc-tpl="88"
              width="17"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                data-dc-tpl="89"
                d="M4.4 7.4a4.6 4.6 0 0 1 9.2 0c0 4 1.4 5 1.4 5H3s1.4-1 1.4-5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              ></path>
              <path
                data-dc-tpl="90"
                d="M7.4 15a1.7 1.7 0 0 0 3.2 0"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>
            </svg>
            <NotificationsNoneOutlinedIcon
              sx={(theme) => ({
                width: "18px",
                height: "18px",
                color: theme.vars.palette["Black"],
              })}
            />

            {props.notification.new ? (
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: theme.vars.palette["Red"],
                })}
              ></Box>
            ) : null}
          </IconButton>
        ) : null}
      </Box>
      <Divider />
    </>
  );
}
