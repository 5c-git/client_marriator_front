import { useState, ComponentPropsWithoutRef } from "react";
import {
  useNavigation,
  useNavigate,
  useFetcher,
  Link,
  redirect,
  useSubmit,
} from "react-router";
import type { Route } from "./+types/task";
import type { EntityMobileViewInterface } from "~/shared/ui/EntityMobileView/EntityMobileViewInterface";
import type { RequestSearchDrawerInterface } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawerInterface";
import type { PostUpdateSearchPayload } from "~/requests/_personal/postUpdateSearch/postUpdateSearch";

import { useStore } from "~/store/store";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";
import { determineRole } from "~/shared/determineRole";

import { EntityStaticMobileView } from "../../../shared/ui/EntityMobileView/EntityStaticMobileView";
import { EntityEditMobileView } from "../../../shared/ui/EntityMobileView/EntityEditMobileView";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";
import { RadioSearchableDrawer } from "~/shared/ui/RadioSearchableDrawer/RadioSearchableDrawer";
import { RequestSearchDrawer } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawer";

import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { RouteIcon } from "~/shared/icons/RouteIcon";

import { getTask } from "~/requests/_personal/getTask/getTask";
import { getSupervisorsForTask } from "~/requests/_personal/getSupervisorsForTask/getSupervisorsForTask";
import { postDeleteTaskActivity } from "~/requests/_personal/postDeleteTaskActivity/postDeleteTaskActivity";
import { postCreateBidFromTask } from "~/requests/_personal/postCreateBidFromTask/postCreateBidFromTask";
import { postInstructTask } from "~/requests/_personal/postInstructTask/postInstructTask";
import { postInvoiceTask } from "~/requests/_personal/postInvoiceTask/postInvoiceTask";
import { postAcceptTask } from "~/requests/_personal/postAcceptTask/postAcceptTask";

import { getPlaceForBid } from "~/requests/_personal/getPlaceForBid/getPlaceForBid";
import { postCreateSearchFromTask } from "~/requests/_personal/postCreateSearchFromTask/postCreateSearchFromTask";
import { postUpdateSearch } from "~/requests/_personal/postUpdateSearch/postUpdateSearch";

