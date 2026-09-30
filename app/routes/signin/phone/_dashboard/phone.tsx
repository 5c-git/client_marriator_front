import { redirect } from "react-router";
import type { Route } from "../+types/phone";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { PhoneView } from "../_views/PhoneView";
import { Alert, Snackbar } from "@mui/material";

import { phoneContainer } from "../phone.module";
import { phoneTokens } from "../phone.tokens";
import { usePhoneHooks } from "../phone.hooks";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const params = new URLSearchParams();

  const fields = await request.json();

  phoneContainer
    .get(phoneTokens.phoneService)
    .saveUserPhoneToStore(fields.phone);

  const data = await phoneContainer
    .get(phoneTokens.phoneService)
    .authPhone(fields.phone);

  if (data.status === "error") {
    currentURL.searchParams.set("timer", data.result.code.ttl.toString());
    throw redirect(currentURL.toString());
  } else if (data.result.type === "register" || data.result.type === "auth") {
    params.set("ttl", data.result.code.ttl.toString());
    params.set("type", data.result.type);
    throw redirect(withLocale(`/dashboard/signin/sms?${params}`));
  } else if (data.result.type === "moderation") {
    throw redirect(
      withLocale("/dashboard/signin/client/registration-complete"),
    );
  }
}

export default function Phone() {
  const { t } = useTranslation("m_signin_phone");
  const { submitPhone, error, timer, clearTimer, clearError } = usePhoneHooks();

  return (
    <>
      <PhoneView
        submitAction={(values) => submitPhone(values.phone)}
        style={{
          width: "100%",
          maxWidth: "425px",
          margin: "0 auto",
          padding: 0,
          paddingRight: "16px",
          paddingLeft: "16px",
        }}
      />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={timer !== null ? true : false}
        onClose={() => {
          clearTimer();
        }}
        autoHideDuration={3000}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("timerError", { seconds: timer })}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={error !== null ? true : false}
        onClose={() => {
          clearError();
        }}
        autoHideDuration={3000}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
