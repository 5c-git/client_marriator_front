import { differenceInHours, isFuture } from "date-fns";

const CANCEL_TIME_INTERVAL = 6;
const REPEAT_TIME_INTERVAL = 6;

export const canCancelNewOrNotAccepted = (
  userId: number,
  cardUserId: number,
  status: number,
  interval: number,
  dateStart: string,
): boolean => {
  if (
    userId === cardUserId &&
    isFuture(dateStart) &&
    differenceInHours(dateStart, new Date()) >= interval &&
    (status === 1 || status === 2)
  ) {
    console.log(differenceInHours(dateStart, new Date()));
    return true;
  } else {
    return false;
  }
};

export const canCancelAccepted = (
  userId: number,
  cardUserId: number,
  status: number,
  dateEnd: string,
): boolean => {
  if (userId === cardUserId && status === 3 && isFuture(dateEnd)) {
    return true;
  } else {
    return false;
  }
};

export const canRepeatCancelled = (
  userId: number,
  cardUserId: number,
  status: number,
  interval: number,
  dateStart: string,
): boolean => {
  if (
    userId === cardUserId &&
    isFuture(dateStart) &&
    differenceInHours(dateStart, new Date()) >= interval &&
    status === 4
  ) {
    return true;
  } else {
    return false;
  }
};
