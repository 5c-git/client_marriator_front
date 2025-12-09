import { useState } from "react";
import { useNavigation, useNavigate, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/service";
import { withLocale } from "~/shared/withLocale";

import { ServiceFormMobileView } from "~/shared/views/ServiceMobileView/ServiceFormMobileView/ServiceFormMobileView";
import { ServiceStaticMobileView } from "~/shared/views/ServiceMobileView/ServiceStaticMobileView/ServiceStaticMobileView";

import { useStore } from "~/store/store";

import type { postCreateTaskActivityPayload } from "~/requests/_personal/postCreateTaskActivity/postCreateTaskActivity";
import type { postUpdateTaskActivityPayload } from "~/requests/_personal/postUpdateTaskActivity/postUpdateTaskActivity";

import type { ServiceMobileViewInterface } from "~/shared/views/ServiceMobileView/ServiceMobileViewInterface";

import { Loader } from "~/shared/ui/Loader/Loader";

import { getTask } from "~/requests/_personal/getTask/getTask";
import { getViewActivitiesForTask } from "~/requests/_personal/getViewActivitiesForTask/getViewActivitiesForTask";
import { getPlaceForTask } from "~/requests/_personal/getPlaceForTask/getPlaceForTask";
import { postCreateTaskActivity } from "~/requests/_personal/postCreateTaskActivity/postCreateTaskActivity";
import { postUpdateTaskActivity } from "~/requests/_personal/postUpdateTaskActivity/postUpdateTaskActivity";

type MobileModeData = Omit<
  ServiceMobileViewInterface,
  | "translation"
  | "locationsTranslation"
  | "headerBackAction"
  | "headerButtonAction"
  | "cancelAction"
  | "submitAction"
> & {
  taskId: string;
  serviceId?: string;

  setting_mode: "mobile";
  setting_isNew: boolean;
  setting_canEdit: boolean;
};

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;
  const userRole = useStore.getState().userRole;

  let setting_mode: string = "mobile";

  let data;

  if (accessToken) {
    if (setting_mode === "mobile") {
      let setting_isNew: boolean = true;
      let setting_canEdit: boolean = false;
      let setting_logo: string = "";

      let entity: MobileModeData["entity"] = {
        id: "",
        name: "",
        amount: "",
        dateStart: null,
        dateEnd: null,
        needDays: false,
        needPhoto: false,
        days: [],
      };
      const activities: MobileModeData["activities"] = [];
      const locations: MobileModeData["locations"] = [];

      if (params.serviceId) {
        setting_isNew = false;

        const taskData = await getTask(accessToken, params.taskId);

        const service = taskData.data.orderActivities.find(
          (item) => item.id.toString() === params.serviceId,
        );

        if (service) {
          entity = {
            id: service.viewActivity.id.toString(),
            name: service.viewActivity.name,
            amount: service.count.toString(),
            dateStart: new Date(service.dateStart),
            dateEnd: new Date(service.dateEnd),
            needDays: service.dateActivity.length > 0 ? true : false,
            needPhoto: service.needFoto,
            days: (() => {
              const days: MobileModeData["entity"]["days"] = [];

              service.dateActivity.forEach((item) => {
                const locations: MobileModeData["entity"]["days"][0]["locations"] =
                  [];

                item.places.forEach((location) => {
                  locations.push({
                    id: location.id.toString(),
                    name: location.name,
                    logo: location.logo ? location.logo : "",
                  });
                });

                days.push({
                  timeStart: new Date(item.timeStart),
                  timeEnd: new Date(item.timeEnd),
                  needRoute: locations.length > 0 ? true : false,
                  locations: locations,
                });
              });

              return days;
            })(),
          };

          setting_logo = service.viewActivity.logo;

          setting_canEdit =
            (params.serviceId &&
              userRole === "manager" &&
              taskData.data.status === 1) ||
            (params.serviceId &&
              userRole === "manager" &&
              taskData.data.status === 2)
              ? true
              : false;
        } else {
          throw redirect(withLocale(`/tasks/${params.taskId}`));
        }
      }

      const activitiesData = await getViewActivitiesForTask(
        accessToken,
        params.taskId,
      );

      activitiesData.data.forEach((item) => {
        activities.push({
          value: item.id.toString(),
          label: item.detailName,
          needRoute: item.traveling,
          disabled: false,
        });
      });

      const locationsData = await getPlaceForTask(accessToken);

      locationsData.data.forEach((item) => {
        locations.push({
          value: item.id.toString(),
          label: `${item.name} ${item.region.name}`,
          logo: item.logo,
          disabled: false,
        });
      });

      data = {
        taskId: params.taskId,
        entity,
        activities,
        locations,
        ...(params.serviceId && { serviceId: params.serviceId }),
        logo: setting_logo,

        setting_mode: setting_mode,
        setting_isNew: setting_isNew,
        setting_canEdit: setting_canEdit,
      } as MobileModeData;
    }

    return data as MobileModeData | { setting_mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const searchParams = new URL(request.url).searchParams;
  const accessToken = useStore.getState().accessToken;

  const isNew = searchParams.get("new");

  if (accessToken) {
    if (_action === "createService") {
      await postCreateTaskActivity(accessToken, fields.payload);
      if (isNew) {
        throw redirect(`/tasks/new-task?taskId=${params.taskId}`);
      } else {
        throw redirect(withLocale(`/tasks/${params.taskId}`));
      }
    } else if (_action === "updateService") {
      await postUpdateTaskActivity(accessToken, fields.payload);
      if (isNew) {
        throw redirect(`/tasks/new-task?taskId=${params.taskId}`);
      } else {
        throw redirect(withLocale(`/tasks/${params.taskId}`));
      }
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Service({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      {loaderData.setting_mode === "mobile" ? (
        editMode || loaderData.setting_isNew ? (
          <ServiceFormMobileView
            translation="service"
            locationsTranslation="address"
            entity={loaderData.entity}
            activities={loaderData.activities}
            locations={loaderData.locations}
            headerBackAction={() => {
              navigate(-1);
            }}
            cancelAction={() => {
              setEditMode(false);
            }}
            submitAction={(values) => {
              if (loaderData.setting_isNew) {
                const createPayload: postCreateTaskActivityPayload = {
                  taskId: Number(loaderData.taskId),
                  viewActivityId: Number(values.activity),
                  count: Number(values.amount),
                  dateStart: values.dateStart.toISOString(),
                  dateEnd: values.dateEnd.toISOString(),
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
                    _action: "createService",
                    payload: createPayload,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              } else {
                const updatePayload: postUpdateTaskActivityPayload = {
                  taskId: Number(loaderData.taskId),
                  taskActivity: Number(loaderData.serviceId),
                  viewActivityId: Number(values.activity),
                  count: Number(values.amount),
                  dateStart: values.dateStart.toISOString(),
                  dateEnd: values.dateEnd.toISOString(),
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
                    _action: "updateService",
                    payload: updatePayload,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }
            }}
          />
        ) : (
          <ServiceStaticMobileView
            translation="service"
            locationsTranslation="address"
            logo={loaderData.logo}
            entity={loaderData.entity}
            activities={loaderData.activities}
            locations={loaderData.locations}
            headerBackAction={() => {
              navigate(-1);
            }}
            {...(loaderData.setting_canEdit
              ? {
                  headerButtonAction: () => {
                    setEditMode(true);
                  },
                }
              : null)}
          />
        )
      ) : null}
    </>
  );
}
