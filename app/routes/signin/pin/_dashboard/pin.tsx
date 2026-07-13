import { redirect } from "react-router";
import type { Route } from "../+types/pin";

import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";

import { PinView } from "../_views/PinView";
import { pinContainer } from "../pin.module";
import { pinTokens } from "../pin.tokens";
import { usePinHooks } from "../pin.hooks";

export const PIN_ACTIONS = {
  restorePin: "restorePin",
} as const;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const pinService = pinContainer.get(pinTokens.pinService);

  if (_action === PIN_ACTIONS.restorePin) {
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
  const { t } = useTranslation("m_signin_pin");

  const { submitPin, submitRestorePin } = usePinHooks();

  return (
    <>
      <PinView
        submitPinAction={submitPin}
        submitRestorePinAction={submitRestorePin}
      />

      <Snackbar
        open={actionData ? true : false}
        autoHideDuration={3000}
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
          {t("pinError")}
        </Alert>
      </Snackbar>
    </>
  );
}
