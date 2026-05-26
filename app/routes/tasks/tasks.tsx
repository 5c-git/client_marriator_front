import {
  Link,
  useOutletContext,
  useFetcher,
  useNavigation,
} from "react-router";
import { useState } from "react";

import type { Route } from "./+types/tasks";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { statusCodeMap } from "~/shared/status";

import { useStore } from "~/store/store";

import {
  canCancelNewOrNotAccepted,
  canCancelAccepted,
  canRepeatCancelled,
} from "~/shared/buttonHelpers";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";
import type { EntitiesListViewInterface } from "~/shared/views/EntitiesListView/EntitesListViewInterface";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { Loader } from "~/shared/ui/Loader/Loader";

import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@mui/material";

import LoopIcon from "@mui/icons-material/Loop";
import AddIcon from "@mui/icons-material/Add";

import { getTasks } from "~/api/_personal/getTasks/getTasks";
import { postCancelTask } from "~/api/_personal/postCancelTask/postCancelTask";
import { postRepeatTask } from "~/api/_personal/postRepeatTask/postRepeatTask";

type MobileModeData = {
  mode: "mobile";
  tasks: EntitiesListViewInterface["entities"];
};

export async function clientLoader() {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  const tasks: EntitiesListViewInterface["entities"] = [];

  if (accessToken) {
    if (mode === "mobile") {
      const tasksData = await getTasks(accessToken);

      tasksData.data.forEach((item) => {
        const earliestStartDate: string[] = [];
        const latestEndDate: string[] = [];

        item.orderActivities.forEach((item) => {
          earliestStartDate.push(item.dateStart);
        });

        item.orderActivities.forEach((item) => {
          latestEndDate.push(item.dateEnd);
        });

        earliestStartDate.sort(
          (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
        );

        latestEndDate.sort(
          (a, b) => new Date(b).valueOf() - new Date(a).valueOf(),
        );

        tasks.push({
          id: item.id,
          userId: item.user.id,
          status: item.status,
          statusColor: statusCodeMap[item.status].color,
          header: item.orderActivities.length.toString(),
          subHeader: item.orderActivities
            .map((activity) => `${activity.viewActivity.name}`)
            .join(", "),
          address: {
            logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
            text: item.place.address_kladr,
          },
          duration: {
            start: earliestStartDate.length > 0 ? earliestStartDate[0] : null,
            end: latestEndDate.length > 0 ? latestEndDate[0] : null,
          },
          coordinates: [
            Number(item.place.latitude),
            Number(item.place.longitude),
          ],
        });
      });

      data = {
        mode: "mobile",
        tasks: tasks,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action === "repeat") {
      await postRepeatTask(accessToken, fields.taskId);
    } else if (_action === "cancel") {
      await postCancelTask(accessToken, fields.taskId);
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("tasks");
  const navigation = useNavigation();
  const userRole = useStore.getState().userRole;
  const userId = useStore.getState().userId;

  const showMap = useOutletContext<boolean>();
  const fetcher = useFetcher();

  const [taskToAct, setTaskToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  return (
    <>
      {loaderData.mode === "mobile" ? (
        <>
          {navigation.state !== "idle" ? <Loader /> : null}{" "}
          <EntitiesListView
            translation="tasks"
            mapView={showMap}
            entityType="task"
            entities={loaderData.tasks}
            sorting="ascending"
            entityListView={(entity) => (
              <EntityCard
                key={entity.id}
                to={withLocale(`/tasks/${entity.id}`)}
                statusColor={entity.statusColor}
                header={`${t("cardHeader")} ${entity.header}`}
                subHeader={{
                  text: entity.subHeader,
                  bold: false,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
                divider
                {...(entity.duration.start &&
                canCancelNewOrNotAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setTaskToAct({
                            action: "cancel",
                            id: entity.id,
                          });
                        },
                        text: t("cancelTaskButton"),
                        variant: "text",
                      },
                    }
                  : {})}
                {...(entity.duration.end &&
                canCancelAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.end,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setTaskToAct({
                            action: "cancel",
                            id: entity.id,
                          });
                        },
                        text: t("cancelTaskButton"),
                        variant: "text",
                      },
                    }
                  : {})}
                {...(entity.duration.start &&
                canRepeatCancelled(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setTaskToAct({
                            action: "repeat",
                            id: entity.id,
                          });
                        },
                        text: t("repeatTaskButton"),
                        variant: "contained",
                        icon: (
                          <LoopIcon
                            sx={{
                              transform: "rotate(90deg)",
                              marginRight: "8px",
                            }}
                          />
                        ),
                      },
                    }
                  : {})}
              />
            )}
            entityMapView={(entity) => (
              <EntityCard
                to={withLocale(`/tasks/${entity.id}`)}
                header={`${t("cardHeader")} ${entity.header}`}
                subHeader={{
                  text: entity.subHeader,
                  bold: false,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
                divider
                {...(entity.duration.start &&
                canCancelNewOrNotAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setTaskToAct({
                            action: "cancel",
                            id: entity.id,
                          });
                        },
                        text: t("cancelTaskButton"),
                        variant: "text",
                      },
                    }
                  : null)}
                {...(entity.duration.end &&
                canCancelAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.end,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setTaskToAct({
                            action: "cancel",
                            id: entity.id,
                          });
                        },
                        text: t("cancelTaskButton"),
                        variant: "text",
                      },
                    }
                  : null)}
                {...(entity.duration.start &&
                canRepeatCancelled(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setTaskToAct({
                            action: "repeat",
                            id: entity.id,
                          });
                        },
                        text: t("repeatTaskButton"),
                        variant: "contained",
                        icon: (
                          <LoopIcon
                            sx={{
                              transform: "rotate(90deg)",
                              marginRight: "8px",
                            }}
                          />
                        ),
                      },
                    }
                  : null)}
              />
            )}
          />
          {(!showMap && userRole === "manager") ||
          (loaderData.tasks.length === 0 && userRole === "manager") ? (
            <Fab
              component={Link}
              to={withLocale("/tasks/new-task")}
              color="Corp_1"
              aria-label="Create new task"
              sx={{
                position: "fixed",
                bottom: "60px",
                right: "16px",
                width: "60px",
                height: "60px",
                zIndex: 1,
              }}
            >
              <AddIcon
                sx={{
                  fontSize: "2rem",
                }}
              />
            </Fab>
          ) : null}
          <Dialog
            open={taskToAct ? true : false}
            onClose={() => {
              setTaskToAct(null);
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
              {taskToAct
                ? `${t(`dialog.${taskToAct.action}`)} ${t("dialog.title")} ?`
                : null}
              {}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setTaskToAct(null);
                }}
              >
                {t("dialog.no")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  fetcher.submit(
                    JSON.stringify({
                      _action: taskToAct?.action,
                      taskId: taskToAct?.id,
                    }),
                    {
                      method: "POST",
                      encType: "application/json",
                    },
                  );
                  setTaskToAct(null);
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
