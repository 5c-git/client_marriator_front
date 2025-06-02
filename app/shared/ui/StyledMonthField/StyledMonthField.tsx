import { CSSProperties } from "react";
import { Link } from "react-router";

import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale/ru";

import { toDate, formatISO } from "date-fns";

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
import Box from "@mui/material/Box";

type StyledMonthFieldProps = {
  inputType: "month";
  name: string;
  value: null | string;
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
  style?: CSSProperties;
  inputStyle?: CSSProperties;

  onChange: (value: string) => void;
  onImmediateChange: () => void;
};

export const StyledMonthField = (props: StyledMonthFieldProps) => {
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
            <MobileDateTimePicker
              enableAccessibleFieldDOMStructure={false}
              views={["month", "year"]}
              format="MM.y"
              label={props.placeholder}
              name={props.name}
              value={props.value !== null ? toDate(props.value) : props.value}
              disabled={props.disabled}
              closeOnSelect={true}
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
              localeText={localeActionsText}
              slots={{
                toolbar: () => undefined,
                calendarHeader: () => undefined,
                tabs: () => undefined,
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
