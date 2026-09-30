import { useCallback } from "react";
import { useFetcher, useSubmit } from "react-router";

import { useMetaStore } from "./metaStore";

import { META_ACTIONS } from "./meta";

export function useMetaHooks() {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const setFio = useMetaStore((state) => state.setFio);

  const deleteLocation = useCallback(
    (placeId: number) => {
      fetcher.submit(
        JSON.stringify({
          _action: META_ACTIONS.deleteLocation,
          placeId,
        }),
        {
          method: "POST",
          encType: "application/json",
        },
      );
    },
    [fetcher],
  );

  const saveLogo = useCallback(
    (logo: string) => {
      fetcher.submit(
        JSON.stringify({
          _action: META_ACTIONS.saveLogo,
          logo,
        }),
        {
          method: "POST",
          encType: "application/json",
        },
      );
    },
    [fetcher],
  );

  const finishRegister = useCallback(
    (name: string) => {
      submit(
        JSON.stringify({
          _action: META_ACTIONS.finishRegister,
          name,
        }),
        {
          method: "POST",
          encType: "application/json",
        },
      );
    },
    [fetcher],
  );

  return {
    setFio,
    deleteLocation,
    saveLogo,
    finishRegister,
  };
}
