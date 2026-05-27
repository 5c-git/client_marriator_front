import { useNavigation, useLocation } from "react-router";

import { useStore } from "~/store/store";

export function useUsersLayoutHooks() {
  const navigation = useNavigation();
  const location = useLocation();
  const userRole = useStore((state) => state.userRole);

  return {
    userRole,
    pathname: location.pathname,
    isLoading: navigation.state !== "idle",
  };
}
