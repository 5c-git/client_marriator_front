import { forwardRef } from "react";
import { Link } from "@remix-run/react";

import {
  LocalizationProvider,
  PickersLocaleText,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ru } from "date-fns/locale/ru";

import { sub, toDate, formatISO } from "date-fns";

const localeActionsText: Partial<PickersLocaleText<Date>> = {
  okButtonLabel: "Принять",
  cancelButtonLabel: "Отменить",
};

import {
  useTheme,
  SxProps,
  Theme,
  Box,
  Typography,
  Divider,
  FormControl,
  FormHelperText,
} from "@mui/material";

type StyledDateFieldProps = {
  inputType: "date";
  name: string;
  value: null | string;
  placeholder: string;

  disabled?: boolean;
  heading?: string;
  error?: string;
  status?: "warning";
  validation?: "default" | "none" | "16years";

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

  onChange: (value: string) => void;
  onImmediateChange: () => void;
};

export const StyledDateField = forwardRef(
  (props: StyledDateFieldProps, ref) => {
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
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ru}
            >
              <MobileDatePicker
                label={props.placeholder}
                name={props.name}
                value={props.value !== null ? toDate(props.value) : props.value}
                disabled={props.disabled}
                closeOnSelect={true}
                maxDate={
                  props.validation === "16years"
                    ? sub(new Date(), {
                        years: 16,
                      })
                    : undefined
                }
                onChange={(newValue) => {
                  if (newValue) {
                    props.onChange(
                      formatISO(new Date(newValue), {
                        representation: "date",
                      })
                    );
                    props.onImmediateChange();
                  }
                }}
                shouldDisableDate={(date) => {
                  let result = false;
                  if (props.error) {
                    if (
                      props.value !== null &&
                      formatISO(new Date(date), { representation: "date" }) ===
                        formatISO(new Date(props.value), {
                          representation: "date",
                        })
                    ) {
                      result = true;
                    } else {
                      result = false;
                    }
                  }

                  return result;
                }}
                localeText={localeActionsText}
                sx={{
                  marginBottom: "4px",

                  "& .MuiOutlinedInput-root": {
                    borderColor: props.error
                      ? theme.palette["Red"]
                      : props.status === "warning"
                        ? theme.palette["Yellow"]
                        : "transparent",
                  },

                  "& .MuiInputLabel-root": {
                    color: props.error
                      ? theme.palette["Red"]
                      : theme.palette["Grey_2"],

                    "&.MuiInputLabel-shrink": {
                      color: theme.palette["Grey_2"],
                    },
                  },
                }}
              />
            </LocalizationProvider>

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
                      }}
                      to={props.helperInfo.link.path}
                    >
                      {props.helperInfo.link.text}
                    </Link>
                  ) : (
                    <a
                      style={{
                        textDecorationLine: "underline",
                      }}
                      href={props.helperInfo.link.path}
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

StyledDateField.displayName = "StyledDateField";
