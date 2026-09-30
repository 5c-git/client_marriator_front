import { useFetcher, Link } from "react-router";

import type { Route } from "./+types/specialist";

import { useTranslation } from "react-i18next";

import { SpecialistMobileView } from "./SpecialistMobileView/SpecialistMobileView";

import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import { specialistContainer } from "./specialist.module";
import { specialistTokens } from "./specialist.tokens";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const specialistService = specialistContainer.get(
    specialistTokens.specialistService,
  );

  return await specialistService.getData(params.specialistId, params.bidId);
}

const SPECIALIST_ACTIONS = {
  accept: "accept",
  end: "end",
  forPay: "forPay",
} as const;

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const specialistService = specialistContainer.get(
    specialistTokens.specialistService,
  );

  const { _action, ...fields } = await request.json();

  if (_action === SPECIALIST_ACTIONS.accept) {
    await specialistService.acceptSpecialist(fields.bidId, params.specialistId);
  } else if (_action === SPECIALIST_ACTIONS.end) {
    await specialistService.endSpecialistJob(fields.bidId, params.specialistId);
  } else if (_action === SPECIALIST_ACTIONS.forPay) {
    await specialistService.payReportForManager(fields.reportId);
  }
}

export default function SpecialistRequest({
  loaderData,
}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { t } = useTranslation("m_jobs_job");

  const isDesktop = window.innerWidth >= 768 ? true : false;

  return (
    <SpecialistMobileView
      entity={loaderData}
      dayActionSlot={(day) => (
        <>
          {day.action === "end" ||
          day.action === "reported" ||
          day.action === "notEnded" ? (
            <Button
              component={Link}
              to={
                isDesktop
                  ? `/dashboard/jobs/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${day.reportId}`
                  : `/bids/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${day.reportId}`
              }
              replace
              variant="outlined"
            >
              {t("actions.check")}
            </Button>
          ) : null}
          {day.action === "accept" ? (
            <>
              <Button
                component={Link}
                to={
                  isDesktop
                    ? `/dashboard/jobs/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${day.reportId}?edit=true`
                    : `/bids/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${day.reportId}?edit=true`
                }
                variant="outlined"
              >
                {t("actions.edit")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  fetcher.submit(
                    JSON.stringify({
                      _action: SPECIALIST_ACTIONS.forPay,
                      reportId: day.reportId,
                    }),
                    {
                      method: "POST",
                      encType: "application/json",
                    },
                  );
                }}
              >
                {t("actions.forPay")}
              </Button>
            </>
          ) : null}
          {day.action === "forPay" ? (
            <>
              <Typography
                component={"p"}
                variant="Bold_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Corp_1"],
                })}
              >
                {t("dayStatus.forPayManager")}
              </Typography>
            </>
          ) : null}
          {day.action === "paid" ? (
            <Typography
              component={"p"}
              variant="Bold_14"
              sx={(theme) => ({
                color: theme.vars.palette["Corp_1"],
              })}
            >
              {t("dayStatus.paid")}
            </Typography>
          ) : null}
        </>
      )}
      actionsSlot={(entity) => (
        <Box
          sx={{
            padding: "0 16px 16px 16px",
            display: "grid",
            rowGap: "8px",
          }}
        >
          {entity.status === 4 ? (
            <Button
              startIcon={<CheckIcon />}
              variant="contained"
              onClick={() => {
                fetcher.submit(
                  JSON.stringify({
                    _action: SPECIALIST_ACTIONS.accept,
                    bidId: entity.id,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }}
            >
              {t("actions.accept")}
            </Button>
          ) : null}

          {entity.canCheckAll ? (
            <Button
              component={Link}
              to={
                isDesktop
                  ? `/dashboard/jobs/${entity.id}/specialists/${entity.specialist.id}/day-review`
                  : `/bids/${entity.id}/specialists/${entity.specialist.id}/day-review`
              }
              variant="outlined"
            >
              {t("actions.acceptAll")}
            </Button>
          ) : null}

          {loaderData.oneDayJob ? (
            <>
              {loaderData.oneDayJobAction === "end" ||
              loaderData.oneDayJobAction === "reported" ||
              loaderData.oneDayJobAction === "notEnded" ? (
                <Button
                  component={Link}
                  to={
                    isDesktop
                      ? `/dashboard/jobs/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${loaderData.oneDayReportId}`
                      : `/bids/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${loaderData.oneDayReportId}`
                  }
                  variant="outlined"
                >
                  {t("actions.check")}
                </Button>
              ) : null}
              {loaderData.oneDayJobAction === "accept" ? (
                <>
                  <Button
                    component={Link}
                    to={
                      isDesktop
                        ? `/dashboard/jobs/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${loaderData.oneDayReportId}?edit=true`
                        : `/bids/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${loaderData.oneDayReportId}?edit=true`
                    }
                    variant="outlined"
                  >
                    {t("actions.edit")}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      fetcher.submit(
                        JSON.stringify({
                          _action: SPECIALIST_ACTIONS.forPay,
                          reportId: loaderData.oneDayReportId,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        },
                      );
                    }}
                  >
                    {t("actions.forPay")}
                  </Button>
                </>
              ) : null}
              {loaderData.oneDayJobAction === "forPay" ? (
                <>
                  <Typography
                    component={"p"}
                    variant="Bold_18"
                    sx={(theme) => ({
                      color: theme.vars.palette["Corp_1"],
                      textAlign: "center",
                    })}
                  >
                    {t("dayStatus.forPayManager")}
                  </Typography>
                </>
              ) : null}
              {loaderData.oneDayJobAction === "paid" ? (
                <Typography
                  component={"p"}
                  variant="Bold_18"
                  sx={(theme) => ({
                    color: theme.vars.palette["Corp_1"],
                    textAlign: "center",
                  })}
                >
                  {t("dayStatus.paid")}
                </Typography>
              ) : null}
            </>
          ) : null}

          {entity.status === 1 ||
          entity.status === 2 ||
          entity.status === 4 ||
          entity.status === 5 ? (
            <Button
              variant="text"
              onClick={() => {
                fetcher.submit(
                  JSON.stringify({
                    _action: "end",
                    bidId: entity.id,
                    specialistId: entity.specialist.id,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }}
            >
              {t("actions.cancel")}
            </Button>
          ) : null}
        </Box>
      )}
    />
  );
}
