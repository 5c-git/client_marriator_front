import { useNavigate } from "react-router";
import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

import logoOffline from "./offlineLogo.svg";

export default function Offline() {
  const navigate = useNavigate();
  const { t } = useTranslation("offline");

  return (
    <>
      <Box
        sx={{
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "60px",
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
            src={logoOffline}
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
            color: theme.vars.palette["Black"],
            textAlign: "center",
            paddingTop: "40px",
            paddingBottom: "40px",
          })}
        >
          {t("title")}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            if (navigator.onLine) {
              navigate(-1);
            }
          }}
        >
          {t("refreshButton")}
        </Button>
      </Box>
    </>
  );
}
