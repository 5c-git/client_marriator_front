import { useState, ComponentPropsWithoutRef } from "react";
import { useNavigate, useFetcher, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/new-task";

import { withLocale } from "~/shared/withLocale";

import { NewTaskMobileView } from "./_views/NewTaskMobileView";
import type { NewTaskMobileViewInterface } from "./_views/NewTaskMobileViewInterface";

import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { newTaskContainer } from "./new-task.module";
import { newTaskNewTokens } from "./new-task.tokens";

const NEW_TASK_ACTIONS = {
  create: "create",
  update: "update",
  delete: "delete",
  cancel: "cancel",
  inviteSupervisors: "inviteSupervisors",
} as const;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const currentURL = new URL(request.url);
  const newTaskService = newTaskContainer.get(newTaskNewTokens.NewTaskService);
  const taskId = currentURL.searchParams.get("taskId");

  let task: NewTaskMobileViewInterface["task"] = {
    id: "",
    projectId: null,
    place: {
      id: "",
      name: "",
      region: "",
    },
    selfEmployed: false,
    isNewTask: true,
    taskServices: [],
    invitedSupervisors: [],
    responsibleSupervisorId: null,
  };
  let projectOptions: NewTaskMobileViewInterface["projectsOptions"] = [];
  let placesOptions: NewTaskMobileViewInterface["placesOptions"] = [];
  let supervisorOptions: ComponentPropsWithoutRef<
    typeof StyledCheckboxMultiple
  >["options"] = [];

  if (taskId) {
    task = await newTaskService.getTask(taskId);
    projectOptions = await newTaskService.getProjectOptions(taskId);

    if (task.projectId) {
      placesOptions = await newTaskService.getPlaceOptions(taskId);
    }

    if (task.place) {
      supervisorOptions = await newTaskService.getSupervisorsOptions(taskId);
    }
  }

  return {
    task,
    placesOptions,
    projectOptions,
    supervisorOptions,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const newTaskService = newTaskContainer.get(newTaskNewTokens.NewTaskService);

  const { _action, ...fields } = await request.json();

  const taskId = currentURL.searchParams.get("taskId");

  if (_action === NEW_TASK_ACTIONS.create) {
    const task = await newTaskService.createTask(
      fields.placeId,
      fields.projectId,
      fields.selfEmployed,
    );
    currentURL.searchParams.set("taskId", task.data.id.toString());
    throw redirect(currentURL.toString());
  } else if (_action === NEW_TASK_ACTIONS.update && taskId) {
    await newTaskService.updateTask(fields);
  } else if (_action === NEW_TASK_ACTIONS.delete && taskId) {
    await newTaskService.deleteActivity(taskId, fields.orderActivityId);
  } else if (_action === NEW_TASK_ACTIONS.cancel && taskId) {
    await newTaskService.cancelTask(taskId);
    throw redirect(withLocale("/tasks"));
  } else if (_action === NEW_TASK_ACTIONS.inviteSupervisors && taskId) {
    await newTaskService.inviteSupervisors(taskId, fields.supervisors);
    throw redirect(withLocale(`/tasks/${taskId}`));
  }
}

export default function NewTask({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const fetcher = useFetcher();
  const submit = useSubmit();

  const [searchSupervisors, setSearchSupervisors] = useState<boolean>(false);
  const [_, setActivityToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  return (
    <>
      <NewTaskMobileView
        task={loaderData.task}
        placesOptions={loaderData.placesOptions}
        projectsOptions={loaderData.projectOptions}
        headerBackAction={() => {
          navigate(withLocale("/tasks"), {
            viewTransition: true,
          });
        }}
        submitAction={(placeId, projectId, selfEmployed) => {
          // const placeIdParam = searchParams.get("placeId");

          // if (placeId !== placeIdParam) {
          //   setSearchParams((prev) => {
          //     prev.set("placeId", placeId);
          //     return prev;
          //   });
          // }
          if (loaderData.task.isNewTask) {
            fetcher.submit(
              JSON.stringify({
                _action: NEW_TASK_ACTIONS.create,
                selfEmployed: selfEmployed,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          } else {
            fetcher.submit(
              JSON.stringify({
                _action: NEW_TASK_ACTIONS.update,
                selfEmployed: selfEmployed,
                taskId: loaderData.task.id,
                ...(projectId !== "" && { projectId: projectId }),
                ...(placeId !== "" && { placeId: placeId }),
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }
        }}
        cancelAction={() => {
          submit(
            JSON.stringify({
              _action: NEW_TASK_ACTIONS.cancel,
              orderId: loaderData.task.id,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        deleteAction={(serviceId) => {
          fetcher.submit(
            JSON.stringify({
              _action: NEW_TASK_ACTIONS.delete,
              orderId: loaderData.task.id,
              orderActivityId: serviceId,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
          setActivityToDelete(null);
        }}
        drawerAction={() => {
          setSearchSupervisors(true);
        }}
      />

      <CheckboxSearchableDrawer
        translation="supervisor"
        open={searchSupervisors}
        onClose={() => {
          setSearchSupervisors(false);
        }}
        onSubmit={(values) => {
          submit(
            JSON.stringify({
              _action: NEW_TASK_ACTIONS.inviteSupervisors,
              supervisors: values,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        items={loaderData.supervisorOptions}
        value={[]}
      />
    </>
  );
}
