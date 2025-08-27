import { CSSProperties } from "react";
import { Typography, Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type TopNavigationProps = {
  style?: CSSProperties;
  header: {
    text: string;
    bold: boolean;
  };
  label?: string;
  backAction?: () => void;
  buttonAction?: {
    text: string;
    icon?: React.ReactNode;
    action: () => void;
  };
};

export const TopNavigation = (props: TopNavigationProps) => {
  return (
    <Box
      sx={(theme) => ({
        padding: "16px",
        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.05)",
        backgroundColor: theme.vars.palette["White"],
      })}
      style={props.style}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          columnGap: "8px",
        }}
      >
        {props.backAction ? (
          <IconButton
            onClick={props.backAction}
            sx={{
              width: "24px",
              height: "24px",
            }}
          >
            <ArrowBackIosNewIcon
              sx={(theme) => ({
                width: "18px",
                height: "18px",
                color: theme.vars.palette["Grey_2"],
              })}
            />
          </IconButton>
        ) : null}

        <Typography
          component="p"
          variant={props.header.bold ? "Bold_18" : "Reg_18"}
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            flexGrow: 1,
          })}
        >
          {props.header.text}
        </Typography>

        {props.buttonAction ? (
          <Button
            onClick={props.buttonAction.action}
            sx={{
              minWidth: "unset",
              width: "auto",
              marginLeft: "auto",
              paddingTop: "4px",
              paddingBottom: "4px",
              columnGap: "10px",
            }}
          >
            <Typography
              component="p"
              variant="Bold_14"
              sx={(theme) => ({
                color: theme.vars.palette["Corp_1"],
              })}
            >
              {props.buttonAction.text}
            </Typography>

            {props.buttonAction.icon ? props.buttonAction.icon : null}
          </Button>
        ) : null}
      </Box>
      {props.label ? (
        <Typography
          component="p"
          variant="Reg_12"
          sx={(theme) => ({
            color: theme.vars.palette["Grey_1"],
            marginLeft: props.backAction ? "32px" : 0,
          })}
        >
          {props.label}
        </Typography>
      ) : null}
    </Box>
  );
};
