import { useCallback } from "react";
import { useSubmit } from "react-router";


export function useSettingsHooks() {
  const submit = useSubmit();


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

  return {  submitNotificationValue };
}