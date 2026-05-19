import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import marriator from "../marriator.svg";

type RegistrationCompleteViewProps = {
  translation: "registrationComplete";
};

export function RegistrationCompleteView(props: RegistrationCompleteViewProps) {
  const { t } = useTranslation("RegistrationCompleteView");

  return (
    <>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
      />

      <Box
        sx={{
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "20px",
        }}
      >
        <Box
          sx={{
            width: "164px",
            height: "78px",
            margin: "0 auto",
          }}
        >
          <img
            src={marriator}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            alt="marriator"
          />
        </Box>

        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            paddingTop: "14px",
            textAlign: "center",
            color: theme.vars.palette["Black"],
          })}
        >
          {t(`${props.translation}.message`)}
        </Typography>
      </Box>
    </>
  );
}
