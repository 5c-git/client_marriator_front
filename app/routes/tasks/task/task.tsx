import { useState } from "react";
import {
  useNavigation,
  useNavigate,
  useFetcher,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/task";
import type { EntityMobileViewInterface } from "../../../shared/EntityMobileView/EntityMobileViewInterface";

import { useStore } from "~/store/store";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";
import { determineRole } from "~/shared/determineRole";

import { EntityStaticMobileView } from "../../../shared/EntityMobileView/EntityStaticMobileView";
import { EntityEditMobileView } from "../../../shared/EntityMobileView/EntityEditMobileView";

import { Loader } from "~/shared/ui/Loader/Loader";

import Box from "@mui/material/Box";
import {
  Avatar,
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
import { postDeleteTaskActivity } from "~/requests/_personal/postDeleteTaskActivity/postDeleteTaskActivity";
import { postCreateBidFromTask } from "~/requests/_personal/postCreateBidFromTask/postCreateBidFromTask";

type MobileModeData = {
  mode: "mobile";
  entity: EntityMobileViewInterface["entity"];
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  const accessToken = useStore.getState().accessToken;

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
      };

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
        });
      });

      data = {
        mode: "mobile",
        entity: task,
      } as MobileModeData;
    }
    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  // const currentURL = new URL(request.url);
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
      throw redirect(withLocale(`/requests/${transformedRequestData.data.id}`));
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Task({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { t } = useTranslation("task");
  const userRole = useStore.getState().userRole;

  const fetcher = useFetcher();

  const [editMode, setEditMode] = useState<boolean>(false);
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
              translation={"order"}
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
                    <Button
                      component={Link}
                      to={withLocale(`/tasks`)}
                      variant="contained"
                    >
                      {t("sendButton")}
                    </Button>
                  </Box>
                </>
              )}
            />
          ) : (
            <EntityStaticMobileView
              translation={"order"}
              entity={loaderData.entity}
              headerBackAction={() => {
                navigate(withLocale("/tasks"), {
                  viewTransition: true,
                });
              }}
              {...(userRole === "manager" &&
              (loaderData.entity.status === 1 || loaderData.entity.status === 2)
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

                  {userRole === "manager" ? (
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "8px",
                      }}
                      startIcon={<CheckIcon />}
                      onClick={() => {
                        fetcher.submit(
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
                </Box>
              )}
              actionSlot={() => null}
            />
          )}
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
                      orderId: loaderData.entity.id,
                      orderActivityId: serviceToDelete?.id,
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
