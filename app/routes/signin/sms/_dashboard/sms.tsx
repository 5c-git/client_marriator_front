import { redirect, useNavigate } from "react-router";
import type { Route } from "../+types/sms";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";

import { SmsView } from "../_views/SmsView";
import { smsContainer } from "../sms.module";
import { smsTokens } from "../sms.tokens";
import { useSmsHooks } from "../sms.hooks";

export const SMS_ACTIONS = {
  sendAgain: "sendAgain",
  sendSms: "sendSms",
} as const;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const currentURL = new URL(request.url);
  const ttl = currentURL.searchParams.get("ttl");
  const phone = smsContainer.get(smsTokens.smsService).getStoredPhone();

  if (!phone || !ttl) {
    throw new Response(t("wrongData", { ns: "sms" }));
  }

  return { phone, ttl };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const { _action, currentTTL, ...fields } = await request.json();
  const smsService = smsContainer.get(smsTokens.smsService);

  if (_action === "sendAgain") {
    const data = await smsService.resendCode(fields.phone);

    if (
      data.result.code.status === "success" ||
      data.result.code.status === "exists"
    ) {
      currentURL.searchParams.set("ttl", data.result.code.ttl.toString());
      currentURL.searchParams.set("type", data.result.type);
      throw redirect(currentURL.toString());
    }

    currentURL.searchParams.set("error", "error");
    throw redirect(currentURL.toString());
  }

  if (_action === "sendSms") {
    const data = await smsService.verifyCode(fields.phone, fields.sms);

    if (data.status === "error") {
      currentURL.searchParams.set("error", "error");
      currentURL.searchParams.set("ttl", currentTTL.toString());

      throw redirect(currentURL.toString());
    }

    smsService.saveAuthTokens(
      data.result.token.access_token,
      data.result.token.refresh_token,
    );

    if (currentURL.searchParams.get("type") === "register") {
      throw redirect(withLocale("/signin/createPin"));
    }

    if (currentURL.searchParams.get("type") === "auth") {
      throw redirect(withLocale("/signin/pin"));
    }
  }
}

export default function Sms({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_signin_sms");
  const navigate = useNavigate();

  const {
    seconds,
    notificationOpen,
    error,
    submitSms,
    submitResend,
    clearError,
    closeNotification,
  } = useSmsHooks(loaderData.phone, loaderData.ttl);

  return (
    <>
      <SmsView
        phone={loaderData.phone}
        seconds={seconds}
        backActionType="button"
        backAction={() => {
          navigate(withLocale("/signin/phone"));
        }}
        submitSmsAction={(values) => {
          submitSms(values.sms);
        }}
        submitResendAction={submitResend}
        style={{
          width: "100%",
          maxWidth: "425px",
          margin: "0 auto",
        }}
      />

      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
        open={error !== null}
        autoHideDuration={3000}
        onClose={clearError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
