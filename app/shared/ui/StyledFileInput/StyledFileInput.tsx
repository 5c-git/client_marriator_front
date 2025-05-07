import { useState, useEffect, useRef, CSSProperties } from "react";
import { Link } from "react-router";
import { UseFormSetValue } from "react-hook-form";
import Swiper from "swiper";
import "swiper/css";
import { resizeFile } from "~/shared/resizeFile/resizeFile";

import { useTranslation } from "react-i18next";

import { postSendFile } from "~/requests/postSendFile/postSendFile";

import {
  IconButton,
  Button,
  Divider,
  Typography,
  LinearProgress,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  S_Box,
  S_ButtonContainer,
  S_ActivationButton,
  S_SwipeableDrawer,
} from "./StyledFileInput.styled";

import { ClipIcon } from "./icons/ClipIcon";
import { DownloadIcon } from "./icons/DownloadIcon";

type FileInputProps = {
  inputType: "file";
  name: string;
  value: string;
  onChange: UseFormSetValue<{
    [x: string]: unknown;
    [x: number]: unknown;
  }>;
  onImmediateChange: () => void;
  triggerValidation: (value: string) => void;

  placeholder: string;
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
  drawerInfo?: {
    text?: string;
    images?: string[];
  };
  moreData?: {
    name: string;
    value: string;
  }[];

  dividerTop?: true;
  dividerBottom?: true;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
};

// (6 megabites)
const MAX_FILE_SIZE = 6000000;

