import { useNavigation, useSubmit, redirect } from "react-router";
import type { Route } from "./+types/day-review";

import { useStore } from "~/store/store";
import { withLocale } from "~/shared/withLocale";

import { DayReviewMobileView } from "./DayReviewMobileView/DayReviewFormMobileView";
import type { DayReviewMobileViewInterface } from "./DayReviewMobileView/DayReviewMobileViewInterface";

import { Loader } from "~/shared/ui/Loader/Loader";

import { getJob } from "~/api/_personal/getJob/getJob";
import { getReasons } from "~/api/_personal/getReasons/getReasons";
import { postAcceptReport } from "~/api/_personal/postAcceptReport/postAcceptReport";
import { postUpdateReport } from "~/api/_personal/postUpdateReport/postUpdateReport";
import { postAcceptAllReportJob } from "~/api/_personal/postAcceptAllReportJob/postAcceptAllReportJob";

type MobileModeData = Omit<DayReviewMobileViewInterface, "submitAction"> & {
  mode: "mobile";
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (mode === "mobile") {
      const days: DayReviewMobileViewInterface["days"] = [];
      const criteria: DayReviewMobileViewInterface["criteria"] = [];

      const missionData = await getJob(
        accessToken,
        params.specialistId,
        params.bidId,
      );

      const criteriaData = await getReasons(accessToken);

      criteriaData.data.forEach((criterion) => {
        criteria.push({
          amount: criterion.amount,
          label: criterion.value,
          value: criterion.id.toString(),
        });
      });

      if (params.reportId) {
        const particularDay = missionData.data.reports.find(
          (report) => report.id === Number(params.reportId),
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
            unitPrice: missionData.data.price.toString(),
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
        missionData.data.reports.forEach((report) => {
          if (
            report.status === 2 ||
            report.status === 3 ||
            report.status === 7
          ) {
            days.push({
              id: Number(report.id),
              date: report.dateStart ? report.dateStart : "",
              unitPrice: missionData.data.price.toString(),
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

      if (days.length === 0) {
        throw redirect(
          withLocale(
            `/bids/${params.bidId}/specialists/${params.specialistId}`,
          ),
        );
      }

      data = {
        mode,
        days,
        criteria,
        bidId: params.bidId,
        specialistId: params.specialistId,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const fields: {
    days: {
      photos?: string[];
      criteria: {
        value: string;
        amount: number;
        count: number;
      }[];
      id: number;
      date: string;
      unitPrice: string;
      unitAmount: string;
    }[];
  } = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (fields.days.length > 1) {
      await postAcceptAllReportJob(accessToken, {
        bidId: Number(params.bidId),
        specialistId: Number(params.specialistId),
        reports: (() => {
          const reports: Parameters<
            typeof postAcceptAllReportJob
          >["1"]["reports"] = [];

          fields.days.forEach((day) => {
            reports.push({
              reportId: day.id,
              hours: Number(day.unitAmount),
              reasons: (() => {
                const criteria = day.criteria;

                const reasons: Parameters<
                  typeof postAcceptAllReportJob
                >["1"]["reports"][0]["reasons"] = [];

                criteria.forEach((criterion) => {
                  reasons.push({
                    reasonId: Number(criterion.value),
                    count: criterion.count,
                    amount: criterion.amount,
                  });
                });

                return reasons;
              })(),
            });
          });

          return reports;
        })(),
      });
      // throw redirect(currentURL.toString());
      throw redirect(
        withLocale(`/bids/${params.bidId}/specialists/${params.specialistId}`),
      );
    } else if (fields.days.length === 1) {
      const payload = {
        reportId: fields.days[0].id,
        hours: Number(fields.days[0].unitAmount),
        reasons: (() => {
          const criteria = fields.days[0].criteria;

          const reasons: Parameters<typeof postAcceptReport>[1]["reasons"] = [];

          criteria.forEach((criterion) => {
            reasons.push({
              reasonId: Number(criterion.value),
              count: criterion.count,
              amount: criterion.amount,
            });
          });

          return reasons;
        })(),
      };

      if (currentURL.searchParams.has("edit", "true")) {
        await postUpdateReport(accessToken, payload);
      } else {
        await postAcceptReport(accessToken, payload);
      }

      throw redirect(
        withLocale(`/bids/${params.bidId}/specialists/${params.specialistId}`),
      );
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function DayReview({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();

  const submit = useSubmit();

  return loaderData.mode === "mobile" ? (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <DayReviewMobileView
        days={loaderData.days}
        criteria={loaderData.criteria}
        bidId={loaderData.bidId}
        specialistId={loaderData.specialistId}
        submitAction={(values) => {
          submit(JSON.stringify(values), {
            method: "POST",
            encType: "application/json",
          });
        }}
      />
    </>
  ) : null;
}
