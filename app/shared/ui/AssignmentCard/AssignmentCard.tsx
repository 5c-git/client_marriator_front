import { Link } from "react-router";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, Typography } from "@mui/material";

import { CalendarIcon } from "~/shared/icons/CalendarIcon";

import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

type AssignmentCardProps = {
  id: string;
  statusColor?: string;
  to?: string;
  header?: string;
  progress?: number;
  subHeader?: {
    text: string;
    bold: boolean;
    divider?: true;
  };
  divider?: true;
  address?: {
    logo?: string;
    text: string;
  };
  duration?: {
    start: string | null;
    end?: string | null;
  };
  counters?: {
    left?: {
      label: string;
      count: string;
      color: string;
    };
    center?: {
      label: string;
      count: string;
      color: string;
    };
    right?: {
      label: string;
      count: string;
      color: string;
    };
  };
  avatar?: {
    logo?: string;
    name: string;
    address?: string;
    skills?: {
      label: string;
      active: boolean;
    }[];
  };
  buttonsTray?: {
    leftTray: React.ReactNode[];
    rightTray?: React.ReactNode[];
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
        {props.header ? (
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
        ) : null}
        {props.subHeader ? (
          <Box>
            <Typography
              component="p"
              variant={props.subHeader.bold ? "Bold_16" : "Reg_12"}
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
                marginTop: "4px",
                // truncate
                // overflow: "hidden",
                // textOverflow: "ellipsis",
                // whiteSpace: "nowrap",
              })}
              style={{
                color: props.subHeader.bold
                  ? "var(--mui-palette-Corp_1)"
                  : "var(--mui-palette-Grey_2)",
              }}
            >
              {props.subHeader.text}
            </Typography>

            {props.subHeader.divider ? (
              <Divider
                sx={{
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              />
            ) : null}
          </Box>
        ) : null}
        {props.avatar ? (
          <Box
            sx={{
              display: "flex",
              columnGap: "4px",
              alignItems: "flex-start",
            }}
          >
            {props.avatar.logo ? (
              <img
                style={{
                  display: "block",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginTop: "10px",
                  marginBottom: "10px",
                  objectFit: "cover",
                }}
                src={props.avatar.logo}
                alt={props.avatar.logo}
              />
            ) : null}{" "}
            <Box
              sx={{
                overflow: "hidden",
              }}
            >
              {props.avatar.name}
              {props.avatar.address ? (
                <Typography
                  component="p"
                  variant="Reg_12"
                  style={{
                    margin: 0,
                    fontFamily: "Golos UI",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                    color: "var(--mui-palette-Black)",
                  }}
                >
                  {props.avatar.address}
                </Typography>
              ) : null}
              {props.avatar.skills ? (
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  {props.avatar.skills.map((item, index) => (
                    <span
                      style={{
                        "--color": item.active
                          ? "var(--mui-palette-Corp_1)"
                          : "var(--mui-palette-Grey_2)",
                        color: "var(--color)",
                        margin: 0,
                        fontFamily: "Golos UI",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        whiteSpace: "nowrap",
                      }}
                      key={item.label}
                    >
                      {index > 0 ? ", " : null}
                      {item.label}
                    </span>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        ) : null}
        {props.counters ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              columnGap: "10px",
              gridColumnStart: 1,
              marginTop: "8px",
            }}
          >
            {props.counters.left ? (
              <Box
                style={{
                  color: props.counters.left.color,
                }}
              >
                <Typography component="p" variant="Reg_12">
                  {props.counters.left.label}
                </Typography>
                <Typography component="p" variant="Bold_12">
                  {props.counters.left.count}
                </Typography>
              </Box>
            ) : null}
            {props.counters.center ? (
              <Box
                style={{
                  color: props.counters.center.color,
                }}
              >
                <Typography component="p" variant="Reg_12">
                  {props.counters.center.label}
                </Typography>
                <Typography component="p" variant="Bold_12">
                  {props.counters.center.count}
                </Typography>
              </Box>
            ) : null}
            {props.counters.right ? (
              <Box
                style={{
                  color: props.counters.right.color,
                }}
              >
                <Typography component="p" variant="Reg_12">
                  {props.counters.right.label}
                </Typography>
                <Typography component="p" variant="Bold_12">
                  {props.counters.right.count}
                </Typography>
              </Box>
            ) : null}
          </Box>
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
        {props.buttonsTray ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                columnGap: "16px",
                alignItems: "center",
              }}
            >
              {props.buttonsTray.leftTray.map((item) => item)}
            </Box>
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette.Grey_2,
              })}
            >
              {props.id}
            </Typography>
            {props.buttonsTray.rightTray ? (
              <Box
                sx={{
                  display: "flex",
                  columnGap: "16px",
                  alignItems: "center",
                }}
              >
                {props.buttonsTray.rightTray.map((item) => item)}
              </Box>
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
