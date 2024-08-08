import { useState, useEffect, useRef, forwardRef } from "react";
import { Link } from "@remix-run/react";
import { UseFormSetValue } from "react-hook-form";
import Swiper from "swiper";
import "swiper/css";
import { resizeFile } from "~/shared/resizeFile/resizeFile";

import { t } from "i18next";

import { postSendFile } from "~/requests/postSendFile/postSendFile";

import {
  useTheme,
  SxProps,
  Theme,
  Box,
  IconButton,
  Button,
  Divider,
  Typography,
  LinearProgress,
  Alert,
} from "@mui/material";

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

  dividerTop?: true;
  dividerBottom?: true;
  styles?: SxProps<Theme>;
  inputStyles?: SxProps<Theme>;
};

// (6 megabites)
const MAX_FILE_SIZE = 6000000;

export const StyledFileInput = forwardRef(
  ({ onChange, name, triggerValidation, ...props }: FileInputProps, ref) => {
    const theme = useTheme();

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
      } else if (
        props.drawerInfo &&
        props.drawerInfo.images &&
        open === false
      ) {
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
        <Box sx={props.styles} ref={ref}>
          {props.dividerTop ? <Divider sx={{ marginBottom: "16px" }} /> : null}

          <Box sx={props.inputStyles}>
            {props.heading ? (
              <Typography
                component="p"
                variant="Bold_14"
                sx={{
                  color: theme.palette["Black"],
                  marginBottom: "8px",
                }}
              >
                {props.heading}
              </Typography>
            ) : null}

            <S_Box
              error={props.error}
              disabled={props.disabled}
              status={props.status}
            >
              <S_ButtonContainer>
                {value !== "" ? (
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{
                      color: props.disabled
                        ? theme.palette["Grey_4"]
                        : theme.palette["Grey_2"],
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
                  error={props.error}
                  disabled={props.disabled}
                  value={props.value}
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
                      ? theme.palette["Red"]
                      : props.disabled
                        ? theme.palette["Grey_4"]
                        : theme.palette["Grey_2"]
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
                sx={{
                  marginTop: "4px",
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
                  marginTop: "4px",
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
                          color: theme.palette["Corp_1"],
                        }}
                        to={props.helperInfo.link.path}
                      >
                        {props.helperInfo.link.text}
                      </Link>
                    ) : (
                      <a
                        style={{
                          textDecorationLine: "underline",
                          color: theme.palette["Corp_1"],
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
            <div>
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
                        sx={{
                          color: theme.palette["Grey_2"],
                          paddingRight: "16px",
                        }}
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
                      <div className="swiper-wrapper">
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
                      </div>
                    </Box>
                  ) : null}

                  <Box sx={{ paddingRight: "16px" }}>
                    <Divider />
                  </Box>
                </Box>
              ) : null}
            </div>

            <Typography
              component="p"
              variant="Bold_14"
              sx={{
                paddingBottom: "5px",
                paddingRight: "16px",
                color: theme.palette["Black"],
              }}
            >
              {t("StyledFileInput.loadText")}
            </Typography>

            <Typography
              component="p"
              variant="Reg_12"
              sx={{ color: theme.palette["Grey_2"], paddingRight: "16px" }}
            >
              {t("StyledFileInput.allowedTypes")}
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
                  {t("StyledFileInput.load")}
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
                        setError(t("StyledFileInput.error"));
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
                        setError(t("StyledFileInput.error_unexpected"));
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
                  sx={{
                    color: theme.palette["Black"],
                  }}
                >
                  {t("StyledFileInput.loading")}
                </Typography>{" "}
                <LinearProgress
                  // variant="determinate"
                  // value={progress}
                  color="corp"
                  sx={{
                    "& .MuiLinearProgress-bar1Determinate": {
                      backgroundColor: loaded
                        ? theme.palette["WhatsApp"]
                        : theme.palette["Corp_1"],
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
                {t("StyledFileInput.back")}
              </Button>
            ) : null}
          </Box>
        </S_SwipeableDrawer>
      </>
    );
  }
);

StyledFileInput.displayName = "StyledFileInput";
