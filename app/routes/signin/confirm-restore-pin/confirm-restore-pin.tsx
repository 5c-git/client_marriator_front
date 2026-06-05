import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/confirm-restore-pin";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";

import { ConfirmRestorePinView } from "./_views/ConfirmRestorePinView";
import { confirmRestorePinContainer } from "./confirmRestorePin.module";
import { confirmRestorePinTokens } from "./confirmRestorePin.tokens";
import { useConfirmRestorePinHooks } from "./confirmRestorePin.hooks";

export const CONFIRM_RESTORE_PIN_ACTIONS = {
  sendAgain: "sendAgain",
  sendCode: "sendCode"
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await loadNamespaces("confirmRestorePin");

  const currentURL = new URL(request.url);
  const ttl = currentURL.searchParams.get("ttl");

  if (!ttl) {
    throw new Response(t("wrongData", { ns: "confirmRestorePin" }));
  }

  return { ttl };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const confirmRestorePinService = confirmRestorePinContainer.get(
    confirmRestorePinTokens.confirmRestorePinService,
  );

  const { _action, currentTTL, ...fields } = await request.json();

  if (_action === CONFIRM_RESTORE_PIN_ACTIONS.sendAgain) {
    const ttl = await confirmRestorePinService.resendCode();
    currentURL.searchParams.set("ttl", ttl.toString());
    throw redirect(currentURL.toString());
  }

  if (_action === CONFIRM_RESTORE_PIN_ACTIONS.sendCode) {
    const data = await confirmRestorePinService.verifyCode(fields.code);

    if ("token" in data.result) {
      const params = new URLSearchParams();
      params.set("type", "restore");
      throw redirect(withLocale(`/signin/createPin?${params}`));
    }

    if (data.status === "error") {
      currentURL.searchParams.set("error", "error");
      currentURL.searchParams.set("ttl", currentTTL.toString());
      throw redirect(currentURL.toString());
    }
  }
}

export default function ConfirmRestorePin({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation("confirmRestorePin");
  const navigate = useNavigate();
  const { seconds, error, submitCode, submitSendAgain, clearError } =
    useConfirmRestorePinHooks(loaderData.ttl);

  const [notificationOpen, setNotificationOpen] = useState(true);

  return (
    <>

      <ConfirmRestorePinView
        translation="confirmRestorePin"
        seconds={seconds}
        backAction={() => {
          navigate(withLocale("/signin/pin"));
        }}
        submitCodeAction={submitCode}
        submitSendAgainAction={submitSendAgain}
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
