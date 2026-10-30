import { differenceInHours, isFuture } from "date-fns";

export class ButtonActionMapper {
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
