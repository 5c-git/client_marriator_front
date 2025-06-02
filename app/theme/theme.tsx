import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme, alpha } from "@mui/material";
import GolosRegular from "../static/fonts/Golos-UI_Regular.woff2";
import GolosMedium from "../static/fonts/Golos-UI_Medium.woff2";
import GolosBold from "../static/fonts/Golos-UI_Bold.woff2";

import { AlertIcon } from "./icons/AlertIcon";

const baseTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "Golos UI",
    Reg_8_Uppercase: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "0.5rem",
      lineHeight: "0.75rem",
      textTransform: "uppercase",
    },
    Bold_8_Uppercase: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "0.5rem",
      lineHeight: "0.75rem",
      textTransform: "uppercase",
    },
    Reg_10_Uppercase: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "0.625rem",
      lineHeight: "0.875rem",
      textTransform: "uppercase",
    },
    Bold_10_Uppercase: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "0.625rem",
      lineHeight: "0.875rem",
      textTransform: "uppercase",
    },
    Reg_10: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "0.625rem",
      lineHeight: "0.875rem",
    },
    Bold_10: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "0.625rem",
      lineHeight: "0.875rem",
    },
    Reg_12: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: "1rem",
    },
    Bold_12: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "0.75rem",
      lineHeight: "1rem",
    },
    Reg_14: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: "1rem",
    },
    Med_14: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: "1rem",
    },
    Bold_14: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "0.875rem",
      lineHeight: "1rem",
    },
    Reg_16: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: "1.25rem",
    },
    Bold_16: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "1rem",
      lineHeight: "1.25rem",
    },
    Reg_18: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
    Bold_18: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
    Reg_20: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
    Bold_20: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
    Reg_28: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1.75rem",
      lineHeight: "2.063rem",
    },
    Bold_28: {
      fontFamily: "Golos UI",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: "2.063rem",
    },
  },
  palette: {
    corp: {
      main: "#C7329B",
      light: alpha("#C7329B", 0.5),
      dark: alpha("#C7329B", 0.9),
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F3EA00",
      light: alpha("#F3EA00", 0.5),
      dark: alpha("#F3EA00", 0.9),
      contrastText: "#ffffff",
    },
    Black: "#212121",
    White: "#FFFFFF",
    Corp_1: "#C7329B",
    Corp_2: "#8A2DB5",
    Copr_3: "#F19D7F",
    Grey_1: "#5B5768",
    Grey_2: "#8D9197",
    Grey_3: "#C5C5CD",
    Grey_4: "#E7E8ED",
    Grey_5: "#F4F5F9", //не был назван в макете
    Red: "#D92C2C",
    Banner_Text_Error: "#572522",
    Banner_Error: "#FAEDED",
    Orange: "#FA9B72",
    Orange_Text: "#281600",
    Yellow: "#F3EA00",
    Yellow_Light: "#FFFA7A",
    Yellow_Text: "#4F4A02",
    Violet: "#7F34AF",
    Dark_blue: "#1E00D6",
    Blue: "#7DC6FF",
    Blue_Text: "#043860",
    Green: "#86DC7F",
    Green_Text: "#00260E",
    Light_green: "#D3FF8C",
    Light_Green_Text: "#404A02",
    WhatsApp: "#1AB654",
    Telegram: "#2AABEE",
    Light_Violet: "#C596DA",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Golos UI';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: url(${GolosBold}) format('woff2');
        }
        @font-face {
          font-family: 'Golos UI';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url(${GolosMedium}) format('woff2');
        }
        @font-face {
          font-family: 'Golos UI';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${GolosRegular}) format('woff2');
        }
      `,
    },
  },
});

export const theme = createTheme(baseTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
          paddingTop: "12px",
          paddingBottom: "12px",
          borderRadius: "4px",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "0.875rem",
          lineHeight: "1rem",
          textTransform: "none",
          boxShadow: "none",
          color: baseTheme.vars.palette["White"],
          "&:active": {
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: baseTheme.vars.palette["Grey_4"],
            borderColor: baseTheme.vars.palette["Grey_4"],
            color: baseTheme.vars.palette["Grey_3"],
          },
          "&.Mui-focusVisible": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: baseTheme.vars.palette["Corp_1"],

          "&:hover": {
            boxShadow: "none",
            backgroundColor: baseTheme.vars.palette["Corp_1"],
          },
        },
        outlined: {
          backgroundColor: "transparent",
          color: baseTheme.vars.palette["Corp_1"],
          borderColor: baseTheme.vars.palette["Corp_1"],

          "&:hover": {
            boxShadow: "none",
            backgroundColor: "transparent",
            borderColor: baseTheme.vars.palette["Corp_1"],
          },
        },
        text: {
          backgroundColor: "transparent",
          color: baseTheme.vars.palette["Corp_1"],
          borderColor: "transparent",

          "&:hover": {
            boxShadow: "none",
            // backgroundColor: baseTheme.vars.palette['Corp_1']
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: baseTheme.vars.palette["Grey_3"],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: baseTheme.vars.palette["Grey_2"],
          ...baseTheme.typography["Reg_14"],
          transform: "translate(14px, 20px) scale(1)",

          "&.Mui-focused": {
            color: baseTheme.vars.palette["Grey_2"],
          },
          "&.Mui-disabled": {
            color: baseTheme.vars.palette["Grey_4"],
          },
        },
        shrink: {
          transform: "translate(14px, 8px) scale(1)",

          "&.Mui-error": {
            color: baseTheme.vars.palette["Grey_2"],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: baseTheme.vars.palette["Grey_2"],
          "&.Mui-disabled": {
            color: baseTheme.vars.palette["Grey_4"],
          },
        },
        select: {
          whiteSpace: "normal",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.vars.palette["Grey_5"],
          borderRadius: "6px",
          border: "1px solid transparent",

          "&.Mui-error": {
            borderColor: baseTheme.vars.palette["Red"],
            color: baseTheme.vars.palette["Red"],
          },
          "&.Mui-disabled": {
            opacity: "0.6",
          },
        },
        input: {
          paddingTop: "23px",
          paddingBottom: "12px",
          maxWidth: "100%",
        },

        notchedOutline: {
          display: "none",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: "8px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "8px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            ...baseTheme.typography["Reg_14"],
            color: baseTheme.vars.palette["Black"],
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "16.5px 14px",
            paddingTop: "23px",
            paddingBottom: "12px",

            "& .MuiAutocomplete-input": {
              padding: 0,
            },
          },
        },

        paper: {
          backgroundColor: baseTheme.vars.palette["Grey_5"],
          marginTop: "4px",
        },

        listbox: {
          display: "grid",
          rowGap: "12px",

          "& .MuiAutocomplete-option": {
            padding: 0,
            paddingRight: "16px",
            paddingLeft: "16px",
            minHeight: "unset",

            "&[aria-selected='true']": {
              backgroundColor: "rgba(199, 50, 155, 0.1)",

              "&.Mui-focused": {
                backgroundColor: "rgba(199, 50, 155, 0.1)",
              },
            },

            "&.Mui-focused": {
              backgroundColor: "rgba(199, 50, 155, 0.3)",
            },

            "&:hover": {
              backgroundColor: "rgba(199, 50, 155, 0.3)",
            },
            "&:focus": {
              backgroundColor: "rgba(199, 50, 155, 0.1)",
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "none",
          minWidth: "288px !important",
        },
        root: {
          "&.Calendar": {
            padding: "none",
            "& .MuiPaper-root": {
              width: "288px",
              padding: "none",
              maxHeight: "500px",
              "& .MuiDialogContent-root": {
                "& .MuiCalendarOrClockPicker-root": {
                  "& .MuiPickersToolbar-root": {
                    padding: "16px 8px 16px 8px",
                    "& h4": {
                      ...baseTheme.typography["Bold_28"],
                    },
                    "& span": {
                      display: "none",
                    },
                    "& .MuiGrid-root": {
                      "& button": {
                        display: "none",
                      },
                    },
                  },
                },
                "& div:last-child": {
                  maxWidth: "288px",
                  "& .MuiCalendarPicker-root": {
                    "& .MuiPickersCalendarHeader-root": {
                      margin: "0px 8px 16px",
                      height: "24px",
                      minHeight: "24px",
                      justifyContent: "space-between",
                      padding: "0px",
                      "& .MuiPickersArrowSwitcher-root": {
                        margin: "0px",
                        "& .MuiButtonBase-root": {
                          padding: "0px",
                        },
                        "& .MuiPickersArrowSwitcher-spacer": {
                          width: "22px",
                        },
                      },
                      "& .MuiPickersCalendarHeader-labelContainer": {
                        ...baseTheme.typography["Bold_16"],
                        overflow: "visible",
                        margin: "0px",
                        "& .MuiPickersCalendarHeader-label": {
                          margin: "0px",
                        },
                        "& .MuiButtonBase-root": {
                          padding: "0px",
                        },
                      },
                    },
                    "& div:last-child": {
                      "& .MuiYearPicker-root": {
                        // это поле с выбором ГОДА
                        maxHeight: "206px",
                        padding: "0px 8px",
                        "& .PrivatePickersYear-modeMobile": {
                          // год
                          "& .PrivatePickersYear-yearButton": {
                            // сама кнопка года
                            margin: "0px",
                            height: "38px",
                            width: "100%",
                            "&.Mui-selected": {
                              backgroundColor: baseTheme.vars.palette["Corp_1"],
                              color: baseTheme.vars.palette["White"],
                            },
                          },
                        },
                      },
                      "& .MuiDayPicker-header": {
                        // строка с днями недели
                        padding: "0px 8px",
                        justifyContent: "space-around",
                        "& .MuiTypography-root": {
                          ...baseTheme.typography["Reg_16"],
                          width: "38px",
                          height: "38px",
                          margin: "0px",
                          color: baseTheme.vars.palette["Grey_1"],
                        },
                      },
                      "& .PrivatePickersSlideTransition-root": {
                        // поле с месяцем
                        height: "228px",
                        minHeight: "200px",
                        "& .MuiDayPicker-monthContainer": {
                          // поле с месяцем
                          margin: "0px 0px",
                          "& .MuiDayPicker-weekContainer": {
                            // поле с 1 неделей
                            margin: "0px 8px",
                            justifyContent: "space-around",
                            "& .MuiButtonBase-root": {
                              // поле с одним днем
                              ...baseTheme.typography["Reg_16"],
                              width: "38px",
                              height: "38px",
                              margin: "0px",
                              backgroundColor: "none",
                              color: baseTheme.vars.palette["Black"],
                              "&.Mui-disabled": {
                                opacity: "0.35",
                              },
                              "&.MuiPickersDay-today": {
                                // поле с датой сегодня (кружочек)
                                color: baseTheme.vars.palette["Grey_1"],
                                borderColor: baseTheme.vars.palette["Grey_1"],
                                backgroundColor: "none",
                              },
                              "&.Mui-selected": {
                                // выбранная дата
                                backgroundColor:
                                  baseTheme.vars.palette["Corp_1"],
                                color: baseTheme.vars.palette["White"],
                              },
                              "&.Mui-selected:hover": {
                                // выбранная дата
                                backgroundColor:
                                  baseTheme.vars.palette["Corp_1"],
                                color: baseTheme.vars.palette["White"],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              "& .MuiDialogActions-root": {
                // поле с кнопками внизу
                padding: "0px 8px",
                height: "52px",

                "& button::first-of-type": {
                  // скрываем кнопку потому что там нужно менять внутренний контент
                  visibility: "hidden",
                  width: "0px",
                  height: "0px",
                },
                "& button:first-of-type:after": {
                  // перерисовываем как нам надо
                  visibility: "visible",
                  content: '"Закрыть"',
                  color: baseTheme.vars.palette["Grey_3"],
                  border: "none",
                  boxShadow: "none",
                  width: "136px",
                  height: "36px",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0px",
                  right: "62px",
                  bottom: "12px",
                },
                "& button:last-child": {
                  // вторая кнопка скрываем
                  visibility: "hidden",
                  width: "0px",
                  height: "0px",
                },
                "& button:last-child:after": {
                  // перерисовываем ее
                  visibility: "visible",
                  content: '"Применить"',
                  color: baseTheme.vars.palette["Corp_1"],
                  border: "none",
                  boxShadow: "none",
                  width: "136px",
                  height: "36px",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0px",
                  right: "0px",
                  bottom: "3px",
                },
              },
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.vars.palette["Grey_4"],
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.05)",
        },
        // цвет бордера выбранного таба
        indicator: {
          backgroundColor: baseTheme.vars.palette["Corp_1"],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          ...baseTheme.typography.Reg_14,
          flexGrow: 1,
          // цвет не выбранного таба
          textTransform: "none",
          color: baseTheme.vars.palette["Grey_1"],
          "&.Mui-selected": {
            // цвет выбранного таба
            color: baseTheme.vars.palette["Corp_1"],
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: baseTheme.vars.palette["Grey_5"],
          borderRadius: "16px",
          height: "32px",
          "& .MuiChip-label": {
            ...baseTheme.typography["Med_14"],
            color: baseTheme.vars.palette["Grey_1"],
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.vars.palette["Grey_4"],
          borderRadius: "4px",
        },
        bar1Determinate: {
          backgroundColor: baseTheme.vars.palette["Corp_1"],
          borderRadius: "4px",
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        severity: "info",
        iconMapping: {
          info: <AlertIcon />,
        },
      },
      variants: [
        {
          props: { variant: "small" },
          style: {
            padding: "8px",
            borderRadius: "4px",

            "& .MuiAlert-icon": {
              marginRight: "6px",
              alignItems: "center",
              "& svg": {
                width: "12px",
                height: "12px",
              },
            },
            "& .MuiAlert-message": {
              ...baseTheme.typography.Reg_12,
            },
          },
        },
        {
          props: { variant: "normal" },
          style: {
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingRight: "8px",
            paddingLeft: "8px",
            borderRadius: "6px",

            "& .MuiAlert-icon": {
              marginRight: "12px",
              alignItems: "flex-start",
              "& svg": {
                width: "16px",
                height: "16px",
              },
            },
            "& .MuiAlert-message": {
              ...baseTheme.typography.Reg_14,
            },
          },
        },
        {
          props: { color: "Banner_Error" },
          style: {
            backgroundColor: baseTheme.vars.palette["Banner_Error"],
            color: baseTheme.vars.palette["Banner_Text_Error"],
          },
        },
        {
          props: { color: "Corp_2" },
          style: {
            backgroundColor: baseTheme.vars.palette["Corp_2"],
            color: baseTheme.vars.palette["White"],
          },
        },
        {
          props: { color: "Yellow_Light" },
          style: {
            backgroundColor: baseTheme.vars.palette["Yellow_Light"],
            color: baseTheme.vars.palette["Yellow_Text"],
          },
        },
        {
          props: { color: "Red" },
          style: {
            backgroundColor: baseTheme.vars.palette["Red"],
            color: baseTheme.vars.palette["White"],
          },
        },
      ],
      styleOverrides: {
        icon: {
          padding: 0,
        },
        message: {
          padding: 0,
        },
      },
    },
  },
});
