import { CSSProperties } from "react";
import { Link } from "react-router";

import {
  LocalizationProvider,
  PickersLocaleText,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale/ru";

import { sub, toDate, formatISO } from "date-fns";

import Box from "@mui/material/Box";

const localeActionsText = {
  cancelButtonLabel: "Отменить",
  okButtonLabel: "Принять",
  nextStepButtonLabel: "Принять",
};

import {
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
  style?: CSSProperties;
  inputStyle?: CSSProperties;

  onChange: (value: string) => void;
  onImmediateChange: () => void;
};

export const StyledDateField = (props: StyledDateFieldProps) => {
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
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <MobileDatePicker
              enableAccessibleFieldDOMStructure={false}
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
              slots={{
                toolbar: () => undefined,
                calendarHeader: () => undefined,
              }}
              slotProps={{
                textField: {
                  style: {
                    "--borderColor": props.error
                      ? "var(--mui-palette-Red)"
                      : "transparent",
                    "--color": props.error
                      ? "var(--mui-palette-Red)"
                      : "var(--mui-palette-Grey_2)",
                  },
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      borderColor: "var(--borderColor)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--color)",
                    },
                  },
                },
                yearButton: {
                  sx: (theme) => ({
                    "&.Mui-selected": {
                      //@ts-ignore no typings for theme in MUI for some reason
                      backgroundColor: theme.vars.palette["Corp_1"],

                      "&:focus": {
                        //@ts-ignore no typings for theme in MUI for some reason
                        backgroundColor: theme.vars.palette["Corp_1"],
                      },

                      "&:hover": {
                        //@ts-ignore no typings for theme in MUI for some reason
                        backgroundColor: theme.vars.palette["Corp_2"],
                      },
                    },
                  }),
                },
                monthButton: {
                  sx: (theme) => ({
                    "&.Mui-selected": {
                      //@ts-ignore no typings for theme in MUI for some reason
                      backgroundColor: theme.vars.palette["Corp_1"],

                      "&:focus": {
                        //@ts-ignore no typings for theme in MUI for some reason
                        backgroundColor: theme.vars.palette["Corp_1"],
                      },

                      "&:hover": {
                        //@ts-ignore no typings for theme in MUI for some reason
                        backgroundColor: theme.vars.palette["Corp_2"],
                      },
                    },
                  }),
                },
                dialog: {
                  sx: {
                    "& .MuiDateCalendar-root": {
                      height: "unset",
                    },
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
