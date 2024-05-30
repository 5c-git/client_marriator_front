import { useState, useEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import { UseFormSetValue } from "react-hook-form";
import Swiper from "swiper";
import "swiper/css";
import { resizeFile } from "./resizeFile";

import Ajv from "ajv";

import { SendFileErrorResponse } from "./sendFile/sendFileError";
import { SendFileSuccessResponse } from "./sendFile/sendFileSuccess";
import sendFileError from "./sendFile/sendFileError.schema.json";
import sendFileSucess from "./sendFile/sendFileSuccess.schema.json";

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
  inputtype: "file";
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

  disabled?: true;
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

const ajv = new Ajv();

const validateResponseError = ajv.compile(sendFileError);
const validateResponseSuccess = ajv.compile(sendFileSucess);

export const StyledFileInput = ({
  onChange,
  triggerValidation,
  ...props
}: FileInputProps) => {
  const theme = useTheme();

  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
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
    if (progress === 100 && loaded) {
      triggerValidation(props.name);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } else if (progress === 100 && loaded === false) {
      setTimeout(() => {
        setLoaded(true);
      }, 800);
    }
  }, [props.name, triggerValidation, progress, loading, loaded]);

  useEffect(() => {
    if (open === true) {
      setLoaded(false);
      setProgress(0);
      setError(null);
      if (ref.current) {
        ref.current.value = "";
      }
    }
  }, [open, setError]);

  return (
    <>
      <Box sx={props.styles}>
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

          <S_Box error={props.error} status={props.status}>
            <S_ButtonContainer>
              {value !== "" ? (
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={{
                    color: theme.palette["Grey_2"],
                  }}
                  onClick={() => {
                    location.href = value;
                  }}
                >
                  {props.placeholder}
                </Typography>
              ) : null}

              <S_ActivationButton
                onClick={() => {
                  value === "" ? setOpen(true) : (location.href = value);
                }}
                error={props.error}
                value={props.value}
              >
                {value === "" ? props.placeholder : value}
              </S_ActivationButton>
            </S_ButtonContainer>

            <IconButton
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
                  props.error ? theme.palette["Red"] : theme.palette["Grey_2"]
                }
                sx={{
                  width: "18px",
                  height: "18px",
                }}
                // }
              />
            </IconButton>
          </S_Box>

          <input
            type="text"
            value={value}
            name={props.name}
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
            Загрузите необходимое страницы документа
          </Typography>

          <Typography
            component="p"
            variant="Reg_12"
            sx={{ color: theme.palette["Grey_2"], paddingRight: "16px" }}
          >
            Допускаются jpg, png, pdf не более 6MB.
          </Typography>

          <Box
            sx={{
              paddingTop: "15px",
              paddingRight: "16px",
            }}
          >
            <label
              htmlFor={props.name}
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
                Загрузить
              </Button>
            </label>

            <input
              type="file"
              id={props.name}
              name={props.name}
              multiple
              ref={ref}
              onChange={async (evt) => {
                if (evt.target.files) {
                  const fileArray = Array.from(evt.target.files);

                  let maxSize = false;
                  const formData = new FormData();

                  for (let i = 0; i < fileArray.length; i++) {
                    if (fileArray[i].size > MAX_FILE_SIZE) {
                      setOpen(false);
                      setLoading(true);
                      setError(
                        "Ошибка загрузки документа, допускается загрузка документов формата jpg, png, pdf не более 6MB."
                      );
                      maxSize = true;
                      break;
                    }
                  }

                  if (maxSize === false) {
                    for (const file of fileArray) {
                      if (file.type.includes("pdf")) {
                        formData.append(`file[]`, file);
                      } else {
                        const image = await resizeFile(file);
                        formData.append(`file[]`, image as File);
                      }
                    }

                    // sendFiles
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.upload.addEventListener(
                      "progress",
                      function (event) {
                        if (event.lengthComputable) {
                          setProgress((event.loaded / event.total) * 100);
                        }
                      },
                      false
                    );

                    xhr.addEventListener("load", function () {
                      if (validateResponseSuccess(xhr.response)) {
                        const data = xhr.response as SendFileSuccessResponse;

                        setProgress(100);
                        setValue(data.resFile);
                        onChange(props.name, data.resFile);
                        props.onImmediateChange();
                      } else {
                        setValue("");
                        onChange(props.name, "");
                        if (validateResponseError(xhr.response)) {
                          const data = xhr.response as SendFileErrorResponse;

                          setError(data.error);
                        } else {
                          setError(
                            "Ошибка загрузки документа, допускается загрузка документов формата jpg, png, pdf не более 6MB."
                          );
                        }
                      }
                    });

                    xhr.addEventListener("error", function () {
                      if (validateResponseSuccess(xhr.response)) {
                        const data = xhr.response as SendFileSuccessResponse;

                        setProgress(100);
                        setValue(data.resFile);
                        onChange(props.name, data.resFile);
                      } else {
                        setValue("");
                        onChange(props.name, "");
                        if (validateResponseError(xhr.response)) {
                          const data = xhr.response as SendFileErrorResponse;

                          setError(data.error);
                        } else {
                          setError(
                            "Ошибка загрузки документа, допускается загрузка документов формата jpg, png, pdf не более 6MB."
                          );
                        }
                      }
                    });

                    xhr.open("POST", props.url);

                    xhr.send(formData);

                    setOpen(false);
                    setLoading(true);
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
                Загрузка
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
                setProgress(0);
                setError(null);
                setOpen(true);
                if (ref.current) {
                  ref.current.value = "";
                }
              }}
            >
              Назад
            </Button>
          ) : null}
        </Box>
      </S_SwipeableDrawer>
    </>
  );
};
