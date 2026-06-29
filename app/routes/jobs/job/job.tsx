import { useNavigate, useFetcher } from "react-router";
import { useState, Fragment } from "react";
import type { Route } from "./+types/job";

import type { JobMobileViewInterface } from "./JobMobileView/JobMobileViewInterface";
import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import { isWithinInterval, subHours, isAfter } from "date-fns";

// import { JobMobileFormView } from "./JobMobileView/JobMobileFormView";
import { JobMobileStaticView } from "./JobMobileView/JobMobileStaticView";

import { FilesPopup } from "./components/FilesPopup";
import { CountDownTimer } from "./components/CountDownTimer";

import Box from "@mui/material/Box";
import { Button, Typography, Snackbar, Alert } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import CheckIcon from "@mui/icons-material/Check";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

import { jobContainer } from "./job.module";
import { jobTokens } from "./job.tokens";
import { JobMapper } from "./job.mapper";

const JOB_ACTIONS = {
  accept: "accept",
  deny: "deny",
  start: "start",
  forPay: "forPay",
} as const;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const jobService = jobContainer.get(jobTokens.jobService);

  const jobData = await jobService.getJob(params.specialistId, params.jobId);

  const job = JobMapper.mapDataToJob(jobData);

  const intervalDayStart = await jobService.getSettings("intervalDayStart");
  const intervalDayEnd = await jobService.getSettings("intervalDayEnd");

  return {
    job,
    defaultTimeRange: {
      start: new Date(
        `2026-03-12T${jobData.data.project.timeStart ? (jobData.data.project.timeStart.startsWith("0") ? jobData.data.project.timeStart : `0${jobData.data.project.timeStart}`) : intervalDayStart.data.value.startsWith("0") ? intervalDayStart.data.value : `0${intervalDayStart.data.value}`}:00`,
      ),
      end: new Date(
        `2026-03-12T${jobData.data.project.timeEnd ? jobData.data.project.timeEnd : intervalDayEnd.data.value}:00`,
      ),
    },
    projectTimeRange: {
      start: new Date(jobData.data.project.dateStart),
      end: new Date(jobData.data.project.dateEnd),
    },
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const jobService = jobContainer.get(jobTokens.jobService);
  const requestType = request.headers.get("content-type");

  if (requestType === "application/json") {
    const { _action, ...fields } = await request.json();

    if (_action === JOB_ACTIONS.accept) {
      await jobService.acceptBid(fields.bidId);
      return {
        success: true,
      };
    } else if (_action === JOB_ACTIONS.deny) {
      await jobService.rejectBid(fields.bidId);
    } else if (_action === JOB_ACTIONS.start) {
      await jobService.startDay(fields.bidId);
    } else if (_action === JOB_ACTIONS.forPay) {
      await jobService.payReport(fields.reportId);
    }
  } else {
    const formData = await request.formData();

    const bidId = formData.get("bidId") as string;
    const files = formData.getAll("files[]") as File[];

    await jobService.endDay(bidId, files);
  }
}

