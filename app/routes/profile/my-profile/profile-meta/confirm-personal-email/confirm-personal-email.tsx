import { useState, useEffect } from "react";
import {
  useSubmit,
  useNavigation,
  useNavigate,
  redirect,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/confirm-personal-email";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import { Button, Typography, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";

import { postPersonalSetUserEmail } from "~/requests/postPersonalSetUserEmail/postPersonalSetUserEmail";
import { postPersonalCheckEmailCode } from "~/requests/_personal/postPersonalCheckEmailCode/postPersonalCheckEmailCode";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await loadNamespaces("confirmPersonalEmail");

  const currentURL = new URL(request.url);

  const email = useStore.getState().userEmail;
  const ttl = currentURL.searchParams.get("ttl");

  if (!email || !ttl) {
    throw new Response(t("wrongData", { ns: "confirmPersonalEmail" }));
  }

  return { email, ttl };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const accessToken = useStore.getState().accessToken;

  const { _action, currentTTL, ...fields } = await request.json();

  if (accessToken) {
    if (_action === "sendAgain") {
      const data = await postPersonalSetUserEmail(accessToken, fields.email);

      if ("result" in data) {
        currentURL.searchParams.set("ttl", data.result.code.ttl.toString());

        throw redirect(currentURL.toString());
      }
    } else if (_action === "sendCode") {
      const data = await postPersonalCheckEmailCode(accessToken, fields.code);

      if (data.status === "error") {
        currentURL.searchParams.set("error", "error");

        currentURL.searchParams.set("ttl", currentTTL.toString());

        throw redirect(currentURL.toString());
      } else {
        throw redirect(withLocale("/profile/my-profile/profile-meta"));
      }
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function СonfirmPersonalEmail({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation("confirmPersonalEmail");
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
      code: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        code: Yup.string()
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
  }, [seconds, navigation.state]);

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
            navigate(withLocale("/profile/my-profile/profile-meta"), {
              viewTransition: true,
            });
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
                  _action: "sendCode",
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
              name="code"
              control={control}
              render={({ field }) => (
                <StyledSmsField
                  inputType="sms"
                  error={errors.code?.message}
                  placeholder={t("inputPlaceholder")}
                  onImmediateChange={handleSubmit((values) => {
                    submit(
                      JSON.stringify({
                        _action: "sendCode",
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
                  email: loaderData.email,
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
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
                textAlign: "center",
              })}
            >
              {t("timer")}{" "}
              <Typography
                component="span"
                variant="Bold_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {Math.floor(seconds / 60) < 10
                  ? `0${Math.floor(seconds / 60)}`
                  : Math.floor(seconds / 60)}
                :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
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
