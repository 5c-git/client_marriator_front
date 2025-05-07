import { forwardRef, CSSProperties } from "react";
import { Link } from "react-router";
import {
  Typography,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";

type StyledEmailFieldProps = {
  inputType: "email";
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
  style?: CSSProperties;
  inputStyle?: CSSProperties;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  onImmediateChange: () => void;
  onBlur?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const StyledEmailField = (props: StyledEmailFieldProps) => {
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
          <TextField
            id={props.name}
            name={props.name}
            value={props.value}
            error={props.error ? true : false}
            label={props.placeholder}
            onChange={(evt) => {
              props.onChange(evt);
              props.onImmediateChange();
            }}
            onBlur={(evt) => {
              props.onBlur ? props.onBlur(evt) : () => {};
              // props.onImmediateChange();
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
