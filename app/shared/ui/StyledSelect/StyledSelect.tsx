import { forwardRef } from "react";
import { Link } from "@remix-run/react";

import {
  useTheme,
  SxProps,
  Theme,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { S_MenuItem } from "./StyledSelect.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type StyledSelectProps = {
  inputType: "select";
  name: string;
  value: string;
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
  styles?: SxProps<Theme>;
  inputStyles?: SxProps<Theme>;

  onChange: (e: SelectChangeEvent) => void;
  onImmediateChange: () => void;
};

export const StyledSelect = forwardRef((props: StyledSelectProps, ref) => {
  const theme = useTheme();

  return (
    <Box sx={props.styles}>
      {props.dividerTop ? <Divider sx={{ marginBottom: "16px" }} /> : null}

      <Box sx={props.inputStyles}>
        {props.heading ? (
          <Typography
            component="p"
            variant="Bold_14"
            sx={{
              color: theme.palette["Black"],
              marginBottom: "8px",
            }}
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
            ref={ref}
            labelId={props.name}
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={(evt) => {
              props.onChange(evt);
              props.onImmediateChange();
            }}
            IconComponent={KeyboardArrowDownIcon}
            MenuProps={{
              sx: {
                marginTop: "4px",
                borderRadius: "6px",

                "& .MuiMenu-list": {
                  display: "grid",
                  rowGap: "12px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingRight: 0,
                  paddingLeft: 0,
                  backgroundColor: theme.palette["Grey_5"],
                },
              },
            }}
            sx={{
              marginBottom: "4px",
              borderColor:
                props.status === "warning"
                  ? theme.palette["Yellow"]
                  : "transparent",
            }}
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
            sx={{
              color: theme.palette["Corp_1"],
            }}
          >
            {props.helperInfo.text}{" "}
            {props.helperInfo.link ? (
              <>
                {props.helperInfo.link.type === "internal" ? (
                  <Link
                    style={{
                      textDecorationLine: "underline",
                      color: theme.palette["Corp_1"],
                    }}
                    to={props.helperInfo.link.path}
                  >
                    {props.helperInfo.link.text}
                  </Link>
                ) : (
                  <a
                    style={{
                      textDecorationLine: "underline",
                      color: theme.palette["Corp_1"],
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
});

StyledSelect.displayName = "StyledSelect";
