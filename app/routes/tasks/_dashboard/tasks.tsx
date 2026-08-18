import {
  useSubmit,
  useFetcher,
  useParams,
  useNavigate,
  redirect,
} from "react-router";
import type { Route } from "./+types/tasks";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { DashboardView } from "~/shared/views/EntitiesList/DashboardView";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { EntityCell } from "~/shared/ui/EntityCell/EntityCell";

import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { newTaskContainer } from "../new-task/new-task.module";
import { newTaskNewTokens } from "../new-task/new-task.tokens";

import { tasksContainer } from "../tasks.module";
import { tasksTokens } from "../tasks.tokens";

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
    await tasksService.cancelTask(fields.taskId);
  } else if (_action === TASKS_ACTIONS.create) {
    const task = await newTaskService.createTask(false);

    throw redirect(withLocale(`/dashboard/tasks/new-task/${task.data.id}`));
  }
}

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_tasks");

  const navigate = useNavigate();
  const fetcher = useFetcher();
  const submit = useSubmit();

  const view = useStore((state) => state.entitiesView);
  const setView = useStore((state) => state.setEntitiesView);

  const [taskToAct, setTaskToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  const { taskId } = useParams();

  return (
    <>
      <DashboardView
        translation="tasks"
        view={view}
        setView={setView}
        entityType="task"
        entities={loaderData.tasks}
        sorting="ascending"
        entityListView={(entity) => (
          <EntityCard
            key={entity.id}
            to={withLocale(`/dashboard/tasks/${entity.id}`)}
            statusColor={entity.statusColor}
            isActive={taskId && Number(taskId) === entity.id ? true : false}
            header={`${t("cardHeader")} ${entity.header}`}
            subHeader={{
              text: entity.subHeader,
              bold: false,
            }}
            id={entity.id.toString()}
            address={entity.address}
            duration={entity.duration}
            divider
          />
        )}
        entityTableView={(entity) => (
          <EntityCell
            key={entity.id}
            to={withLocale(`/dashboard/tasks/${entity.id}`)}
            id={entity.id.toString()}
            logo={entity.address.logo}
            name={entity.placeName}
            address={entity.address.text}
            isActive={taskId && Number(taskId) === entity.id ? true : false}
          />
        )}
        entityMapView={(entity) => {
          navigate(withLocale(`/dashboard/tasks/${entity.id}`));
        }}
      />

      {(!taskId && view !== "map" && loaderData.userRole === "manager") ||
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
    </>
  );
}
