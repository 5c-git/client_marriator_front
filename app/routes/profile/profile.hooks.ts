import { useCallback, useState } from "react";
import { useFetcher } from "react-router";

export function useProfileHooks() {
  const fetcher = useFetcher();
  const [openDialog, setOpenDialog] = useState(false);

  const openLogoutDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const closeLogoutDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const confirmLogout = useCallback(() => {
    fetcher.submit(JSON.stringify({ logout: "logout" }), {
      method: "POST",
      encType: "application/json",
    });
  }, [fetcher]);

  return {
    openDialog,
    openLogoutDialog,
    closeLogoutDialog,
    confirmLogout,
  };
}
