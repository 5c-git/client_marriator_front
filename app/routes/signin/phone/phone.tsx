import {
  redirect,
} from "react-router";
import type { Route } from "./+types/phone";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";


import {PhoneView} from "./_views/PhoneView";
import { Alert, Snackbar } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";

import { phoneContainer } from "./phone.module";
import { phoneTokens } from "./phone.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import {usePhoneHooks} from "./phone.hooks";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const params = new URLSearchParams();

  const fields = await request.json();

  phoneContainer.get(phoneTokens.phoneService).saveUserPhoneToStore(fields.phone);

  const data = await phoneContainer.get(phoneTokens.phoneService).authPhone(fields.phone);

  if (data.status === "error") {
    currentURL.searchParams.set("timer", data.result.code.ttl.toString());
    throw redirect(currentURL.toString());
  } else if (data.result.type === "register" || data.result.type === "auth") {
    params.set("ttl", data.result.code.ttl.toString());
    params.set("type", data.result.type);
    throw redirect(withLocale(`/signin/sms?${params}`));
  } else if (data.result.type === "moderation") {
    throw redirect(withLocale("/signin/client/registration-complete"));
  }
}

export default function Phone() {
  const { t } = useTranslation("phone");

  const { isLoading } = useAppHooks();
  const { submitPhone, error, timer, clearTimer, clearError } = usePhoneHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <PhoneView translation="phone" submitAction={(values) => submitPhone(values.phone)} />

      <Snackbar
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
