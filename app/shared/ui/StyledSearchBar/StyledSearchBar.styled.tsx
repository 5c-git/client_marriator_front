import { styled } from "@mui/material";

export const StyledSearch = styled("input", {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error?: string }>(({ error, disabled, theme }) => ({
  width: "100%",
  padding: "11px",
  paddingLeft: "32px",
  borderRadius: "6px",
  border: "1px solid",
  borderColor: error ? theme.palette.Red : theme.palette.Grey_3,
  backgroundColor: theme.palette.Grey_5,
  transition: "0.3s",
  color: theme.palette.Black,
  ...theme.typography["Reg_14"],

  "::placeholder": {
    color: theme.palette.Grey_2,
  },

  "&:focus": {
    borderColor: error ? theme.palette.Red : theme.palette.Corp_1,
    outline: "none",
  },
}));
