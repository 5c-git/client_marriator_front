import { forwardRef } from "react";
import { useTheme, SxProps, Theme, Box } from "@mui/material";
import { StyledSearch } from "./StyledSearchBar.styled";

import { SearchIcon } from "./icons/SearchIcon";

type StyledSearchBarProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  styles?: SxProps<Theme>;
};

export const StyledSearchBar = forwardRef(
  (props: StyledSearchBarProps, ref) => {
    const theme = useTheme();

    return (
      <Box ref={ref} sx={props.styles}>
        <Box
          sx={{
            position: "relative",
            color: (theme) => theme.palette.Grey_2,
            ...(props.disabled && { opacity: 0.3, pointerEvents: "none" }),
          }}
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
          <StyledSearch
            type="text"
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onChange={props.onChange}
            error={props.error}
          />
        </Box>
      </Box>
    );
  }
);

StyledSearchBar.displayName = "StyledSearchBar";
