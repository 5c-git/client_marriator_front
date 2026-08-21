import { useCallback, useState } from "react";
import { useFetcher } from "react-router";

import { PROFILE_ACTIONS } from "./profile";

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
    fetcher.submit(JSON.stringify({ _action: PROFILE_ACTIONS.logout }), {
      method: "POST",
      encType: "application/json",
    });
  }, [fetcher]);

  const changeUserRole = useCallback(
    (newRole: "supervisor" | "specialist") => {
      fetcher.submit(
        JSON.stringify({ _action: PROFILE_ACTIONS.changeRole, newRole }),
        {
          method: "POST",
          encType: "application/json",
        },
      );
    },
    [fetcher],
  );

  return {
    openDialog,
    openLogoutDialog,
    closeLogoutDialog,
    confirmLogout,
    changeUserRole,
  };
}
