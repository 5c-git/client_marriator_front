import type { Job } from "./jobs.mapper";

import { useState, useCallback } from "react";
// import { useStore } from "~/store/store";

export function useSigninJobsHooks() {
  const [activeCard, setActiveCard] = useState<Job | null>(null);

  const openDialog = useCallback((enitity: Job) => {
    setActiveCard(enitity);
  }, []);

  const closeDialog = useCallback(() => {
    setActiveCard(null);
  }, []);

  return {
    activeCard,
    setActiveCard,
    openDialog,
    closeDialog,
  };
}
