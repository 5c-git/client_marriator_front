import { CSSProperties } from "react";

import {
  Divider,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import Box from "@mui/material/Box";

import { Link } from "react-router";

import telegram from "./icons/telegram.svg";
import whatsapp from "./icons/whatsapp.svg";
import viber from "./icons/viber.svg";

const iconMap = { telegram, whatsapp, viber };

type OptionWithIcon = {
  value: string;
  label: string;
  icon?: "telegram" | "viber" | "whatsapp";
  image?: never;
  disabled: boolean;
};

type OptionWithImage = {
  value: string;
  label: string;
  icon?: never;
  image?: string | null;
  disabled: boolean;
};

type StyledRadioButtonProps = {
  inputType: "radio";
  name: string;
  value: string;

  options: OptionWithIcon[] | OptionWithImage[];

  validation: "default" | "none";
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

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImmediateChange: () => void;
};

export const StyledRadioButton = (props: StyledRadioButtonProps) => {
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

        {/* <div className="grid gap-y-2">
        {props.options.map((item) => (
          <div
            className={cn("relative flex items-center gap-x-2", {
              "pointer-events-none opacity-35": item.disabled,
            })}
            key={item.value}
          >
            <ExtendedRadioButton
              name={props.name}
              inputId={item.label}
              value={item.value}
              onChange={props.onChange}
              checked={props.value === item.value}
              disabled={item.disabled}
              invalid={props.error ? true : false}
              status={props.status}
            />
            <label
              htmlFor={item.label}
              className="flex items-center gap-x-[6px] font-Golos text-sm/4 font-normal text-Black"
            >
              {item.icon ? (
                <img
                  className="block h-[18px] w-[18px]"
                  src={iconMap[item.icon]}
                  alt="socal network"
                />
              ) : null}
              <span>{item.label}</span>
            </label>
          </div>
        ))}
      </div> */}

        <RadioGroup
          aria-labelledby={props.name}
          value={props.value}
          name={props.name}
          onChange={(evt) => {
            props.onChange(evt);
            props.onImmediateChange();
          }}
        >
          {" "}
          {props.options.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              label={
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "4px",
                    alignItems: "center",
                  }}
                >
                  {item.icon ? (
                    <img
                      style={{
                        display: "block",
                        width: "18px",
                        height: "18px",
                      }}
                      src={iconMap[item.icon]}
                      alt="socal network"
                    />
                  ) : null}{" "}
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
              sx={{
                marginLeft: "-6px",
              }}
              control={
                <Radio
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
            />
          ))}
        </RadioGroup>
      </Box>

      {props.dividerBottom ? <Divider sx={{ marginTop: "16px" }} /> : null}
    </Box>
  );
};
