import { redirect } from "react-router";
import type { Route } from "./+types/phone";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";

import { Loader } from "~/shared/ui/Loader/Loader";

import { ClientPhoneView } from "./_views/ClientPhoneView";
import { phoneContainer } from "./phone.module";
import { phoneTokens } from "./phone.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import { usePhoneHooks } from "./phone.hooks";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const hash = new URL(request.url).searchParams.get("hash");

  if (hash === null) {
    throw redirect(withLocale("/signin/phone"));
  }

  const phoneService = phoneContainer.get(phoneTokens.phoneService);

  return phoneService.loadPhone(hash);
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const fields = await request.json();
  const phoneService = phoneContainer.get(phoneTokens.phoneService);

  const result = await phoneService.submitPhone(fields.phone);

  if (result.type === "moderation") {
    throw redirect(withLocale("/signin/client/registration-complete"));
  }

  if (result.type === "sms") {
    const params = new URLSearchParams();
    params.set("ttl", result.ttl.toString());
    params.set("type", result.smsType);

    throw redirect(withLocale(`/signin/sms?${params}`));
  }

  currentURL.searchParams.set("error", "error");
  throw redirect(currentURL.toString());
}

export default function Phone({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("ClientPhoneView");

  const { isLoading } = useAppHooks();
  const { submitPhone, error, clearError } = usePhoneHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <ClientPhoneView
        translation="clientPhone"
        loaderData={loaderData}
        submitAction={submitPhone}
      />

      <Snackbar
        open={error !== null}
        onClose={clearError}
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
          {t("clientPhone.smsError")}
        </Alert>
      </Snackbar>
    </>
  );
}
