import { useCallback } from "react";
import { useSubmit } from "react-router";

export function useLocationHooks() {
  const submit = useSubmit();

  const submitShops = useCallback(
    (shopIds: string[]) => {
      submit(JSON.stringify(shopIds), {
        method: "POST",
        encType: "application/json",
      });
    },
    [submit],
  );

  return {
    submitShops,
  };
}
