import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useSubmit } from "react-router";

import { CONFIRM_RESTORE_PIN_ACTIONS } from "./confirm-restore-pin";

export function useConfirmRestorePinHooks(initialTtl: string) {
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();

  const [seconds, setSeconds] = useState<number>(Number(initialTtl));

  const error = searchParams.get("error");

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submitCode = useCallback(
    (code: string) => {
      submit(
        JSON.stringify({
          _action: CONFIRM_RESTORE_PIN_ACTIONS.sendCode,
          currentTTL: seconds,
          code,
        }),
        {
          method: "POST",
          encType: "application/json",
        },
      );
    },
    [submit, seconds],
  );

  const submitSendAgain = useCallback(() => {
    submit(
      JSON.stringify({
        _action: CONFIRM_RESTORE_PIN_ACTIONS.sendAgain,
      }),
      {
        method: "POST",
        encType: "application/json",
      },
    );
    setSeconds(Number(initialTtl));
  }, [submit, initialTtl]);

  const clearError = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("error");
      return prev;
    });
  }, [setSearchParams]);

  return {
    seconds,
    error,
    submitCode,
    submitSendAgain,
    clearError,
  };
}
