import {
  useTheme,
  SxProps,
  Theme,
  Box,
  Divider,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "@remix-run/react";

type StyledCheckboxProps = {
  inputtype: "checkbox";
  name: string;
  value: boolean;
  label: string;

  validation: "none" | "checked" | "unchecked";

  heading?: string;
  error?: string;
  status?: "warning";
  disabled?: true;

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

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const StyledCheckbox = (props: StyledCheckboxProps) => {
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

        <FormControlLabel
          disabled={props.disabled ? true : false}
          control={
            <Checkbox
              name={props.name}
              value={props.value}
              checked={props.value}
              onChange={props.onChange}
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
