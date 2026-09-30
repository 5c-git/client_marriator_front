import { useCallback } from "react";
import { useSubmit } from "react-router";

export function useRecruiterHooks() {
  const submit = useSubmit();

  const finishRegister = useCallback(
    (name: string) => {
      submit(JSON.stringify({ name }), {
        method: "POST",
        encType: "application/json",
      });
    },
    [submit],
  );

  return {
    finishRegister,
  };
}
