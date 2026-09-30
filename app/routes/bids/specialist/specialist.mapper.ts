import type { GetJobSuccess } from "~/api/_personal/getJob/getJobSuccess.schema";
import { SpecialistMobileViewInterface } from "./SpecialistMobileView/SpecialistMobileViewInterface";
import { determineRole } from "~/shared/determineRole";
import { isWithinInterval, subHours } from "date-fns";

export class SpecialistMapper {
  static mapDataToSpecialistEntity(data: GetJobSuccess) {
    return {
      id: data.data.id,
      logo: `${import.meta.env.VITE_ASSET_PATH}${data.data.viewActivity.logo}`,
      status: data.data.acceptingUser.status,
      place: {
        id: data.data.place.id,
        name: data.data.place.name,
        logo: `${import.meta.env.VITE_ASSET_PATH}${data.data.place.logo}`,
      },
      activity: data.data.viewActivity.name,
      unitPrice: data.data.price,
      dateStart: data.data.dateStart,
      dateEnd: data.data.dateEnd,
      days: data.data.dateActivity.map((day) => {
        const places: { id: number; logo: string; text: string }[] = [];

        const actedDay = data.data.reports.find(
          (item) => item.dayActivityId === day.id,
        );

        day.places.forEach((place) => {
          places.push({
            id: place.id,
            logo: place.logo ? place.logo : "",
            text: place.name,
          });
        });

        return {
          id: day.id,
          ...(actedDay ? { reportId: actedDay.id } : {}),
          timeStart: day.timeStart,
          timeEnd: day.timeEnd,
          places: places,
          action: (() => {
            let action: SpecialistMobileViewInterface["entity"]["days"][0]["action"] =
              "none";

            if (actedDay) {
              if (actedDay.status === 1) {
                action = "inProgress";
              } else if (actedDay.status === 2) {
                action = "end";
              } else if (actedDay.status === 3) {
                action = "reported";
              } else if (actedDay.status === 4) {
                action = "accept";
              } else if (actedDay.status === 5) {
                action = "forPay";
              } else if (actedDay.status === 6) {
                action = "paid";
              } else if (actedDay.status === 7) {
                action = "notEnded";
              }
            }

            return action;
          })(),
        };
      }),
      needPhoto: data.data.needFoto,
      user: {
        id: data.data.user.id,
        logo: data.data.user.logo,
        name: data.data.user.name,
        role: determineRole(data.data.user.roles),
        phone: data.data.user.phone.toString(),
      },
      specialist: {
        id: data.data.acceptingUser.id,
        logo: data.data.acceptingUser.logo,
        name: data.data.acceptingUser.name,
        role: determineRole(data.data.acceptingUser.roles),
        phone: data.data.acceptingUser.phone.toString(),
      },
      canCheckAll: (() => {
        const validReports: number[] = [];

        data.data.reports.forEach((report) => {
          if (
            report.status === 2 ||
            report.status === 3 ||
            report.status === 7
          ) {
            validReports.push(report.id);
          }
        });

        return validReports.length > 1 ? true : false;
      })(),
      oneDayJob: data.data.dateActivity.length === 0 ? true : false,
      oneDayJobAction: (() => {
        let action: SpecialistMobileViewInterface["entity"]["oneDayJobAction"] =
          "none";

        const oneDayJob = data.data.dateActivity.length === 0 ? true : false;

        if (oneDayJob) {
          const actedDay = data.data.reports.length > 0 ? true : false;

          const now = new Date();

          const canStart = isWithinInterval(now, {
            start: subHours(new Date(data.data.dateStart), 1),
            end: subHours(new Date(data.data.dateEnd), 1),
          });

          if (canStart && !actedDay && data.data.acceptingUser.status === 5) {
            action = "start";
          }

          if (actedDay) {
            if (data.data.reports[0].status === 1) {
              action = "inProgress";
            } else if (data.data.reports[0].status === 2) {
              action = "end";
            } else if (data.data.reports[0].status === 3) {
              action = "reported";
            } else if (data.data.reports[0].status === 4) {
              action = "accept";
            } else if (data.data.reports[0].status === 5) {
              action = "forPay";
            } else if (data.data.reports[0].status === 6) {
              action = "paid";
            } else if (data.data.reports[0].status === 7) {
              action = "notEnded";
            }
          }
        }

        return action;
      })(),
      oneDayReportId:
        data.data.reports.length > 0 ? data.data.reports[0].id : null,
      units: data.data.viewActivity.standard.name,
      currency: "₽",
    };
  }
}
