import { redirect } from "react-router";
import type { Route } from "./+types/createPin";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Alert, Snackbar } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";

import { CreatePinView } from "./_views/CreatePinView";
import { createPinContainer } from "./createPin.module";
import { createPinTokens } from "./createPin.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";
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
  const { t } = useTranslation("createPin");

  const { isLoading, navigateTo } = useAppHooks();
  const { error, submitPin, clearError } = useCreatePinHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <CreatePinView
        translation="createPin"
        backAction={() => {
          navigateTo("/signin/createPin");
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
