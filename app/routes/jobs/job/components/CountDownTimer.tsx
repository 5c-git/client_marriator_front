import { useEffect, useState } from "react";

export function CountDownTimer({ countDownDate }: { countDownDate: Date }) {
  const [distance, setDistance] = useState<number>(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate.getTime() - now;

      setDistance(distance);
    }, 1000);

    return () => clearInterval(timer);
  });

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return (
    <>
      {days <= 1 && distance > 0 ? (
        <span>
          {hours >= 10 ? hours : `0${hours}`}:
          {minutes >= 10 ? minutes : `0${minutes}`}:
          {seconds >= 10 ? seconds : `0${seconds}`}
        </span>
      ) : (
        <span>00:00:00</span>
      )}
    </>
  );
}
