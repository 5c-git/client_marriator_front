import { useState } from "react";
import {
  redirect,
  useNavigate,
  useSearchParams,
  useSubmit,
} from "react-router";
import type { Route } from "./+types/confirm-personal-email";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";

import { ConfirmPersonalCode } from "../_components/ConfirmPersonalCode";
import { confirmPersonalEmailContainer } from "./confirm-personal-email.module";
import { confirmPersonalEmailPrivateTokens } from "./confirm-personal-email.private-tokens";
import { confirmPersonalEmailTokens } from "./confirm-personal-email.tokens";

export const CONFIRM_PERSONAL_EMAIL_ACTIONS = {
  sendAgain: "sendAgain",
  sendCode: "sendCode",
} as const;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  await loadNamespaces("confirmPersonalEmail");

  const currentURL = new URL(request.url);
  const getUserEmail = confirmPersonalEmailContainer.get(
    confirmPersonalEmailPrivateTokens.getUserEmail,
  );
  const email = getUserEmail();
  const ttl = currentURL.searchParams.get("ttl");

  if (!email || !ttl) {
    throw new Response(t("wrongData", { ns: "confirmPersonalEmail" }));
  }

  return { email, ttl };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const confirmPersonalEmailService = confirmPersonalEmailContainer.get(
    confirmPersonalEmailTokens.confirmPersonalEmailService,
  );

  const { _action, currentTTL, ...fields } = await request.json();

  if (_action === CONFIRM_PERSONAL_EMAIL_ACTIONS.sendAgain) {
    const ttl = await confirmPersonalEmailService.resendCode(fields.email);
    currentURL.searchParams.set("ttl", ttl.toString());
    throw redirect(currentURL.toString());
  }

  if (_action === CONFIRM_PERSONAL_EMAIL_ACTIONS.sendCode) {
    const data = await confirmPersonalEmailService.verifyCode(fields.code);

    if (data.status === "error") {
      currentURL.searchParams.set("error", "error");
      currentURL.searchParams.set("ttl", currentTTL.toString());
      throw redirect(currentURL.toString());
    }

    throw redirect(withLocale("/profile/my-profile/profile-meta"));
  }

  return null;
}

export default function ConfirmPersonalEmail({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation(
    "m_profile_myProfile_profileMeta_confirmPersonalEmail",
  );
  const navigate = useNavigate();
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();

  const [notificationOpen, setNotificationOpen] = useState(true);
  const [seconds, setSeconds] = useState<number>(Number(loaderData.ttl));

  const error = searchParams.get("error");

  return (
    <>
      <ConfirmPersonalCode
        translation="confirmPersonalEmail"
        seconds={seconds}
        onBack={() => {
          navigate(withLocale("/profile/my-profile/profile-meta"));
        }}
        onSubmitCode={(code) => {
          submit(
            JSON.stringify({
              _action: CONFIRM_PERSONAL_EMAIL_ACTIONS.sendCode,
              currentTTL: seconds,
              code,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        onSendAgain={() => {
          submit(
            JSON.stringify({
              _action: CONFIRM_PERSONAL_EMAIL_ACTIONS.sendAgain,
              email: loaderData.email,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
          setSeconds(Number(loaderData.ttl));
        }}
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
