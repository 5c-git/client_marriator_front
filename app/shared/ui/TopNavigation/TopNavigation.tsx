import {
  SxProps,
  Theme,
  useTheme,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type TopNavigationProps = {
  sx?: SxProps<Theme>;
  header: {
    text: string;
    bold: boolean;
  };
  label?: string;
  backAction?: () => void;
  buttonAction?: {
    text: string;
    action: () => void;
  };
};

export const TopNavigation = (props: TopNavigationProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "16px",
        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.05)",
        backgroundColor: theme.palette["White"],
        ...(props.sx && { ...props.sx }),
      }}
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
              sx={{
                width: "18px",
                height: "18px",
                color: theme.palette["Grey_2"],
              }}
            />
          </IconButton>
        ) : null}

        <Typography
          component="p"
          variant={props.header.bold ? "Bold_18" : "Reg_18"}
          sx={{
            color: theme.palette["Black"],
            flexGrow: 1,
          }}
        >
          {props.header.text}
        </Typography>

        {props.buttonAction ? (
          <Button
            onClick={props.buttonAction.action}
            sx={{
              width: "auto",
              marginLeft: "auto",
              paddingTop: "6px",
              paddingBottom: "6px",
            }}
          >
            <Typography
              component="p"
              variant="Bold_14"
              sx={{
                color: theme.palette["Corp_1"],
              }}
            >
              {props.buttonAction.text}
            </Typography>
          </Button>
        ) : null}
      </Box>
      {props.label ? (
        <Typography
          component="p"
          variant="Reg_12"
          sx={{
            color: theme.palette["Grey_1"],
            marginLeft: props.backAction ? "32px" : 0,
          }}
        >
          {props.label}
        </Typography>
      ) : null}
    </Box>
  );
};
