import { useState } from "react";
import {
  redirect,
  useNavigate,
  useSearchParams,
  useSubmit,
} from "react-router";
import type { Route } from "./+types/confirm-personal-phone";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";

import { ConfirmPersonalCode } from "../_components/ConfirmPersonalCode";
import { confirmPersonalPhoneContainer } from "./confirm-personal-phone.module";
import { confirmPersonalPhonePrivateTokens } from "./confirm-personal-phone.private-tokens";
import { confirmPersonalPhoneTokens } from "./confirm-personal-phone.tokens";

export const CONFIRM_PERSONAL_PHOHE_ACTIONS = {
  sendAgain: "sendAgain",
  sendCode: "sendCode",
} as const;

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

  if (_action === CONFIRM_PERSONAL_PHOHE_ACTIONS.sendAgain) {
    const ttl = await confirmPersonalPhoneService.resendCode(fields.phone);
    currentURL.searchParams.set("ttl", ttl.toString());
    throw redirect(currentURL.toString());
  }

  if (_action === CONFIRM_PERSONAL_PHOHE_ACTIONS.sendCode) {
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
  const { t } = useTranslation(
    "m_profile_myProfile_profileMeta_confirmPersonalPhone",
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
        translation="confirmPersonalPhone"
        seconds={seconds}
        onBack={() => {
          navigate(withLocale("/profile/my-profile/profile-meta"));
        }}
        onSubmitCode={(code) => {
          submit(
            JSON.stringify({
              _action: CONFIRM_PERSONAL_PHOHE_ACTIONS.sendCode,
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
              _action: CONFIRM_PERSONAL_PHOHE_ACTIONS.sendAgain,
              phone: loaderData.phone,
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