type MobileModeData = {
  mode: "mobile";
  entity: EntityMobileViewInterface["entity"];
  locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[];
  supervisorsToSelect: ComponentPropsWithoutRef<
    typeof StyledCheckboxMultiple
  >["options"];
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  const accessToken = useStore.getState().accessToken;
  const userRole = useStore.getState().userRole;

  let data;

  if (accessToken) {
    if (mode === "mobile") {
      const task: MobileModeData["entity"] = {
        id: params.taskId,
        status: -1,
        place: {
          id: -1,
          name: "",
          logo: "",
          region: "",
        },
        selfEmployed: false,
        services: [],
        route: 0,
        project: null,
        creatingPerson: null,
        acceptingPerson: null,
        invitedPersons: [],
      };

      const locations: MobileModeData["locations"] = [];

      const supervisorsToSelect: MobileModeData["supervisorsToSelect"] = [];

      const taskData = await getTask(accessToken, params.taskId);

      task.status = taskData.data.status;
      task.place.name = taskData.data.place.name;
      task.place.logo = taskData.data.place.logo;
      task.place.region = taskData.data.place.region.name;
      task.selfEmployed = taskData.data.selfEmployed;
      task.project = {
        id: taskData.data.project.id,
        logo: taskData.data.project.brand[0].logo,
        name: taskData.data.project.name,
      };
      task.creatingPerson = taskData.data.user
        ? {
            id: taskData.data.user.id,
            role: determineRole(taskData.data.user.roles),
            name: taskData.data.user.name,
            phone: taskData.data.user.phone,
            email: taskData.data.user.email,
            logo: taskData.data.user.logo,
          }
        : null;
      task.acceptingPerson = taskData.data.acceptUser
        ? {
            id: taskData.data.acceptUser.id,
            role: determineRole(taskData.data.acceptUser.roles),
            name: taskData.data.acceptUser.name,
            phone: taskData.data.acceptUser.phone,
            email: taskData.data.acceptUser.email,
            logo: taskData.data.acceptUser.logo,
          }
        : null;
      taskData.data.orderActivities.forEach((item) => {
        let routeCount = 0;
        // считаем количество точек в маршруте
        item.dateActivity.forEach((t) => {
          routeCount = routeCount + t.places.length;
        });
        // считаем количество точек в маршруте

        task.services.push({
          id: item.id,
          count: item.count,
          name: item.viewActivity.name,
          route: routeCount,

          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          countSearch: item.countSearch,
          buttonBidNeed: item.buttonBidNeed,
          buttonSearchNeed: item.buttonSearchNeed,
        });
      });
      taskData.data.acceptedUser.forEach((item) => {
        task.invitedPersons.push({
          id: item.id,
          role: determineRole(item.roles),
          name: item.name,
          phone: item.phone,
          email: item.email,
          logo: item.logo,
        });
      });

      if (userRole === "manager" || userRole === "supervisor") {
        const locationsData = await getPlaceForBid(accessToken);

        locationsData.data.forEach((item) => {
          locations.push({
            value: item.id.toString(),
            label: `${item.name} ${item.region.name}`,
            logo: item.logo,
            disabled: false,
          });
        });
      }

      if (userRole === "manager") {
        const supervisorsToSelectData = await getSupervisorsForTask(
          accessToken,
          params.taskId,
        );

        supervisorsToSelectData.data.forEach((sepervisorToSelect) => {
          supervisorsToSelect.push({
            value: sepervisorToSelect.id.toString(),
            label: sepervisorToSelect.name,
            disabled: false,
          });
        });
      }

      data = {
        mode: "mobile",
        entity: task,
        locations,
        supervisorsToSelect,
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
  const { _action, ...fields } = await request.json();
  const accessToken = useStore.getState().accessToken;
  if (accessToken) {
    if (_action === "deleteActivity") {
      await postDeleteTaskActivity(
        accessToken,
        fields.taskId,
        fields.taskActivityId,
      );
    } else if (_action === "transformActivity") {
      const transformedRequestData = await postCreateBidFromTask(
        accessToken,
        fields.taskId,
        fields.taskActivityId,
      );
      throw redirect(withLocale(`/bids/${transformedRequestData.data.id}`));
    } else if (_action === "requestSearch") {
      const searchRequestData = await postCreateSearchFromTask(
        accessToken,
        fields.taskId,
        fields.taskActivityId,
      );

      const entity: RequestSearchDrawerInterface["entity"] = {
        id: searchRequestData.data.id,
        logo: searchRequestData.data.viewActivity.logo,
        place: {
          id: searchRequestData.data.place.id,
          name: searchRequestData.data.place.name,
          logo: searchRequestData.data.place.logo,
        },
        project: {
          id: searchRequestData.data.project.id,
          name: searchRequestData.data.project.name,
        },
        activity: {
          id: searchRequestData.data.viewActivity.id,
          name: searchRequestData.data.viewActivity.name,
          travelling: searchRequestData.data.viewActivity.traveling,
        },
        unitPrice: searchRequestData.data.price
          ? searchRequestData.data.price
          : 0,
        finalPrice: searchRequestData.data.priceResult,
        radius: searchRequestData.data.radius
          ? searchRequestData.data.radius
          : 0,
        dateStart: new Date(searchRequestData.data.dateStart),
        dateEnd: new Date(searchRequestData.data.dateEnd),
        responsiblePerson: {
          id: searchRequestData.data.user.id,
          phone: searchRequestData.data.user.phone,
          email: searchRequestData.data.user.email,
          logo: searchRequestData.data.user.logo,
          roles: searchRequestData.data.user.roles,
        },
        taskId: searchRequestData.data.task
          ? searchRequestData.data.task.id
          : null,
        orderId: searchRequestData.data.order
          ? searchRequestData.data.order.id
          : null,
        selfEmployed: searchRequestData.data.selfEmployed,
        amount: searchRequestData.data.count,
        needDays: searchRequestData.data.dateActivity.length > 0,
        needFoto: searchRequestData.data.needFoto,
        days: (() => {
          const days: RequestSearchDrawerInterface["entity"]["days"] = [];

          searchRequestData.data.dateActivity.forEach((date) => {
            const locations: RequestSearchDrawerInterface["entity"]["days"][0]["locations"] =
              [];

            date.places.forEach((location) => {
              locations.push({
                id: location.id.toString(),
                name: location.name,
                logo: location.logo ? location.logo : "",
              });
            });

            days.push({
              timeStart: new Date(date.timeStart),
              timeEnd: new Date(date.timeEnd),
              needRoute: locations.length > 0 ? true : false,
              locations: locations,
            });
          });

          return days;
        })(),
      };

      return entity;
    } else if (_action === "_updateSearchRequest") {
      await postUpdateSearch(accessToken, fields.searchId, fields.payload);
    } else if (_action === "_inviteSupervisors") {
      await postInvoiceTask(accessToken, params.taskId, fields.supervisors);
    } else if (_action === "_makeResponsible") {
      await postInstructTask(accessToken, fields.taskId, fields.supervisorId);
    } else if (_action === "_acceptTask") {
      await postAcceptTask(accessToken, fields.taskId);
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Task({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const { t } = useTranslation("task");
  const userRole = useStore.getState().userRole;
  const userId = useStore.getState().userId;

  const fetcher = useFetcher<RequestSearchDrawerInterface["entity"]>();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [searchSupervisors, setSearchSupervisors] = useState<boolean>(false);
  const [searchResponsibleSupervisors, setSearchResponsibleSupervisors] =
    useState<boolean>(false);
  const [serviceToDelete, setServiceToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  return (
    <>
      {loaderData.mode === "mobile" ? (
        <>
          {navigation.state !== "idle" ? <Loader /> : null}{" "}
          {editMode ? (
            <EntityEditMobileView
              translation={"task"}
              entity={loaderData.entity}
              headerBackAction={() => {
                navigate(withLocale("/tasks"), {
                  viewTransition: true,
                });
              }}
              serviceSlot={(service) => (
                <Box
                  key={service.id}
                  sx={(theme) => ({
                    padding: "10px 14px",
                    border: "1px solid",
                    borderColor: theme.vars.palette["Grey_3"],
                    borderRadius: "6px",
                  })}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      columnGap: "10px",
                    }}
                  >
                    <Box
                      component={Link}
                      to={withLocale(
                        `/tasks/${loaderData.entity.id}/service/${service.id}`,
                      )}
                      sx={{
                        display: "grid",
                        rowGap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <Typography
                        component="p"
                        variant="Reg_16"
                        sx={(theme) => ({
                          color: theme.vars.palette["Black"],
                        })}
                      >
                        {service.name}
                      </Typography>
                      <Typography
                        component="p"
                        variant="Reg_12"
                        sx={(theme) => ({
                          color: theme.vars.palette["Grey_1"],
                        })}
                      >
                        {t("serviceAmount")} {service.count}
                      </Typography>
                    </Box>

                    <IconButton
                      sx={{
                        padding: 0,
                      }}
                      onClick={() => {
                        setServiceToDelete(service);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
              actionSlot={() => (
                <>
                  <Button
                    component={Link}
                    to={withLocale(`/tasks/${loaderData.entity.id}/service`)}
                    variant="outlined"
                    startIcon={<AddIcon />}
                  >
                    {t("serviceButton")}
                  </Button>

                  {loaderData.entity.status === 1 &&
                  loaderData.entity.invitedPersons.length < 1 ? (
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      disabled={
                        loaderData.entity.services.length < 1 ? true : false
                      }
                      onClick={() => {
                        setSearchSupervisors(true);
                      }}
                    >
                      {t("inviteSupervisorsButton")}
                    </Button>
                  ) : null}
                  {loaderData.entity.status === 2 &&
                  loaderData.entity.acceptingPerson === null ? (
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setSearchResponsibleSupervisors(true);
                      }}
                    >
                      {t("makeSupervisorResponsibleButton")}
                    </Button>
                  ) : null}
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      rowGap: "14px",
                      position: "absolute",
                      width: "100%",
                      bottom: 0,
                      left: 0,
                      padding: "8px 16px",

                      zIndex: 2,
                      backgroundColor: theme.vars.palette["White"],
                    })}
                  >
                    <Button
                      variant="text"
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      {t("cancelButton")}
                    </Button>
                  </Box>
                </>
              )}
            />
          ) : (
            <EntityStaticMobileView
              translation={"task"}
              entity={loaderData.entity}
              headerBackAction={() => {
                navigate(withLocale("/tasks"), {
                  viewTransition: true,
                });
              }}
              {...((userRole === "manager" && loaderData.entity.status === 1) ||
              loaderData.entity.status === 2 ||
              (userRole === "supervisor" && loaderData.entity.status === 1) ||
              loaderData.entity.status === 2
                ? {
                    headerButtonAction: () => {
                      setEditMode(true);
                    },
                  }
                : null)}
              serviceSlot={(service) => (
                <Box
                  key={service.id}
                  sx={(theme) => ({
                    padding: "10px 14px",
                    border: "1px solid",
                    borderColor: theme.vars.palette["Grey_3"],
                    borderRadius: "6px",
                  })}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      columnGap: "10px",
                    }}
                  >
                    <Box
                      component={Link}
                      to={withLocale(
                        `/tasks/${loaderData.entity.id}/service/${service.id}`,
                      )}
                      sx={{
                        display: "grid",
                        rowGap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <Typography
                        component="p"
                        variant="Reg_16"
                        sx={(theme) => ({
                          color: theme.vars.palette["Black"],
                        })}
                      >
                        {service.name}
                      </Typography>
                      <Typography
                        component="p"
                        variant="Reg_12"
                        sx={(theme) => ({
                          color: theme.vars.palette["Grey_1"],
                        })}
                      >
                        {t("serviceAmount")} {service.count}
                      </Typography>
                    </Box>
                  </Box>

                  {service.route > 0 ? (
                    <>
                      <Divider
                        sx={{
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          columnGap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <RouteIcon
                          sx={(theme) => ({
                            color: theme.vars.palette["Grey_2"],
                            padding: "6px",
                            backgroundColor: theme.vars.palette["Grey_4"],
                            borderRadius: "4px",
                          })}
                        />
                        <Typography
                          component="p"
                          variant="Reg_12"
                          sx={(theme) => ({
                            color: theme.vars.palette["Black"],
                          })}
                        >
                          {t("route", { count: service.route })}
                        </Typography>
                      </Box>
                    </>
                  ) : null}

                  {(userRole === "manager" &&
                    loaderData.entity.status === 3 &&
                    service.buttonBidNeed) ||
                  (userRole === "supervisor" &&
                    loaderData.entity.status === 3 &&
                    service.buttonBidNeed) ? (
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "8px",
                      }}
                      startIcon={<CheckIcon />}
                      onClick={() => {
                        submit(
                          JSON.stringify({
                            _action: "transformActivity",
                            taskId: loaderData.entity.id,
                            taskActivityId: service.id,
                          }),
                          {
                            method: "POST",
                            encType: "application/json",
                          },
                        );
                      }}
                    >
                      {t("convertToBid")}
                    </Button>
                  ) : null}

                  {(userRole === "manager" || userRole === "supervisor") &&
                  service.buttonSearchNeed ? (
                    <Button
                      variant="contained"
                      sx={{
                        flexDirection: "column",
                        marginTop: "8px",
                      }}
                      onClick={() => {
                        fetcher.submit(
                          JSON.stringify({
                            _action: "requestSearch",
                            taskId: loaderData.entity.id,
                            taskActivityId: service.id,
                          }),
                          {
                            method: "POST",
                            encType: "application/json",
                          },
                        );
                      }}
                    >
                      {t("searchRequest")}{" "}
                      <span>
                        {t("searchRequestCount")}
                        {service.count}
                      </span>
                    </Button>
                  ) : null}
                </Box>
              )}
              actionSlot={() => {
                const match = loaderData.entity.invitedPersons.find(
                  (supervisor) => supervisor.id === userId,
                );

                if (
                  match &&
                  userRole === "supervisor" &&
                  loaderData.entity.status < 3
                ) {
                  return (
                    <Button
                      variant="contained"
                      onClick={() => {
                        fetcher.submit(
                          JSON.stringify({
                            _action: "_acceptTask",
                            taskId: loaderData.entity.id,
                          }),
                          {
                            method: "POST",
                            encType: "application/json",
                          },
                        );
                      }}
                    >
                      {t("acceptButton")}
                    </Button>
                  );
                } else {
                  return <></>;
                }
              }}
            />
          )}
          {fetcher.data ? (
            <RequestSearchDrawer
              open={fetcher.data ? true : false}
              entity={fetcher.data}
              locations={loaderData.locations}
              submitAction={(values) => {
                const payload: PostUpdateSearchPayload = {
                  place: values.place,
                  activity: values.activity,
                  amount: Number(values.amount),
                  unitPrice: Number(values.unitPrice),
                  radius: Number(values.radius),
                  dateStart: values.dateStart.toISOString(),
                  dateEnd: values.dateEnd.toISOString(),
                  needDays: values.needDays,
                  needFoto: values.needFoto,
                  ...(values.days &&
                    values.days.length > 0 && {
                      dateActivity: (() => {
                        const days: {
                          timeStart: string;
                          timeEnd: string;
                          placeIds?: number[];
                        }[] = [];

                        values.days?.forEach((day) => {
                          const places: number[] = [];

                          day.locations?.forEach((location) => {
                            places.push(Number(location.id));
                          });

                          days.push({
                            timeStart: new Date(day.timeStart).toISOString(),
                            timeEnd: new Date(day.timeEnd).toISOString(),
                            ...(places.length > 0 && { placeIds: places }),
                          });
                        });

                        return days;
                      })(),
                    }),
                };

                submit(
                  JSON.stringify({
                    _action: "_updateSearchRequest",
                    searchId: fetcher.data?.id,
                    payload,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }}
              closeAction={() => {
                fetcher.reset();
              }}
            />
          ) : null}
          <CheckboxSearchableDrawer
            translation="supervisor"
            open={searchSupervisors}
            onClose={() => {
              setSearchSupervisors(false);
            }}
            onSubmit={(values) => {
              fetcher.submit(
                JSON.stringify({
                  _action: "_inviteSupervisors",
                  supervisors: values,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
            }}
            items={loaderData.supervisorsToSelect}
          />
          <RadioSearchableDrawer
            translation="responsible-task"
            onClose={() => {
              setSearchResponsibleSupervisors(false);
            }}
            open={searchResponsibleSupervisors}
            onSubmit={(value) => {
              fetcher.submit(
                JSON.stringify({
                  _action: "_makeResponsible",
                  taskId: loaderData.entity.id,
                  supervisorId: value,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
            }}
            items={[
              ...(loaderData.entity.creatingPerson
                ? [
                    {
                      value: loaderData.entity.creatingPerson.id.toString(),
                      label: t("becomeResponsible"),
                      disabled: false,
                    },
                  ]
                : []),
              ...loaderData.supervisorsToSelect,
            ]}
          />
          <Dialog
            open={serviceToDelete ? true : false}
            onClose={() => {
              setServiceToDelete(null);
            }}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "8px",
              },
            }}
          >
            <DialogTitle
              sx={{
                fontWeight: "400",
                fontSize: "1.125rem",
              }}
            >
              {t("dialog.title")}&nbsp;&quot;{serviceToDelete?.name}
              &quot;&nbsp;?
            </DialogTitle>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setServiceToDelete(null);
                }}
              >
                {t("dialog.no")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  fetcher.submit(
                    JSON.stringify({
                      _action: "deleteActivity",
                      taskId: loaderData.entity.id,
                      taskActivityId: serviceToDelete?.id,
                    }),
                    {
                      method: "POST",
                      encType: "application/json",
                    },
                  );
                  setServiceToDelete(null);
                }}
              >
                {t("dialog.yes")}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
