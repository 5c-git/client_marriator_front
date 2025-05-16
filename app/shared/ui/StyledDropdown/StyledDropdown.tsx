import { CSSProperties } from "react";

import {
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type StyledDropdownProps = {
  name: string;
  value: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
    disabled: boolean;
  }[];

  disabled?: boolean;
  style?: CSSProperties;
  onChange: (e: SelectChangeEvent) => void;
};

export const StyledDropdown = (props: StyledDropdownProps) => {
  return (
    <Box style={props.style}>
      <Box>
        <FormControl disabled={props.disabled}>
          <Select
            // ref={ref}
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
              sx: (theme) => ({
                marginTop: "4px",
                borderRadius: "6px",

                "& .MuiMenu-list": {
                  display: "grid",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingRight: 0,
                  paddingLeft: 0,
                  backgroundColor: theme.vars.palette["Grey_5"],
                },
              }),
            }}
            sx={(theme) => ({
              borderRadius: "20px",
              backgroundColor: theme.vars.palette["White"],

              "& .MuiOutlinedInput-input": {
                "&.MuiSelect-select": {
                  ...theme.typography["Reg_14"],
                  minHeight: "unset",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "10px",
                },
              },
            })}
            disabled={props.disabled}
          >
            {props.placeholder ? (
              <MenuItem key="empty" value="">
                {props.placeholder}
              </MenuItem>
            ) : null}

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
};
