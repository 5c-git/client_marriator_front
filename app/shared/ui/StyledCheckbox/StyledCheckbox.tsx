import { CSSProperties } from "react";
import { Divider, Typography, FormControlLabel, Checkbox } from "@mui/material";
import Box from "@mui/material/Box";

import { Link } from "react-router";

type StyledCheckboxProps = {
  inputType: "checkbox";
  name: string;
  value: boolean;
  label: string;

  validation: "none" | "checked" | "unchecked";

  heading?: string;
  error?: string;
  status?: "warning";
  disabled?: boolean;

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

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImmediateChange: () => void;
};

export const StyledCheckbox = (props: StyledCheckboxProps) => {
  return (
    <Box style={props.style}>
      {props.dividerTop ? <Divider sx={{ marginBottom: "16px" }} /> : null}

      <Box style={props.inputStyle}>
        {props.heading || props.error || props.helperInfo ? (
          <Box
            sx={{
              marginBottom: "12px",
            }}
          >
            {props.heading ? (
              <Typography
                component="p"
                variant="Bold_14"
                style={{
                  "--color": props.error
                    ? "var(--mui-palette-Red)"
                    : "var(--mui-palette-Black)",
                }}
                sx={{
                  color: "var(--color)",
                }}
              >
                {props.heading}
              </Typography>
            ) : null}

            {props.error ? (
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Red"],
                })}
              >
                {props.error}
              </Typography>
            ) : null}

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
        ) : null}

        <FormControlLabel
          disabled={props.disabled}
          control={
            <Checkbox
              name={props.name}
              value={props.value}
              checked={props.value}
              onChange={(e) => {
                props.onChange(e);
                props.onImmediateChange();
              }}
              size="small"
              color={
                props.error
                  ? "error"
                  : props.status === "warning"
                  ? "warning"
                  : "corp"
              }
            />
          }
          label={props.label}
        />
      </Box>

      {props.dividerBottom ? <Divider sx={{ marginTop: "16px" }} /> : null}
    </Box>
  );
};
