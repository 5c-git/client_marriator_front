import { useEffect } from "react";
import { Outlet, useNavigate, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/rootErrorBoundry";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { postRefreshToken } from "~/requests/postRefreshToken/postRefreshToken";

import { useStore } from "~/store/store";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import logoTurnOff from "./logo-turnoff.svg";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";
import { postSendError } from "~/requests/postSendError/postSendError";

// 401 - WE THROW THIS STATUS CODE IF USER IS UNAUTHORIZED

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation("rootErrorBoundry");
  const navigate = useNavigate();
  const access_token = useStore.getState().accessToken;
  const refresh_token = useStore.getState().refreshToken;

  // const userPhone = useStore.getState().userPhone;

  // логика обновления accessToken с сервера через refreshToken, если обновление неуспешно - значит ссессия протухла совсем, удяляем токены из кранилища и переводим пользователя на авторизацию
  useEffect(() => {
    if (isRouteErrorResponse(error) && error.status === 401 && navigator.onLine) {
      (async () => {

        try {
          if(refresh_token) {
            const newTokens = await postRefreshToken(refresh_token);
  
            if ("token_type" in newTokens.result.token) {
              useStore
                .getState()
                .setAccessToken(newTokens.result.token.access_token);
              useStore
                .getState()
                .setRefreshToken(newTokens.result.token.refresh_token);
              navigate(withLocale("/signin/pin"), { viewTransition: true });
            } else {
              useStore.getState().clearStore();
              navigate(withLocale("/signin/phone"), { viewTransition: true });
            }
          } else {
            useStore.getState().clearStore();
            navigate(withLocale("/signin/phone"), { viewTransition: true });
          }
          
        } catch {
          useStore.getState().clearStore();
            navigate(withLocale("/signin/phone"), { viewTransition: true });
        }

        
        
      })();
    }
  }, [error, refresh_token, navigate]);
  //

  //logging unxpected errors to Sentry
  useEffect(() => {

    if((error instanceof Error || error instanceof UnxpectedError) && navigator.onLine) {
      (async () => {      
        if(access_token) {
          try {
            await postSendError(access_token, window.location.href, error.message);
          } catch {
            console.log("failed to send exeption to the server");
          }
      }})()
    }

    if ((isRouteErrorResponse(error) && error.status !== 401) && navigator.onLine) {
      (async () => {
        if(access_token) {
          try {
            await postSendError(access_token, window.location.href, error.data as string);
          } catch {
            console.log("failed to send exeption to the server");
          }
      }})()


    }
  }, [access_token, error]);

  console.log(error);

  return (
    <>
      {/* showing this screen only if user is offline */}
      {!navigator.onLine ? <Box
        sx={{
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "60px",
        }}
      >
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
          {t("offlineTitle")}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            if (navigator.onLine) {
              window.location.reload()
            }
          }}
        >
          {t("refreshButton")}
        </Button>
      </Box> : null}

      {/* showing this screen only if user is authorized and we are not offline */}
      {isRouteErrorResponse(error) &&
      error.status !== 401 &&
      navigator.onLine ? (
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
            sx={(theme) => ({
              color: theme.vars.palette["Red"],
              textAlign: "center",
              paddingTop: "40px",
            })}
          >
            {t("error")}
          </Typography>
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

      {/* showing this screen only if there is unxpected error, meaning that we DO NOT expect such behaviour */}
      {(error instanceof Error || error instanceof UnxpectedError) && navigator.onLine ? (
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
            sx={(theme) => ({
              color: theme.vars.palette["Red"],
              textAlign: "center",
              paddingTop: "40px",
            })}
          >
            {t("error")}
          </Typography>
          {/* <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
              paddingTop: "40px",
              paddingBottom: "10px",
          })}
          >
            {error.name}
          </Typography> */}
          {/* <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
              paddingBottom: "40px",
          })}
          >
            {error.message}
          </Typography> */}
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
