import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    Reg_8_Uppercase: React.CSSProperties;
    Bold_8_Uppercase: React.CSSProperties;
    Reg_10_Uppercase: React.CSSProperties;
    Bold_10_Uppercase: React.CSSProperties;
    Reg_10: React.CSSProperties;
    Bold_10: React.CSSProperties;
    Reg_12: React.CSSProperties;
    Bold_12: React.CSSProperties;
    Reg_14: React.CSSProperties;
    Bold_14: React.CSSProperties;
    Reg_16: React.CSSProperties;
    Bold_16: React.CSSProperties;
    Reg_18: React.CSSProperties;
    Bold_18: React.CSSProperties;
    Reg_20: React.CSSProperties;
    Bold_20: React.CSSProperties;
    Reg_28: React.CSSProperties;
    Bold_28: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    Reg_8_Uppercase?: React.CSSProperties;
    Bold_8_Uppercase?: React.CSSProperties;
    Reg_10_Uppercase?: React.CSSProperties;
    Bold_10_Uppercase?: React.CSSProperties;
    Reg_10?: React.CSSProperties;
    Bold_10?: React.CSSProperties;
    Reg_12?: React.CSSProperties;
    Bold_12?: React.CSSProperties;
    Reg_14?: React.CSSProperties;
    Bold_14?: React.CSSProperties;
    Reg_16?: React.CSSProperties;
    Bold_16?: React.CSSProperties;
    Reg_18?: React.CSSProperties;
    Bold_18?: React.CSSProperties;
    Reg_20?: React.CSSProperties;
    Bold_20?: React.CSSProperties;
    Reg_28?: React.CSSProperties;
    Bold_28?: React.CSSProperties;
  }

  interface Palette {
    corp: Palette["corp"];
    warning: Palette["warning"];
    Black: "#212121";
    White: "#FFFFFF";
    Corp_1: "#C7329B";
    Corp_2: "#8A2DB5";
    Copr_3: "#F19D7F";
    Grey_1: "#5B5768";
    Grey_2: "#8D9197";
    Grey_3: "#C5C5CD";
    Grey_4: "#E7E8ED";
    Grey_5: "#F4F5F9"; //не был назван в макете
    Red: "#D92C2C";
    Banner_Text_Error: "#572522";
    Banner_Error: "#FAEDED";
    Orange: "#FA9B72";
    Orange_Text: "#281600";
    Yellow: "#F3EA00";
    Yellow_Light: "#FFFA7A";
    Yellow_Text: "#4F4A02";
    Violet: "#7F34AF";
    Dark_blue: "#1E00D6";
    Blue: "#7DC6FF";
    Blue_Text: "#043860";
    Green: "#86DC7F";
    Green_Text: "#00260E";
    Light_green: "#D3FF8C";
    Light_Green_Text: "#404A02";
    WhatsApp: "#1AB654";
    Telegram: "#2AABEE";
    Light_Violet: "#C596DA";
  }
  interface PaletteOptions {
    corp: PaletteOptions["corp"];
    warning: PaletteOptions["warning"];
    Black: "#212121";
    White: "#FFFFFF";
    Corp_1: "#C7329B";
    Corp_2: "#8A2DB5";
    Copr_3: "#F19D7F";
    Grey_1: "#5B5768";
    Grey_2: "#8D9197";
    Grey_3: "#C5C5CD";
    Grey_4: "#E7E8ED";
    Grey_5: "#F4F5F9"; //не был назван в макете
    Red: "#D92C2C";
    Banner_Text_Error: "#572522";
    Banner_Error: "#FAEDED";
    Orange: "#FA9B72";
    Orange_Text: "#281600";
    Yellow: "#F3EA00";
    Yellow_Light: "#FFFA7A";
    Yellow_Text: "#4F4A02";
    Violet: "#7F34AF";
    Dark_blue: "#1E00D6";
    Blue: "#7DC6FF";
    Blue_Text: "#043860";
    Green: "#86DC7F";
    Green_Text: "#00260E";
    Light_green: "#D3FF8C";
    Light_Green_Text: "#404A02";
    WhatsApp: "#1AB654";
    Telegram: "#2AABEE";
    Light_Violet: "#C596DA";
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    Reg_8_Uppercase: true;
    Bold_8_Uppercase: true;
    Reg_10_Uppercase: true;
    Bold_10_Uppercase: true;
    Reg_10: true;
    Bold_10: true;
    Reg_12: true;
    Bold_12: true;
    Reg_14: true;
    Bold_14: true;
    Reg_16: true;
    Bold_16: true;
    Reg_18: true;
    Bold_18: true;
    Reg_20: true;
    Bold_20: true;
    Reg_28: true;
    Bold_28: true;
  }
}

declare module "@mui/material/Alert" {
  interface AlertPropsVariantOverrides {
    small: true;
    normal: true;
  }

  interface AlertPropsColorOverrides {
    Banner_Error: true;
    Corp_2: true;
    Yellow_Light: true;
    Red: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    corp: true;
    warning: true;
  }
}

declare module "@mui/material/Radio" {
  interface RadioPropsColorOverrides {
    corp: true;
    warning: true;
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    corp: true;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    corp: true;
  }
}
