import { useCallback } from "react";
import { useFetcher } from "react-router";

import { useMetaStore } from "./metaStore";

export function useMetaHooks() {
  const fetcher = useFetcher();
  const setFio = useMetaStore((state) => state.setFio);

  const deleteLocation = useCallback(
    (placeId: number) => {
      fetcher.submit(
        JSON.stringify({
          _action: "deleteLocation",
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
          _action: "saveLogo",
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
      fetcher.submit(
        JSON.stringify({
          _action: "finishRegister",
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
