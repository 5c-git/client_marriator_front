import { useState, CSSProperties } from "react";
import {
  Divider,
  Typography,
  Button,
  IconButton,
  FormLabel,
  Checkbox,
  Dialog,
} from "@mui/material";
import Box from "@mui/material/Box";

import { Link } from "react-router";

import { useTranslation } from "react-i18next";

import CloseIcon from "@mui/icons-material/Close";

type StyledPhotoCheckboxProps = {
  inputType: "photoCheckbox";
  name: string;
  value: string[];
  options: {
    value: string;
    disabled: boolean;
    label: string;

    img: string;
    text?: string;
    details?: {
      text: string;
      details: string;
      img: string;
      link?: {
        text: string;
        path: string;
        type: "external" | "internal";
      };
    };
  }[];
  error?: string;

  validation: "default" | "none";
  heading?: string;

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

export const StyledPhotoCheckbox = (props: StyledPhotoCheckboxProps) => {
  const { t } = useTranslation("styledPhotoCheckbox");

  const [activeItem, setActiveItem] = useState<
    null | StyledPhotoCheckboxProps["options"][0]
  >(null);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box style={props.style}>
      {props.dividerTop ? <Divider sx={{ marginBottom: "22px" }} /> : null}

      <Box style={props.inputStyle}>
        {props.heading || props.error || props.helperInfo ? (
          <Box
            sx={{
              marginBottom: "38px",
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            columnGap: "8px",
            rowGap: "14px",
          }}
        >
          {props.options.map((item) => (
            <Box
              key={item.value}
              style={{
                "--opacity": item.disabled ? "0.35" : "1",
              }}
              sx={{
                overflow: "hidden",
                pointerEvents: item.disabled ? "none" : "auto",
                opacity: "var(--opacity)",
              }}
            >
              <FormLabel
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    marginBottom: "10px",
                    height: "114px",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "6px",
                  }}
                >
                  <img
                    src={item.img}
                    alt="checkbox banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Checkbox
                    onChange={(evt) => {
                      const _values = [...props.value];

                      if (evt.target.checked) _values.push(evt.target.value);
                      else _values.splice(_values.indexOf(evt.target.value), 1);

                      props.onChange(_values);
                      props.onImmediateChange();
                    }}
                    size="small"
                    color={props.error ? "error" : "corp"}
                    checked={props.value.includes(item.value)}
                    name={props.name}
                    value={item.value}
                    disabled={item.disabled}
                    // invalid={props.error ? true : false}
                    sx={(theme) => ({
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      padding: 0,
                      width: "14px",
                      height: "14px",
                      borderRadius: "0",
                      backgroundColor: theme.vars.palette["White"],
                    })}
                  />
                </Box>
                <Typography
                  component="p"
                  variant="Bold_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {item.label}
                </Typography>

                {item.text ? (
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={(theme) => ({
                      marginTop: "4px",
                      color: theme.vars.palette["Black"],
                      overflow: "hidden",
                      display: "-WebKit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "2",
                    })}
                  >
                    {item.text}
                  </Typography>
                ) : null}
              </FormLabel>

              {item.details ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setActiveItem(item);
                    setOpen(true);
                  }}
                  sx={{
                    marginTop: "14px",
                  }}
                >
                  {t("more")}
                </Button>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>

      {props.dividerBottom ? <Divider sx={{ marginTop: "22px" }} /> : null}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          "& .MuiPaper-root": {
            marginRight: "16px",
            marginLeft: "16px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          },
        }}
      >
        {activeItem !== null ? (
          <Box>
            <Box
              sx={{
                position: "relative",
                marginBottom: "16px",
                height: "176px",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <IconButton
                sx={(theme) => ({
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "18px",
                  height: "18px",
                  backgroundColor: theme.vars.palette["Grey_3"],
                })}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon
                  sx={(theme) => ({
                    width: "14px",
                    height: "14px",
                    color: theme.vars.palette["White"],
                  })}
                />
              </IconButton>

              <img
                src={activeItem.details?.img}
                alt="checkbox banner"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                rowGap: "8px",
                padding: "16px",
                paddingBottom: "32px",
              }}
            >
              <Typography
                component="p"
                variant="Bold_18"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {activeItem.details?.text}
              </Typography>

              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {activeItem.details?.details}
              </Typography>

              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Corp_1"],
                })}
              >
                {activeItem.details?.link ? (
                  <>
                    {activeItem.details?.link?.type === "internal" ? (
                      <Link
                        viewTransition
                        style={{
                          textDecorationLine: "underline",
                        }}
                        to={activeItem.details?.link?.path}
                      >
                        {activeItem.details?.link?.text}
                      </Link>
                    ) : (
                      <a
                        style={{
                          textDecorationLine: "underline",
                        }}
                        href={activeItem.details?.link?.path}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {activeItem.details?.link?.text}
                      </a>
                    )}
                  </>
                ) : null}
              </Typography>

              {!props.value.includes(activeItem.value) ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    const _values = [...props.value];
                    _values.push(activeItem.value);
                    setTimeout(() => {
                      props.onChange(_values);
                    }, 250);
                    setOpen(false);
                  }}
                >
                  {t("select")}
                </Button>
              ) : (
                <Box>
                  <Typography
                    component="p"
                    variant="Reg_18"
                    sx={(theme) => ({
                      marginBottom: "18px",
                      marginTop: "18px",
                      color: theme.vars.palette["Black"],
                    })}
                  >
                    {t("cancel")}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "4px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      {t("no")}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        const _values = [...props.value];
                        _values.splice(_values.indexOf(activeItem.value), 1);
                        setTimeout(() => {
                          props.onChange(_values);
                        }, 250);

                        setOpen(false);
                      }}
                    >
                      {t("yes")}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        ) : null}
      </Dialog>
    </Box>
  );
};
