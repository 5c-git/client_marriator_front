import { differenceInHours, isFuture } from "date-fns";

const CANCEL_TIME_INTERVAL = 6;
const REPEAT_TIME_INTERVAL = 6;

// const statusMap = {
//   1: "new",
//   2: "accepted",
//   3: "notAccepted",
//   4: "canceled",
//   5: "archive",
// }

export const canCancelNewOrNotAccepted = (
  userId: number,
  cardUserId: number,
  status: number,
  dateStart: string
): boolean => {
  if (
    userId === cardUserId &&
    isFuture(dateStart) &&
    differenceInHours(dateStart, new Date()) >= CANCEL_TIME_INTERVAL &&
    (status === 1 || status === 3)
  ) {
    return true;
  } else {
    return false;
  }
};

export const canCancelAccepted = (
  userId: number,
  cardUserId: number,
  status: number,
  dateEnd: string
): boolean => {
  if (userId === cardUserId && status === 2 && isFuture(dateEnd)) {
    return true;
  } else {
    return false;
  }
};

export const canRepeatCancelled = (
  userId: number,
  cardUserId: number,
  status: number,
  dateStart: string
): boolean => {
  if (
    userId === cardUserId &&
    isFuture(dateStart) &&
    differenceInHours(dateStart, new Date()) >= REPEAT_TIME_INTERVAL &&
    status === 4
  ) {
    return true;
  } else {
    return false;
  }
};
