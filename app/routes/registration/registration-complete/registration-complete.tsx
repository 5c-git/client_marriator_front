import {
  useNavigation,
  // Link
} from "@remix-run/react";

import { useTranslation } from "react-i18next";

// import { withLocale } from "~/shared/withLocale";

import { useTheme, Typography, Stack } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { SuccessIcon } from "./icons/SuccessIcon";

export default function RegistrationComplete() {
  const { t } = useTranslation("registrationComplete");
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
      />

      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "16px",
          paddingLeft: "16px",
          height: "100%",
        }}
      >
        <SuccessIcon
          sx={{
            width: "58px",
            height: "58px",
            marginBottom: "18px",
          }}
        />

        <Typography
          component="h1"
          variant="Reg_18"
          sx={{ color: theme.palette["Black"], marginBottom: "8px" }}
        >
          {t("title")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_16"
          sx={{ color: theme.palette["Grey_2"], textAlign: "center" }}
        >
          {t("text_start")}

          {/* <Typography
            component={Link}
            to={withLocale("/")}
            variant="Reg_16"
            sx={{ color: theme.palette["Corp_1"], textDecoration: "underline" }}
          >
            {t("text_link")}
          </Typography> */}

          <Typography
            component="span"
            variant="Reg_16"
            sx={{ color: theme.palette["Grey_2"] }}
          >
            {t("text_link")}
          </Typography>

          <Typography
            component="span"
            variant="Reg_16"
            sx={{ color: theme.palette["Grey_2"] }}
          >
            {t("text_end")}
          </Typography>
        </Typography>
      </Stack>
    </>
  );
}
