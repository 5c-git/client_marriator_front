import { useState, CSSProperties } from "react";
import { Link } from "react-router";

import { useTranslation } from "react-i18next";

import {
  Typography,
  Divider,
  FormControl,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type StyledAutocompleteProps = {
  inputType: "autocomplete";
  name: string;
  value: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
    disabled: boolean;
  }[];

  disabled?: boolean;
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

  onChange: (e: string) => void;
  onImmediateChange: () => void;
};

export const StyledAutocomplete = (props: StyledAutocompleteProps) => {
  const { t } = useTranslation("styledAutocomplete");

  const [inputValue, setInputValue] = useState<string>(props.value);

  const valueMatch = props.options.find(
    (option) => option.value === props.value
  );

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
          <Autocomplete
            // ref={ref}
            id={props.name}
            value={valueMatch ? valueMatch.label : null}
            onChange={(_: unknown, label: string | null) => {
              const match = props.options.find(
                (option) => option.label === label
              );

              if (match) {
                props.onChange(match.value);
                props.onImmediateChange();
              } else {
                props.onChange("");
                props.onImmediateChange();
              }
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={props.options.map((item) => item.label)}
            getOptionDisabled={(label) => {
              const match = props.options.find(
                (option) => option.label === label
              );

              return match ? match.disabled : false;
            }}
            isOptionEqualToValue={(option, value) => option === value}
            popupIcon={<KeyboardArrowDownIcon />}
            disabled={props.disabled}
            noOptionsText={t("noOptionsText")}
            renderInput={(params) => (
              <TextField
                {...params}
                name={props.name}
                label={props.placeholder}
                error={props.error ? true : false}
                style={{
                  "--borderColor":
                    props.status === "warning"
                      ? "var(--mui-palette-Yellow)"
                      : "transparent",
                }}
                sx={{
                  border: "1px solid",
                  borderRadius: "6px",
                  borderColor: "var(--borderColor)",
                }}
              />
            )}
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
