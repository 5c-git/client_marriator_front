import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  LoaderFunctionArgs,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/root";
import { useEffect, useState } from "react";

import { UnxpectedError } from "./shared/unexpectedError/unexpectedError";
import { withLocale } from "./shared/withLocale";

import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "./entry.client";

import { useStore } from "~/store/store";

import { theme } from "./theme/theme";
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from "@mui/material";

import { Welcome } from "./shared/ui/Welcome/Welcome";
import { Loader } from "./shared/ui/Loader/Loader";

import logoTurnOff from "./logo-turnoff.svg";

import { postRefreshToken } from "./api/postRefreshToken/postRefreshToken";
import { postSendError } from "./api/postSendError/postSendError";

async function sizeMiddleware() {
  const location = window.location.pathname;

  const isDesktop = window.innerWidth > 786 ? true : false;

  if (location.includes("dashboard") && isDesktop) {
  } else if (location.includes("dashboard") && !isDesktop) {
  }

  console.log(isDesktop);
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  sizeMiddleware,
];

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const locale = params.lang ?? "ru";

  if (!supportedLngs.includes(locale)) {
    throw new Response(null, {
      status: 404,
      statusText: `Not Found: Invalid language ${locale}`,
    });
  }

  changeLanguage(locale);

  return locale;
}

export function HydrateFallback() {
  return <Welcome />;
}

export function ErrorBoundary() {
  const { t } = useTranslation("rootErrorBoundry");
  const error = useRouteError();
  const navigate = useNavigate();
  const access_token = useStore.getState().accessToken;
  const refresh_token = useStore.getState().refreshToken;

  console.log(error);

  // 401 - WE THROW THIS STATUS CODE IF USER IS UNAUTHORIZED

  // логика обновления accessToken с сервера через refreshToken, если обновление неуспешно - значит ссессия протухла совсем, удяляем токены из хранилища и переводим пользователя на авторизацию
  useEffect(() => {
    if (isRouteErrorResponse(error) && error.status === 401) {
      (async () => {
        try {
          if (refresh_token) {
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
  }, [error, refresh_token]);
  //

  //logging unxpected errors to Sentry
  useEffect(() => {
    if (error instanceof Error || error instanceof UnxpectedError) {
      (async () => {
        if (access_token) {
          try {
            await postSendError(
              access_token,
              window.location.href,
              error.message,
            );
          } catch {
            console.log("failed to send exeption to the server");
          }
        }
      })();
    }

    if (isRouteErrorResponse(error) && error.status !== 401) {
      (async () => {
        if (access_token) {
          try {
            await postSendError(
              access_token,
              window.location.href,
              error.data as string,
            );
          } catch {
            console.log("failed to send exeption to the server");
          }
        }
      })();
    }
  }, [access_token, error]);

  return (
    <>
      {/* showing this screen only if user is authorized */}
      {isRouteErrorResponse(error) && error.status !== 401 ? (
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
      {error instanceof Error || error instanceof UnxpectedError ? (
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
}

export function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLoaderData<typeof clientLoader>();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <script
          src={`https://api-maps.yandex.ru/v3/?apikey=${
            import.meta.env.VITE_YANDEX_GEO_KEY
          }&lang=ru_RU`}
        ></script>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { t } = useTranslation("rootErrorBoundry");
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const manager = useStore((state) => state.userManager);
  const supervisor = useStore((state) => state.userSupervisor);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}
      <Dialog open={!isOnline} onClose={() => {}}>
        <DialogTitle sx={{ textAlign: "center" }}>
          {t("offlineTitle")}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", padding: 0 }}>
          {t("offlineText")}
        </DialogContent>
        <Box
          sx={{
            padding: "16px",
          }}
        >
          <LinearProgress color="corp" />
        </Box>

        {manager ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
              padding: "0 24px 24px 24px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {t("offlineSuperior.manager")}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {t("offlineSuperior.name")}
              </Typography>{" "}
              {manager.name}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {t("offlineSuperior.id")}
              </Typography>
              {manager.id}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
              }}
            >
              {t("offlineSuperior.phone")}
              <Typography
                component={"a"}
                href={`tel:+${manager.phone}`}
                sx={(theme) => ({
                  color: theme.vars.palette["Corp_1"],
                })}
              >
                {manager.phone}
              </Typography>
            </Typography>
          </Box>
        ) : null}

        {!manager && supervisor ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
              padding: "0 24px 24px 24px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {t("offlineSuperior.supervisor")}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {t("offlineSuperior.name")}
              </Typography>{" "}
              {supervisor.name}
            </Typography>
            <Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {t("offlineSuperior.id")}
              </Typography>
              {supervisor.id}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
              }}
            >
              {t("offlineSuperior.phone")}
              <Typography
                component={"a"}
                href={`tel:+${supervisor.phone}`}
                sx={(theme) => ({
                  color: theme.vars.palette["Corp_1"],
                })}
              >
                {supervisor.phone}
              </Typography>
            </Typography>
          </Box>
        ) : null}
      </Dialog>
      <Outlet />
    </>
  );
}
