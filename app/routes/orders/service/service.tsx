import { useState } from "react";
import { useNavigation, useNavigate, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/service";
import { withLocale } from "~/shared/withLocale";

import { addHours } from "date-fns";

import { ServiceFormMobileView } from "~/shared/views/ServiceMobileView/ServiceFormMobileView/ServiceFormMobileView";
import { ServiceStaticMobileView } from "~/shared/views/ServiceMobileView/ServiceStaticMobileView/ServiceStaticMobileView";

import { useStore } from "~/store/store";

import type { postCreateOrderActivityPayload } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivity";
import type { postUpdateOrderActivityPayload } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivity";
import type { ServiceMobileViewInterface } from "~/shared/views/ServiceMobileView/ServiceMobileViewInterface";

import { Loader } from "~/shared/ui/Loader/Loader";

import { getOrder } from "~/api/_personal/getOrder/getOrder";
import { getViewActivitiesForOrder } from "~/api/_personal/getViewActivitiesForOrder/getViewActivitiesForOrder";
import { getPlaceForOrder } from "~/api/_personal/getPlaceForOrder/getPlaceForOrder";
import { postCreateOrderActivity } from "~/api/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { postUpdateOrderActivity } from "~/api/_personal/postUpdateOrderActivity/postUpdateOrderActivity";
import { getSettingsFromKey } from "~/api/_settings/getSettingsFromKey/getSettingsFromKey";

type MobileModeData = Omit<
  ServiceMobileViewInterface,
  | "translation"
  | "locationsTranslation"
  | "headerBackAction"
  | "headerButtonAction"
  | "cancelAction"
  | "submitAction"
> & {
  orderId: string;
  serviceId?: string;

  setting_mode: "mobile";
  setting_isNew: boolean;
  setting_canEdit: boolean;

  defaultTimeRange: {
    start: Date;
    end: Date;
  };
  projectTimeRange: {
    start: Date;
    end: Date;
  };
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

      const orderData = await getOrder(accessToken, params.orderId);

      if (params.serviceId) {
        setting_isNew = false;

        const service = orderData.data.orderActivities.find(
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
              userRole === "client" &&
              orderData.data.status === 1) ||
            (params.serviceId &&
              userRole === "client" &&
              orderData.data.status === 2)
              ? true
              : false;
        } else {
          throw redirect(withLocale(`/orders/${params.orderId}`));
        }
      }

      if (userRole === "client") {
        const activitiesData = await getViewActivitiesForOrder(
          accessToken,
          params.orderId,
        );

        activitiesData.data.forEach((item) => {
          activities.push({
            value: item.id.toString(),
            label: item.detailName,
            needRoute: item.traveling,
            disabled: false,
          });
        });
      }

      const locationsData = await getPlaceForOrder(accessToken);

      locationsData.data.forEach((item) => {
        locations.push({
          value: item.id.toString(),
          label: `${item.name} ${item.region.name}`,
          logo: item.logo,
          disabled: false,
        });
      });

      const intervalDayStart = await getSettingsFromKey(
        accessToken,
        "intervalDayStart",
      );
      const intervalDayEnd = await getSettingsFromKey(
        accessToken,
        "intervalDayEnd",
      );

      // "as string" because at this point there is no way we can create service if there is no order with project
      const projectStartDate = new Date(
        orderData.data.project?.dateStart as string,
      );
      const projectEndDate = new Date(
        orderData.data.project?.dateEnd as string,
      );
      const projectStartTimeHours = new Date(
        `2026-03-12T${orderData.data.project?.timeStart}:00`,
      ).getHours();
      const projectEndTimeHours = new Date(
        `2026-03-12T${orderData.data.project?.timeEnd}:00`,
      ).getHours();

      data = {
        orderId: params.orderId,
        entity,
        activities,
        locations,
        ...(params.serviceId && { serviceId: params.serviceId }),
        logo: setting_logo,

        setting_mode: setting_mode,
        setting_isNew: setting_isNew,
        setting_canEdit: setting_canEdit,

        defaultTimeRange: {
          start: new Date(
            `2026-03-12T${intervalDayStart.data.value.startsWith("0") ? intervalDayStart.data.value : `0${intervalDayStart.data.value}`}:00`,
          ),
          end: new Date(`2026-03-12T${intervalDayEnd.data.value}:00`),
        },
        projectTimeRange: {
          start: addHours(projectStartDate, projectStartTimeHours),
          end: addHours(projectEndDate, projectEndTimeHours),
        },
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
      await postCreateOrderActivity(accessToken, fields.payload);
      if (isNew) {
        throw redirect(`/orders/new-order?orderId=${params.orderId}`);
      } else {
        throw redirect(withLocale(`/orders/${params.orderId}`));
      }
    } else if (_action === "updateService") {
      await postUpdateOrderActivity(accessToken, fields.payload);
      if (isNew) {
        throw redirect(`/orders/new-order?orderId=${params.orderId}`);
      } else {
        throw redirect(withLocale(`/orders/${params.orderId}`));
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
                const createPayload: postCreateOrderActivityPayload = {
                  orderId: Number(loaderData.orderId),
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
                const updatePayload: postUpdateOrderActivityPayload = {
                  orderId: Number(loaderData.orderId),
                  orderActivity: Number(loaderData.serviceId),
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
        )
      ) : null}
    </>
  );
}
