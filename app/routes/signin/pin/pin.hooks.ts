import { useCallback } from "react";
import { useSubmit } from "react-router";

export function usePinHooks() {
  const submit = useSubmit();

  const submitPin = useCallback(
    (pin: string) => {
      submit(JSON.stringify({ pin }), {
        method: "POST",
        encType: "application/json",
      });
    },
    [submit],
  );

  const submitRestorePin = useCallback(() => {
    submit(JSON.stringify({ _action: "restorePin" }), {
      method: "POST",
      encType: "application/json",
    });
  }, [submit]);

  return {
    submitPin,
    submitRestorePin,
  };
}
