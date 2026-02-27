import {
  useNavigation,
  useNavigate,
  useSubmit,
  redirect,
  useFetcher,
} from "react-router";
import { useState, Fragment } from "react";
import type { Route } from "./+types/job";

import type { JobMobileViewInterface } from "./JobMobileView/JobMobileViewInterface";
import { useTranslation } from "react-i18next";
import { useStore } from "~/store/store";
import { withLocale } from "~/shared/withLocale";
import { determineRole } from "~/shared/determineRole";

import { isWithinInterval, subHours } from "date-fns";

// import { JobMobileFormView } from "./JobMobileView/JobMobileFormView";
import { JobMobileStaticView } from "./JobMobileView/JobMobileStaticView";

import { FilesPopup } from "./components/FilesPopup";
import { CountDownTimer } from "./components/CountDownTimer";

import Box from "@mui/material/Box";
import { Button, Typography, Snackbar, Alert } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import CheckIcon from "@mui/icons-material/Check";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

import { getJob } from "~/requests/_personal/getJob/getJob";
import { postAcceptBid } from "~/requests/_personal/postAcceptBid/postAcceptBid";
import { postStartDay } from "~/requests/_personal/postStartDay/postStartDay";
import { postRejectBid } from "~/requests/_personal/postRejectBid/postRejectBid";
import { postEndDay } from "~/requests/_personal/postEndDay/postEndDay";
import { postPayReport } from "~/requests/_personal/postPayReport/postPayReport";
// import { postEndJob } from "~/requests/_personal/postEndJob/postEndJob";
// import { postEndSpecialistJob } from "~/requests/_personal/postEndSpecialistJob/postEndSpecialistJob";

