import { GetJobSuccess } from "~/api/_personal/getJob/getJobSuccess.schema";

import { JobMobileViewInterface } from "./JobMobileView/JobMobileViewInterface";
import { isWithinInterval, subHours } from "date-fns";
import { determineRole } from "~/shared/determineRole";

export class JobMapper {
  static mapDataToJob(data: GetJobSuccess) {
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
      activityDetailsText: data.data.viewActivity.detailText,
      unitPrice: data.data.price,
      dateStart: new Date(data.data.dateStart),
      dateEnd: new Date(data.data.dateEnd),
      income: data.data.income,
      forPay: data.data.forPay,
      days: data.data.dateActivity.map((day) => {
        const locations: JobMobileViewInterface["entity"]["days"][0]["locations"] =
          [];

        const actedDay = data.data.reports.find(
          (item) => item.dayActivityId === day.id,
        );

        day.places.forEach((place) => {
          locations.push({
            id: place.id,
            name: place.name,
            logo: place.logo ? place.logo : "",
          });
        });

        return {
          id: day.id,
          ...(actedDay ? { reportId: actedDay.id } : {}),
          timeStart: new Date(day.timeStart),
          timeEnd: new Date(day.timeEnd),
          locations: locations,
          needRoute: locations.length > 0 ? true : false,
          action: (() => {
            let action: JobMobileViewInterface["entity"]["days"][0]["action"] =
              "none";

            const now = new Date();

            const canStart = isWithinInterval(now, {
              start: subHours(new Date(day.timeStart), 1),
              end: new Date(day.timeEnd),
            });

            if (canStart && !actedDay && data.data.acceptingUser.status === 5) {
              action = "start";
            }

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
      needDays: data.data.dateActivity.length > 0 ? true : false,
      needPhoto: data.data.needFoto,
      travelling: data.data.viewActivity.traveling,
      user: {
        id: data.data.user.id,
        logo: data.data.user.logo,
        name: data.data.user.name,
        role: determineRole(data.data.user.roles),
        phone: data.data.user.phone.toString(),
      },
      oneDayJob: data.data.dateActivity.length === 0 ? true : false,
      oneDayJobAction: (() => {
        let action: JobMobileViewInterface["entity"]["oneDayJobAction"] =
          "none";

        const oneDayJob = data.data.dateActivity.length === 0 ? true : false;

        if (oneDayJob) {
          const actedDay = data.data.reports.length > 0 ? true : false;

          const now = new Date();

          const canStart = isWithinInterval(now, {
            start: subHours(new Date(data.data.dateStart), 1),
            end: new Date(data.data.dateEnd),
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