export default function Job({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_jobs_job");
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof clientAction>();

  const [openFilesPopup, setOpenFilesPopup] = useState<boolean>(false);

  return (
    <>
      <TopNavigation
        header={{
          text:
            loaderData.job.status === 1 || loaderData.job.status === 4
              ? `${t("bid")} ${loaderData.job.id}`
              : `${t("job")} ${loaderData.job.id}`,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/jobs"), {
            viewTransition: true,
          });
        }}
      />

      <JobMobileStaticView
        entity={loaderData.job}
        actions={
          loaderData.job.status === 1
            ? []
            : [
                (
                  day: JobMobileViewInterface["entity"]["days"][0],
                  action: JobMobileViewInterface["entity"]["days"][0]["action"],
                ) =>
                  action === "start" ? (
                    <>
                      <Button
                        key="start"
                        startIcon={<PlayArrowOutlinedIcon />}
                        variant="contained"
                        onClick={() => {
                          fetcher.submit(
                            JSON.stringify({
                              _action: JOB_ACTIONS.start,
                              bidId: loaderData.job.id,
                            }),
                            {
                              method: "POST",
                              encType: "application/json",
                            },
                          );
                        }}
                      >
                        {t("actions.start")}
                      </Button>
                    </>
                  ) : null,
                (
                  day: JobMobileViewInterface["entity"]["days"][0],
                  action: JobMobileViewInterface["entity"]["days"][0]["action"],
                ) =>
                  action === "inProgress" ? (
                    <Button
                      key="inProgress"
                      startIcon={<CheckIcon />}
                      variant="contained"
                      disabled={isWithinInterval(new Date(), {
                        start: subHours(new Date(day.timeStart), 1),
                        end: new Date(day.timeEnd),
                      })}
                      onClick={() => {
                        if (loaderData.job.needPhoto) {
                          setOpenFilesPopup(true);
                        } else {
                          const formData = new FormData();

                          formData.append(
                            "bidId",
                            loaderData.job.id.toString(),
                          );

                          fetcher.submit(formData, {
                            method: "POST",
                            encType: "multipart/form-data",
                          });
                        }
                      }}
                    >
                      {t("actions.end")}&nbsp;
                      <CountDownTimer countDownDate={new Date(day.timeEnd)} />
                    </Button>
                  ) : null,
                (
                  day: JobMobileViewInterface["entity"]["days"][0],
                  action: JobMobileViewInterface["entity"]["days"][0]["action"],
                ) =>
                  action === "end" ? (
                    <Fragment key="end">
                      <Typography
                        component={"p"}
                        variant="Bold_14"
                        sx={(theme) => ({
                          color: theme.vars.palette["Corp_1"],
                        })}
                      >
                        {t("dayStatus.end")}
                      </Typography>
                    </Fragment>
                  ) : null,
                (
                  day: JobMobileViewInterface["entity"]["days"][0],
                  action: JobMobileViewInterface["entity"]["days"][0]["action"],
                ) =>
                  action === "reported" ? (
                    <Fragment key="reported">
                      <Typography
                        component={"p"}
                        variant="Bold_14"
                        sx={(theme) => ({
                          color: theme.vars.palette["Corp_1"],
                        })}
                      >
                        {t("dayStatus.reported")}
                      </Typography>
                    </Fragment>
                  ) : null,
                (
                  day: JobMobileViewInterface["entity"]["days"][0],
                  action: JobMobileViewInterface["entity"]["days"][0]["action"],
                ) =>
                  action === "accept" ? (
                    <Fragment key="accept">
                      <Typography
                        component={"p"}
                        variant="Bold_14"
                        sx={(theme) => ({
                          color: theme.vars.palette["Corp_1"],
                        })}
                      >
                        {t("dayStatus.accept")}
                      </Typography>
                    </Fragment>
                  ) : null,
                (
                  day: JobMobileViewInterface["entity"]["days"][0],
                  action: JobMobileViewInterface["entity"]["days"][0]["action"],
                ) =>
                  action === "forPay" ? (
                    <Button
                      key="forPay"
                      // startIcon={<CheckIcon />}
                      variant="contained"
                      onClick={() => {
                        fetcher.submit(
                          JSON.stringify({
                            _action: JOB_ACTIONS.forPay,
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
                  ) : null,
                (
                  day: JobMobileViewInterface["entity"]["days"][0],
                  action: JobMobileViewInterface["entity"]["days"][0]["action"],
                ) =>
                  action === "paid" ? (
                    <Fragment key="paid">
                      <Typography
                        component={"p"}
                        variant="Bold_14"
                        sx={(theme) => ({
                          color: theme.vars.palette["Corp_1"],
                        })}
                      >
                        {t("dayStatus.paid")}
                      </Typography>
                    </Fragment>
                  ) : null,
              ]
        }
      />

      {/* <JobMobileFormView
        entity={loaderData.entity}
        locations={loaderData.locations}
        formID="formView"
        submitAction={(values) => {
          console.log(values);
        }}
        ref={formRef}
        projectTimeRange={loaderData.projectTimeRange}
      />
      <button type="submit" form="formView">
        Submit Form
      </button>
      <button
        type="button"
        onClick={() => {
          if (formRef.current) {
            formRef.current.requestSubmit();
          }
        }}
      >
        Ref submit form
      </button> */}

      <Box
        sx={{
          padding: "0 16px 16px 16px",
          display: "grid",
          rowGap: "8px",
        }}
      >
        {loaderData.job.status === 1 ? (
          <>
            <Button
              startIcon={<CheckIcon />}
              variant="contained"
              onClick={() => {
                fetcher.submit(
                  JSON.stringify({
                    _action: JOB_ACTIONS.accept,
                    bidId: loaderData.job.id,
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
            <Button
              variant="text"
              onClick={() => {
                fetcher.submit(
                  JSON.stringify({
                    _action: JOB_ACTIONS.deny,
                    bidId: loaderData.job.id,
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
          </>
        ) : null}

        {loaderData.job.oneDayJob ? (
          <>
            {loaderData.job.oneDayJobAction === "start" ? (
              <Button
                key="start"
                startIcon={<PlayArrowOutlinedIcon />}
                variant="contained"
                onClick={() => {
                  fetcher.submit(
                    JSON.stringify({
                      _action: JOB_ACTIONS.start,
                      bidId: loaderData.job.id,
                    }),
                    {
                      method: "POST",
                      encType: "application/json",
                    },
                  );
                }}
              >
                {t("actions.start")}
              </Button>
            ) : null}
            {loaderData.job.oneDayJobAction === "inProgress" ? (
              <Button
                key="inProgress"
                startIcon={<CheckIcon />}
                variant="contained"
                disabled={isAfter(new Date(loaderData.job.dateEnd), new Date())}
                onClick={() => {
                  if (loaderData.job.needPhoto) {
                    setOpenFilesPopup(true);
                  } else {
                    const formData = new FormData();

                    formData.append("bidId", loaderData.job.id.toString());

                    fetcher.submit(formData, {
                      method: "POST",
                      encType: "multipart/form-data",
                    });
                  }
                }}
              >
                {t("actions.end")}&nbsp;
                <CountDownTimer
                  countDownDate={new Date(loaderData.job.dateEnd)}
                />
              </Button>
            ) : null}
            {loaderData.job.oneDayJobAction === "end" ? (
              <Fragment key="end">
                <Typography
                  component={"p"}
                  variant="Bold_18"
                  sx={(theme) => ({
                    color: theme.vars.palette["Corp_1"],
                    textAlign: "center",
                  })}
                >
                  {t("dayStatus.end")}
                </Typography>
              </Fragment>
            ) : null}
            {loaderData.job.oneDayJobAction === "reported" ? (
              <Fragment key="reported">
                <Typography
                  component={"p"}
                  variant="Bold_18"
                  sx={(theme) => ({
                    color: theme.vars.palette["Corp_1"],
                    textAlign: "center",
                  })}
                >
                  {t("dayStatus.reported")}
                </Typography>
              </Fragment>
            ) : null}
            {loaderData.job.oneDayJobAction === "accept" ? (
              <Fragment key="accept">
                <Typography
                  component={"p"}
                  variant="Bold_18"
                  sx={(theme) => ({
                    color: theme.vars.palette["Corp_1"],
                    textAlign: "center",
                  })}
                >
                  {t("dayStatus.accept")}
                </Typography>
              </Fragment>
            ) : null}
            {loaderData.job.oneDayJobAction === "forPay" ? (
              <Button
                key="forPay"
                // startIcon={<CheckIcon />}
                variant="contained"
                onClick={() => {
                  fetcher.submit(
                    JSON.stringify({
                      _action: JOB_ACTIONS.forPay,
                      reportId: loaderData.job.oneDayReportId,
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
            ) : null}
            {loaderData.job.oneDayJobAction === "paid" ? (
              <Fragment key="paid">
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
              </Fragment>
            ) : null}
          </>
        ) : null}

        {loaderData.job.status === 2 || loaderData.job.status === 5 ? (
          <Button
            variant="text"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  bidId: loaderData.job.id,
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

      <FilesPopup
        open={openFilesPopup}
        onClose={() => {
          setOpenFilesPopup(false);
        }}
        onSubmit={async (files) => {
          const formData = new FormData();

          formData.append("bidId", loaderData.job.id.toString());

          files.forEach((file) => {
            formData.append(`files[]`, file, file.name);
          });

          fetcher.submit(formData, {
            method: "POST",
            encType: "multipart/form-data",
          });
          setOpenFilesPopup(false);
        }}
      />

      <Snackbar
        open={fetcher.data && fetcher.data.success === true ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          fetcher.reset();
        }}
      >
        <Alert
          severity="info"
          variant="small"
          color="Corp_2"
          sx={{
            width: "100%",
          }}
        >
          {t("acceptAlertText")}
        </Alert>
      </Snackbar>
    </>
  );
}
