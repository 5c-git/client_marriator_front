import {
  useNavigation,
  useNavigate,
  useSubmit,
  redirect,
  Link,
} from "react-router";
import { Fragment } from "react";
import type { Route } from "./+types/specialist-request";

import type { PageInterface } from "./PageInterface";
import { useTranslation } from "react-i18next";
import { useStore } from "~/store/store";
import { withLocale } from "~/shared/withLocale";
import { determineRole } from "~/shared/determineRole";

import { format, getDay, isWithinInterval } from "date-fns";

import { statusCodeMap } from "~/shared/specialistStatus";

import Box from "@mui/material/Box";
import { Button, Avatar, Divider, Typography } from "@mui/material";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import CheckIcon from "@mui/icons-material/Check";

import { getJob } from "~/requests/_personal/getJob/getJob";
import { postAcceptSpecialist } from "~/requests/_personal/postAcceptSpecialist/postAcceptSpecialist";
import { postEndSpecialistJob } from "~/requests/_personal/postEndSpecialistJob/postEndSpecialistJob";
import { postPayReportForManager } from "~/requests/_personal/postPayReportForManager/postPayReportForManager";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<PageInterface & { canCheckAll: boolean }> {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const missionData = await getJob(
      accessToken,
      params.specialistId,
      params.requestId
    );

    const data: PageInterface & { canCheckAll: boolean } = {
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
  const { _action, ...fields } = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action === "accept") {
      await postAcceptSpecialist(
        accessToken,
        fields.bidId,
        params.specialistId
      );
      throw redirect(currentURL.toString());
    } else if (_action === "end") {
      await postEndSpecialistJob(
        accessToken,
        fields.bidId,
        params.specialistId
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
  const navigate = useNavigate();
  const submit = useSubmit();
  const { t } = useTranslation("mission");
  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: `${t("request")} ${loaderData.id}`,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale(`/requests/${loaderData.id}/specialists`), {
            viewTransition: true,
          });
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Avatar
          src={loaderData.logo}
          sx={{ width: "100px", height: "100px", margin: "0 auto" }}
        />

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("statusText")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "14px",
                height: "14px",
                borderRadius: "50px",
              }}
              style={{
                backgroundColor:
                  statusCodeMap[loaderData.status as keyof typeof statusCodeMap]
                    .color,
              }}
            ></Box>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t(
                `status.${
                  statusCodeMap[loaderData.status as keyof typeof statusCodeMap]
                    .value
                }`
              )}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("locationText")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={loaderData.place.logo}
              sx={{ width: "30px", height: "30px" }}
            />
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {loaderData.place.name}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("serviceTypeText")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
            })}
          >
            {loaderData.activity}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            rowGap: "14px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("pricePerUnitText")}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Corp_1"] })}
            >
              {loaderData.unitPrice}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "grid",
                rowGap: "4px",
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t("dateStartText")}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({ color: theme.vars.palette["Black"] })}
              >
                {format(new Date(loaderData.dateStart), "HH:mm dd.LL.yyyy")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                rowGap: "4px",
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t("dateEndText")}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({ color: theme.vars.palette["Black"] })}
              >
                {format(new Date(loaderData.dateEnd), "HH:mm dd.LL.yyyy")}
              </Typography>
            </Box>
          </Box>

          {loaderData.days.map((day, index) => (
            <Fragment key={index}>
              <Divider />
              <Box
                key={day.timeStart}
                sx={{
                  width: "100%",
                  display: "grid",
                  rowGap: "8px",
                }}
              >
                <Typography
                  component="p"
                  variant="Bold_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {/* @ts-ignore */}
                  {`${format(new Date(day.timeStart), "dd.MM")} ${t(`dayMap.${getDay(new Date(day.timeStart))}`)}`}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "14px",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      rowGap: "4px",
                    }}
                  >
                    <Typography
                      component="p"
                      variant="Reg_12"
                      sx={(theme) => ({
                        color: theme.vars.palette["Grey_2"],
                      })}
                    >
                      {t("timeStartText")}
                    </Typography>
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                    >
                      {format(new Date(day.timeStart), "HH:mm")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      rowGap: "4px",
                    }}
                  >
                    <Typography
                      component="p"
                      variant="Reg_12"
                      sx={(theme) => ({
                        color: theme.vars.palette["Grey_2"],
                      })}
                    >
                      {t("timeEndText")}
                    </Typography>
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                    >
                      {format(new Date(day.timeEnd), "HH:mm")}
                    </Typography>
                  </Box>
                </Box>

                {day.places.length > 0 ? (
                  <>
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {t("route")}
                    </Typography>

                    {day.places.map((place) => (
                      <Box
                        sx={{
                          display: "flex",
                          columnGap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          src={place.logo}
                          sx={{ width: "30px", height: "30px" }}
                        />
                        <Typography
                          component="p"
                          variant="Reg_14"
                          sx={(theme) => ({
                            color: theme.vars.palette["Black"],
                          })}
                        >
                          {place.text}
                        </Typography>
                      </Box>
                    ))}
                  </>
                ) : null}

                {day.action === "end" ||
                day.action === "reported" ||
                day.action === "notEnded" ? (
                  <Button
                    component={Link}
                    to={`/requests/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${day.reportId}`}
                    variant="outlined"
                  >
                    {t("actions.check")}
                  </Button>
                ) : null}

                {day.action === "accept" ? (
                  <>
                    <Button
                      component={Link}
                      to={`/requests/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review/${day.reportId}?edit=true`}
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
                          }
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
              </Box>
            </Fragment>
          ))}

          <Divider />

          <StyledCheckbox
            inputType="checkbox"
            name="needPhoto"
            label={t("photoCheckbox")}
            value={loaderData.needPhoto}
            onChange={() => {}}
            onImmediateChange={() => {}}
            validation="none"
            disabled
          />
        </Box>
      </Box>

      <Box
        sx={{
          padding: "0 16px 16px 16px",
          display: "grid",
          rowGap: "8px",
        }}
      >
        {loaderData.status === 4 ? (
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
        ) : null}

        {loaderData.canCheckAll ? (
          <Button
            component={Link}
            to={`/requests/${loaderData.id}/specialists/${loaderData.specialist.id}/day-review`}
            variant="outlined"
          >
            {t("actions.acceptAll")}
          </Button>
        ) : null}

        {loaderData.status === 1 ||
        loaderData.status === 2 ||
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
    </>
  );
}
