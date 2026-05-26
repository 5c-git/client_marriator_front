import { useState } from "react";
import { redirect } from "react-router";
import type { Route } from "./+types/confirm-personal-phone";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";

import { ConfirmPersonalCodeView } from "../_views/ConfirmPersonalCodeView";
import { confirmPersonalPhoneContainer } from "./confirm-personal-phone.module";
import { confirmPersonalPhonePrivateTokens } from "./confirm-personal-phone.private-tokens";
import { confirmPersonalPhoneTokens } from "./confirm-personal-phone.tokens";
import { useConfirmPersonalCodeHooks } from "../confirm-personal-code.hooks";
import { useAppHooks } from "~/shared/hooks/app.hooks";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await loadNamespaces("confirmPersonalPhone");

  const currentURL = new URL(request.url);
  const getUserPhone = confirmPersonalPhoneContainer.get(
    confirmPersonalPhonePrivateTokens.getUserPhone,
  );
  const phone = getUserPhone();
  const ttl = currentURL.searchParams.get("ttl");

  if (!phone || !ttl) {
    throw new Response(t("wrongData", { ns: "confirmPersonalPhone" }));
  }

  return { phone, ttl };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const confirmPersonalPhoneService = confirmPersonalPhoneContainer.get(
    confirmPersonalPhoneTokens.confirmPersonalPhoneService,
  );

  const { _action, currentTTL, ...fields } = await request.json();

  if (_action === "sendAgain") {
    const ttl = await confirmPersonalPhoneService.resendCode(fields.phone);
    currentURL.searchParams.set("ttl", ttl.toString());
    throw redirect(currentURL.toString());
  }

  if (_action === "sendCode") {
    const data = await confirmPersonalPhoneService.verifyCode(fields.code);

    if (data.status === "error") {
      currentURL.searchParams.set("error", "error");
      currentURL.searchParams.set("ttl", currentTTL.toString());
      throw redirect(currentURL.toString());
    }

    throw redirect(withLocale("/profile/my-profile/profile-meta"));
  }

  return null;
}

export default function ConfirmPersonalPhone({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation("confirmPersonalPhone");
  const { isLoading, navigateTo } = useAppHooks();
  const { seconds, error, submitCode, submitSendAgain, clearError } =
    useConfirmPersonalCodeHooks(loaderData.ttl, { phone: loaderData.phone });

  const [notificationOpen, setNotificationOpen] = useState(true);

  return (
    <>
      {isLoading ? <Loader /> : null}

      <ConfirmPersonalCodeView
        translation="confirmPersonalPhone"
        seconds={seconds}
        onBack={() => {
          navigateTo("/profile/my-profile/profile-meta");
        }}
        onSubmitCode={submitCode}
        onSendAgain={submitSendAgain}
      />

      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={() => {
          setNotificationOpen(false);
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
        open={error !== null}
        autoHideDuration={3000}
        onClose={clearError}
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
