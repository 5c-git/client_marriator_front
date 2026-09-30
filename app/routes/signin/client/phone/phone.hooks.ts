import { useCallback } from "react";
import { useSearchParams, useSubmit } from "react-router";

export function usePhoneHooks() {
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();

  const error = searchParams.get("error");

  const submitPhone = useCallback(
    (phone: string) => {
      submit(JSON.stringify({ phone }), {
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
    submitPhone,
    error,
    clearError,
  };
}