type MobileModeData = {
  mode: "mobile";
  entity: JobMobileViewInterface["entity"];
  locations: JobMobileViewInterface["locations"];
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const mode = "mobile";
  let data;
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (mode === "mobile") {
      const locations: MobileModeData["locations"] = [];

      const missionData = await getJob(
        accessToken,
        params.specialistId,
        params.jobId,
      );

      const entity: JobMobileViewInterface["entity"] = {
        id: missionData.data.id,
        logo: `${import.meta.env.VITE_ASSET_PATH}${missionData.data.viewActivity.logo}`,
        status: missionData.data.acceptingUser.status,
        place: {
          id: missionData.data.place.id,
          name: missionData.data.place.name,
          logo: `${import.meta.env.VITE_ASSET_PATH}${missionData.data.place.logo}`,
        },
        activity: missionData.data.viewActivity.name,
        activityDetailsText: missionData.data.viewActivity.detailText,
        unitPrice: missionData.data.price,
        dateStart: new Date(missionData.data.dateStart),
        dateEnd: new Date(missionData.data.dateEnd),
        income: missionData.data.income,
        forPay: missionData.data.forPay,
        days: (() => {
          const days: JobMobileViewInterface["entity"]["days"] = [];

          missionData.data.dateActivity.forEach((day) => {
            const locations: JobMobileViewInterface["entity"]["days"][0]["locations"] =
              [];

            const actedDay = missionData.data.reports.find(
              (item) => item.dayActivityId === day.id,
            );

            day.places.forEach((place) => {
              locations.push({
                id: place.id,
                name: place.name,
                logo: place.logo ? place.logo : "",
              });
            });

            days.push({
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

                if (
                  canStart &&
                  !actedDay &&
                  missionData.data.acceptingUser.status === 5
                ) {
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
            });
          });

          return days;
        })(),
        needDays: missionData.data.dateActivity.length > 0 ? true : false,
        needPhoto: missionData.data.needFoto,
        travelling: missionData.data.viewActivity.traveling,
        user: {
          id: missionData.data.user.id,
          logo: missionData.data.user.logo,
          name: missionData.data.user.name,
          role: determineRole(missionData.data.user.roles),
          phone: missionData.data.user.phone.toString(),
        },
        oneDayJob: missionData.data.dateActivity.length === 0 ? true : false,
        oneDayJobAction: (() => {
          let action: JobMobileViewInterface["entity"]["oneDayJobAction"] =
            "none";

          const oneDayJob =
            missionData.data.dateActivity.length === 0 ? true : false;

          if (oneDayJob) {
            const actedDay = missionData.data.reports.length > 0 ? true : false;

            const now = new Date();

            const canStart = isWithinInterval(now, {
              start: subHours(new Date(missionData.data.dateStart), 1),
              end: new Date(missionData.data.dateEnd),
            });

            if (
              canStart &&
              !actedDay &&
              missionData.data.acceptingUser.status === 5
            ) {
              action = "start";
            }

            if (actedDay) {
              if (missionData.data.reports[0].status === 1) {
                action = "inProgress";
              } else if (missionData.data.reports[0].status === 2) {
                action = "end";
              } else if (missionData.data.reports[0].status === 3) {
                action = "reported";
              } else if (missionData.data.reports[0].status === 4) {
                action = "accept";
              } else if (missionData.data.reports[0].status === 5) {
                action = "forPay";
              } else if (missionData.data.reports[0].status === 6) {
                action = "paid";
              } else if (missionData.data.reports[0].status === 7) {
                action = "notEnded";
              }
            }
          }

          return action;
        })(),
        oneDayReportId:
          missionData.data.reports.length > 0
            ? missionData.data.reports[0].id
            : null,
      };

      data = {
        mode,
        entity,
        locations,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  request,
  // params,
}: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const requestType = request.headers.get("content-type");
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (requestType === "application/json") {
      const { _action, ...fields } = await request.json();
      if (_action === "accept") {
        await postAcceptBid(accessToken, fields.bidId);
        return {
          success: true,
        };
      } else if (_action === "deny") {
        await postRejectBid(accessToken, fields.bidId);
        throw redirect(currentURL.toString());
      } else if (_action === "start") {
        await postStartDay(accessToken, fields.bidId);
        throw redirect(currentURL.toString());
      } else if (_action === "forPay") {
        await postPayReport(accessToken, fields.reportId);
        throw redirect(currentURL.toString());
      }
    } else {
      const formData = await request.formData();

      const bidId = formData.get("bidId") as string;
      const files = formData.getAll("files[]") as File[];

      await postEndDay(accessToken, bidId, files);
      throw redirect(currentURL.toString());
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Job({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const fetcher = useFetcher<typeof clientAction>();
  const { t } = useTranslation("job");

  // const formRef = useRef<HTMLFormElement>(null);

  const [openFilesPopup, setOpenFilesPopup] = useState<boolean>(false);

  return loaderData.mode === "mobile" ? (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text:
            loaderData.entity.status === 1 || loaderData.entity.status === 4
              ? `${t("bid")} ${loaderData.entity.id}`
              : `${t("job")} ${loaderData.entity.id}`,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/jobs"), {
            viewTransition: true,
          });
        }}
      />

      <JobMobileStaticView
        entity={loaderData.entity}
        actions={
          loaderData.entity.status === 1
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
                          submit(
                            JSON.stringify({
                              _action: "start",
                              bidId: loaderData.entity.id,
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
                      disabled={
                        !isWithinInterval(new Date(), {
                          start: subHours(new Date(day.timeEnd), 1),
                          end: new Date(day.timeEnd),
                        })
                      }
                      onClick={() => {
                        if (loaderData.entity.needPhoto) {
                          setOpenFilesPopup(true);
                        } else {
                          const formData = new FormData();

                          formData.append(
                            "bidId",
                            loaderData.entity.id.toString(),
                          );

                          submit(formData, {
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
                        submit(
                          JSON.stringify({
                            _action: "forPay",
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

      {/*<JobMobileFormView
        entity={loaderData.entity}
        locations={loaderData.locations}
        formID="formView"
        submitAction={(values) => {
          console.log(values);
        }}
        ref={formRef}
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
      </button>*/}

      <Box
        sx={{
          padding: "0 16px 16px 16px",
          display: "grid",
          rowGap: "8px",
        }}
      >
        {loaderData.entity.status === 1 ? (
          <>
            <Button
              startIcon={<CheckIcon />}
              variant="contained"
              onClick={() => {
                fetcher.submit(
                  JSON.stringify({
                    _action: "accept",
                    bidId: loaderData.entity.id,
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
                submit(
                  JSON.stringify({
                    _action: "deny",
                    bidId: loaderData.entity.id,
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

        {loaderData.entity.oneDayJob ? (
          <>
            {loaderData.entity.oneDayJobAction === "start" ? (
              <Button
                key="start"
                startIcon={<PlayArrowOutlinedIcon />}
                variant="contained"
                onClick={() => {
                  submit(
                    JSON.stringify({
                      _action: "start",
                      bidId: loaderData.entity.id,
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
            {loaderData.entity.oneDayJobAction === "inProgress" ? (
              <Button
                key="inProgress"
                startIcon={<CheckIcon />}
                variant="contained"
                disabled={
                  !isWithinInterval(new Date(), {
                    start: subHours(new Date(loaderData.entity.dateEnd), 1),
                    end: new Date(loaderData.entity.dateEnd),
                  })
                }
                onClick={() => {
                  if (loaderData.entity.needPhoto) {
                    setOpenFilesPopup(true);
                  } else {
                    const formData = new FormData();

                    formData.append("bidId", loaderData.entity.id.toString());

                    submit(formData, {
                      method: "POST",
                      encType: "multipart/form-data",
                    });
                  }
                }}
              >
                {t("actions.end")}&nbsp;
                <CountDownTimer
                  countDownDate={new Date(loaderData.entity.dateEnd)}
                />
              </Button>
            ) : null}
            {loaderData.entity.oneDayJobAction === "end" ? (
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
            {loaderData.entity.oneDayJobAction === "reported" ? (
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
            {loaderData.entity.oneDayJobAction === "accept" ? (
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
            {loaderData.entity.oneDayJobAction === "forPay" ? (
              <Button
                key="forPay"
                // startIcon={<CheckIcon />}
                variant="contained"
                onClick={() => {
                  submit(
                    JSON.stringify({
                      _action: "forPay",
                      reportId: loaderData.entity.oneDayReportId,
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
            {loaderData.entity.oneDayJobAction === "paid" ? (
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

        {loaderData.entity.status === 2 || loaderData.entity.status === 5 ? (
          <Button
            variant="text"
            onClick={() => {
              submit(
                JSON.stringify({
                  _action: "end",
                  bidId: loaderData.entity.id,
                  // specialistId: loaderData,
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

          formData.append("bidId", loaderData.entity.id.toString());

          files.forEach((file) => {
            formData.append(`files[]`, file, file.name);
          });

          submit(formData, {
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
  ) : null;
}
