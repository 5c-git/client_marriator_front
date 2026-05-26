import { redirect, useFetcher, useNavigation, useNavigate } from "react-router";
import type { Route } from "./+types/sign";

import { withLocale } from "~/shared/withLocale";

import { useSignHooks } from "./sign.hooks";
import type { SignActionData } from "./_views/SignView";
import { SignView } from "./_views/SignView";
import { signContainer } from "./sign.module";
import { signTokens } from "./sign.tokens";

export async function clientLoader() {
  return await signContainer.get(signTokens.signService).loadUnsignedDocuments();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const signService = signContainer.get(signTokens.signService);

  if (_action === "sign") {
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

  if (_action === "sendAgain") {
    const data = await signService.resendSms();

    if ("success" in data.data) {
      return { data: null, isError: false, error: "" };
    }
    if ("error" in data.data) {
      return { data: null, isError: true, error: data.data.error };
    }
  }

  if (_action === "sendCode") {
    const data = await signService.submitSmsCode(fields.code);

    if ("success" in data.data) {
      throw redirect(withLocale("/profile/documents/archive"));
    }
    if ("error" in data.data) {
      return { data: null, isError: true, error: data.data.error };
    }
  }

  if (_action === "test") {
    await signService.createTestDoc();
  }
}

export default function Sign({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const fetcher = useFetcher<SignActionData>();

  const { seconds, popup, setPopup } = useSignHooks(fetcher.data);

  return (
    <SignView
      loaderData={loaderData}
      isLoading={navigation.state !== "idle" || fetcher.state !== "idle"}
      popupOpen={popup}
      seconds={seconds}
      fetcher={fetcher}
      backAction={() => {
        navigate(withLocale("/profile/documents"), {
          viewTransition: true,
        });
      }}
      signAction={() => {
        fetcher.submit(JSON.stringify({ _action: "sign" }), {
          method: "POST",
          encType: "application/json",
        });
      }}
      sendAgainAction={() => {
        fetcher.submit(JSON.stringify({ _action: "sendAgain" }), {
          method: "POST",
          encType: "application/json",
        });
      }}
      sendCodeAction={(code) => {
        fetcher.submit(JSON.stringify({ _action: "sendCode", code }), {
          method: "POST",
          encType: "application/json",
        });
      }}
      closePopupAction={() => {
        fetcher.reset();
        setPopup(false);
      }}
    />
  );
}
