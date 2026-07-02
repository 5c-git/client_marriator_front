import { differenceInHours, isFuture } from "date-fns";

export class ButtonActionMapper {
  static canCancelNewOrNotAccepted = (
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
      return true;
    } else {
      return false;
    }
  };

  static canCancelAccepted = (
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

  static canRepeatCancelled = (
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
}
