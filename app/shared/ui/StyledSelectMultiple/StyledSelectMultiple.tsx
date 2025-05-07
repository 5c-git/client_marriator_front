import { CSSProperties } from "react";
import { Link } from "react-router";

import {
  Typography,
  Divider,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";

import { S_MenuItem } from "./StyledSelectMultiple.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type StyledSelectMultipleProps = {
  inputType: "selectMultiple";
  name: string;
  value: string[];
  placeholder: string;
  options: {
    value: string;
    label: string;
    disabled: boolean;
  }[];

  disabled?: boolean;
  validation?: "default" | "none";
  heading?: string;
  error?: string;
  status?: "warning";
  helperInfo?: {
    text?: string;
    link?: {
      text: string;
      path: string;
      type: "external" | "internal";
    };
  };

  dividerTop?: true;
  dividerBottom?: true;
  style?: CSSProperties;
  inputStyle?: CSSProperties;

  onChange: (e: string[]) => void;
  onImmediateChange: () => void;
};

export const StyledSelectMultiple = (props: StyledSelectMultipleProps) => {
  return (
    <Box style={props.style}>
      {props.dividerTop ? <Divider sx={{ marginBottom: "16px" }} /> : null}

      <Box style={props.inputStyle}>
        {props.heading ? (
          <Typography
            component="p"
            variant="Bold_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              marginBottom: "8px",
            })}
          >
            {props.heading}
          </Typography>
        ) : null}

        <FormControl
          sx={{
            width: "100%",
          }}
          disabled={props.disabled}
          error={props.error ? true : false}
        >
          <InputLabel id={props.name}>{props.placeholder}</InputLabel>
          <Select
            multiple
            // ref={ref}
            labelId={props.name}
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={(evt) => {
              props.onChange(
                typeof evt.target.value === "string"
                  ? evt.target.value.split(",")
                  : evt.target.value
              );
              props.onImmediateChange();
            }}
            IconComponent={KeyboardArrowDownIcon}
            MenuProps={{
              sx: (theme) => ({
                marginTop: "4px",
                borderRadius: "6px",

                "& .MuiMenu-list": {
                  display: "grid",
                  rowGap: "12px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingRight: 0,
                  paddingLeft: 0,
                  backgroundColor: theme.vars.palette["Grey_5"],
                },
              }),
            }}
            sx={[
              {
                marginBottom: "4px",
                borderColor: "transparent",
              },
              props.error
                ? {
                    "& .MuiOutlinedInput-root": {
                      borderColor: "var(--mui-palette-Red)",
                    },
                  }
                : null,
              props.status === "warning"
                ? {
                    "& .MuiOutlinedInput-root": {
                      borderColor: "var(--mui-palette-Yellow)",
                    },
                  }
                : null,
            ]}
            disabled={props.disabled}
          >
            {props.options.map((option) => (
              <S_MenuItem
                key={option.value}
                disabled={option.disabled}
                value={option.value}
              >
                {option.label}
              </S_MenuItem>
            ))}
          </Select>
          {props.error ? (
            <FormHelperText
              sx={{
                margin: 0,
              }}
            >
              {props.error}
            </FormHelperText>
          ) : null}
        </FormControl>

        {props.helperInfo ? (
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Corp_1"],
            })}
          >
            {props.helperInfo.text}{" "}
            {props.helperInfo.link ? (
              <>
                {props.helperInfo.link.type === "internal" ? (
                  <Link
                    viewTransition
                    style={{
                      textDecorationLine: "underline",
                      color: "var(--mui-palette-Corp_1)",
                    }}
                    to={props.helperInfo.link.path}
                  >
                    {props.helperInfo.link.text}
                  </Link>
                ) : (
                  <a
                    style={{
                      textDecorationLine: "underline",
                      color: "var(--mui-palette-Corp_1)",
                    }}
                    href={props.helperInfo.link.path}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {props.helperInfo.link.text}
                  </a>
                )}
              </>
            ) : null}
          </Typography>
        ) : null}
      </Box>

      {props.dividerBottom ? <Divider sx={{ marginTop: "16px" }} /> : null}
    </Box>
  );
};
