import { createTheme, alpha } from "@mui/material";
import GolosRegular from "../static/fonts/Golos-UI_Regular.woff2";
import GolosMedium from "../static/fonts/Golos-UI_Medium.woff2";
import GolosBold from "../static/fonts/Golos-UI_Bold.woff2";

import { AlertIcon } from "./icons/AlertIcon";

const baseTheme = createTheme({
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
          color: baseTheme.palette["White"],
          "&:active": {
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: baseTheme.palette["Grey_4"],
            borderColor: baseTheme.palette["Grey_4"],
            color: baseTheme.palette["Grey_3"],
          },
          "&.Mui-focusVisible": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: baseTheme.palette["Corp_1"],

          "&:hover": {
            boxShadow: "none",
            backgroundColor: baseTheme.palette["Corp_1"],
          },
        },
        outlined: {
          backgroundColor: "transparent",
          color: baseTheme.palette["Corp_1"],
          borderColor: baseTheme.palette["Corp_1"],

          "&:hover": {
            boxShadow: "none",
            backgroundColor: "transparent",
            borderColor: baseTheme.palette["Corp_1"],
          },
        },
        text: {
          backgroundColor: "transparent",
          color: baseTheme.palette["Corp_1"],
          borderColor: "transparent",

          "&:hover": {
            boxShadow: "none",
            // backgroundColor: baseTheme.palette['Corp_1']
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: baseTheme.palette["Grey_3"],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: baseTheme.palette["Grey_2"],
          ...baseTheme.typography["Reg_14"],
          transform: "translate(14px, 20px) scale(1)",

          "&.Mui-focused": {
            color: baseTheme.palette["Grey_2"],
          },
          "&.Mui-disabled": {
            color: baseTheme.palette["Grey_4"],
          },
        },
        shrink: {
          transform: "translate(14px, 8px) scale(1)",

          "&.Mui-error": {
            color: baseTheme.palette["Grey_2"],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: baseTheme.palette["Grey_2"],
          "&.Mui-disabled": {
            color: baseTheme.palette["Grey_4"],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.palette["Grey_5"],
          borderRadius: "6px",
          border: "1px solid transparent",

          "&.Mui-error": {
            borderColor: baseTheme.palette["Red"],
            color: baseTheme.palette["Red"],
          },
          "&.Mui-disabled": {
            opacity: "0.6",
          },
        },
        input: {
          paddingTop: "23px",
          paddingBottom: "12px",
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
            color: baseTheme.palette["Black"],
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
                              backgroundColor: baseTheme.palette["Corp_1"],
                              color: baseTheme.palette["White"],
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
                          color: baseTheme.palette["Grey_1"],
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
                              color: baseTheme.palette["Black"],
                              "&.Mui-disabled": {
                                opacity: "0.35",
                              },
                              "&.MuiPickersDay-today": {
                                // поле с датой сегодня (кружочек)
                                color: baseTheme.palette["Grey_1"],
                                borderColor: baseTheme.palette["Grey_1"],
                                backgroundColor: "none",
                              },
                              "&.Mui-selected": {
                                // выбранная дата
                                backgroundColor: baseTheme.palette["Corp_1"],
                                color: baseTheme.palette["White"],
                              },
                              "&.Mui-selected:hover": {
                                // выбранная дата
                                backgroundColor: baseTheme.palette["Corp_1"],
                                color: baseTheme.palette["White"],
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
                  color: baseTheme.palette["Grey_3"],
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
                  color: baseTheme.palette["Corp_1"],
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
          backgroundColor: baseTheme.palette["Grey_4"],
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          display: "none",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: baseTheme.palette["Black"],
          borderRadius: "50%",
          backgroundColor: baseTheme.palette["White"],

          "&:focus": {
            backgroundColor: baseTheme.palette["White"],
            "&.Mui-selected": {
              backgroundColor: baseTheme.palette["Corp_1"],
            },
          },

          "&.Mui-selected": {
            backgroundColor: baseTheme.palette["Corp_1"],

            "&:hover": {
              backgroundColor: baseTheme.palette["Corp_1"],
            },
          },

          "&:hover": {
            backgroundColor: baseTheme.palette["White"],
          },
        },
        today: {
          color: baseTheme.palette["Black"],
          borderRadius: "50%",
          border: "1px solid",
          borderColor: baseTheme.palette["Corp_1"],
          backgroundColor: baseTheme.palette["White"],

          "&:not(.Mui-selected)": {
            borderColor: baseTheme.palette["Corp_1"],
          },

          "&.Mui-selected": {
            backgroundColor: baseTheme.palette["Corp_1"],
            "&:hover": {
              backgroundColor: baseTheme.palette["Corp_1"],
            },
          },

          "&:hover": {
            backgroundColor: baseTheme.palette["White"],
          },
        },
      },
    },
    // MuiTabs: {
    //   styleOverrides: {
    //     // цвет бордера выбранного таба
    //     indicator: {
    //       backgroundColor: baseTheme.palette["Corp_1"],
    //     },
    //   },
    // },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       // цвет не выбранного таба
    //       textTransform: "none",
    //       color: baseTheme.palette["Grey_1"],
    //       "&.Mui-selected": {
    //         // цвет выбранного таба
    //         color: baseTheme.palette["Corp_1"],
    //       },
    //     },
    //   },
    // },
    // MuiAutocomplete: {
    //   styleOverrides: {
    //     root: {
    //       // width: '100%',
    //       backgroundColor: baseTheme.palette["Grey_5"],
    //       borderRadius: "6px",
    //       "& .MuiFormLabel-root": {
    //         ...baseTheme.typography["Reg_14"],
    //       },
    //       "& .MuiInputBase-root": {
    //         width: "100%",
    //         ...baseTheme.typography["Reg_14"],
    //         paddingTop: "16px",
    //         border: "none",
    //         color: baseTheme.palette["Black"],
    //         // '&.Mui-focused':{
    //         // '& .MuiAutocomplete-endAdornment':{
    //         //     position: 'relative', // ОТВЕЧАЕТ ЗА КНОПКИ - СТРЕЛОЧКА(СПИСОК),УДАЛИТЬ
    //         //   }
    //         // },
    //         "&.MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before":
    //           {
    //             border: "none",
    //           },
    //         "&.MuiFilledInput-root:after": {
    //           border: "none",
    //         },
    //         "&.MuiFilledInput-root:before": {
    //           border: "none",
    //         },
    //         "&.MuiFilledInput-root": {
    //           backgroundColor: baseTheme.palette["Grey_5"],
    //         },
    //         "& .MuiChip-root": {
    //           margin: "3px 1px",
    //           border: `1px solid ${baseTheme.palette["Grey_3"]}`,
    //           "& .MuiChip-deleteIcon": {
    //             color: baseTheme.palette["Grey_3"],
    //           },
    //           "& .MuiChip-label": {
    //             ...baseTheme.typography["Reg_12"],
    //           },
    //         },
    //       },
    //     },
    //     popper: {
    //       "& .MuiPaper-root": {
    //         marginTop: "4px",
    //         marginBottom: "4px",
    //         boxShadow: "none !important",
    //         border: "none",
    //       },
    //       "& .MuiAutocomplete-listbox": {
    //         ...baseTheme.typography["Reg_14"],
    //         color: baseTheme.palette["Black"],
    //         backgroundColor: baseTheme.palette["Grey_5"],
    //         borderRadius: "6px",
    //       },
    //     },
    //   },
    // },
    // MuiChip: {
    //   styleOverrides: {
    //     root: {
    //       display: "flex",
    //       flexDirection: "row",
    //       alignItems: "center",
    //       backgroundColor: baseTheme.palette["Grey_5"],
    //       borderRadius: "16px",
    //       height: "32px",
    //       "& .MuiChip-label": {
    //         ...baseTheme.typography["Bold_12"],
    //         color: baseTheme.palette["Grey_1"],
    //       },
    //     },
    //   },
    // },
    // MuiFormControlLabel: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiButtonBase-root": {
    //         color: "#DADADA", // НЕ УКАЗАН В МАКЕТЕ
    //         "&.MuiCheckbox-root.MuiCheckbox-indeterminate": {
    //           color: baseTheme.palette["Corp_1"],
    //         },
    //         "&.MuiCheckbox-root.Mui-checked": {
    //           color: baseTheme.palette["Corp_1"],
    //         },
    //       },
    //       "& .MuiTypography-root": {
    //         ...baseTheme.typography["Reg_14"],
    //         color: baseTheme.palette["Black"],
    //       },
    //     },
    //   },
    // },
    // MuiSlider: {
    //   styleOverrides: {
    //     root: {
    //       color: baseTheme.palette["Corp_1"],
    //     },
    //   },
    // },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: baseTheme.palette["Grey_5"],
    //       "& .MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before":
    //         {
    //           border: "none",
    //         },
    //       "& .MuiFilledInput-root:after": {
    //         border: "none",
    //       },
    //       "& .MuiFilledInput-root:before": {
    //         border: "none",
    //       },
    //       // '&'
    //       "&.MuiTextField-root": {
    //         borderRadius: "6px",
    //         backgroundColor: baseTheme.palette["Grey_5"],
    //       },
    //       "& .MuiInputBase-root-MuiFilledInput-root.Mui-focused": {
    //         backgroundColor: baseTheme.palette["Grey_5"],
    //       },
    //       "& .MuiInputBase-root-MuiFilledInput-root:hover": {
    //         backgroundColor: baseTheme.palette["Grey_5"],
    //       },
    //     },
    //   },
    // },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.palette["Grey_4"],
          borderRadius: "4px",
        },
        bar1Determinate: {
          backgroundColor: baseTheme.palette["Corp_1"],
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
            backgroundColor: baseTheme.palette["Banner_Error"],
            color: baseTheme.palette["Banner_Text_Error"],
          },
        },
        {
          props: { color: "Corp_2" },
          style: {
            backgroundColor: baseTheme.palette["Corp_2"],
            color: baseTheme.palette["White"],
          },
        },
        {
          props: { color: "Yellow_Light" },
          style: {
            backgroundColor: baseTheme.palette["Yellow_Light"],
            color: baseTheme.palette["Yellow_Text"],
          },
        },
        {
          props: { color: "Red" },
          style: {
            backgroundColor: baseTheme.palette["Red"],
            color: baseTheme.palette["White"],
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
