import { useState, useEffect } from "react";
import {
  useSubmit,
  useNavigation,
  useNavigate,
  redirect,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/sms";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";

import { postSendPhone } from "~/requests/postSendPhone/postSendPhone";
import { postCheckCode } from "~/requests/postCheckCode/postCheckCode";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await loadNamespaces("sms");

  const currentURL = new URL(request.url);

  const phone = useStore.getState().userPhone;
  const ttl = currentURL.searchParams.get("ttl");

  if (!phone || !ttl) {
    throw new Response(t("wrongData", { ns: "sms" }));
  }

  return { phone, ttl };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const { _action, currentTTL, ...fields } = await request.json();

  if (_action === "sendAgain") {
    const data = await postSendPhone(fields.phone);

    if (data.result.code.status !== "errorSend") {
      currentURL.searchParams.set("ttl", data.result.code.ttl.toString());
      currentURL.searchParams.set("type", data.result.type);

      throw redirect(currentURL.toString());
    } else {
      currentURL.searchParams.set("error", "error");

      throw redirect(currentURL.toString());
    }
  } else if (_action === "sendSms") {
    const data = await postCheckCode(fields.phone, fields.sms);

    if (data.status === "error") {
      currentURL.searchParams.set("error", "error");

      currentURL.searchParams.set("ttl", currentTTL.toString());

      throw redirect(currentURL.toString());
    } else {
      useStore.getState().setAccessToken(data.result.token.access_token);
      useStore.getState().setRefreshToken(data.result.token.refresh_token);

      if (currentURL.searchParams.has("type", "register")) {
        throw redirect(withLocale("/signin/createPin"));
      } else if (currentURL.searchParams.has("type", "auth")) {
        throw redirect(withLocale("/signin/pin"));
      }
    }
  }
}

export default function Sms({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("sms");
  const theme = useTheme();
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState<number>(Number(loaderData.ttl));
  const [open, setOpen] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: loaderData.phone,
      sms: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        phone: Yup.string().notRequired(),
        sms: Yup.string()
          .default("")
          .length(4, t("inputValidation_lenght"))
          .required(t("inputValidation")),
      })
    ),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    setSeconds(Number(loaderData.ttl));
  }, [loaderData.ttl, navigation.state]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(-1);
          }}
        />

        <Box
          sx={{
            padding: "20px 16px",
          }}
        >
          <form
            style={{
              display: "grid",
              rowGap: "4px",
            }}
            onSubmit={handleSubmit((values) => {
              submit(
                JSON.stringify({
                  _action: "sendSms",
                  currentTTL: seconds,
                  ...values,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            })}
          >
            <Controller
              name="sms"
              control={control}
              render={({ field }) => (
                <StyledSmsField
                  inputType="sms"
                  error={errors.sms?.message}
                  placeholder={t("inputPlaceholder")}
                  onImmediateChange={handleSubmit((values) => {
                    submit(
                      JSON.stringify({
                        _action: "sendSms",
                        currentTTL: seconds,
                        ...values,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      }
                    );
                  })}
                  {...field}
                />
              )}
            />
          </form>

          <Button
            type="button"
            variant="text"
            disabled={seconds > 0 ? true : false}
            sx={{
              fontSize: "1rem",
              lineHeight: "1.25rem",
            }}
            onClick={() => {
              submit(
                JSON.stringify({
                  _action: "sendAgain",
                  phone: loaderData.phone,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            {t("sendAgain")}
          </Button>

          {seconds !== 0 ? (
            <Typography
              component="p"
              variant="Reg_12"
              sx={{
                color: theme.palette["Black"],
                textAlign: "center",
              }}
            >
              {t("timer")}{" "}
              <Typography
                component="span"
                variant="Bold_12"
                sx={{
                  color: theme.palette["Black"],
                }}
              >
                {Math.floor(seconds / 60) < 10
                  ? `0${Math.floor(seconds / 60)}`
                  : Math.floor(seconds / 60)}
                {""}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
              </Typography>
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          severity="info"
          variant="normal"
          color="Corp_2"
          sx={{
            width: "100%",
          }}
        >
          {t("notification")}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          setSearchParams((prev) => {
            prev.delete("error");
            return prev;
          });
        }}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("errorNotifivation")}
        </Alert>
      </Snackbar>
    </>
  );
}
