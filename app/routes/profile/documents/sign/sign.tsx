import { redirect, useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/sign";

import { withLocale } from "~/shared/withLocale";

import { useSignHooks } from "./sign.hooks";
import type { SignActionData } from "./_views/SignView";
import { SignView } from "./_views/SignView";
import { signContainer } from "./sign.module";
import { signTokens } from "./sign.tokens";
import { Alert, Snackbar } from "@mui/material";

export const SIGN_ACTIONS = {
  sign: "sign",
  sendAgain: "sendAgain",
  sendCode: "sendCode",
  test: "test",
} as const;

export async function clientLoader() {
  return await signContainer
    .get(signTokens.signService)
    .loadUnsignedDocuments();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const signService = signContainer.get(signTokens.signService);

  if (_action === SIGN_ACTIONS.sign) {
    const data = await signService.signAllDocuments();

    if ("success" in data.data) {
      return { data: null, isError: false, error: "" };
    }
    if ("error" in data.data) {
      return {
        data: null,
        isError: true,
        error: "Возникла ошибка! Попробуйще повторно позже.",
      };
    }
  }
  if (_action === SIGN_ACTIONS.sendAgain) {
    const data = await signService.resendSms();

    if ("success" in data.data) {
      return { data: null, isError: false, error: "" };
    }
    if ("error" in data.data) {
      return { data: null, isError: true, error: data.data.error };
    }
  }
  if (_action === SIGN_ACTIONS.sendCode) {
    const data = await signService.submitSmsCode(fields.code);

    if ("success" in data.data) {
      throw redirect(withLocale("/profile/documents/archive"));
    }
    if ("error" in data.data) {
      return { data: null, isError: true, error: data.data.error };
    }
  }
  if (_action === SIGN_ACTIONS.test) {
    await signService.createTestDoc();
  }
}

export default function Sign({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher<SignActionData>();

  const { seconds, popup, setPopup } = useSignHooks(fetcher.data);

  return (
    <>
      <SignView
        data={loaderData}
        popupOpen={popup}
        seconds={seconds}
        backAction={() => {
          navigate(withLocale("/profile/documents"), {
            viewTransition: true,
          });
        }}
        signAction={() => {
          fetcher.submit(JSON.stringify({ _action: SIGN_ACTIONS.sign }), {
            method: "POST",
            encType: "application/json",
          });
        }}
        sendAgainAction={() => {
          fetcher.submit(JSON.stringify({ _action: SIGN_ACTIONS.sendAgain }), {
            method: "POST",
            encType: "application/json",
          });
        }}
        sendCodeAction={(code) => {
          fetcher.submit(
            JSON.stringify({ _action: SIGN_ACTIONS.sendCode, code }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        closePopupAction={() => {
          fetcher.reset();
          setPopup(false);
        }}
      />

      <Snackbar
        open={fetcher.data && fetcher.data.isError === true ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          fetcher.reset();
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
          {fetcher.data?.error}
        </Alert>
      </Snackbar>
    </>
  );
}
