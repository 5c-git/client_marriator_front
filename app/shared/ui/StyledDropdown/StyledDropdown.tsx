import { forwardRef } from "react";

import {
  useTheme,
  SxProps,
  Theme,
  Box,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type StyledDropdownProps = {
  name: string;
  value: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
    disabled: boolean;
  }[];

  disabled?: boolean;
  styles?: SxProps<Theme>;
  onChange: (e: SelectChangeEvent) => void;
};

export const StyledDropdown = forwardRef((props: StyledDropdownProps, ref) => {
  const theme = useTheme();

  return (
    <Box sx={props.styles}>
      <Box>
        <FormControl disabled={props.disabled}>
          <Select
            ref={ref}
            labelId={props.name}
            id={props.name}
            name={props.name}
            value={props.value}
            displayEmpty
            onChange={(evt) => {
              props.onChange(evt);
            }}
            IconComponent={KeyboardArrowDownIcon}
            MenuProps={{
              sx: {
                marginTop: "4px",
                borderRadius: "6px",

                "& .MuiMenu-list": {
                  display: "grid",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingRight: 0,
                  paddingLeft: 0,
                  backgroundColor: theme.palette["Grey_5"],
                },
              },
            }}
            sx={{
              borderRadius: "20px",
              backgroundColor: theme.palette["White"],

              "& .MuiOutlinedInput-input": {
                "&.MuiSelect-select": {
                  ...theme.typography["Reg_14"],
                  minHeight: "unset",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "10px",
                },
              },
            }}
            disabled={props.disabled}
          >
            <MenuItem key="empty" value="">
              {props.placeholder}
            </MenuItem>
            {props.options.map((option) => (
              <MenuItem
                key={option.value}
                disabled={option.disabled}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
});

StyledDropdown.displayName = "StyledDropdown";