export const StyledFileInput = ({
  onChange,
  name,
  triggerValidation,
  ...props
}: FileInputProps) => {
  const { t } = useTranslation("styledFileInput");

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (
      props.drawerInfo &&
      props.drawerInfo.images &&
      open === true &&
      swiperInstance === null
    ) {
      setTimeout(() => {
        setSwiperInstance(
          new Swiper(".swiper", {
            slidesPerView: "auto",
            spaceBetween: 7,
          })
        );
      });
    } else if (props.drawerInfo && props.drawerInfo.images && open === false) {
      swiperInstance?.destroy();
      // setSwiperInstance(null);
    }
  }, [open, swiperInstance, props.drawerInfo]);

  useEffect(() => {
    if (open === true) {
      setLoaded(false);
      setError(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [open, setError]);

  useEffect(() => {
    if (loaded === true) {
      triggerValidation(name);
    }
  }, [triggerValidation, name, loaded]);

  return (
    <>
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

          {props.moreData ? (
            <Stack
              sx={{
                rowGap: "8px",
                paddingBottom: "8px",
              }}
            >
              {props.moreData.map((item) => (
                <Stack key={item.name}>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                  >
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : null}

          <S_Box
            style={{
              "--borderColor": props.error
                ? "var(--mui-palette-Red)"
                : props.status === "warning"
                ? "var(--mui-palette-Yellow)"
                : "var(--mui-palette-Grey_5)",
              "--opacity": props.disabled ? 0.6 : 1,
              "--pointerEvents": props.disabled ? "none" : "initial",
            }}
            sx={{
              borderColor: "var(--borderColor)",
              opacity: "var(--opacity)",
              pointerEvents: "var(--pointerEvents)",
            }}
          >
            <S_ButtonContainer>
              {value !== "" ? (
                <Typography
                  component="p"
                  variant="Reg_14"
                  style={{
                    "--color": props.error
                      ? "var(--mui-palette-Grey_4)"
                      : "var(--mui-palette-Grey_2)",
                  }}
                  sx={{
                    color: "var(--color)",
                  }}
                  onClick={() => {
                    location.href = value;
                  }}
                >
                  {props.placeholder}
                </Typography>
              ) : null}

              <S_ActivationButton
                type="button"
                onClick={() => {
                  value === "" ? setOpen(true) : window.open(value, "_blank");
                }}
                disabled={props.disabled}
                value={props.value}
                style={{
                  "--color": props.error
                    ? "var(--mui-palette-Red)"
                    : props.disabled
                    ? "var(--mui-palette-Grey_4)"
                    : props.value !== ""
                    ? "var(--mui-palette-Black)"
                    : "var(--mui-palette-Grey_2)",
                }}
                sx={{
                  color: "var(--color)",
                }}
              >
                {value === ""
                  ? props.placeholder
                  : value.substring(value.indexOf("["))}
              </S_ActivationButton>
            </S_ButtonContainer>

            <IconButton
              type="button"
              sx={{
                padding: 0,
                width: "24px",
                height: "24px",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <ClipIcon
                htmlColor={
                  props.error
                    ? "var(--mui-palette-Red)"
                    : props.disabled
                    ? "var(--mui-palette-Grey_4)"
                    : "var(--mui-palette-Grey_2)"
                }
                sx={{
                  width: "18px",
                  height: "18px",
                }}
              />
            </IconButton>
          </S_Box>

          <input
            type="text"
            value={value}
            name={name}
            style={{ display: "none", pointerEvents: "none" }}
            readOnly
          />

          {props.error ? (
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                marginTop: "4px",
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
                marginTop: "4px",
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

      <S_SwipeableDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: "18px",
            paddingBottom: "44px",
            paddingLeft: "16px",
          }}
        >
          <Box>
            {props.drawerInfo &&
            (props.drawerInfo.text || props.drawerInfo.images) ? (
              <Box
                sx={{
                  display: "grid",
                  rowGap: "10px",
                  paddingBottom: "10px",
                }}
              >
                {props.drawerInfo.text ? (
                  <>
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({
                        color: theme.vars.palette["Grey_2"],
                        paddingRight: "16px",
                      })}
                    >
                      {props.drawerInfo.text}
                    </Typography>
                  </>
                ) : null}

                {props.drawerInfo.images ? (
                  <Box
                    className="swiper"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Box className="swiper-wrapper">
                      {props.drawerInfo.images.map((item, index) => (
                        <Box
                          key={index}
                          className="swiper-slide"
                          sx={{
                            height: "218px !important",
                            width: "60% !important",
                            overflow: "hidden",
                            borderRadius: "6px",
                          }}
                        >
                          <img
                            src={item}
                            alt="checkbox banner"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ) : null}

                <Box sx={{ paddingRight: "16px" }}>
                  <Divider />
                </Box>
              </Box>
            ) : null}
          </Box>

          <Typography
            component="p"
            variant="Bold_14"
            sx={(theme) => ({
              paddingBottom: "5px",
              paddingRight: "16px",
              color: theme.vars.palette["Black"],
            })}
          >
            {t("loadText")}
          </Typography>

          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
              paddingRight: "16px",
            })}
          >
            {t("allowedTypes")}
          </Typography>

          <Box
            sx={{
              paddingTop: "15px",
              paddingRight: "16px",
            }}
          >
            <label
              htmlFor={name}
              style={{
                display: "block",
              }}
            >
              <Button
                startIcon={
                  <DownloadIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                }
                sx={{
                  pointerEvents: "none",
                }}
                variant="outlined"
              >
                {t("load")}
              </Button>
            </label>

            <input
              type="file"
              id={name}
              name={name}
              multiple
              ref={inputRef}
              onChange={async (evt) => {
                if (evt.target.files) {
                  const fileArray = Array.from(evt.target.files);

                  let maxSize = false;
                  const formData = new FormData();

                  for (let i = 0; i < fileArray.length; i++) {
                    if (fileArray[i].size > MAX_FILE_SIZE) {
                      setOpen(false);
                      setLoading(true);
                      setError(t("error"));
                      maxSize = true;
                      break;
                    }
                  }

                  if (maxSize === false) {
                    for (const file of fileArray) {
                      if (file.type.includes("pdf")) {
                        formData.append(`file[]`, file);
                        formData.append(`fieldUuid`, name);
                      } else {
                        const image = await resizeFile(file);
                        formData.append(`file[]`, image as File);
                        formData.append(`fieldUuid`, name);
                      }
                    }

                    setOpen(false);
                    setLoading(true);

                    // sendFiles
                    postSendFile(
                      props.token,
                      props.url,
                      formData,
                      (data) => {
                        setValue(data.resFile);
                        setLoaded(true);
                        setLoading(false);
                        setError(null);
                        onChange(name, data.resFile);
                        props.onImmediateChange();
                      },
                      (error) => {
                        setValue("");
                        onChange(name, "");
                        setError(error);
                      }
                    ).catch(() => {
                      setValue("");
                      onChange(name, "");
                      setError(t("error_unexpected"));
                    });
                  }
                }
              }}
              accept="image/png, image/jpeg, image/jpg, .pdf"
              style={{
                display: "none",
              }}
            />
          </Box>
        </Box>
      </S_SwipeableDrawer>

      <S_SwipeableDrawer
        open={loading}
        onClose={() => {}}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
        swipeAreaWidth={0}
        onTouchStart={(
          event: React.TouchEvent<HTMLDivElement> & {
            nativeEvent: {
              defaultMuiPrevented?: boolean | undefined;
            };
          }
        ) => {
          event.nativeEvent.defaultMuiPrevented = true;
        }}
        sx={{
          "& .MuiModal-backdrop": {
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: "16px",
            paddingTop: "18px",
            paddingBottom: "44px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {error ? (
            <Alert variant="small" color="Banner_Error">
              {error}
            </Alert>
          ) : null}

          {!error ? (
            <>
              {" "}
              <Typography
                component="p"
                variant="Reg_18"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {t("loading")}
              </Typography>{" "}
              <LinearProgress
                // variant="determinate"
                // value={progress}
                color="corp"
                style={{
                  "--bgColor": loaded
                    ? "var(--mui-palette-WhatsApp)"
                    : "var(--mui-palette-Corp_1)",
                }}
                sx={{
                  "& .MuiLinearProgress-bar1Determinate": {
                    backgroundColor: "var(--bgColor)",
                  },
                  // "& .MuiLinearProgress-bar": {
                  //   transition: "none",
                  // },
                }}
              />
            </>
          ) : null}

          {error ? (
            <Button
              variant="outlined"
              onClick={() => {
                setLoaded(false);
                setLoading(false);
                setError(null);
                setOpen(true);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              {t("back")}
            </Button>
          ) : null}
        </Box>
      </S_SwipeableDrawer>
    </>
  );
};
