import { CSSProperties } from "react";
import {
  Divider,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Box from "@mui/material/Box";

import { Link } from "react-router";

type StyledCheckboxMultipleProps = {
  inputType: "checkboxMultiple";
  name: string;
  value: string[];
  options: {
    value: string;
    label: string;
    image?: string;
    disabled: boolean;
  }[];

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
  style?: CSSProperties;
  inputStyle?: CSSProperties;

  onChange: (values: string[]) => void;
  onImmediateChange: () => void;
};

export const StyledCheckboxMultiple = (props: StyledCheckboxMultipleProps) => {
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

        <FormGroup>
          {props.options.map((item) => (
            <FormControlLabel
              key={item.value}
              disabled={item.disabled}
              sx={{
                marginLeft: "-6px",
              }}
              control={
                <Checkbox
                  name={props.name}
                  value={item.value}
                  checked={props.value.includes(item.value)}
                  onChange={(evt) => {
                    const _values = [...props.value];

                    if (evt.target.checked) _values.push(evt.target.value);
                    else _values.splice(_values.indexOf(evt.target.value), 1);

                    props.onChange(_values);
                    props.onImmediateChange();
                  }}
                  size="small"
                  sx={{
                    padding: "4px",
                  }}
                  color={
                    props.error
                      ? "error"
                      : props.status === "warning"
                      ? "warning"
                      : "corp"
                  }
                />
              }
              // label={item.label}
              label={
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "4px",
                    alignItems: "center",
                  }}
                >
                  {item.image ? (
                    <img
                      style={{
                        display: "block",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginTop: "10px",
                        marginBottom: "10px",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt={item.image}
                    />
                  ) : null}{" "}
                  {item.label}
                </Box>
              }
            />
          ))}
        </FormGroup>
      </Box>

      {props.dividerBottom ? <Divider sx={{ marginTop: "16px" }} /> : null}
    </Box>
  );
};
