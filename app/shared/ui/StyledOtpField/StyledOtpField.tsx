import { forwardRef } from "react";
import { OTPInput, SlotProps } from "input-otp";
import { SxProps, Theme, useTheme, Box } from "@mui/material";

interface SlotPropsWithError extends SlotProps {
  error?: boolean;
}

type StyledOptField = {
  onChange?: (value: string) => void;
  onComplete: (value: string) => void;
  value?: string;
  error?: boolean;
  disabled?: boolean;
  styles?: SxProps<Theme>;
};

const Slot = (props: SlotPropsWithError) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        fontSize: "20px",
        lineHeight: "24px",
        color: theme.palette["Black"],
        transition: "0.3s",
        borderBottom: "1px solid",
        borderColor: props.error
          ? theme.palette["Red"]
          : props.char
            ? theme.palette["Grey_1"]
            : theme.palette["Grey_3"],
      }}
    >
      {props.char !== null && <div>•</div>}
    </Box>
  );
};

export const StyledOptField = forwardRef((props: StyledOptField, ref) => (
  <Box sx={props.styles} ref={ref}>
    <OTPInput
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={true}
      maxLength={4}
      value={props.value}
      onChange={props.onChange}
      onComplete={props.onComplete}
      disabled={props.disabled}
      render={({ slots }) => (
        <Box
          sx={{
            display: "flex",
            columnGap: "16px",
            opacity: props.disabled ? 0.3 : 1,
          }}
        >
          {slots.map((slot, idx) => (
            <Slot error={props.error} key={idx} {...slot} />
          ))}
        </Box>
      )}
    />
  </Box>
));

StyledOptField.displayName = "StyledOptField";
