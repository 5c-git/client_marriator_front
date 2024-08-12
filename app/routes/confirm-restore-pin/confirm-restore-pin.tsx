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

import { postStartRestorePin } from "~/requests/postStartRestorePin/postStartRestorePin";
import { postCheckCodeRestore } from "~/requests/postCheckCodeRestore/postCheckCodeRestore";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "~/preferences/token/token";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .default("")
    .length(4, t("ConfirmRestorePin.inputValidation", { context: "lenght" }))
    .required(t("ConfirmRestorePin.inputValidation")),
});

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);

  const ttl = currentURL.searchParams.get("ttl");

  if (!ttl) {
    throw new Response(t("ConfirmRestorePin.wrongData"));
  }

  return json({ ttl });
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);
  const params = new URLSearchParams();
  const accessToken = await getAccessToken();

  const { _action, ...fields } = await request.json();

  if (accessToken) {
    if (_action === "sendAgain") {
      const data = await postStartRestorePin(accessToken);

      await setAccessToken(data.result.token.access_token);
      await setRefreshToken(data.result.token.refresh_token);

      currentURL.searchParams.set("ttl", data.result.code.ttl.toString());

      throw redirect(currentURL.toString());
    } else if (_action === "sendCode") {
      const data = await postCheckCodeRestore(accessToken, fields.code);

      if ("token" in data.result) {
        await setAccessToken(data.result.token.access_token);
        await setRefreshToken(data.result.token.refresh_token);

        params.delete("ttl");
        params.set("type", "restore");

        throw redirect(withLocale(`/signin/createPin?${params}`));
      }

      if (data.status === "error") {
        currentURL.searchParams.set("error", "error");

        throw redirect(currentURL.toString());
      }
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function СonfirmRestorePin() {
  const theme = useTheme();
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const { ttl } = useLoaderData<typeof clientLoader>();

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
      code: "",
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

  useEffect(() => {
    setSeconds(Number(ttl));
  }, [ttl, navigation.state]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("ConfirmRestorePin.header"),
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
              name="code"
              control={control}
              render={({ field }) => (
                <StyledSmsField
                  inputType="sms"
                  error={errors.code?.message}
                  placeholder={t("ConfirmRestorePin.inputPlaceholder")}
                  onImmediateChange={handleSubmit((values) => {
                    submit(JSON.stringify({ _action: "sendCode", ...values }), {
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
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            {t("ConfirmRestorePin.sendAgain")}
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
              {t("ConfirmRestorePin.timer")}{" "}
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
          {t("ConfirmRestorePin.notification")}
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
          {t("ConfirmRestorePin.errorNotifivation")}
        </Alert>
      </Snackbar>
    </>
  );
}
