import { useCallback, useMemo } from "react";
import { useNavigation, useNavigate } from "react-router";
import { withLocale } from "../withLocale";

export function useAppHooks() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const navigateTo = useCallback((navPath: string) => navigate(withLocale(navPath), { viewTransition: true }), [navigate]);

  const isLoading = useMemo(() => {
    if (navigation.state !== "idle") return true;
    return false;
  }, [navigation]);


  return { isLoading, navigateTo };
}