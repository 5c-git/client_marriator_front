import { CSSProperties } from "react";

import Box from "@mui/material/Box";
import { S_Search } from "./StyledSearchBar.styled";

import { SearchIcon } from "./icons/SearchIcon";

type StyledSearchBarProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  style?: CSSProperties;
};

export const StyledSearchBar = (props: StyledSearchBarProps) => {
  return (
    <Box style={props.style}>
      <Box
        sx={[
          (theme) => ({
            position: "relative",
            color: theme.vars.palette.Grey_2,
          }),
          props.disabled ? { opacity: 0.3, pointerEvents: "none" } : null,
        ]}
      >
        <SearchIcon
          sx={{
            position: "absolute",
            width: "15px",
            height: "15px",
            left: "12px",
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
        />
        <S_Search
          type="text"
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={props.onChange}
          style={{
            "--borderColor": props.error
              ? "var(--mui-palette-Red)"
              : "var(--mui-palette-Grey_3)",
            "--borderColorFocus": props.error
              ? "var(--mui-palette-Red)"
              : "var(--mui-palette-Corp_1)",
          }}
          sx={{
            borderColor: "var(--borderColor)",
            "&:focus": {
              borderColor: "var(--borderColorFocus)",
            },
          }}
        />
      </Box>
    </Box>
  );
};
