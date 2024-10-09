import { styled } from "@mui/material";

export const S_OrderedList = styled("ol")(() => ({
  margin: 0,
  padding: 0,
  paddingLeft: "20px",
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
}));

export const S_OrderedItem = styled("li")(({ theme }) => ({
  ...theme.typography.Reg_14,
  color: theme.palette["Black"],
}));
