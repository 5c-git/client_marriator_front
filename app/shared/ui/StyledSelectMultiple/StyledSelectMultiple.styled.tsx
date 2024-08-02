import { styled, MenuItem } from "@mui/material";

export const S_MenuItem = styled(MenuItem)({
  padding: 0,
  paddingRight: "16px",
  paddingLeft: "16px",
  minHeight: "unset",

  "&:hover": {
    backgroundColor: "rgba(199, 50, 155, 0.3)",
  },

  "&.Mui-selected": {
    backgroundColor: "rgba(199, 50, 155, 0.1)",

    "&:hover": {
      backgroundColor: "rgba(199, 50, 155, 0.3)",
    },
  },
});
