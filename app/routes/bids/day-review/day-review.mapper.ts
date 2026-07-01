import type { GetJobSuccess } from "~/api/_personal/getJob/getJobSuccess.schema";
import type { GetReasonsSuccess } from "~/api/_personal/getReasons/getReasonsSuccess.schema";

import { DayReviewMobileViewInterface } from "./DayReviewMobileView/DayReviewMobileViewInterface";

export class DayReviewMapper {
  static mapDataToDays(data: GetJobSuccess, reportId?: string) {
    const days: DayReviewMobileViewInterface["days"] = [];

    if (reportId) {
      const particularDay = data.data.reports.find(
        (report) => report.id === Number(reportId),
      );

      if (
        (particularDay && particularDay.status === 2) ||
        (particularDay && particularDay.status === 3) ||
        (particularDay && particularDay.status === 4) ||
        (particularDay && particularDay.status === 7)
      ) {
        days.push({
          id: Number(particularDay.id),
          date: particularDay.dateStart ? particularDay.dateStart : "",
          unitPrice: data.data.price.toString(),
          unitAmount: particularDay.hours
            ? Number(particularDay.hours).toString()
            : "",
          ...(particularDay.report && { photos: particularDay.report }),
          criteria: (() => {
            const criteria: DayReviewMobileViewInterface["days"][0]["criteria"] =
              [];

            particularDay.reasons.forEach((item) => {
              criteria.push({
                amount: item.amount,
                count: item.count,
                value: item.id.toString(),
              });
            });

            return criteria;
          })(),
        });
      }
    } else {
      data.data.reports.forEach((report) => {
        if (report.status === 2 || report.status === 3 || report.status === 7) {
          days.push({
            id: Number(report.id),
            date: report.dateStart ? report.dateStart : "",
            unitPrice: data.data.price.toString(),
            unitAmount: report.hours ? Number(report.hours).toString() : "",
            ...(report.report && { photos: report.report }),
            criteria: (() => {
              const criteria: DayReviewMobileViewInterface["days"][0]["criteria"] =
                [];

              report.reasons.forEach((item) => {
                criteria.push({
                  amount: item.amount,
                  count: 3,
                  value: item.id.toString(),
                });
              });

              return criteria;
            })(),
          });
        }
      });
    }

    return days;
  }

  static mapReasonsToOptions(data: GetReasonsSuccess) {
    return data.data.map((reason) => ({
      amount: reason.amount,
      label: reason.value,
      value: reason.id.toString(),
    }));
  }
}
