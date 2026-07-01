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

import { dayReviewContainer } from "./day-review.module";
import { dayReviewTokens } from "./day-review.tokens";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const dayReviewService = dayReviewContainer.get(
    dayReviewTokens.dayReviewService,
  );
  const days = await dayReviewService.getJob(
    params.specialistId,
    params.bidId,
    params.reportId,
  );
  const reasons = await dayReviewService.getReasons();

  if (days.length === 0) {
    throw redirect(
      withLocale(`/bids/${params.bidId}/specialists/${params.specialistId}`),
    );
  }

  return {
    days,
    reasons,
    bidId: params.bidId,
    specialistId: params.specialistId,
  };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);

  const dayReviewService = dayReviewContainer.get(
    dayReviewTokens.dayReviewService,
  );

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

  if (fields.days.length > 1) {
    await dayReviewService.acceptAllReports({
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
      await dayReviewService.updateReport(payload);
    } else {
      await dayReviewService.acceptReport(payload);
    }

    throw redirect(
      withLocale(`/bids/${params.bidId}/specialists/${params.specialistId}`),
    );
  }
}

export default function DayReview({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();

  return (
    <DayReviewMobileView
      days={loaderData.days}
      criteria={loaderData.reasons}
      bidId={loaderData.bidId}
      specialistId={loaderData.specialistId}
      submitAction={(values) => {
        submit(JSON.stringify(values), {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
