import { Link } from "react-router";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, Typography } from "@mui/material";

import { CalendarIcon } from "~/shared/icons/CalendarIcon";

import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

//сounters : {
//  left: {
//    label: string
//    count: string
//    color: string
// }
//  center: {
//    label: string
//    count: string
//    color: string
// }
//  right: {
//    label: string
//    count: string
//    color: string
// }
//}

// subHeader - сделать жирным и розовым

// avatar: {
// logo?: string
// name: string
//address?: string
//skils?: {
//  label: string
// active: boolean }[]
// }

type AssignmentCardProps = {
  id: string;
  statusColor?: string;
  to?: string;
  header: string;
  progress?: number;
  subHeader?: string;
  divider?: true;
  address?: {
    logo?: string;
    text: string;
  };
  duration?: {
    start: string | null;
    end?: string | null;
  };
  buttonAction?: {
    action: () => void;
    text: string;
    variant: "text" | "contained";
    icon?: React.ReactNode;
  };
};

export const AssignmentCard = (props: AssignmentCardProps) => (
  <Box
    style={{
      ...(props.statusColor && {
        padding: "10px 14px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        borderLeft: `3px solid ${props.statusColor}`,
      }),
    }}
  >
    <Box>
      <Box
        component={props.to ? Link : "div"}
        to={props.to}
        sx={{
          textDecoration: "none",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            component="p"
            variant="Reg_16"
            sx={(theme) => ({
              color: theme.vars.palette.Black,
            })}
          >
            {props.header}
          </Typography>
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette.Grey_2,
            })}
          >
            {props.id}
          </Typography>

          {props.progress ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                minWidth: "28px",
                paddingLeft: "3px",
                paddingRight: "3px",
                borderRadius: "3px",
              }}
              style={{
                ...(props.progress === 100 && {
                  background: "var(--mui-palette-WhatsApp)",
                  color: "var(--mui-palette-White)",
                }),
                ...(props.progress < 100 && {
                  background: `linear-gradient(to right, var(--mui-palette-Grey_3) ${props.progress}%, var(--mui-palette-Grey_4) ${props.progress}%)`,
                  color: "var(--mui-palette-Grey_2)",
                }),
              }}
            >
              <Typography component="p" variant="Bold_12">
                {props.progress}
              </Typography>
            </Box>
          ) : null}
        </Box>
        {props.subHeader ? (
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
              marginTop: "4px",
              // truncate
              // overflow: "hidden",
              // textOverflow: "ellipsis",
              // whiteSpace: "nowrap",
            })}
          >
            {props.subHeader}
          </Typography>
        ) : null}
        {props.divider ? (
          <Divider
            sx={{
              marginTop: "8px",
              marginBottom: "8px",
            }}
          />
        ) : null}
        {props.address ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "8px",
              marginBottom: "8px",
              marginTop: "8px",
            }}
          >
            {props.address.logo ? (
              <Avatar
                src={`${import.meta.env.VITE_ASSET_PATH}${props.address.logo}`}
                sx={{ width: "30px", height: "30px" }}
              />
            ) : null}
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.address.text}
            </Typography>
          </Box>
        ) : null}
        {props.duration && props.duration.start !== null ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "8px",
              marginTop: "8px",
            }}
          >
            <CalendarIcon
              sx={(theme) => ({
                width: "16px",
                height: "16px",
                color: theme.vars.palette["Grey_3"],
              })}
            />
            {props.duration.start ? (
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({ color: theme.vars.palette["Corp_1"] })}
              >
                {`${format(new UTCDate(props.duration.start), "kk:mm dd.LL.yyyy")}${
                  props.duration.end
                    ? ` — ${format(new UTCDate(props.duration.end), "kk:mm dd.LL.yyyy")}`
                    : ""
                }`}
              </Typography>
            ) : null}
          </Box>
        ) : null}
      </Box>

      {props.buttonAction ? (
        <Button
          variant={props.buttonAction.variant}
          onClick={props.buttonAction.action}
          sx={{ marginTop: "8px" }}
        >
          {props.buttonAction.icon ? props.buttonAction.icon : null}
          <Typography component="p" variant="Bold_16">
            {props.buttonAction.text}
          </Typography>
        </Button>
      ) : null}
    </Box>
  </Box>
);
