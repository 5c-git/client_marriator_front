import { redirect } from "react-router";
import type { Route } from "./+types/pin";

import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";

import { PinView } from "./_views/PinView";
import { pinContainer } from "./pin.module";
import { pinTokens } from "./pin.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import { usePinHooks } from "./pin.hooks";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const pinService = pinContainer.get(pinTokens.pinService);


  if (_action === "restorePin") {
    const data = await pinService.restorePin();
    const params = new URLSearchParams();

    params.set("ttl", data.result.code.ttl.toString());

    throw redirect(withLocale(`/signin/confirm-restore-pin?${params}`));
  }

  const data = await pinService.verifyPin(fields.pin);

  if (data.status === "success") {
    throw redirect(withLocale("/"));
  }

  return { error: t("pinError", { ns: "pin" }) };
}

export default function Pin({ actionData }: Route.ComponentProps) {
  const { t } = useTranslation("pin");

  const { isLoading } = useAppHooks();
  const { submitPin, submitRestorePin } = usePinHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <PinView
        translation="pin"
        submitPinAction={submitPin}
        submitRestorePinAction={submitRestorePin}
      />

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
