import { useEffect } from "react";
import { Outlet, useRouteError, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { postRefreshToken } from "~/requests/postRefreshToken/postRefreshToken";

import { useStore } from "~/store/store";

import { useTheme, Box, Button, Typography } from "@mui/material";
import logoTurnOff from "./logo-turnoff.svg";

export const ErrorBoundary = () => {
  const { t } = useTranslation("rootErrorBoundry");
  const theme = useTheme();
  const navigate = useNavigate();

  const error = useRouteError() as { status: number; data: string };

  ///// логика обновления accessToken с сервера через refreshToken, если обновление неуспешно - значит ссессия протухла совсем, удяляем токены из кранилища и переводим пользователя на авторизацию
  useEffect(() => {
    if (error.status === 401) {
      (async () => {
        const newTokens = await postRefreshToken("old_token");

        if ("token_type" in newTokens.result.token) {
          useStore
            .getState()
            .setAccessToken(newTokens.result.token.access_token);
          useStore
            .getState()
            .setRefreshToken(newTokens.result.token.refresh_token);
          navigate(withLocale("/signin/pin"));
        } else {
          useStore.getState().clearStore();
          navigate(withLocale("/signin/phone"));
        }
      })();
    }
  }, [error.status, navigate]);
  ////

  console.log(JSON.stringify(error, null, 2));

  return (
    <>
      {error.status !== 401 ? (
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
              src={logoTurnOff}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="marriator"
            />
          </Box>
          <Typography
            component="h1"
            variant="Bold_28"
            sx={{
              color: theme.palette["Red"],
              textAlign: "center",
              paddingTop: "40px",
            }}
          >
            {t("error")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={{
              color: theme.palette["Black"],
              textAlign: "center",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
            {error.data}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("refresh")}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default function RootErrorBoundry() {
  return <Outlet />;
}
