import { useNavigation, useNavigate, useSubmit, redirect } from "react-router";
import { Fragment, useState } from "react";
import type { Route } from "./+types/mission";

import type { PageInterface } from "./PageInterface";
import { useTranslation } from "react-i18next";
import { useStore } from "~/store/store";
import { withLocale } from "~/shared/withLocale";
import { determineRole } from "~/shared/determineRole";

import {
  isWithinInterval,
  differenceInHours,
  addHours,
  subHours,
} from "date-fns";

import { StaticView } from "./StaticView";
import { FormView } from "./FormView";
import { FilesPopup } from "./components/FilesPopup";

import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { CountDownTimer } from "./CountDownTimer";

import CheckIcon from "@mui/icons-material/Check";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

import { getJob } from "~/requests/_personal/getJob/getJob";

import { postAcceptBid } from "~/requests/_personal/postAcceptBid/postAcceptBid";
import { postStartDay } from "~/requests/_personal/postStartDay/postStartDay";
import { postRejectBid } from "~/requests/_personal/postRejectBid/postRejectBid";
import { postEndDay } from "~/requests/_personal/postEndDay/postEndDay";
import { postPayReport } from "~/requests/_personal/postPayReport/postPayReport";

import { postEndJob } from "~/requests/_personal/postEndJob/postEndJob";
import { postEndSpecialistJob } from "~/requests/_personal/postEndSpecialistJob/postEndSpecialistJob";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<PageInterface> {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const missionData = await getJob(
      accessToken,
      params.specialistId,
      params.missionId
    );

    const data: PageInterface = {
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
        const days: PageInterface["days"] = [];

        missionData.data.dateActivity.forEach((day) => {
          const places: { id: number; logo: string; text: string }[] = [];

          const actedDay = missionData.data.reports.find(
            (item) => item.dayActivityId === day.id
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
              let action: PageInterface["days"][0]["action"] = "none";

              const now = new Date();

              const canStart = isWithinInterval(now, {
                start: subHours(new Date(day.timeStart), 1),
                end: addHours(new Date(day.timeEnd), 1),
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
      needPhoto: missionData.data.needFoto,
      user: {
        id: missionData.data.user.id,
        logo: missionData.data.user.logo,
        name: missionData.data.user.name,
        role: determineRole(missionData.data.user.roles),
        phone: missionData.data.user.phone.toString(),
      },
    };

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const requestType = await request.headers.get("content-type");
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (requestType === "application/json") {
      const { _action, ...fields } = await request.json();
      if (_action === "accept") {
        await postAcceptBid(accessToken, fields.bidId);
        throw redirect(currentURL.toString());
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

export default function Index({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const { t } = useTranslation("mission");
  const accessToken = useStore.getState().accessToken;

  const [openFilesPopup, setOpenFilesPopup] = useState<boolean>(false);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text:
            loaderData.status === 1 || loaderData.status === 4
              ? `${t("request")} ${loaderData.id}`
              : `${t("mission")} ${loaderData.id}`,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/missions"), {
            viewTransition: true,
          });
        }}
      />

      <StaticView
        data={loaderData}
        actions={
          loaderData.status === 1
            ? []
            : [
                (
                  day: PageInterface["days"][0],
                  action: PageInterface["days"][0]["action"]
                ) =>
                  action === "start" ? (
                    <Button
                      key="start"
                      startIcon={<PlayArrowOutlinedIcon />}
                      variant="contained"
                      onClick={() => {
                        submit(
                          JSON.stringify({
                            _action: "start",
                            bidId: loaderData.id,
                          }),
                          {
                            method: "POST",
                            encType: "application/json",
                          }
                        );
                      }}
                    >
                      {t("actions.start")}
                    </Button>
                  ) : null,
                (
                  day: PageInterface["days"][0],
                  action: PageInterface["days"][0]["action"]
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
                        if (loaderData.needPhoto) {
                          setOpenFilesPopup(true);
                        } else {
                          const formData = new FormData();

                          formData.append("bidId", loaderData.id.toString());

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
                  day: PageInterface["days"][0],
                  action: PageInterface["days"][0]["action"]
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
                  day: PageInterface["days"][0],
                  action: PageInterface["days"][0]["action"]
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
                  day: PageInterface["days"][0],
                  action: PageInterface["days"][0]["action"]
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
                  day: PageInterface["days"][0],
                  action: PageInterface["days"][0]["action"]
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
                          }
                        );
                      }}
                    >
                      {t("actions.forPay")}
                    </Button>
                  ) : null,
                (
                  day: PageInterface["days"][0],
                  action: PageInterface["days"][0]["action"]
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

      {/* <FormView
        data={loaderData}
        formID="formView"
        action={(values) => {
          console.log(values);
        }}
      /> */}

      {/* <button type="submit" form="formView">
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
        Test Form
      </button> */}

      <Box
        sx={{
          padding: "0 16px 16px 16px",
          display: "grid",
          rowGap: "8px",
        }}
      >
        {loaderData.status === 1 ? (
          <>
            <Button
              startIcon={<CheckIcon />}
              variant="contained"
              onClick={() => {
                submit(
                  JSON.stringify({
                    _action: "accept",
                    bidId: loaderData.id,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  }
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
                    bidId: loaderData.id,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  }
                );
              }}
            >
              {t("actions.cancel")}
            </Button>
          </>
        ) : null}

        {loaderData.status === 2 && loaderData.days.length === 0 ? (
          <Button
            startIcon={<PlayArrowOutlinedIcon />}
            variant="contained"
            onClick={() => {
              submit(
                JSON.stringify({
                  _action: "start",
                  bidId: loaderData.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            {t("actions.start")}
          </Button>
        ) : null}

        {loaderData.status === 2 ||
        loaderData.status === 4 ||
        loaderData.status === 5 ? (
          <Button
            variant="text"
            onClick={() => {
              submit(
                JSON.stringify({
                  _action: "end",
                  bidId: loaderData.id,
                  specialistId: loaderData,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
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

          formData.append("bidId", loaderData.id.toString());

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
    </>
  );
}
