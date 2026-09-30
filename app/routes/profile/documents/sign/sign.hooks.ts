import { useEffect, useState } from "react";

type SignActionData =
  | null
  | undefined
  | {
      data: null;
      isError: boolean;
      error: string;
    };

export function useSignHooks(actionData: SignActionData) {
  const [seconds, setSeconds] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (actionData) {
      setPopup(true);
    }
  }, [actionData]);

  useEffect(() => {
    if (actionData && actionData.isError === false) {
      setSeconds(60);
    }
  }, [actionData]);

  return {
    seconds,
    popup,
    setPopup,
    setSeconds,
  };
}
