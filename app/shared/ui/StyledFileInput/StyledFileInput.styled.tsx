import { styled, Box, SwipeableDrawer } from "@mui/material";

export const S_Box = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "error" && prop !== "status" && prop !== "disabled",
})<{ error?: string; status?: "warning"; disabled?: boolean }>((props) => ({
  display: "flex",
  height: "58px",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: "4px",
  borderRadius: "6px",
  borderWidth: "1px",
  paddingLeft: "12px",
  paddingRight: "12px",
  borderColor: props.error
    ? props.theme.palette["Red"]
    : props.status === "warning"
      ? props.theme.palette["Yellow"]
      : props.theme.palette["Grey_5"],
  backgroundColor: props.theme.palette["Grey_5"],
  opacity: props.disabled ? 0.6 : 1,
  pointerEvents: props.disabled ? "none" : "initial",
}));

export const S_ButtonContainer = styled(Box)({
  display: "grid",
  rowGap: "4px",
  // truncate
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const S_ActivationButton = styled("button", {
  shouldForwardProp: (prop) =>
    prop !== "error" && prop !== "value" && prop !== "disabled",
})<{ error?: string; value: string; disabled?: boolean }>((props) => ({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  paddingTop: "4px",
  paddingBottom: "4px",
  textAlign: "left",
  fontFamily: "Golos UI",
  fontSize: "0.875rem",
  lineHeight: "1rem",
  fontWeight: 400,
  border: 0,
  backgroundColor: "transparent",
  color: props.error
    ? props.theme.palette["Red"]
    : props.disabled
      ? props.theme.palette["Grey_4"]
      : props.value !== ""
        ? props.theme.palette["Black"]
        : props.theme.palette["Grey_2"],
}));

export const S_SwipeableDrawer = styled(SwipeableDrawer)((props) => ({
  "& > .MuiPaper-root": {
    borderRadius: "6px 6px 0px 0px",
    padding: "0",
    backgroundColor: props.theme.palette["White"],
  },
  "& .MuiDrawer-paper": {
    maxHeight: "calc(100dvh - 20px)",
  },
}));
