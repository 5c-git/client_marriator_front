import { useCallback, useMemo } from "react";
import { useNavigation, useNavigate, useSubmit } from "react-router";

import {withLocale} from "~/shared/withLocale";

export function useSettingsHooks() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isLoading = useMemo(() => {
    if (navigation.state !== "idle") return true;
    return false;
  }, [navigation]);

  const navigateTo = useCallback((navPath: string) => navigate(withLocale(navPath), { viewTransition: true }), [navigate]);

  const submitNotificationValue = useCallback((notificationValue: boolean) => {
    submit(
      JSON.stringify({
        newNotificationValue: !notificationValue,
      }),
      {
        method: "POST",
        encType: "application/json",
      },
    );

    return {
        newNotificationValue: !notificationValue,
      };
  }, [submit]);

  return { isLoading, navigateTo, submitNotificationValue };
}