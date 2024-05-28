import {
  useTheme,
  SxProps,
  Theme,
  Box,
  Divider,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "@remix-run/react";

type StyledCheckboxMultipleProps = {
  inputtype: "checkboxMultiple";
  name: string;
  value: string[];
  options: {
    value: string;
    label: string;
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
  styles?: SxProps<Theme>;
  inputStyles?: SxProps<Theme>;

  onChange: (values: string[]) => void;
};

export const StyledCheckboxMultiple = (props: StyledCheckboxMultipleProps) => {
  const theme = useTheme();

  return (
    <Box sx={props.styles}>
      {props.dividerTop ? <Divider sx={{ marginBottom: "16px" }} /> : null}

      <Box sx={props.inputStyles}>
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
                sx={{
                  color: props.error
                    ? theme.palette["Red"]
                    : theme.palette["Black"],
                }}
              >
                {props.heading}
              </Typography>
            ) : null}

            {props.error ? (
              <Typography
                component="p"
                variant="Reg_12"
                sx={{
                  color: theme.palette["Red"],
                }}
              >
                {props.error}
              </Typography>
            ) : null}

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
        ) : null}

        <FormGroup>
          {props.options.map((item) => (
            <FormControlLabel
              key={item.value}
              disabled={item.disabled ? true : false}
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
              label={item.label}
            />
          ))}
        </FormGroup>
      </Box>

      {props.dividerBottom ? <Divider sx={{ marginTop: "16px" }} /> : null}
    </Box>
  );
};
