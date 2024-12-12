import { forwardRef } from "react";

import { Link } from "react-router";
import {
  useTheme,
  SxProps,
  Theme,
  Box,
  Typography,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

import { MaskedField } from "../MaskedField/MaskedField";

type StyledPhoneFieldProps = {
  inputType: "phone";
  name: string;
  value: string;
  placeholder: string;

  disabled?: boolean;
  heading?: string;
  error?: string;
  status?: "warning";
  validation?: "default" | "none";

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

  onChange: (e: string) => void;
  onImmediateChange: () => void;
  onBlur?: (e: string) => void;
};

export const StyledPhoneField = forwardRef(
  (props: StyledPhoneFieldProps, ref) => {
    const theme = useTheme();

    return (
      <Box sx={props.styles} ref={ref}>
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
            <TextField
              id={props.name}
              name={props.name}
              value={props.value}
              onChange={(evt) => {
                props.onChange(evt.target.value.replace(/[^\d]/g, ""));
                // props.onChange(evt.target.value);
                props.onImmediateChange();
              }}
              onBlur={(evt) => {
                props.onBlur
                  ? props.onBlur(evt.target.value.replace(/[^\d]/g, ""))
                  : () => {};
                // props.onImmediateChange();
              }}
              disabled={props.disabled}
              error={props.error ? true : false}
              label={props.placeholder}
              sx={{
                marginBottom: "4px",

                "& .MuiOutlinedInput-root": {
                  borderColor:
                    props.status === "warning"
                      ? theme.palette["Yellow"]
                      : "transparent",
                },
              }}
              InputProps={{
                inputComponent: MaskedField as never,
                inputProps: {
                  mask: "+{p} 000 000-00-00",
                },
                inputMode: "numeric",
                type: "tel",
              }}
            />
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
                      viewTransition
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
  }
);

StyledPhoneField.displayName = "StyledPhoneField";
