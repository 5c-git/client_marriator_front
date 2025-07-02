import { styled, SwipeableDrawer } from "@mui/material";

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
