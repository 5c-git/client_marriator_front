import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { toDate, formatISO } from "date-fns";
import { ru } from "date-fns/locale/ru";

import { FormControl, FormHelperText } from "@mui/material";

type TimeFieldProps = {
  name: string;
  value: null | string;
  onChange: (value: string) => void;
  placeholder: string;

  minTime?: Date;
  maxTime?: Date;
  disabled?: boolean;
  error?: string;
};

const localeActionsText = {
  cancelButtonLabel: "Отменить",
  okButtonLabel: "Принять",
  nextStepButtonLabel: "Принять",
};

export const TimeField = (props: TimeFieldProps) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
    <FormControl
      sx={{
        width: "100%",
      }}
      error={props.error ? true : false}
    >
      <TimePicker
        enableAccessibleFieldDOMStructure={false}
        ampm={false}
        label={props.placeholder}
        value={props.value === null ? null : toDate(props.value)}
        localeText={localeActionsText}
        minTime={props.minTime}
        maxTime={props.maxTime}
        onChange={(newValue) => {
          if (newValue) {
            props.onChange(formatISO(newValue));
          }
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
          dialog: {
            sx: (theme) => ({
              "& .MuiClock-pin": {
                backgroundColor: theme.vars.palette["Corp_1"],
              },
              "& .MuiClockPointer-root": {
                backgroundColor: theme.vars.palette["Corp_1"],
              },
              "& .MuiClockPointer-thumb": {
                borderColor: theme.vars.palette["Corp_1"],
                backgroundColor: theme.vars.palette["Corp_2"],
              },
            }),
          },
        }}
        slots={{
          toolbar: () => undefined,
        }}
        sx={(theme) => ({
          "& .MuiClock-pin": {
            backgroundColor: theme.vars.palette["Corp_1"],
          },
        })}
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
  </LocalizationProvider>
);
