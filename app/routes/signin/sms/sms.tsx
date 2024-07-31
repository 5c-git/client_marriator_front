import { useState, useEffect } from "react";
import {
  useSubmit,
  useNavigation,
  useNavigate,
  useLoaderData,
  json,
  ClientActionFunctionArgs,
  redirect,
  useSearchParams,
} from "@remix-run/react";

import { t } from "i18next";
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

import { getUserPhone } from "~/preferences/userPhone/userPhone";
import { setAccessToken, setRefreshToken } from "~/preferences/token/token";

import { postSendPhone } from "~/requests/postSendPhone/postSendPhone";
import { postCheckCode } from "~/requests/postCheckCode/postCheckCode";

const validationSchema = Yup.object().shape({
  phone: Yup.string().notRequired(),
  sms: Yup.string()
    .default("")
    .length(4, t("Sms.inputValidation", { context: "lenght" }))
    .required(t("Sms.inputValidation")),
});

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);

  const phone = await getUserPhone();
  const ttl = currentURL.searchParams.get("ttl");

  if (!phone || !ttl) {
    throw new Response(t("Sms.wrongData"));
  }

  return json({ phone, ttl });
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);
  const params = new URLSearchParams();

  const { _action, ...fields } = await request.json();

  if (_action === "sendAgain") {
    const data = await postSendPhone(fields.phone);

    if (data.result.code.status !== "errorSend") {
      params.set("ttl", data.result.code.ttl.toString());
      params.set("type", data.result.type);

      throw redirect(currentURL.toString());
    } else {
      currentURL.searchParams.set("error", "error");

      throw redirect(currentURL.toString());
    }
  } else if (_action === "sendSms") {
    const data = await postCheckCode(fields.phone, fields.sms);

    if (data.status === "error") {
      currentURL.searchParams.set("error", "error");

      throw redirect(currentURL.toString());
    } else {
      await setAccessToken(data.result.token.access_token);
      await setRefreshToken(data.result.token.refresh_token);

      if (currentURL.searchParams.has("type", "register")) {
        throw redirect(withLocale("/signin/createPin"));
      } else if (currentURL.searchParams.has("type", "auth")) {
        throw redirect(withLocale("/signin/pin"));
      }
    }
  }
}

export default function Sms() {
  const theme = useTheme();
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const { phone, ttl } = useLoaderData<typeof clientLoader>();

  const [seconds, setSeconds] = useState<number>(Number(ttl));
  const [open, setOpen] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: phone,
      sms: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("Sms.header"),
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
          >
            <Controller
              name="sms"
              control={control}
              render={({ field }) => (
                <StyledSmsField
                  inputType="sms"
                  error={errors.sms?.message}
                  placeholder={t("Sms.inputPlaceholder")}
                  onImmediateChange={handleSubmit((values) => {
                    submit(JSON.stringify({ _action: "sendSms", ...values }), {
                      method: "POST",
                      encType: "application/json",
                    });
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
              setSeconds(10);
              submit(
                JSON.stringify({
                  _action: "sendAgain",
                  phone: phone,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            {t("Sms.sendAgain")}
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
              {t("Sms.timer")}{" "}
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
          {t("Sms.notification")}
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
          {t("Sms.errorNotifivation")}
        </Alert>
      </Snackbar>
    </>
  );
}
