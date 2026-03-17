import { useState, ComponentPropsWithoutRef } from "react";
import {
  useNavigation,
  useNavigate,
  useFetcher,
  redirect,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/new-task";

import { withLocale } from "~/shared/withLocale";

import { NewTaskMobileView } from "./_views/NewTaskMobileView";
import type { NewTaskMobileViewInterface } from "./_views/NewTaskMobileViewInterface";

import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { useStore } from "~/store/store";

import { getTask } from "~/requests/_personal/getTask/getTask";
import { getPlaceForTask } from "~/requests/_personal/getPlaceForTask/getPlaceForTask";
import { getProjectsForTask } from "~/requests/_personal/getProjectsForTask/getProjectsForTask";
import { getSupervisorsForTask } from "~/requests/_personal/getSupervisorsForTask/getSupervisorsForTask";
import { postCreateTask } from "~/requests/_personal/postCreateTask/postCreateTask";
import { postUpdateTask } from "~/requests/_personal/postUpdateTask/postUpdateTask";
import { postDeleteTaskActivity } from "~/requests/_personal/postDeleteTaskActivity/postDeleteTaskActivity";
import { postCancelTask } from "~/requests/_personal/postCancelTask/postCancelTask";
import { postInvoiceTask } from "~/requests/_personal/postInvoiceTask/postInvoiceTask";
// import { postInstructTask } from "~/requests/_personal/postInstructTask/postInstructTask";

type MobileModeData = {
  mode: "mobile";
  task: NewTaskMobileViewInterface["task"];
  placesOptions: NewTaskMobileViewInterface["placesOptions"];
  projectOptions: NewTaskMobileViewInterface["projectsOptions"];
  supervisorsToSelect: ComponentPropsWithoutRef<
    typeof StyledCheckboxMultiple
  >["options"];
};

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  const currentURL = new URL(request.url);
  const accessToken = useStore.getState().accessToken;
  const taskId = currentURL.searchParams.get("taskId");
  const placeId = currentURL.searchParams.get("placeId");

  let data;

  if (accessToken) {
    if (mode === "mobile") {
      const task: MobileModeData["task"] = {
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

      const placesOptions: MobileModeData["placesOptions"] = [];
      const projectOptions: MobileModeData["projectOptions"] = [];

      const supervisorsToSelect: MobileModeData["supervisorsToSelect"] = [];

      if (taskId) {
        const taskData = await getTask(accessToken, taskId);

        task.id = taskId;
        ((task.projectId = taskData.data.project.id.toString()),
          (task.place.id = taskData.data.place.id.toString()));
        task.place.name = taskData.data.place.name;
        task.place.region = taskData.data.place.region.name;
        task.selfEmployed = taskData.data.selfEmployed;
        task.isNewTask = false;
        taskData.data.orderActivities.forEach((service) => {
          task.taskServices.push({
            id: service.id,
            count: service.count,
            name: service.viewActivity.name,
          });
        });
        taskData.data.acceptedUser.forEach((supervisor) => {
          task.invitedSupervisors.push({
            id: supervisor.id,
            phone: supervisor.phone,
            email: supervisor.email,
            name: supervisor.name,
            logo: supervisor.logo,
          });
        });
        task.responsibleSupervisorId = taskData.data.acceptUser
          ? taskData.data.acceptUser.id
          : null;

        const supervisorsToSelectData = await getSupervisorsForTask(
          accessToken,
          taskId,
        );

        supervisorsToSelectData.data.forEach((sepervisorToSelect) => {
          supervisorsToSelect.push({
            value: sepervisorToSelect.id.toString(),
            label: sepervisorToSelect.name,
            disabled: false,
          });
        });
      }

      const placesOptionsData = await getPlaceForTask(accessToken);

      placesOptionsData.data.forEach((item) => {
        placesOptions.push({
          value: item.id.toString(),
          label: `${item.name} ${item.region.name}`,
          disabled: false,
        });
      });

      if (placeId) {
        const projectsOptionsData = await getProjectsForTask(
          accessToken,
          placeId,
        );
        projectsOptionsData.data.forEach((item) => {
          projectOptions.push({
            value: item.id.toString(),
            label: item.name,
            disabled: false,
          });
        });
      }

      data = {
        mode: "mobile",
        task,
        placesOptions,
        projectOptions,
        supervisorsToSelect,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);

  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;

  const taskId = currentURL.searchParams.get("taskId");

  if (accessToken) {
    if (_action === "_create") {
      const task = await postCreateTask(
        accessToken,
        fields.placeId,
        fields.projectId,
        fields.selfEmployed,
      );
      currentURL.searchParams.set("taskId", task.data.id.toString());

      throw redirect(currentURL.toString());
    } else if (_action === "_update" && taskId) {
      await postUpdateTask(
        accessToken,
        fields.placeId,
        Number(taskId),
        fields.projectId,
        fields.selfEmployed,
      );
    } else if (_action === "_delete" && taskId) {
      await postDeleteTaskActivity(accessToken, taskId, fields.orderActivityId);
    } else if (_action === "_cancel" && taskId) {
      await postCancelTask(accessToken, taskId);
      throw redirect(withLocale("/tasks"));
    } else if (_action === "_inviteSupervisors" && taskId) {
      await postInvoiceTask(accessToken, taskId, fields.supervisors);
      throw redirect(withLocale(`/tasks/${taskId}`));
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function NewTask({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetcher = useFetcher();

  const [searchSupervisors, setSearchSupervisors] = useState<boolean>(false);
  const [_, setActivityToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  return loaderData.mode === "mobile" ? (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

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
          const placeIdParam = searchParams.get("placeId");

          if (placeId !== placeIdParam) {
            setSearchParams((prev) => {
              prev.set("placeId", placeId);
              return prev;
            });
          }
          if (loaderData.task.isNewTask && projectId !== "") {
            fetcher.submit(
              JSON.stringify({
                _action: "_create",
                placeId: placeId,
                projectId: projectId,
                selfEmployed: selfEmployed,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          } else if (projectId !== "") {
            fetcher.submit(
              JSON.stringify({
                _action: "_update",
                placeId: placeId,
                taskId: loaderData.task.id,
                projectId: projectId,
                selfEmployed: selfEmployed,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }
        }}
        cancelAction={() => {
          fetcher.submit(
            JSON.stringify({
              _action: "_cancel",
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
              _action: "_delete",
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
        value={[]}
      />
    </>
  ) : null;
}
