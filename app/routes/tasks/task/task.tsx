import { useState, ComponentPropsWithoutRef } from "react";
import {
  useNavigate,
  useFetcher,
  Link,
  redirect,
  useSubmit,
} from "react-router";
import type { Route } from "./+types/task";
import type { RequestSearchDrawerInterface } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawerInterface";
import type { PostUpdateSearchPayload } from "~/api/_personal/postUpdateSearch/postUpdateSearch";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { EntityStaticMobileView } from "../../../shared/views/EntityMobileView/EntityStaticMobileView";
import { EntityEditMobileView } from "../../../shared/views/EntityMobileView/EntityEditMobileView";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";
import { RadioSearchableDrawer } from "~/shared/ui/RadioSearchableDrawer/RadioSearchableDrawer";
import { RequestSearchDrawer } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawer";

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

import { taskContainer } from "./task.module";
import { taskTokens } from "./task.tokens";
import { TaskMapper } from "./task.mapper";

const TASK_ACTIONS = {
  deleteActivity: "deleteActivity",
  transformActivity: "transformActivity",
  requestSearch: "requestSearch",
  updateSearchRequest: "updateSearchRequest",
  inviteSupervisors: "inviteSupervisors",
  makeResponsible: "makeResponsible",
  acceptTask: "acceptTask",
} as const;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const taskService = taskContainer.get(taskTokens.taskService);
  const userRole = taskService.getUserRole();
  const userId = taskService.getUserId();

  const task = await taskService.getTask(params.taskId);
  let locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[] = [];
  let supervisorsToSelect: ComponentPropsWithoutRef<
    typeof StyledCheckboxMultiple
  >["options"] = [];

  if (userRole === "manager" || userRole === "supervisor") {
    locations = await taskService.getPlaceForBid();
  }

  if (userRole === "manager") {
    supervisorsToSelect = await taskService.getSupervisors(params.taskId);
  }

  return {
    entity: task,
    locations,
    supervisorsToSelect,
    userId,
    userRole,
  };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const taskService = taskContainer.get(taskTokens.taskService);

  if (_action === TASK_ACTIONS.deleteActivity) {
    return await taskService.deleteTaskActivity(
      fields.taskId,
      fields.taskActivityId,
    );
  } else if (_action === TASK_ACTIONS.transformActivity) {
    const data = await taskService.createBidFromTask(
      fields.taskId,
      fields.taskActivityId,
    );
    throw redirect(withLocale(`/bids/${data.data.id}`));
  } else if (_action === TASK_ACTIONS.requestSearch) {
    const data = await taskService.makeSearchRequest(
      fields.taskId,
      fields.taskActivityId,
    );
    return TaskMapper.mapDataToSearchRequest(data);
  } else if (_action === TASK_ACTIONS.updateSearchRequest) {
    return await taskService.updateSearchRequest(
      fields.searchId,
      fields.payload,
    );
  } else if (_action === TASK_ACTIONS.inviteSupervisors) {
    return await taskService.invoiceTask(params.taskId, fields.supervisors);
  } else if (_action === TASK_ACTIONS.makeResponsible) {
    return await taskService.instructTask(fields.taskId, fields.supervisorId);
  } else if (_action === TASK_ACTIONS.acceptTask) {
    return await taskService.acceptTask(fields.taskId);
  }
}

export default function Task({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_tasks_task");
  const navigate = useNavigate();
  const submit = useSubmit();
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
          {...((loaderData.userRole === "manager" &&
            loaderData.entity.status === 1) ||
          loaderData.entity.status === 2 ||
          (loaderData.userRole === "supervisor" &&
            loaderData.entity.status === 1) ||
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

              {(loaderData.userRole === "manager" &&
                loaderData.entity.status === 3 &&
                service.buttonBidNeed) ||
              (loaderData.userRole === "supervisor" &&
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
                        _action: TASK_ACTIONS.transformActivity,
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

              {(loaderData.userRole === "manager" ||
                loaderData.userRole === "supervisor") &&
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
                        _action: TASK_ACTIONS.requestSearch,
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
                    {service.countSearch}
                  </span>
                </Button>
              ) : null}
            </Box>
          )}
          actionSlot={() => {
            const match = loaderData.entity.invitedPersons.find(
              (supervisor) => supervisor.id === loaderData.userId,
            );

            if (
              match &&
              loaderData.userRole === "supervisor" &&
              loaderData.entity.status < 3
            ) {
              return (
                <Button
                  variant="contained"
                  onClick={() => {
                    fetcher.submit(
                      JSON.stringify({
                        _action: TASK_ACTIONS.acceptTask,
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
                _action: TASK_ACTIONS.updateSearchRequest,
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
              _action: TASK_ACTIONS.inviteSupervisors,
              supervisors: values,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        items={loaderData.supervisorsToSelect}
        value={[]}
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
              _action: TASK_ACTIONS.makeResponsible,
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
                  _action: TASK_ACTIONS.deleteActivity,
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
  );
}
