import {
  useSubmit,
  useNavigation,
  ClientActionFunctionArgs,
  useActionData,
  json,
  redirect,
} from "@remix-run/react";

import { t } from "i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import {
  Box,
  Typography,
  Snackbar,
  Alert,
  useTheme,
  Button,
} from "@mui/material";
import { StyledOptField } from "~/shared/ui/StyledOtpField/StyledOtpField";
import { Loader } from "~/shared/ui/Loader/Loader";

import { postCheckPin } from "~/requests/postCheckPin/postCheckPin";
import { postStartRestorePin } from "~/requests/postStartRestorePin/postStartRestorePin";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "~/preferences/token/token";

const validationSchema = Yup.object().shape({
  pin: Yup.string().min(4).max(4).required(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { _action, ...fields } = await request.json();
  const params = new URLSearchParams();
  const accessToken = await getAccessToken();

  if (accessToken) {
    if (_action && _action === "restorePin") {
      const data = await postStartRestorePin(accessToken);

      await setAccessToken(data.result.token.access_token);
      await setRefreshToken(data.result.token.refresh_token);

      params.set("ttl", data.result.code.ttl.toString());

      throw redirect(withLocale(`/confirm-restore-pin?${params}`));
    } else {
      const data = await postCheckPin(accessToken, fields.pin);
      if (data.status === "success") {
        await setAccessToken(data.result.token.access_token);
        await setRefreshToken(data.result.token.refresh_token);
        throw redirect(withLocale("/"));
      } else if (data.status === "error") {
        return json({ error: t("Pin.pinError") });
      }
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Pin() {
  const theme = useTheme();
  const submit = useSubmit();
  const navigation = useNavigation();

  const actionData = useActionData<typeof clientAction>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pin: "",
    },
    resolver: yupResolver(validationSchema),
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
          sx={{
            color: theme.palette["Black"],
            textAlign: "center",
            paddingBottom: "8px",
          }}
        >
          {t("Pin.header")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_18"
          sx={{
            color: theme.palette["Black"],
            textAlign: "center",
            paddingBottom: "37px",
          }}
        >
          {t("Pin.intro")}
        </Typography>

        <Typography
          component="p"
          variant="Reg_14"
          sx={{
            color: theme.palette["Black"],
            textAlign: "center",
            paddingBottom: "20px",
          }}
        >
          {t("Pin.text")}
        </Typography>

        <form
          style={{
            display: "flex",
            justifyContent: "center",
          }}
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
            sx={{
              color: theme.palette["Black"],
            }}
          >
            {t("Pin.forgetPin")}
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
              sx={{
                color: theme.palette["Corp_1"],
              }}
            >
              {t("Pin.restorePin")}
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
          {t("Pin.pinError")}
        </Alert>
      </Snackbar>
    </>
  );
}
