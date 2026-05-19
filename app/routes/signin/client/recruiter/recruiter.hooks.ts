import { useCallback } from "react";
import { useFetcher } from "react-router";

export function useRecruiterHooks() {
  const fetcher = useFetcher();

  const finishRegister = useCallback(
    (name: string) => {
      fetcher.submit(JSON.stringify({ name }), {
        method: "POST",
        encType: "application/json",
      });
    },
    [fetcher],
  );

  return {
    finishRegister,
  };
}
