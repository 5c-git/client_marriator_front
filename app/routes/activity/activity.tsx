import { useState } from "react";
import { useNavigate, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/activity";
import { withLocale } from "~/shared/withLocale";

import { ActivityFormMobileView } from "~/shared/views/ActivityMobileView/ActivityFormMobileView/ActivityFormMobileView";
import { ActivityStaticMobileView } from "~/shared/views/ActivityMobileView/ActivityStaticMobileView/ActivityStaticMobileView";
import type { ActivityMobileViewInterface } from "~/shared/views/ActivityMobileView/ActivityMobileViewInterface";

import { ActivityService } from "./activity.service";
import { activityContainer } from "./activity.module";
import { ActivityMapper } from "./activity.mapper";
import { activityTokens } from "./activity.tokens";
import { ACTIVITY_TAGS } from "./activity.tags";
import { tagged } from "brandi";

const ACTIVITY_ACTIONS = {
  createService: "createService",
  updateService: "updateService",
} as const;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (params.taskId) {
    tagged(ActivityService, ACTIVITY_TAGS.task);
  } else {
    tagged(ActivityService, ACTIVITY_TAGS.order);
  }
  const activityService = activityContainer.get(activityTokens.ActivityService);
  const vocabulary = activityService.getEntityVocabulary();

  const entityId = params.taskId ?? params.orderId;

  const userRole = activityService.getUserRole();

  let setting_isNew: boolean = true;
  let setting_canEdit: boolean = false;
  let setting_logo: string = "";

  let activity: ActivityMobileViewInterface["entity"] = {
    id: "",
    name: "",
    amount: "",
    dateStart: null,
    dateEnd: null,
    needDays: false,
    needPhoto: false,
    days: [],
  };
  let activities: ActivityMobileViewInterface["activities"] = [];
  let locations: ActivityMobileViewInterface["locations"] = [];

  const entityData = await activityService.getEntity(entityId);

  if (params.serviceId) {
    setting_isNew = false;

    const activityMatch = entityData.data.orderActivities.find(
      (item) => item.id.toString() === params.serviceId,
    );

    if (activityMatch) {
      activity = ActivityMapper.mapEntityToActivity(activityMatch);

      setting_logo = activityMatch.viewActivity.logo;

      setting_canEdit =
        (params.serviceId &&
          userRole === "manager" &&
          entityData.data.status === 1) ||
        (params.serviceId &&
          userRole === "manager" &&
          entityData.data.status === 2)
          ? true
          : false;
    } else {
      throw redirect(withLocale(`/${vocabulary.single}/${entityId}`));
    }
  }

  if (setting_canEdit == true) {
    activities = await activityService.getActivitiesOptions(entityId);
    locations = await activityService.getLocationsOptions(entityId);
  }

  const intervalDayStart = await activityService.getSetting("intervalDayStart");
  const intervalDayEnd = await activityService.getSetting("intervalDayEnd");

  return {
    entityId,
    activity,
    activities,
    locations,
    ...(params.serviceId && { serviceId: params.serviceId }),
    logo: setting_logo,

    setting_isNew: setting_isNew,
    setting_canEdit: setting_canEdit,
    vocabulary,

    defaultTimeRange: {
      start: new Date(
        `2026-03-12T${entityData.data.project?.timeStart ? (entityData.data.project.timeStart.startsWith("0") ? entityData.data.project.timeStart : `0${entityData.data.project.timeStart}`) : intervalDayStart.data.value.startsWith("0") ? intervalDayStart.data.value : `0${intervalDayStart.data.value}`}:00`,
      ),
      end: new Date(
        `2026-03-12T${entityData.data.project?.timeEnd ? entityData.data.project.timeEnd : intervalDayEnd.data.value}:00`,
      ),
    },
    projectTimeRange: {
      // "as string" because at this point there is no way we can create service if there is no order or task with project
      start: new Date(entityData.data.project?.dateStart as string),
      end: new Date(entityData.data.project?.dateEnd as string),
    },
  };
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  if (params.taskId) {
    tagged(ActivityService, ACTIVITY_TAGS.task);
  } else {
    tagged(ActivityService, ACTIVITY_TAGS.order);
  }
  const entityId = params.taskId ?? params.orderId;

  const activityService = activityContainer.get(activityTokens.ActivityService);
  const vocabulary = activityService.getEntityVocabulary();

  const { _action, ...fields } = await request.json();
  const searchParams = new URL(request.url).searchParams;

  const isNew = searchParams.get("new");

  if (_action === ACTIVITY_ACTIONS.createService) {
    await activityService.createEntityActivity(fields.payload);
    if (isNew) {
      throw redirect(
        `/${vocabulary.plural}/${vocabulary.new}?${vocabulary.entity}=${entityId}`,
      );
    } else {
      throw redirect(withLocale(`/${vocabulary.plural}/${entityId}`));
    }
  } else if (_action === ACTIVITY_ACTIONS.updateService) {
    await activityService.updateEntityActivity(fields.payload);
    if (isNew) {
      throw redirect(
        `/${vocabulary.plural}/${vocabulary.new}?${vocabulary.entity}=${entityId}`,
      );
    } else {
      throw redirect(withLocale(`/${vocabulary.plural}/${entityId}`));
    }
  }
}

export default function Activity({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const submit = useSubmit();

  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      {editMode || loaderData.setting_isNew ? (
        <ActivityFormMobileView
          translation="activity"
          locationsTranslation="address"
          entity={loaderData.activity}
          activities={loaderData.activities}
          locations={loaderData.locations}
          defaultTimeRange={loaderData.defaultTimeRange}
          projectTimeRange={loaderData.projectTimeRange}
          headerBackAction={() => {
            navigate(-1);
          }}
          cancelAction={() => {
            setEditMode(false);
          }}
          submitAction={(values) => {
            if (loaderData.setting_isNew) {
              const createPayload = {
                [loaderData.vocabulary.entity]: Number(loaderData.entityId),
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
                  _action: ACTIVITY_ACTIONS.createService,
                  payload: createPayload,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
            } else {
              const updatePayload = {
                [loaderData.vocabulary.entity]: Number(loaderData.entityId),
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
                  _action: ACTIVITY_ACTIONS.updateService,
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
        <ActivityStaticMobileView
          translation="activity"
          locationsTranslation="address"
          logo={loaderData.logo}
          entity={loaderData.activity}
          activities={loaderData.activities}
          locations={loaderData.locations}
          defaultTimeRange={loaderData.defaultTimeRange}
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
      )}
    </>
  );
}
