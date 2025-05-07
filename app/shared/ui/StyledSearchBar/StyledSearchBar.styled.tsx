import { styled } from "@mui/material/styles";

export const S_Search = styled("input")(({ theme }) => ({
  width: "100%",
  padding: "11px",
  paddingLeft: "32px",
  borderRadius: "6px",
  border: "1px solid",
  transition: "0.3s",
  color: theme.vars.palette.Black,
  backgroundColor: theme.vars.palette.Grey_5,
  ...theme.typography["Reg_14"],

  "::placeholder": {
    color: theme.vars.palette.Grey_2,
  },

  "&:focus": {
    outline: "none",
  },
}));
