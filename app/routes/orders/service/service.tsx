import { useState } from "react";
import { useNavigation, useNavigate, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/service";
import { withLocale } from "~/shared/withLocale";

import { ServiceFormMobileView } from "~/shared/views/service/ServiceFormMobileView/ServiceFormMobileView";
import { ServiceStaticMobileView } from "~/shared/views/service/ServiceStaticMobileView/ServiceStaticMobileView";

import { useStore } from "~/store/store";

import type { postCreateOrderActivityPayload } from "~/requests/_personal/postCreateOrderActivity/postCreateOrderActivity";
import type { postUpdateOrderActivityPayload } from "~/requests/_personal/postUpdateOrderActivity/postUpdateOrderActivity";
import type { ServiceMobileViewInterface } from "~/shared/views/service/ServiceMobileViewInterface";

import { Loader } from "~/shared/ui/Loader/Loader";

import { getOrder } from "~/requests/_personal/getOrder/getOrder";
import { getViewActivitiesForOrder } from "~/requests/_personal/getViewActivitiesForOrder/getViewActivitiesForOrder";
import { getPlaceForOrder } from "~/requests/_personal/getPlaceForOrder/getPlaceForOrder";
import { postCreateOrderActivity } from "~/requests/_personal/postCreateOrderActivity/postCreateOrderActivity";
import { postUpdateOrderActivity } from "~/requests/_personal/postUpdateOrderActivity/postUpdateOrderActivity";

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

        const orderData = await getOrder(accessToken, params.orderId);

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
            params.serviceId &&
            userRole === "client" &&
            orderData.data.status === 1
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

  console.log(isNew);
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
