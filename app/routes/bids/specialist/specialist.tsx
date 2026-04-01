import { useNavigation, useSubmit, redirect, Link } from "react-router";

import type { Route } from "./+types/specialist";
import type { SpecialistMobileViewInterface } from "./SpecialistMobileView/SpecialistMobileViewInterface";

import { useStore } from "~/store/store";
import { determineRole } from "~/shared/determineRole";

import { useTranslation } from "react-i18next";

import { isWithinInterval, subHours } from "date-fns";

import { SpecialistMobileView } from "./SpecialistMobileView/SpecialistMobileView";

import { Loader } from "~/shared/ui/Loader/Loader";

import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import { getJob } from "~/requests/_personal/getJob/getJob";
import { postAcceptSpecialist } from "~/requests/_personal/postAcceptSpecialist/postAcceptSpecialist";
import { postEndSpecialistJob } from "~/requests/_personal/postEndSpecialistJob/postEndSpecialistJob";
import { postPayReportForManager } from "~/requests/_personal/postPayReportForManager/postPayReportForManager";

type MobileModeData = SpecialistMobileViewInterface & { mode: "mobile" };

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (mode === "mobile") {
      const missionData = await getJob(
        accessToken,
        params.specialistId,
        params.bidId,
      );

      data = {
        mode: "mobile",
        entity: {
          id: missionData.data.id,
          logo: `${import.meta.env.VITE_ASSET_PATH}${missionData.data.viewActivity.logo}`,
          status: missionData.data.acceptingUser.status,
          place: {
            id: missionData.data.place.id,
            name: missionData.data.place.name,
            logo: `${import.meta.env.VITE_ASSET_PATH}${missionData.data.place.logo}`,
          },
          activity: missionData.data.viewActivity.name,
          unitPrice: missionData.data.price,
          dateStart: missionData.data.dateStart,
          dateEnd: missionData.data.dateEnd,
          days: (() => {
            const days: SpecialistMobileViewInterface["entity"]["days"] = [];

            missionData.data.dateActivity.forEach((day) => {
              const places: { id: number; logo: string; text: string }[] = [];

              const actedDay = missionData.data.reports.find(
                (item) => item.dayActivityId === day.id,
              );

              day.places.forEach((place) => {
                places.push({
                  id: place.id,
                  logo: place.logo ? place.logo : "",
                  text: place.name,
                });
              });

              days.push({
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
              });
            });

            return days;
          })(),
          needPhoto: missionData.data.needFoto,
          user: {
            id: missionData.data.user.id,
            logo: missionData.data.user.logo,
            name: missionData.data.user.name,
            role: determineRole(missionData.data.user.roles),
            phone: missionData.data.user.phone.toString(),
          },
          specialist: {
            id: missionData.data.acceptingUser.id,
            logo: missionData.data.acceptingUser.logo,
            name: missionData.data.acceptingUser.name,
            role: determineRole(missionData.data.acceptingUser.roles),
            phone: missionData.data.acceptingUser.phone.toString(),
          },
          canCheckAll: (() => {
            const validReports: number[] = [];

            missionData.data.reports.forEach((report) => {
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
          oneDayJob: missionData.data.dateActivity.length === 0 ? true : false,
          oneDayJobAction: (() => {
            let action: SpecialistMobileViewInterface["entity"]["oneDayJobAction"] =
              "none";

            const oneDayJob =
              missionData.data.dateActivity.length === 0 ? true : false;

            if (oneDayJob) {
              const actedDay =
                missionData.data.reports.length > 0 ? true : false;

              const now = new Date();

              const canStart = isWithinInterval(now, {
                start: subHours(new Date(missionData.data.dateStart), 1),
                end: subHours(new Date(missionData.data.dateEnd), 1),
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
          units: missionData.data.viewActivity.standard.name,
          currency: "₽",
        },
      } as SpecialistMobileViewInterface;
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
  const { _action, ...fields } = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action === "accept") {
      await postAcceptSpecialist(
        accessToken,
        fields.bidId,
        params.specialistId,
      );
      throw redirect(currentURL.toString());
    } else if (_action === "end") {
      await postEndSpecialistJob(
        accessToken,
        fields.bidId,
        params.specialistId,
      );
      throw redirect(currentURL.toString());
    } else if (_action === "forPay") {
      await postPayReportForManager(accessToken, fields.reportId);
      throw redirect(currentURL.toString());
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function SpecialistRequest({
  loaderData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const submit = useSubmit();
  const { t } = useTranslation("job");

  return loaderData.mode === "mobile" ? (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}
      <SpecialistMobileView
        entity={loaderData.entity}
        dayActionSlot={(day) => (
          <>
            {day.action === "end" ||
            day.action === "reported" ||
            day.action === "notEnded" ? (
              <Button
                component={Link}
                to={`/bids/${loaderData.entity.id}/specialists/${loaderData.entity.specialist.id}/day-review/${day.reportId}`}
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
                  to={`/bids/${loaderData.entity.id}/specialists/${loaderData.entity.specialist.id}/day-review/${day.reportId}?edit=true`}
                  variant="outlined"
                >
                  {t("actions.edit")}
                </Button>
                <Button
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
                  submit(
                    JSON.stringify({
                      _action: "accept",
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
                to={`/bids/${entity.id}/specialists/${entity.specialist.id}/day-review`}
                variant="outlined"
              >
                {t("actions.acceptAll")}
              </Button>
            ) : null}

            {loaderData.entity.oneDayJob ? (
              <>
                {loaderData.entity.oneDayJobAction === "end" ||
                loaderData.entity.oneDayJobAction === "reported" ||
                loaderData.entity.oneDayJobAction === "notEnded" ? (
                  <Button
                    component={Link}
                    to={`/bids/${loaderData.entity.id}/specialists/${loaderData.entity.specialist.id}/day-review/${loaderData.entity.oneDayReportId}`}
                    variant="outlined"
                  >
                    {t("actions.check")}
                  </Button>
                ) : null}
                {loaderData.entity.oneDayJobAction === "accept" ? (
                  <>
                    <Button
                      component={Link}
                      to={`/bids/${loaderData.entity.id}/specialists/${loaderData.entity.specialist.id}/day-review/${loaderData.entity.oneDayReportId}?edit=true`}
                      variant="outlined"
                    >
                      {t("actions.edit")}
                    </Button>
                    <Button
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
                  </>
                ) : null}
                {loaderData.entity.oneDayJobAction === "forPay" ? (
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
                {loaderData.entity.oneDayJobAction === "paid" ? (
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
                  submit(
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
    </>
  ) : null;
}
