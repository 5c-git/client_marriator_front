import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/createPin";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";

import { CreatePinView } from "./_views/CreatePinView";
import { createPinContainer } from "./createPin.module";
import { createPinTokens } from "./createPin.tokens";
import { useCreatePinHooks } from "./createPin.hooks";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const type = currentURL.searchParams.get("type");
  const fields = await request.json();
  const createPinService = createPinContainer.get(
    createPinTokens.createPinService,
  );

  const data = await createPinService.setPin(fields.pin);

  if ("status" in data) {
    throw redirect(withLocale(createPinService.getRedirectPath(type)));
  }

  currentURL.searchParams.set("error", "unAuth");
  throw redirect(currentURL.toString());
}

export default function CreatePin() {
  const { t } = useTranslation("m_signin_createPin");
  const navigate = useNavigate();

  const { error, submitPin, clearError } = useCreatePinHooks();

  return (
    <>
      <CreatePinView
        backAction={() => {
          navigate(withLocale("/signin/createPin"));
        }}
        submitPinAction={submitPin}
      />

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
          {error === "noToken" ? t("error_token") : t("error_auth")}
        </Alert>
      </Snackbar>
    </>
  );
}
