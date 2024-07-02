import { useEffect } from "react";
import { Outlet, useRouteError, useNavigate } from "@remix-run/react";
import { t } from "i18next";

import { postRefreshToken } from "~/requests/postRefreshToken/postRefreshToken";

import { setAccessToken, setRefreshToken } from "~/preferences/token/token";
import { clearPreferences } from "~/preferences/preferences";

import { useTheme, Box, Button, Typography } from "@mui/material";
import logoTurnOff from "./logo-turnoff.svg";

export const ErrorBoundary = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const error = useRouteError() as { status: number; data: string };

  ///// логика обновления accessToken с сервера через refreshToken, если обновление неуспешно - значит ссессия протухла совсем, удяляем токены из кранилища и переводим пользователя на авторизацию
  useEffect(() => {
    if (error.status === 401) {
      (async () => {
        const newTokens = await postRefreshToken("old_token");

        if ("token_type" in newTokens.result.token) {
          await setAccessToken(newTokens.result.token.access_token);
          await setRefreshToken(newTokens.result.token.refresh_token);
          navigate(0);
        } else {
          await clearPreferences();
          navigate("/signin/phone");
        }
      })();
    }
  }, [error.status, navigate]);
  ////

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
              navigate(0);
            }}
          >
            {t("RootErrorBoundry.refresh")}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default function RootErrorBoundry() {
  return <Outlet />;
}
