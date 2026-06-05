import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useSubmit } from "react-router";

import { SMS_ACTIONS } from "./sms";

export function useSmsHooks(phone: string, ttl: string) {
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();

  const [seconds, setSeconds] = useState<number>(Number(ttl));
  const [notificationOpen, setNotificationOpen] = useState<boolean>(true);

  const error = searchParams.get("error");

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submitSms = useCallback(
    (sms: string) => {
      submit(
        JSON.stringify({
          _action: SMS_ACTIONS.sendSms,
          currentTTL: seconds,
          phone,
          sms,
        }),
        {
          method: "POST",
          encType: "application/json",
        },
      );
    },
    [submit, seconds, phone],
  );

  const submitResend = useCallback(() => {
    submit(
      JSON.stringify({
        _action: "sendAgain",
        phone,
      }),
      {
        method: "POST",
        encType: "application/json",
      },
    );
    setSeconds(Number(ttl));
  }, [submit, phone, ttl]);

  const clearError = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("error");
      return prev;
    });
  }, [setSearchParams]);

  const closeNotification = useCallback(() => {
    setNotificationOpen(false);
  }, []);

  return {
    seconds,
    notificationOpen,
    error,
    submitSms,
    submitResend,
    clearError,
    closeNotification,
  };
}
