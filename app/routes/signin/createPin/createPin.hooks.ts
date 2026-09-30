import { useCallback } from "react";
import { useSearchParams, useSubmit } from "react-router";

export function useCreatePinHooks() {
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");

  const submitPin = useCallback(
    (pin: string) => {
      submit(JSON.stringify({ pin }), {
        method: "POST",
        encType: "application/json",
      });
    },
    [submit],
  );

  const clearError = useCallback(() => {
    setSearchParams("");
  }, [setSearchParams]);

  return {
    error,
    submitPin,
    clearError,
  };
}
