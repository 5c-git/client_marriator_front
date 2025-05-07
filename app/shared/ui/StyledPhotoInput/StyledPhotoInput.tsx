import { Link } from "react-router";
import { useState, useEffect, useRef, CSSProperties } from "react";
import { UseFormSetValue } from "react-hook-form";

import { useTranslation } from "react-i18next";

import { resizeFile } from "~/shared/resizeFile/resizeFile";
import { postSendFile } from "~/requests/postSendFile/postSendFile";

import { Avatar, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { Loader } from "../Loader/Loader";
import profileIcon from "./icons/profileIcon.svg";

type PhotoInputProps = {
  inputType: "photo";
  name: string;
  value: string;
  onChange: UseFormSetValue<{
    [x: string]: unknown;
    [x: number]: unknown;
  }>;
  onImmediateChange: () => void;
  triggerValidation: (value: string) => void;

  validation: "default" | "none";
  url: string;
  token: string;

  disabled?: boolean;
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
};

// (6 megabites)
const MAX_FILE_SIZE = 6000000;

export const StyledPhotoInput = ({
  onChange,
  name,
  triggerValidation,
  ...props
}: PhotoInputProps) => {
  const { t } = useTranslation("styledPhotoInput");

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (props.error) {
      setError(props.error);
    }
  }, [props.error]);

  useEffect(() => {
    if (loaded === true) {
      triggerValidation(name);
      setLoaded(false);
    }
  }, [triggerValidation, name, loaded]);

  return (
    <>
      <Box sx={props.style}>
        {props.dividerTop ? <Divider sx={{ marginBottom: "16px" }} /> : null}

        <Box sx={props.inputStyle}>
          {props.heading ? (
            <Typography
              component="p"
              variant="Bold_14"
              sx={(theme) => ({
                textAlign: "center",
                color: theme.vars.palette["Black"],
                marginBottom: "8px",
              })}
            >
              {props.heading}
            </Typography>
          ) : null}

          <Box>
            <label
              htmlFor={name}
              style={{
                display: "block",
              }}
            >
              <Avatar
                alt="profile"
                src={value === "" ? profileIcon : value}
                style={{
                  "--borderColor":
                    props.status === "warning"
                      ? "var(--mui-palette-Yellow)"
                      : "transparent",
                }}
                sx={{
                  width: 90,
                  height: 90,
                  margin: "0 auto",
                  border: "1px solid",
                  borderColor: "var(--borderColor)",
                }}
              />

              <Typography
                component="p"
                variant="Bold_16"
                style={{
                  "--display": props.disabled ? "none" : "block",
                }}
                sx={(theme) => ({
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  textAlign: "center",
                  color: theme.vars.palette["Corp_1"],
                  display: "var(--display)",
                })}
              >
                {value === "" ? t("photo") : t("photo_replace")}
              </Typography>
            </label>

            <input
              type="file"
              id={name}
              ref={inputRef}
              disabled={props.disabled}
              onChange={async (evt) => {
                if (evt.target.files) {
                  const file = evt.target.files[0];

                  let maxSize = false;
                  const formData = new FormData();

                  if (file.size > MAX_FILE_SIZE) {
                    setError(t("error"));
                    maxSize = true;
                  }

                  // sendPhoto
                  if (maxSize === false) {
                    setLoading(true);
                    const image = await resizeFile(file);
                    formData.append(`file`, image as File);

                    postSendFile(
                      props.token,
                      props.url,
                      formData,
                      (data) => {
                        setValue(data.resFile);
                        onChange(name, data.resFile);
                        setLoading(false);
                        setLoaded(true);
                        setError("");
                        props.onImmediateChange();
                      },
                      (error) => {
                        setValue("");
                        onChange(name, "");
                        setError(error);
                        setLoading(false);
                      }
                    ).catch(() => {
                      setValue("");
                      onChange(name, "");
                      setError(t("error_unexpected"));
                      setLoading(false);
                    });
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
              style={{
                display: "none",
              }}
            />

            <input
              type="text"
              value={value}
              name={name}
              style={{ display: "none", pointerEvents: "none" }}
              readOnly
            />
          </Box>

          {error !== "" ? (
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                marginTop: "4px",
                textAlign: "center",
                color: theme.vars.palette["Red"],
              })}
            >
              {error}
            </Typography>
          ) : null}

          {props.helperInfo ? (
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                marginTop: "4px",
                textAlign: "center",
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

      {loading ? <Loader /> : null}
    </>
  );
};
