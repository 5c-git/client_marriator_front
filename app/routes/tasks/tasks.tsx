import { Link, useOutletContext, useFetcher } from "react-router";
import type { Route } from "./+types/tasks";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";
import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@mui/material";

import LoopIcon from "@mui/icons-material/Loop";
import AddIcon from "@mui/icons-material/Add";

import { tasksContainer } from "./tasks.module";
import { tasksTokens } from "./tasks.tokens";
import { ButtonActionMapper } from "~/shared/mappers/buttonActionMapper";

const TASKS_ACTIONS = {
  repeat: "repeat",
  cancel: "cancel",
} as const;

export async function clientLoader() {
  const tasksService = tasksContainer.get(tasksTokens.tasksService);

  const tasks = await tasksService.getTasks();
  const intervals = await tasksService.getUserIntervals();
  const userRole = tasksService.getUserRole();

  return {
    tasks,
    intervals,
    userRole,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const tasksService = tasksContainer.get(tasksTokens.tasksService);

  if (_action === TASKS_ACTIONS.repeat) {
    await tasksService.repeatTask(fields.taskId);
  } else if (_action === TASKS_ACTIONS.cancel) {
    await tasksService.cancelTask(fields.taskId);
  }
}

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_tasks");

  const showMap = useOutletContext<boolean>();
  const fetcher = useFetcher();

  const [taskToAct, setTaskToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  return (
    <>
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
            ButtonActionMapper.canCancelNewOrNotAccepted(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.cancel_task_interval,
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
            ButtonActionMapper.canCancelAccepted(
              loaderData.intervals.id,
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
            ButtonActionMapper.canRepeatCancelled(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.repeat_task_interval,
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
            ButtonActionMapper.canCancelNewOrNotAccepted(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.cancel_task_interval,
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
            ButtonActionMapper.canCancelAccepted(
              loaderData.intervals.id,
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
            ButtonActionMapper.canRepeatCancelled(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.repeat_task_interval,
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
      {(!showMap && loaderData.userRole === "manager") ||
      (loaderData.tasks.length === 0 && loaderData.userRole === "manager") ? (
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
  );
}
