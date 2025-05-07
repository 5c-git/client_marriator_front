import { SwipeableDrawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const S_Box = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "58px",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: "4px",
  borderRadius: "6px",
  borderWidth: "1px",
  paddingLeft: "12px",
  paddingRight: "12px",
  border: "1px solid",
  backgroundColor: theme.vars.palette["Grey_5"],
})) as typeof Box;

export const S_ButtonContainer = styled("div")({
  display: "grid",
  rowGap: "4px",
  // truncate
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const S_ActivationButton = styled("button")({
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
});

export const S_SwipeableDrawer = styled(SwipeableDrawer)((props) => ({
  "& > .MuiPaper-root": {
    borderRadius: "6px 6px 0px 0px",
    padding: "0",
    backgroundColor: props.theme.vars.palette["White"],
  },
  "& .MuiDrawer-paper": {
    maxHeight: "calc(100dvh - 20px)",
  },
}));
