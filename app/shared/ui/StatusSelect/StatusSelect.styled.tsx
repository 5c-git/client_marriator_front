import { styled, SwipeableDrawer } from "@mui/material";

export const S_SwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& > .MuiPaper-root": {
    borderRadius: "6px 6px 0px 0px",
    padding: "0",
    backgroundColor: theme.vars.palette["White"],
  },
  "& .MuiDrawer-paper": {
    maxHeight: "calc(100dvh - 20px)",
  },
}));
