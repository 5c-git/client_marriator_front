import { CSSProperties } from "react";
import { OTPInput, SlotProps } from "input-otp";
import Box from "@mui/material/Box";

interface SlotPropsWithError extends SlotProps {
  error?: boolean;
}

type StyledOptField = {
  onChange?: (value: string) => void;
  onComplete: (value: string) => void;
  value?: string;
  error?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
};

const Slot = (props: SlotPropsWithError) => {
  return (
    <Box
      style={{
        "--borderColor": props.error
          ? "var(--mui-palette-Red)"
          : props.char
          ? "var(--mui-palette-Grey_1)"
          : "var(--mui-palette-Grey_3)",
      }}
      sx={(theme) => ({
        position: "relative",
        display: "flex",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        fontSize: "20px",
        lineHeight: "24px",
        color: theme.vars.palette["Black"],
        transition: "0.3s",
        borderBottom: "1px solid",
        borderColor: "var(--borderColor)",
      })}
    >
      {props.char !== null && <div>•</div>}
    </Box>
  );
};

export const StyledOptField = (props: StyledOptField) => (
  <Box style={props.style}>
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
          style={{
            "--opacity": props.disabled ? 0.3 : 1,
          }}
          sx={{
            display: "flex",
            columnGap: "16px",
            opacity: "var(--opacity)",
          }}
        >
          {slots.map((slot, idx) => (
            <Slot error={props.error} key={idx} {...slot} />
          ))}
        </Box>
      )}
    />
  </Box>
);
