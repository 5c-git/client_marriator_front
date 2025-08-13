import { useSubmit, useNavigation, redirect } from "react-router";
import type { Route } from "./+types/pin";

import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import { Typography, Snackbar, Alert, Button } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledOptField } from "~/shared/ui/StyledOtpField/StyledOtpField";
import { Loader } from "~/shared/ui/Loader/Loader";

import { postCheckPin } from "~/requests/postCheckPin/postCheckPin";
import { getUserInfo } from "~/requests/_personal/getUserInfo/getUserInfo";
import { postStartRestorePin } from "~/requests/postStartRestorePin/postStartRestorePin";

import { useStore } from "~/store/store";
import { determineRole } from "~/shared/determineRole";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const params = new URLSearchParams();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action && _action === "restorePin") {
      const data = await postStartRestorePin(accessToken);

      useStore.getState().setAccessToken(data.result.token.access_token);
      useStore.getState().setRefreshToken(data.result.token.refresh_token);

      params.set("ttl", data.result.code.ttl.toString());

      throw redirect(withLocale(`/signin/confirm-restore-pin?${params}`));
    } else {
      const data = await postCheckPin(accessToken, fields.pin);
      if (data.status === "success") {
        useStore.getState().setAccessToken(data.result.token.access_token);
        useStore.getState().setRefreshToken(data.result.token.refresh_token);

        //getting and saving userRole
        const roleData = await getUserInfo(data.result.token.access_token);
        const currentRole = determineRole(roleData.result.userData.roles);
        useStore.getState().setUserRole(currentRole);
        //getting and saving userRole

        throw redirect(withLocale("/"));
      } else if (data.status === "error") {
        return { error: t("pinError", { ns: "pin" }) };
      }
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Pin({ actionData }: Route.ComponentProps) {
  const { t } = useTranslation("pin");
  const submit = useSubmit();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pin: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        pin: Yup.string().min(4).max(4).required(),
      })
    ),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingTop: "38px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Typography
          component="p"
          variant="Bold_28"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            textAlign: "center",
            paddingBottom: "8px",
          })}
        >
          {t("header")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_18"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            textAlign: "center",
            paddingBottom: "37px",
          })}
        >
          {t("intro")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            textAlign: "center",
            paddingBottom: "20px",
          })}
        >
          {t("text")}
        </Typography>

        <form
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit((values) => {
            submit(JSON.stringify(values), {
              method: "POST",
              encType: "application/json",
            });
          })}
        >
          <Controller
            name="pin"
            control={control}
            render={({ field }) => (
              <StyledOptField
                error={errors.pin ? true : false}
                onComplete={() => {
                  handleSubmit((values) => {
                    submit(JSON.stringify(values), {
                      method: "POST",
                      encType: "application/json",
                    });
                  })();
                }}
                {...field}
              />
            )}
          />
        </form>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            columnGap: "10px",
            paddingTop: "20px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_16"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
            })}
          >
            {t("forgetPin")}
          </Typography>

          <Button
            sx={{
              textDecoration: "none",
              width: "unset",
              padding: 0,
            }}
            onClick={() => {
              submit(JSON.stringify({ _action: "restorePin" }), {
                method: "POST",
                encType: "application/json",
              });
            }}
          >
            <Typography
              component="p"
              variant="Bold_16"
              sx={(theme) => ({
                color: theme.vars.palette["Corp_1"],
              })}
            >
              {t("restorePin")}
            </Typography>
          </Button>
        </Box>
      </Box>

      <Snackbar open={actionData ? true : false} autoHideDuration={3000}>
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("pinError")}
        </Alert>
      </Snackbar>
    </>
  );
}
