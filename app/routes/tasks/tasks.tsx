import {
  useOutletContext,
  useFetcher,
  useSubmit,
  redirect,
} from "react-router";
import type { Route } from "./+types/tasks";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { ListView } from "~/shared/views/EntitiesList/ListView";
import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

import { useStore, type State } from "~/store/store";

import { Alert, Button, Dialog, DialogActions, DialogTitle, Fab, Snackbar } from "@mui/material";

import LoopIcon from "@mui/icons-material/Loop";
import AddIcon from "@mui/icons-material/Add";

import { newTaskContainer } from "./new-task/new-task.module";
import { newTaskNewTokens } from "./new-task/new-task.tokens";

import { tasksContainer } from "./tasks.module";
import { tasksTokens } from "./tasks.tokens";
import { taskContainer } from "./task/task.module";
import { taskTokens } from "./task/task.tokens";
import { ButtonActionMapper } from "~/shared/mappers/buttonActionMapper";

const TASKS_ACTIONS = {
  repeat: "repeat",
  cancel: "cancel",
  create: "create",
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
  const newTaskService = newTaskContainer.get(newTaskNewTokens.NewTaskService);

  if (_action === TASKS_ACTIONS.repeat) {
    await tasksService.repeatTask(fields.taskId);
  } else if (_action === TASKS_ACTIONS.cancel) {
    // окно отмены могло истечь, пока список был открыт, — перезапрашиваем карточку
    const taskService = taskContainer.get(taskTokens.taskService);
    const task = await taskService.getTask(fields.taskId);

    if (!task.canCancel) {
      return { cancelExpired: true };
    }

    await tasksService.cancelTask(fields.taskId);
  } else if (_action === TASKS_ACTIONS.create) {
    const task = await newTaskService.createTask(false);

    throw redirect(withLocale(`/tasks/new-task/${task.data.id}`));
  }
}

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_tasks");

  const view = useOutletContext<State["entitiesView"]>();
  const setView = useStore((state) => state.setEntitiesView);
  const fetcher = useFetcher<{ cancelExpired?: boolean }>();
  const submit = useSubmit();

  const [taskToAct, setTaskToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  return (
    <>
      <ListView
        translation="tasks"
        view={view}
        setView={setView}
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
            {...(entity.canCancel
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
            {...(entity.canCancel
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
        entityTableView={() => {}}
      />
      {(view !== "map" && loaderData.userRole === "manager") ||
      (loaderData.tasks.length === 0 && loaderData.userRole === "manager") ? (
        <Fab
          color="Corp_1"
          aria-label="Create new task"
          onClick={() => {
            submit(
              JSON.stringify({
                _action: TASKS_ACTIONS.create,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }}
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
      <Snackbar
        open={
          fetcher.state === "idle" && fetcher.data?.cancelExpired
            ? true
            : false
        }
        autoHideDuration={3000}
        onClose={() => {
          if (fetcher.state === "idle") {
            fetcher.reset();
          }
        }}
      >
        <Alert
          severity="error"
          variant="small"
          sx={{
            width: "100%",
          }}
        >
          {t("cancelExpiredAlert")}
        </Alert>
      </Snackbar>
    </>
  );
}
